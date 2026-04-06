import { getPublicApiBaseUrl } from "@/lib/api-base";

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginSuccess = {
  ok: true;
  /** JWT hoặc token trả về — null nếu backend chỉ dùng cookie httpOnly. */
  token: string | null;
};

export type LoginFailure = {
  ok: false;
  status: number;
  message: string;
};

export type LoginResult = LoginSuccess | LoginFailure;

const AUTH_TOKEN_KEY = "lumiere-auth-token";

/** Bật `NEXT_PUBLIC_FAKE_AUTH=1` để xem /profile và header đã đăng nhập mà không cần backend. Chỉ dùng lúc dev. */
export function isFakeAuthEnabled(): boolean {
  const v = process.env.NEXT_PUBLIC_FAKE_AUTH?.trim().toLowerCase();
  return v === "1" || v === "true" || v === "yes";
}

/** Khi login thành công nhưng backend không trả JWT (chỉ cookie) — tab hiện tại coi là đã đăng nhập. */
const AUTH_SESSION_HINT_KEY = "lumiere-auth-cookie-session";

function readSessionHint(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.sessionStorage.getItem(AUTH_SESSION_HINT_KEY) === "1";
  } catch {
    return false;
  }
}

function setSessionHint(): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(AUTH_SESSION_HINT_KEY, "1");
  } catch {
    /* private mode / disabled */
  }
}

function clearSessionHint(): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.removeItem(AUTH_SESSION_HINT_KEY);
  } catch {
    /* ignore */
  }
}

/** Chuỗi snapshot cho đồng bộ React — đổi khi đăng nhập / đăng xuất. */
export function getAuthSessionMarker(): string {
  if (typeof window === "undefined") return "";
  if (isFakeAuthEnabled()) return "fake";
  const t = window.localStorage.getItem(AUTH_TOKEN_KEY);
  if (t) return `t:${t.length}:${t.slice(0, 12)}`;
  if (readSessionHint()) return "cookie";
  return "";
}

export const LUMIERE_AUTH_CHANGE_EVENT = "lumiere-auth-change";

/** Sau khi lưu hồ sơ — header có thể tải lại avatar. */
export const LUMIERE_PROFILE_UPDATED_EVENT = "lumiere-profile-updated";

export function notifyProfileUpdated(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(LUMIERE_PROFILE_UPDATED_EVENT));
}

export function notifyAuthSessionChanged(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(LUMIERE_AUTH_CHANGE_EVENT));
}

export type ProfileGender = "male" | "female" | "other" | "unspecified";

export type UserProfile = {
  email: string | null;
  name: string | null;
  phone: string | null;
  age: number | null;
  gender: ProfileGender | null;
  /** URL tuyệt đối hoặc data URL (ảnh đại diện). */
  avatarUrl: string | null;
};

const FAKE_PROFILE: UserProfile = {
  email: "ban@demo.lumiere.local",
  name: "Tài khoản demo",
  phone: "0900 000 000",
  age: 28,
  gender: "unspecified",
  avatarUrl: null,
};

const PROFILE_LOCAL_KEY = "lumiere-profile-local";
/** Giới hạn kích thước data URL avatar lưu localStorage (ký tự). */
const MAX_AVATAR_DATA_URL_CHARS = 520_000;

function pickNumber(...vals: unknown[]): number | null {
  for (const v of vals) {
    if (typeof v === "number" && Number.isFinite(v)) {
      const n = Math.round(v);
      if (n >= 0 && n <= 150) return n;
    }
    if (typeof v === "string") {
      const t = v.trim();
      if (/^\d{1,3}$/.test(t)) {
        const n = parseInt(t, 10);
        if (n >= 0 && n <= 150) return n;
      }
    }
  }
  return null;
}

function normalizeGender(raw: unknown): ProfileGender | null {
  if (raw === null || raw === undefined) return null;
  const s = String(raw).trim().toLowerCase();
  if (s === "male" || s === "m" || s === "nam") return "male";
  if (s === "female" || s === "f" || s === "nu" || s === "nữ") return "female";
  if (s === "other" || s === "khac" || s === "khác") return "other";
  if (s === "unspecified" || s === "" || s === "unknown") return "unspecified";
  return null;
}

export const PROFILE_MAX_AVATAR_DATA_URL_LENGTH = MAX_AVATAR_DATA_URL_CHARS;

