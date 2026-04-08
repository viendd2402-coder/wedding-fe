import type { AppLanguage } from "@/components/global-preferences-provider";

export type AuthMode = "login" | "register";

export type AuthScreenCopy = {
  backHome: string;
  badge: string;
  title: string;
  lead: string;
  body: string;
  asideKicker: string;
  asideTitle: string;
  email: string;
  password: string;
  confirmPassword: string;
  forgotPassword: string;
  rememberMe: string;
  submit: string;
  switchPrompt: string;
  switchAction: string;
  switchHref: string;
  feature1: string;
  feature2: string;
  feature3: string;
  submitting: string;
  socialContinue: string;
  socialEmail: string;
  socialFacebook: string;
  socialNeedApi: string;
  socialNeedGoogleClientId: string;
  socialNeedFacebookAppId: string;
  googleOrigin403Hint: string;
  googleOrigin403Note127: string;
  googleOriginCopy: string;
  googleOriginCopied: string;
  loginEmailRequired: string;
  loginEmailInvalid: string;
  loginPasswordRequired: string;
  loginPasswordMin: string;
};

type AuthBundle = {
  backHome: string;
  badgeLogin: string;
  badgeRegister: string;
  titleLogin: string;
  titleRegister: string;
  leadLogin: string;
  leadRegister: string;
  bodyLogin: string;
  bodyRegister: string;
  asideKicker: string;
  asideTitle: string;
  email: string;
  password: string;
  confirmPassword: string;
  forgotPassword: string;
  rememberMe: string;
  submitLogin: string;
  submitRegister: string;
  switchPromptLogin: string;
  switchPromptRegister: string;
  switchActionLogin: string;
  switchActionRegister: string;
  switchHrefLogin: string;
  switchHrefRegister: string;
  feature1: string;
  feature2: string;
  feature3: string;
  submitting: string;
  socialContinue: string;
  socialEmail: string;
  socialFacebook: string;
  socialNeedApi: string;
  socialNeedGoogleClientId: string;
  socialNeedFacebookAppId: string;
  googleOrigin403Hint: string;
  googleOrigin403Note127: string;
  googleOriginCopy: string;
  googleOriginCopied: string;
  loginEmailRequired: string;
  loginEmailInvalid: string;
  loginPasswordRequired: string;
  loginPasswordMinTpl: string;
};

const vi: AuthBundle = {
  backHome: "Quay về trang chủ",
  badgeLogin: "Đăng nhập tài khoản",
  badgeRegister: "Tạo tài khoản mới",
  titleLogin: "Chào mừng trở lại",
  titleRegister: "Bắt đầu cùng Lumiere",
  leadLogin: "Đăng nhập để tiếp tục hoàn thiện website cưới của bạn.",
  leadRegister: "Tạo tài khoản để bắt đầu hành trình thiệp mời trực tuyến.",
  bodyLogin: "Cập nhật nội dung, theo dõi chỉnh sửa và tiến độ — gọn trong một không gian.",
  bodyRegister: "Lưu mẫu yêu thích, khởi tạo dự án và nhận thông tin bàn giao rõ ràng.",
  asideKicker: "Lumiere",
  asideTitle: "Không gian riêng cho thiệp mời trực tuyến của hai bạn.",
  email: "Email",
  password: "Mật khẩu",
  confirmPassword: "Nhập lại mật khẩu",
  forgotPassword: "Quên mật khẩu?",
  rememberMe: "Ghi nhớ đăng nhập",
  submitLogin: "Đăng nhập",
  submitRegister: "Tạo tài khoản",
  switchPromptLogin: "Chưa có tài khoản?",
  switchPromptRegister: "Đã có tài khoản?",
  switchActionLogin: "Đăng ký ngay",
  switchActionRegister: "Đăng nhập ngay",
  switchHrefLogin: "/register",
  switchHrefRegister: "/login",
  feature1: "Lưu mẫu giao diện bạn đã chọn",
  feature2: "Theo dõi yêu cầu chỉnh sửa và phản hồi",
  feature3: "Xem tiến độ hoàn thiện minh bạch",
  submitting: "Đang đăng nhập…",
  socialContinue: "Hoặc tiếp tục với",
  socialEmail: "Hoặc dùng email",
  socialFacebook: "Facebook",
  socialNeedApi:
    "Chưa cấu hình API. Đặt NEXT_PUBLIC_API_URL để bật đăng nhập mạng xã hội.",
  socialNeedGoogleClientId:
    "Chưa cấu hình Google: đặt NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID (OAuth 2.0 Client ID kiểu Web).",
  socialNeedFacebookAppId: "Chưa cấu hình Facebook: đặt NEXT_PUBLIC_FACEBOOK_APP_ID.",
  googleOrigin403Hint:
    "Nếu console báo origin is not allowed hoặc gsi/button 403: Google Cloud Console → APIs & Services → Credentials → OAuth 2.0 Client ID (Web) → Authorized JavaScript origins → thêm đúng origin dưới (không có / ở cuối, đúng http/https và port).",
  googleOrigin403Note127:
    "localhost và 127.0.0.1 là hai origin khác nhau — phải trùng với URL trên thanh địa chỉ.",
  googleOriginCopy: "Sao chép origin",
  googleOriginCopied: "Đã chép",
  loginEmailRequired: "Vui lòng nhập email.",
  loginEmailInvalid: "Email không hợp lệ.",
  loginPasswordRequired: "Vui lòng nhập mật khẩu.",
  loginPasswordMinTpl: "Mật khẩu tối thiểu __MIN__ ký tự.",
};

