/** Khớp LoginDto — @MinLength(6) */
export const LOGIN_PASSWORD_MIN_LENGTH = 6;

export type LoginFieldKey = "email" | "password";

export type LoginFieldErrors = Partial<Record<LoginFieldKey, string>>;

/**
 * Gần với @IsEmail() (class-validator) — đủ cho FE.
 * Không thay thế validator đầy đủ RFC trên server.
 */
export function isValidLoginEmail(raw: string): boolean {
  const s = raw.trim();
  if (!s) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

/**
 * Validate khớp LoginDto: email bắt buộc + đúng dạng email; mật khẩu bắt buộc + ≥ 6 ký tự.
 */
export function validateLoginDtoInput(input: {
  email: string;
  password: string;
}):
  | { ok: true; email: string; password: string }
  | { ok: false; errors: LoginFieldErrors } {
  const errors: LoginFieldErrors = {};
  const email = input.email.trim();
  const password = input.password;

  if (!email) {
    errors.email = "__EMAIL_REQUIRED__";
  } else if (!isValidLoginEmail(email)) {
    errors.email = "__EMAIL_INVALID__";
  }

  if (!password) {
    errors.password = "__PASSWORD_REQUIRED__";
  } else if (password.length < LOGIN_PASSWORD_MIN_LENGTH) {
    errors.password = "__PASSWORD_MIN__";
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return { ok: true, email, password };
}
