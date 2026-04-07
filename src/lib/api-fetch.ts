import { getPublicApiBaseUrl } from "@/lib/api-base";

function parseResponseText(text: string): unknown | null {
  const t = text.trim();
  if (!t) return null;
  try {
    return JSON.parse(t) as unknown;
  } catch {
    return null;
  }
}

/**
 * Lấy thông báo lỗi từ body JSON NestJS / class-validator (message string | string[]).
 */
export function extractApiErrorMessage(data: unknown, fallback: string): string {
  if (!data || typeof data !== "object") return fallback;
  const o = data as Record<string, unknown>;
  const msg = o.message;
  if (typeof msg === "string" && msg.trim()) return msg.trim();
  if (Array.isArray(msg)) {
    const parts = msg.filter(
      (x): x is string => typeof x === "string" && x.trim().length > 0,
    );
    if (parts.length) return parts.join(" ");
  }
  const err = o.error;
  if (typeof err === "string" && err.trim()) return err.trim();
  const detail = o.detail;
  if (typeof detail === "string" && detail.trim()) return detail.trim();
  return fallback;
}

export type FetchPublicApiResult =
  | { ok: true; status: number; data: unknown | null }
  | { ok: false; status: number; data: unknown | null; networkError: boolean };

type FetchPublicApiOptions = {
  method?: string;
  /** Gửi object JSON — tự stringify, Content-Type + Accept. */
  json?: unknown;
  headers?: Record<string, string>;
  body?: BodyInit | null;
  credentials?: RequestCredentials;
};

/**
 * `fetch` tới `{NEXT_PUBLIC_API_URL}/{path}` — mặc định `credentials: "include"`.
 * - `networkError: true` khi lỗi mạng.
 * - `ok: false`, `status: 0`, `networkError: false` khi thiếu `NEXT_PUBLIC_API_URL`.
 * - Với `FormData`: không set `Content-Type` (trình duyệt tự thêm boundary).
 */
export async function fetchPublicApi(
  path: string,
  options: FetchPublicApiOptions = {},
): Promise<FetchPublicApiResult> {
  const base = getPublicApiBaseUrl();
  if (!base) {
    return { ok: false, status: 0, data: null, networkError: false };
  }

  const url = `${base}/${path.replace(/^\//, "")}`;
  const headers = new Headers(options.headers as HeadersInit | undefined);
  let body: BodyInit | undefined =
    options.body === null ? undefined : (options.body as BodyInit | undefined);

  if (options.json !== undefined) {
    body = JSON.stringify(options.json);
    if (!headers.has("Content-Type")) headers.set("Content-Type", "application/json");
  }
  if (!headers.has("Accept")) {
    headers.set("Accept", "application/json");
  }

  const method =
    options.method ??
    (options.json !== undefined || body !== undefined ? "POST" : "GET");

  let res: Response;
  try {
    res = await fetch(url, {
      method,
      headers,
      body,
      credentials: options.credentials ?? "include",
    });
  } catch {
    return { ok: false, status: 0, data: null, networkError: true };
  }

  const text = await res.text();
  const data = parseResponseText(text);

  if (res.ok) {
    return { ok: true, status: res.status, data };
  }
  return { ok: false, status: res.status, data, networkError: false };
}
