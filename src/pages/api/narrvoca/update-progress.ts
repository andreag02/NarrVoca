import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/lib/supabase";
import { supabaseForUser } from "./_supabaseForUser";

async function getAuthUser(req: NextApiRequest) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) return null;
  const {
    data: { user },
  } = await supabase.auth.getUser(token);
  return user ?? null;
}

function getToken(req: NextApiRequest) {
  return req.headers.authorization?.replace("Bearer ", "") ?? "";
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const user = await getAuthUser(req);
  if (!user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { uid, node_id, status, accuracy_score } = req.body ?? {};

  if (uid == null || node_id == null || status == null) {
    return res
      .status(400)
      .json({ error: "Missing required fields: uid, node_id, status" });
  }

  // Build upsert payload.
  // best_score and completed_at use DB-side logic via ignoreDuplicates=false:
  // we pass the new values and let the DB column default handle "set once" semantics.
  // The onConflict columns are (uid, node_id).
  const now = new Date().toISOString();
  const db = supabaseForUser(getToken(req));

  const payload: Record<string, unknown> = {
    uid,
    node_id,
    status,
  };

  if (accuracy_score != null) {
    // Preserve the historical maximum — only update best_score if the new
    // attempt beats what is already stored.
    const { data: existingProgress, error: existingProgressError } = await db
      .from("user_node_progress")
      .select("best_score")
      .eq("uid", uid)
      .eq("node_id", node_id)
      .maybeSingle();

    if (existingProgressError) {
      return res.status(500).json({ error: existingProgressError.message });
    }

    const currentBest: number = existingProgress?.best_score ?? 0;
    if (accuracy_score > currentBest) {
      payload.best_score = accuracy_score;
    }
  }

  if (status === "completed") {
    payload.completed_at = now;
  }
  const { data, error } = await db
    .from("user_node_progress")
    .upsert(payload, { onConflict: "uid,node_id", ignoreDuplicates: false })
    .select("uid, node_id, status, best_score, completed_at")
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json(data);
}