export function normalizeProfileInput(p: UserProfile): UserProfile {
  const genders: ProfileGender[] = ["male", "female", "other", "unspecified"];
  const gg: ProfileGender =
    p.gender && genders.includes(p.gender) ? p.gender : "unspecified";
  let av = p.avatarUrl?.trim() ?? null;
  if (av && av.startsWith("data:image/") && av.length > MAX_AVATAR_DATA_URL_CHARS) {
    av = null;
  }
  if (av && !av.startsWith("http://") && !av.startsWith("https://") && !av.startsWith("data:image/")) {
    av = null;
  }
  return {
    email: p.email?.trim().slice(0, 254) || null,
    name: p.name?.trim().slice(0, 120) || null,
    phone: p.phone?.trim().slice(0, 40) || null,
    age:
      p.age !== null && Number.isFinite(p.age)
        ? Math.min(150, Math.max(0, Math.round(p.age)))
        : null,
    gender: gg,
    avatarUrl: av ? av.slice(0, MAX_AVATAR_DATA_URL_CHARS) : null,
  };
}

function readFakeStoredProfile(): UserProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(PROFILE_LOCAL_KEY);
    if (!raw) return null;
    const o = JSON.parse(raw) as unknown;
    if (!o || typeof o !== "object") return null;
    const r = o as Record<string, unknown>;
    const profile: UserProfile = {
      email:
        typeof r.email === "string" || r.email === null
          ? (r.email as string | null)
          : pickString(r.email),
      name:
        typeof r.name === "string" || r.name === null
          ? (r.name as string | null)
          : pickString(r.name),
      phone:
        typeof r.phone === "string" || r.phone === null
          ? (r.phone as string | null)
          : pickString(r.phone),
      age: typeof r.age === "number" ? r.age : pickNumber(r.age),
      gender: normalizeGender(r.gender) ?? "unspecified",
      avatarUrl:
        typeof r.avatarUrl === "string" || r.avatarUrl === null
          ? (r.avatarUrl as string | null)
          : pickString(r.avatarUrl),
    };
    return normalizeProfileInput(profile);
  } catch {
    return null;
  }
}

function pickString(...vals: unknown[]): string | null {
  for (const v of vals) {
    if (typeof v === "string" && v.trim()) return v.trim();
  }
  return null;
}

export function parseUserProfile(body: unknown): UserProfile {
  const empty: UserProfile = {
    email: null,
    name: null,
    phone: null,
    age: null,
    gender: null,
    avatarUrl: null,
  };
  if (!body || typeof body !== "object") {
    return empty;
  }
  const o = body as Record<string, unknown>;
  const user =
    o.user && typeof o.user === "object"
      ? (o.user as Record<string, unknown>)
      : o;
  const g = normalizeGender(user.gender ?? o.gender) ?? null;
  return {
    email: pickString(user.email, user.mail, o.email),
    name: pickString(
      user.name,
      user.fullName,
      user.displayName,
      user.username,
      o.name,
      o.fullName,
    ),
    phone: pickString(
      user.phone,
      user.phoneNumber,
      user.mobile,
      o.phone,
    ),
    age: pickNumber(user.age, o.age),
    gender: g,
    avatarUrl: pickString(
      user.avatarUrl,
      user.avatar,
      user.photo,
      user.image,
      o.avatarUrl,
      o.avatar,
    ),
  };
}

export type ProfileResult =
  | { ok: true; profile: UserProfile }
  | { ok: false; status: number; message: string };

