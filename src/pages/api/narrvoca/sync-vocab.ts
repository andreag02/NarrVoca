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

/**
 * POST /api/narrvoca/sync-vocab
 *
 * After a user passes a checkpoint, sync the node's target NarrVoca vocabulary
 * words into the user's Vocora `vocab_words` table so they appear in the
 * dashboard word list and can be used in the story generator.
 *
 * Body: { uid, node_id, target_language }
 * Returns: { added: string[], skipped: string[] }
 */
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

  const { uid, node_id, target_language } = req.body ?? {};

  if (uid == null || node_id == null || target_language == null) {
    return res.status(400).json({
      error: "Missing required fields: uid, node_id, target_language",
    });
  }

  const db = supabaseForUser(getToken(req));

  // 1. Fetch the node's target vocabulary IDs
  const { data: nodeVocabRows, error: nvError } = await db
    .from("node_vocabulary")
    .select("vocab_id")
    .eq("node_id", node_id)
    .eq("is_target", true);

  if (nvError) return res.status(500).json({ error: nvError.message });

  const vocabIds = (nodeVocabRows ?? []).map(
    (r: { vocab_id: number }) => r.vocab_id,
  );
  if (vocabIds.length === 0) {
    return res.status(200).json({ added: [], skipped: [] });
  }

  // 2. Fetch the actual vocabulary terms for those IDs in the correct language
  const { data: vocabRows, error: vError } = await db
    .from("vocabulary")
    .select("term")
    .in("vocab_id", vocabIds)
    .eq("language_code", target_language);

  if (vError) return res.status(500).json({ error: vError.message });

  const terms = (vocabRows ?? []).map((r: { term: string }) => r.term);
  if (terms.length === 0) {
    return res.status(200).json({ added: [], skipped: [] });
  }

  // 3. Resolve the NarrVoca list for this user+language (create if missing)
  const NARRVOCA_LIST_NAME = "NarrVoca";
  let listId: number;
  {
    const { data: existingList, error: listFetchError } = await db
      .from("vocab_lists")
      .select("list_id")
      .eq("uid", uid)
      .eq("language", target_language)
      .eq("name", NARRVOCA_LIST_NAME)
      .limit(1)
      .single();

    if (listFetchError && listFetchError.code !== "PGRST116") {
      // PGRST116 = "no rows found" — anything else is a real error
      return res.status(500).json({ error: listFetchError.message });
    }

    if (existingList) {
      listId = (existingList as { list_id: number }).list_id;
    } else {
      const { data: newList, error: listCreateError } = await db
        .from("vocab_lists")
        .insert({ uid, name: NARRVOCA_LIST_NAME, language: target_language })
        .select("list_id")
        .single();

      if (listCreateError)
        return res.status(500).json({ error: listCreateError.message });
      listId = (newList as { list_id: number }).list_id;
    }
  }

  // 4. Fetch the user's existing vocab words scoped to the NarrVoca list
  // (words in other lists must not block insertion here)
  const { data: existingRows, error: ewError } = await db
    .from("vocab_words")
    .select("word")
    .eq("uid", uid)
    .eq("language", target_language)
    .eq("list_id", listId);

  if (ewError) return res.status(500).json({ error: ewError.message });

  const existing = new Set(
    (existingRows ?? []).map((r: { word: string }) => r.word),
  );

  // 5. Insert only the words that are not already in the list
  const toAdd = terms.filter((t) => !existing.has(t));
  const skipped = terms.filter((t) => existing.has(t));

  if (toAdd.length > 0) {
    const { error: insertError } = await db.from("vocab_words").insert(
      toAdd.map((word) => ({
        word,
        language: target_language,
        uid,
        list_id: listId,
      })),
    );

    if (insertError)
      return res.status(500).json({ error: insertError.message });
  }

  return res.status(200).json({ added: toAdd, skipped });
}
