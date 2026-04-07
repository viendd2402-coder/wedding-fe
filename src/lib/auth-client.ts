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
  const t = window.localStorage.getItem(AUTH_TOKEN_KEY);
  if (t) return `t:${t.length}:${t.slice(0, 12)}`;
  if (readSessionHint()) return "cookie";
  return "";
}

export const LUMIERE_AUTH_CHANGE_EVENT = "lumiere-auth-change";

/** Sau khi lưu hồ sơ — header có thể tải lại avatar. */
export const LUMIERE_PROFILE_UPDATED_EVENT = "lumiere-profile-updated";

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
  /** Khớp backend (ví dụ Zalo / liên hệ phụ). */
  additionalContact: string | null;
};

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
    additionalContact: p.additionalContact?.trim().slice(0, 255) || null,
  };
}

function pickString(...vals: unknown[]): string | null {
  for (const v of vals) {
    if (typeof v === "string" && v.trim()) return v.trim();
  }
  return null;
}

/** Backend bọc JSON trong `{ success, message, data }` (ResponseInterceptor). */
function unwrapApiPayload(body: unknown): Record<string, unknown> | null {
  if (body === null || body === undefined || typeof body !== "object") return null;
  const o = body as Record<string, unknown>;
  if ("data" in o && o.data !== null && typeof o.data === "object") {
    return o.data as Record<string, unknown>;
  }
  return o;
}

export function parseUserProfile(body: unknown): UserProfile {
  const empty: UserProfile = {
    email: null,
    name: null,
    phone: null,
    age: null,
    gender: null,
    avatarUrl: null,
    additionalContact: null,
  };
  const layer = unwrapApiPayload(body);
  if (!layer) {
    return empty;
  }
  const user =
    layer.user && typeof layer.user === "object"
      ? (layer.user as Record<string, unknown>)
      : layer;
  const g = normalizeGender(user.gender ?? layer.gender) ?? null;
  return {
    email: pickString(
      user.email,
      user.mail,
      layer.email,
      user.email_address,
      layer.email_address,
    ),
    name: pickString(
      user.name,
      user.fullName,
      user.full_name,
      user.displayName,
      user.display_name,
      user.username,
      layer.name,
      layer.fullName,
      layer.full_name,
    ),
    phone: pickString(
      user.phone,
      user.phoneNumber,
      user.phone_number,
      user.mobile,
      layer.phone,
    ),
    age: pickNumber(user.age, layer.age),
    gender: g,
    avatarUrl: pickString(
      user.avatarUrl,
      user.avatar_url,
      user.avatar,
      user.photo,
      user.image,
      layer.avatarUrl,
      layer.avatar_url,
      layer.avatar,
    ),
    additionalContact: pickString(
      user.additionalContact,
      user.additional_contact,
      layer.additionalContact,
      layer.additional_contact,
    ),
  };
}

export type ProfileResult =
  | { ok: true; profile: UserProfile }
  | { ok: false; status: number; message: string };

type ProfileOk = Extract<ProfileResult, { ok: true }>;

/** Gộp GET đồng thời + cache TTL — tránh 2 request cùng lúc (header, /profile, React Strict Mode). */
const PROFILE_GET_CACHE_MS = 12_000;

let profileGetInFlight: Promise<ProfileResult> | null = null;
let profileGetCache: { expiresAt: number; result: ProfileOk } | null = null;

export function invalidateProfileRequestCache(): void {
  profileGetCache = null;
}

function cloneProfileOk(r: ProfileOk): ProfileResult {
  return { ok: true, profile: { ...r.profile } };
}