/** Gọi backend: `GET {NEXT_PUBLIC_API_URL}/auth/me` — Bearer token nếu có trong localStorage; luôn gửi cookie. */
export async function fetchProfileRequest(): Promise<ProfileResult> {
  if (isFakeAuthEnabled()) {
    const stored = readFakeStoredProfile();
    return {
      ok: true,
      profile: stored ?? normalizeProfileInput(FAKE_PROFILE),
    };
  }

  const base = getPublicApiBaseUrl();
  if (!base) {
    return {
      ok: false,
      status: 0,
      message: "Missing NEXT_PUBLIC_API_URL",
    };
  }

  const token = getStoredAuthToken();
  const headers: Record<string, string> = { Accept: "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  let res: Response;
  try {
    res = await fetch(`${base}/auth/me`, {
      method: "GET",
      headers,
      credentials: "include",
    });
  } catch {
    return { ok: false, status: 0, message: "Network error" };
  }

  const text = await res.text();
  let json: unknown = null;
  if (text) {
    try {
      json = JSON.parse(text) as unknown;
    } catch {
      /* ignore */
    }
  }

  if (res.status === 401) {
    clearStoredAuthToken();
    return {
      ok: false,
      status: 401,
      message: extractErrorMessage(json, "Session expired"),
    };
  }

  if (!res.ok) {
    return {
      ok: false,
      status: res.status,
      message: extractErrorMessage(json, `Request failed (${res.status})`),
    };
  }

  return { ok: true, profile: parseUserProfile(json) };
}

export type UpdateProfileResult =
  | { ok: true }
  | { ok: false; message: string };

/**
 * Cập nhật hồ sơ: fake auth → lưu toàn bộ vào `localStorage`.
 * Thật → `PATCH {NEXT_PUBLIC_API_URL}/auth/me` (JSON), sau đó nên gọi lại `fetchProfileRequest`.
 */
export async function updateProfileRequest(profile: UserProfile): Promise<UpdateProfileResult> {
  const sanitized = normalizeProfileInput(profile);

  if (isFakeAuthEnabled()) {
    if (typeof window === "undefined") return { ok: true };
    window.localStorage.setItem(PROFILE_LOCAL_KEY, JSON.stringify(sanitized));
    notifyProfileUpdated();
    return { ok: true };
  }

  const base = getPublicApiBaseUrl();
  if (!base) {
    return { ok: false, message: "Missing NEXT_PUBLIC_API_URL" };
  }

  const token = getStoredAuthToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  let res: Response;
  try {
    res = await fetch(`${base}/auth/me`, {
      method: "PATCH",
      headers,
      credentials: "include",
      body: JSON.stringify(sanitized),
    });
  } catch {
    return { ok: false, message: "Network error" };
  }

  const text = await res.text();
  let json: unknown = null;
  if (text) {
    try {
      json = JSON.parse(text) as unknown;
    } catch {
      /* ignore */
    }
  }

  if (res.status === 401) {
    clearStoredAuthToken();
    return { ok: false, message: extractErrorMessage(json, "Session expired") };
  }

  if (!res.ok) {
    return {
      ok: false,
      message: extractErrorMessage(json, `Request failed (${res.status})`),
    };
  }

  notifyProfileUpdated();
  return { ok: true };
}

function extractToken(body: unknown): string | null {
  if (!body || typeof body !== "object") return null;
  const o = body as Record<string, unknown>;
  const direct =
    o.accessToken ?? o.token ?? o.access_token ?? o.jwt;
  if (typeof direct === "string" && direct.length > 0) return direct;
  const data = o.data;
  if (data && typeof data === "object") {
    const inner = data as Record<string, unknown>;
    const t = inner.accessToken ?? inner.token ?? inner.access_token;
    if (typeof t === "string" && t.length > 0) return t;
  }
  return null;
}

function extractErrorMessage(body: unknown, fallback: string): string {
  if (!body || typeof body !== "object") return fallback;
  const o = body as Record<string, unknown>;
  const msg = o.message ?? o.error ?? o.detail;
  if (typeof msg === "string" && msg.trim()) return msg.trim();
  if (Array.isArray(o.message) && typeof o.message[0] === "string") {
    return o.message[0];
  }
  return fallback;
}

/** Gọi backend: `POST {NEXT_PUBLIC_API_URL}/auth/login` */
export async function loginRequest(payload: LoginPayload): Promise<LoginResult> {
  if (isFakeAuthEnabled()) {
    if (typeof window !== "undefined") {
      notifyAuthSessionChanged();
    }
    return { ok: true, token: null };
  }

  const base = getPublicApiBaseUrl();
  if (!base) {
    return {
      ok: false,
      status: 0,
      message: "Missing NEXT_PUBLIC_API_URL",
    };
  }

  let res: Response;
  try {
    res = await fetch(`${base}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        email: payload.email.trim(),
        password: payload.password,
      }),
      credentials: "include",
    });
  } catch {
    return {
      ok: false,
      status: 0,
      message: "Network error",
    };
  }

  const text = await res.text();
  let json: unknown = null;
  if (text) {
    try {
      json = JSON.parse(text) as unknown;
    } catch {
      /* plain text body */
    }
  }

  if (!res.ok) {
    return {
      ok: false,
      status: res.status,
      message: extractErrorMessage(
        json,
        res.status === 401 ? "Invalid email or password" : `Request failed (${res.status})`,
      ),
    };
  }

  const token = extractToken(json);
  if (typeof window !== "undefined") {
    if (token) {
      window.localStorage.setItem(AUTH_TOKEN_KEY, token);
      clearSessionHint();
    } else {
      setSessionHint();
    }
    notifyAuthSessionChanged();
  }

  return { ok: true, token };
}

export function clearStoredAuthToken(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(AUTH_TOKEN_KEY);
  clearSessionHint();
  notifyAuthSessionChanged();
}

export function getStoredAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(AUTH_TOKEN_KEY);
}

/** Google / Facebook / Apple — backend bắt đầu luồng OAuth (redirect). */
export type SocialAuthProvider = "google" | "facebook" | "apple";

/**
 * URL GET để bắt đầu OAuth: `{NEXT_PUBLIC_API_URL}/auth/oauth/{provider}`.
 * Backend redirect sang nhà cung cấp, xử lý callback, set cookie hoặc trả token.
 */
export function getSocialAuthStartUrl(provider: SocialAuthProvider): string | null {
  const base = getPublicApiBaseUrl();
  if (!base) return null;
  return `${base}/auth/oauth/${provider}`;
}
