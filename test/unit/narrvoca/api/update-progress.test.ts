import type { NextApiRequest, NextApiResponse } from "next";
import handler from "@/src/pages/api/narrvoca/update-progress";

// ---------------------------------------------------------------------------
// Mock supabase — upsert chain + pre-check select chain
// ---------------------------------------------------------------------------
const mockUpsert = jest.fn();
const mockSelect = jest.fn();
const mockSingle = jest.fn();
const mockGetUser = jest.fn();
const mockSUFU = jest.fn();

// Pre-check chain: db.from().select().eq().eq().maybeSingle()
const mockPreCheckMaybeSingle = jest.fn();
const mockPreCheckEq2 = jest.fn();
const mockPreCheckEq1 = jest.fn();
const mockPreCheckSelect = jest.fn();

jest.mock("@/src/pages/api/narrvoca/_supabaseForUser", () => ({
  supabaseForUser: (...args: unknown[]) => mockSUFU(...args),
}));

jest.mock("@/lib/supabase", () => ({
  supabase: {
    from: () => ({ upsert: mockUpsert }),
    auth: { getUser: (...args) => mockGetUser(...args) },
  },
}));

function setupChain(data: unknown, error: unknown = null) {
  mockSingle.mockResolvedValue({ data, error });
  mockSelect.mockReturnValue({ single: mockSingle });
  mockUpsert.mockReturnValue({ select: mockSelect });
}

/** Prime the pre-check query with a specific existing best_score (null = no row). */
function setupPreCheck(bestScore: number | null) {
  mockPreCheckMaybeSingle.mockResolvedValue({
    data: bestScore !== null ? { best_score: bestScore } : null,
    error: null,
  });
}

function makeReq(
  method: string,
  body?: object,
  withAuth = true,
): Partial<NextApiRequest> {
  return {
    method,
    body,
    headers: withAuth ? { authorization: "Bearer test-token" } : {},
  };
}

function makeRes() {
  return {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  } as unknown as NextApiResponse;
}

beforeEach(() => {
  jest.clearAllMocks();
  mockGetUser.mockResolvedValue({ data: { user: { id: "test-uid" } } });

  // Default pre-check: no existing row → currentBest is null/absent
  mockPreCheckMaybeSingle.mockResolvedValue({ data: null, error: null });
  mockPreCheckEq2.mockReturnValue({ maybeSingle: mockPreCheckMaybeSingle });
  mockPreCheckEq1.mockReturnValue({ eq: mockPreCheckEq2 });
  mockPreCheckSelect.mockReturnValue({ eq: mockPreCheckEq1 });

  // Return an object with both select (pre-check) and upsert — the handler
  // calls whichever one it needs depending on whether accuracy_score is set.
  mockSUFU.mockReturnValue({
    from: () => ({ select: mockPreCheckSelect, upsert: mockUpsert }),
  });
});

// ---------------------------------------------------------------------------

describe("POST /api/narrvoca/update-progress", () => {
  const validBody = {
    uid: "user-uuid",
    node_id: 1,
    status: "completed",
    accuracy_score: 0.85,
  };

  const dbRow = {
    uid: "user-uuid",
    node_id: 1,
    status: "completed",
    best_score: 0.85,
    completed_at: "2026-02-27T00:00:00Z",
  };

  it("returns 401 when no authorization token is provided", async () => {
    const req = makeReq("POST", validBody, false);
    const res = makeRes();
    await handler(req as NextApiRequest, res as NextApiResponse);
    expect(res.status).toHaveBeenCalledWith(401);
  });

  it("returns 200 with progress row on success", async () => {
    setupChain(dbRow);
    const req = makeReq("POST", validBody);
    const res = makeRes();
    await handler(req as NextApiRequest, res as NextApiResponse);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(dbRow);
  });

  it("works without accuracy_score (optional)", async () => {
    const rowNoScore = { ...dbRow, best_score: null, completed_at: null };
    setupChain(rowNoScore);
    const req = makeReq("POST", {
      uid: "user-uuid",
      node_id: 1,
      status: "in_progress",
    });
    const res = makeRes();
    await handler(req as NextApiRequest, res as NextApiResponse);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("returns 400 when required fields are missing", async () => {
    const req = makeReq("POST", { uid: "user-uuid" }); // missing node_id and status
    const res = makeRes();
    await handler(req as NextApiRequest, res as NextApiResponse);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("returns 405 for non-POST methods", async () => {
    const req = makeReq("GET", undefined, false);
    const res = makeRes();
    await handler(req as NextApiRequest, res as NextApiResponse);
    expect(res.status).toHaveBeenCalledWith(405);
  });

  it("returns 500 on DB error", async () => {
    setupChain(null, { message: "upsert failed" });
    const req = makeReq("POST", validBody);
    const res = makeRes();
    await handler(req as NextApiRequest, res as NextApiResponse);
    expect(res.status).toHaveBeenCalledWith(500);
  });

  it("upserts with the new higher accuracy_score (best_score updates)", async () => {
    const higherRow = { ...dbRow, best_score: 0.95 };
    setupChain(higherRow);
    setupPreCheck(0.85); // existing best is 0.85; new 0.95 is higher → should update
    const req = makeReq("POST", { ...validBody, accuracy_score: 0.95 });
    const res = makeRes();
    await handler(req as NextApiRequest, res as NextApiResponse);
    const payload = mockUpsert.mock.calls[0][0] as Record<string, unknown>;
    expect(payload.best_score).toBe(0.95);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(higherRow);
  });

  it("does not decrease best_score when a lower accuracy_score is posted", async () => {
    // DB keeps the higher historical value; handler returns whatever the DB row says
    const rowWithOriginalBest = { ...dbRow, best_score: 0.85 };
    setupChain(rowWithOriginalBest);
    setupPreCheck(0.85); // existing best is 0.85; new 0.4 is lower → should NOT update
    const req = makeReq("POST", { ...validBody, accuracy_score: 0.4 });
    const res = makeRes();
    await handler(req as NextApiRequest, res as NextApiResponse);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ best_score: 0.85 }),
    );
  });
});