async function fetchProfileFromNetwork(): Promise<ProfileResult> {
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
    res = await fetch(`${base}/auth/profile`, {
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

/** Gọi backend: `GET {NEXT_PUBLIC_API_URL}/auth/profile` — Bearer nếu có; luôn gửi cookie. */
export async function fetchProfileRequest(): Promise<ProfileResult> {
  const base = getPublicApiBaseUrl();
  if (!base) {
    return {
      ok: false,
      status: 0,
      message: "Missing NEXT_PUBLIC_API_URL",
    };
  }

  const now = Date.now();
  if (profileGetCache && now < profileGetCache.expiresAt) {
    return cloneProfileOk(profileGetCache.result);
  }

  if (profileGetInFlight) return profileGetInFlight;

  profileGetInFlight = (async () => {
    const result = await fetchProfileFromNetwork();
    if (result.ok) {
      profileGetCache = { expiresAt: Date.now() + PROFILE_GET_CACHE_MS, result };
    }
    return result;
  })().finally(() => {
    profileGetInFlight = null;
  });

  return profileGetInFlight;
}

export function notifyProfileUpdated(): void {
  if (typeof window === "undefined") return;
  invalidateProfileRequestCache();
  window.dispatchEvent(new Event(LUMIERE_PROFILE_UPDATED_EVENT));
}

export type UpdateProfileResult =
  | { ok: true }
  | { ok: false; message: string };

/** `PATCH {NEXT_PUBLIC_API_URL}/auth/profile` (multipart fields khớp UpdateProfileDto). */
export async function updateProfileRequest(profile: UserProfile): Promise<UpdateProfileResult> {
  const sanitized = normalizeProfileInput(profile);

  const base = getPublicApiBaseUrl();
  if (!base) {
    return { ok: false, message: "Missing NEXT_PUBLIC_API_URL" };
  }

  const token = getStoredAuthToken();
  const headers: Record<string, string> = { Accept: "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  const fd = new FormData();
  if (sanitized.name) fd.append("fullName", sanitized.name);
  if (sanitized.phone) fd.append("phone", sanitized.phone);
  if (sanitized.age !== null && Number.isFinite(sanitized.age)) {
    fd.append("age", String(Math.min(120, Math.max(0, Math.round(sanitized.age)))));
  }
  if (sanitized.gender && sanitized.gender !== "unspecified") {
    fd.append("gender", sanitized.gender);
  }
  if (sanitized.additionalContact) fd.append("additionalContact", sanitized.additionalContact);

  let res: Response;
  try {
    res = await fetch(`${base}/auth/profile`, {
      method: "PATCH",
      headers,
      credentials: "include",
      body: fd,
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
    invalidateProfileRequestCache();
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

/** Xóa JWT + hint session (cookie-only) — dùng khi 401 hoặc hết hạn. */
export function clearStoredAuthToken(): void {
  if (typeof window === "undefined") return;
  invalidateProfileRequestCache();
  window.localStorage.removeItem(AUTH_TOKEN_KEY);
  clearSessionHint();
  notifyAuthSessionChanged();
}

/**
 * Đăng xuất phía client (JWT stateless): xóa token, session hint, báo UI cập nhật.
 */
export function logoutClient(): void {
  if (typeof window === "undefined") return;
  invalidateProfileRequestCache();
  window.localStorage.removeItem(AUTH_TOKEN_KEY);
  clearSessionHint();
  notifyAuthSessionChanged();
}

export function getStoredAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(AUTH_TOKEN_KEY);
}

/** Google / Facebook — OAuth trên trình duyệt, token gửi BE verify. */
export type SocialAuthProvider = "google" | "facebook";

export function getPublicGoogleOAuthClientId(): string | null {
  const v = process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID?.trim();
  return v || null;
}

export function getPublicFacebookAppId(): string | null {
  const v = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID?.trim();
  return v || null;
}

function sanitizeRedirectPath(input: string | null | undefined): string {
  const raw = (input ?? "").trim();
  if (!raw.startsWith("/") || raw.startsWith("//")) return "/";
  return raw;
}

/**
 * Full-page redirect sau social login (FedCM / SDK gọi callback ngoài React).
 * `router.replace` từ ngữ cảnh đó đôi khi không đổi URL; reload cũng đảm bảo cookie session mới được áp dụng.
 */
export function navigateAfterSocialAuthSuccess(redirectTo?: string | null): void {
  if (typeof window === "undefined") return;
  window.location.assign(sanitizeRedirectPath(redirectTo));
}

function parseHashParams(hash: string): URLSearchParams {
  const h = hash.startsWith("#") ? hash.slice(1) : hash;
  return new URLSearchParams(h);
}

function readTokenFromParams(params: URLSearchParams): string | null {
  const token =
    params.get("accessToken") ??
    params.get("token") ??
    params.get("access_token") ??
    params.get("jwt");
  if (!token) return null;
  const normalized = token.trim();
  return normalized.length > 0 ? normalized : null;
}

function readErrorFromParams(params: URLSearchParams): string | null {
  const raw =
    params.get("error_description") ??
    params.get("error_message") ??
    params.get("error") ??
    params.get("message");
  if (!raw) return null;
  const normalized = raw.trim();
  return normalized.length > 0 ? normalized : null;
}

export type SocialAuthCompleteResult =
  | { ok: true; redirectTo: string }
  | { ok: false; message: string; redirectTo: string };

type SocialVerifyPayload = {
  provider: SocialAuthProvider;
  token?: string | null;
  redirectTo?: string;
};

function readProviderFromParams(params: URLSearchParams): SocialAuthProvider | null {
  const p = (params.get("provider") ?? "").trim().toLowerCase();
  if (p === "google" || p === "facebook") return p;
  return null;
}

async function verifySocialTokenRequest(
  payload: SocialVerifyPayload,
): Promise<
  | { ok: true; token: string | null; redirectTo: string }
  | { ok: false; status: number; message: string; redirectTo: string }
> {
  const base = getPublicApiBaseUrl();
  const redirectTo = sanitizeRedirectPath(payload.redirectTo);
  if (!base) {
    return {
      ok: false,
      status: 0,
      message: "Missing NEXT_PUBLIC_API_URL",
      redirectTo: "/login",
    };
  }

  let res: Response;
  try {
    res = await fetch(`${base}/auth/social-login`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      credentials: "include",
      body: JSON.stringify({
        provider: payload.provider,
        token: payload.token ?? undefined,
      }),
    });
  } catch {
    return {
      ok: false,
      status: 0,
      message: "Network error",
      redirectTo: "/login",
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
      message: extractErrorMessage(json, `Request failed (${res.status})`),
      redirectTo: "/login",
    };
  }

  const token = extractToken(json);
  return { ok: true, token, redirectTo };
}

function persistSocialAuthSession(token: string | null): void {
  if (typeof window === "undefined") return;
  invalidateProfileRequestCache();
  if (token) {
    window.localStorage.setItem(AUTH_TOKEN_KEY, token);
    clearSessionHint();
  } else {
    setSessionHint();
  }
  notifyAuthSessionChanged();
}

/**
 * Sau khi FE đã có access token / id token từ nhà cung cấp — gọi BE verify và lưu session.
 */
export async function verifySocialLoginWithBackend(opts: {
  provider: SocialAuthProvider;
  accessToken?: string | null;
  idToken?: string | null;
  redirectTo?: string;
}): Promise<SocialAuthCompleteResult> {
  const verified = await verifySocialTokenRequest({
    provider: opts.provider,
    token: opts.idToken ?? opts.accessToken,
    redirectTo: opts.redirectTo,
  });
  if (!verified.ok) {
    return { ok: false, message: verified.message, redirectTo: verified.redirectTo };
  }

  persistSocialAuthSession(verified.token);
  return { ok: true, redirectTo: verified.redirectTo };
}

/**
 * FE hoàn tất social login: lấy token từ query/hash callback rồi gửi BE verify.
 */
export async function completeSocialAuthFromLocation(
  search: string,
  hash: string,
): Promise<SocialAuthCompleteResult> {
  const queryParams = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
  const hashParams = parseHashParams(hash);
  const redirectTo = sanitizeRedirectPath(
    queryParams.get("redirectTo") ??
      queryParams.get("returnTo") ??
      hashParams.get("redirectTo") ??
      hashParams.get("returnTo"),
  );

  const error = readErrorFromParams(queryParams) ?? readErrorFromParams(hashParams);
  if (error) {
    return { ok: false, message: error, redirectTo: "/login" };
  }

  const provider = readProviderFromParams(queryParams) ?? readProviderFromParams(hashParams);
  if (!provider) {
    return {
      ok: false,
      message: "Missing social provider",
      redirectTo: "/login",
    };
  }

  const accessToken = readTokenFromParams(queryParams) ?? readTokenFromParams(hashParams);
  const idToken =
    queryParams.get("idToken") ??
    queryParams.get("id_token") ??
    hashParams.get("idToken") ??
    hashParams.get("id_token");

  if (!accessToken && !idToken) {
    return {
      ok: false,
      message: "Missing social token",
      redirectTo: "/login",
    };
  }

  const result = await verifySocialLoginWithBackend({
    provider,
    accessToken,
    idToken,
    redirectTo,
  });
  return result;
}