const en: AuthBundle = {
  backHome: "Back to home",
  badgeLogin: "Sign in",
  badgeRegister: "Create account",
  titleLogin: "Welcome back",
  titleRegister: "Start with Lumiere",
  leadLogin: "Sign in to continue shaping your wedding website.",
  leadRegister: "Create an account to begin your online invitation journey.",
  bodyLogin: "Update copy, follow revisions, and see delivery progress in one calm workspace.",
  bodyRegister: "Save favorite templates, start projects, and stay informed as your site comes together.",
  asideKicker: "Lumiere",
  asideTitle: "A private space to refine your online wedding invitation.",
  email: "Email",
  password: "Password",
  confirmPassword: "Confirm password",
  forgotPassword: "Forgot password?",
  rememberMe: "Keep me signed in",
  submitLogin: "Sign in",
  submitRegister: "Create account",
  switchPromptLogin: "Don't have an account?",
  switchPromptRegister: "Already have an account?",
  switchActionLogin: "Register now",
  switchActionRegister: "Sign in now",
  switchHrefLogin: "/register",
  switchHrefRegister: "/login",
  feature1: "Save the templates you love",
  feature2: "Follow revision requests and feedback",
  feature3: "See clear, transparent delivery progress",
  submitting: "Signing in…",
  socialContinue: "Or continue with",
  socialEmail: "Or use email",
  socialFacebook: "Facebook",
  socialNeedApi: "API base URL is not set. Add NEXT_PUBLIC_API_URL to enable social sign-in.",
  socialNeedGoogleClientId:
    "Google is not configured: set NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID (Web OAuth 2.0 client ID).",
  socialNeedFacebookAppId: "Facebook is not configured: set NEXT_PUBLIC_FACEBOOK_APP_ID.",
  googleOrigin403Hint:
    "If the console shows origin is not allowed or gsi/button returns 403: Google Cloud Console → APIs & Services → Credentials → your Web OAuth 2.0 Client → Authorized JavaScript origins → add the exact origin below (no trailing slash, correct scheme and port).",
  googleOrigin403Note127:
    "localhost and 127.0.0.1 are different origins — they must match what you see in the address bar.",
  googleOriginCopy: "Copy origin",
  googleOriginCopied: "Copied",
  loginEmailRequired: "Please enter your email.",
  loginEmailInvalid: "Please enter a valid email address.",
  loginPasswordRequired: "Please enter your password.",
  loginPasswordMinTpl: "Password must be at least __MIN__ characters.",
};

const bundles: Record<AppLanguage, AuthBundle> = { vi, en };

export function getAuthScreenCopy(
  language: AppLanguage,
  mode: AuthMode,
  passwordMinLength: number,
): AuthScreenCopy {
  const m = bundles[language];
  const login = mode === "login";
  return {
    backHome: m.backHome,
    badge: login ? m.badgeLogin : m.badgeRegister,
    title: login ? m.titleLogin : m.titleRegister,
    lead: login ? m.leadLogin : m.leadRegister,
    body: login ? m.bodyLogin : m.bodyRegister,
    asideKicker: m.asideKicker,
    asideTitle: m.asideTitle,
    email: m.email,
    password: m.password,
    confirmPassword: m.confirmPassword,
    forgotPassword: m.forgotPassword,
    rememberMe: m.rememberMe,
    submit: login ? m.submitLogin : m.submitRegister,
    switchPrompt: login ? m.switchPromptLogin : m.switchPromptRegister,
    switchAction: login ? m.switchActionLogin : m.switchActionRegister,
    switchHref: login ? m.switchHrefLogin : m.switchHrefRegister,
    feature1: m.feature1,
    feature2: m.feature2,
    feature3: m.feature3,
    submitting: m.submitting,
    socialContinue: m.socialContinue,
    socialEmail: m.socialEmail,
    socialFacebook: m.socialFacebook,
    socialNeedApi: m.socialNeedApi,
    socialNeedGoogleClientId: m.socialNeedGoogleClientId,
    socialNeedFacebookAppId: m.socialNeedFacebookAppId,
    googleOrigin403Hint: m.googleOrigin403Hint,
    googleOrigin403Note127: m.googleOrigin403Note127,
    googleOriginCopy: m.googleOriginCopy,
    googleOriginCopied: m.googleOriginCopied,
    loginEmailRequired: m.loginEmailRequired,
    loginEmailInvalid: m.loginEmailInvalid,
    loginPasswordRequired: m.loginPasswordRequired,
    loginPasswordMin: m.loginPasswordMinTpl.replace("__MIN__", String(passwordMinLength)),
  };
}
