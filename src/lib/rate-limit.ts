/**
 * Best-effort in-memory rate limit for the inquiries endpoint. State lives in
 * the function instance's memory, so on Vercel it resets on cold start and
 * is not shared across concurrent instances — it stops casual abuse from a
 * single warm instance, not a distributed attack. No external store, no
 * paid service, matching the current scale of this endpoint.
 */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;

const hits = new Map<string, number[]>();

/** Occasional sweep so the map does not grow unbounded over a long-lived instance. */
function prune(now: number) {
  for (const [key, timestamps] of hits) {
    const kept = timestamps.filter((t) => now - t < WINDOW_MS);
    if (kept.length === 0) hits.delete(key);
    else hits.set(key, kept);
  }
}

let requestsSincePrune = 0;

export function isRateLimited(key: string): boolean {
  const now = Date.now();

  if (++requestsSincePrune >= 50) {
    requestsSincePrune = 0;
    prune(now);
  }

  const timestamps = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  timestamps.push(now);
  hits.set(key, timestamps);

  return timestamps.length > MAX_REQUESTS;
}

export function clientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}
