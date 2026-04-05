/** Base URL API backend (ví dụ `http://localhost:3001/api`). Không có dấu / ở cuối. */
export function getPublicApiBaseUrl(): string | null {
  const raw = process.env.NEXT_PUBLIC_API_URL?.trim();
  if (!raw) return null;
  return raw.replace(/\/+$/, "");
}
