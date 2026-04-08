import type { AppLanguage } from "@/components/global-preferences-provider";

export type AuthMode = "login" | "register" | "forgot";

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
  registerPasswordMax: string;
  registerPasswordConfirmationRequired: string;
  registerPasswordConfirmationMin: string;
  registerPasswordConfirmationMax: string;
  registerPasswordConfirmationMismatch: string;
  registerSuccess: string;
  forgotNeedEmail: string;
  forgotEmailInvalid: string;
  forgotSuccessGeneric: string;
  forgotTitle: string;
  forgotLead: string;
  forgotBody: string;
  forgotSubmit: string;
  forgotBackToLogin: string;
  authNetworkError: string;
  authRequestFailed: string;
  loginFailedCredentials: string;
  registerFailedGeneric: string;
  forgotFailedGeneric: string;
  socialLoginFailed: string;
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
  submittingRegister: string;
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
  registerPasswordMax: string;
  registerPasswordConfirmationRequired: string;
  registerPasswordConfirmationMinTpl: string;
  registerPasswordConfirmationMax: string;
  registerPasswordConfirmationMismatch: string;
  registerSuccess: string;
  forgotNeedEmail: string;
  forgotEmailInvalid: string;
  forgotSuccessGeneric: string;
  forgotTitle: string;
  forgotLead: string;
  forgotBody: string;
  forgotSubmit: string;
  forgotBackToLogin: string;
  authNetworkError: string;
  authRequestFailed: string;
  loginFailedCredentials: string;
  registerFailedGeneric: string;
  forgotFailedGeneric: string;
  socialLoginFailed: string;
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
  submittingRegister: "Đang tạo tài khoản…",
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
  registerPasswordMax: "Mật khẩu tối đa 255 ký tự.",
  registerPasswordConfirmationRequired: "Vui lòng nhập lại mật khẩu.",
  registerPasswordConfirmationMinTpl: "Nhập lại mật khẩu tối thiểu __MIN__ ký tự.",
  registerPasswordConfirmationMax: "Nhập lại mật khẩu tối đa 255 ký tự.",
  registerPasswordConfirmationMismatch: "Mật khẩu xác nhận không khớp.",
  registerSuccess: "Tạo tài khoản thành công. Vui lòng đăng nhập.",
  forgotNeedEmail: "Vui lòng nhập email trước khi đặt lại mật khẩu.",
  forgotEmailInvalid: "Email không hợp lệ để đặt lại mật khẩu.",
  forgotSuccessGeneric: "Nếu email tồn tại, hướng dẫn đặt lại mật khẩu đã được gửi.",
  forgotTitle: "Quên mật khẩu",
  forgotLead: "Nhập email để nhận hướng dẫn đặt lại mật khẩu.",
  forgotBody: "Chúng tôi sẽ gửi liên kết đặt lại mật khẩu đến email của bạn nếu tài khoản tồn tại.",
  forgotSubmit: "Gửi email đặt lại",
  forgotBackToLogin: "Quay lại đăng nhập",
  authNetworkError: "Không thể kết nối máy chủ. Vui lòng thử lại sau.",
  authRequestFailed: "Đã xảy ra lỗi. Vui lòng thử lại.",
  loginFailedCredentials: "Email hoặc mật khẩu không đúng.",
  registerFailedGeneric: "Không thể tạo tài khoản lúc này. Vui lòng thử lại.",
  forgotFailedGeneric: "Không thể gửi email đặt lại lúc này. Vui lòng thử lại.",
  socialLoginFailed: "Không thể đăng nhập bằng mạng xã hội lúc này. Vui lòng thử lại.",
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
  submittingRegister: "Creating account…",
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
  registerPasswordMax: "Password must be at most 255 characters.",
  registerPasswordConfirmationRequired: "Please confirm your password.",
  registerPasswordConfirmationMinTpl: "Confirmation password must be at least __MIN__ characters.",
  registerPasswordConfirmationMax: "Confirmation password must be at most 255 characters.",
  registerPasswordConfirmationMismatch: "Confirmation password does not match.",
  registerSuccess: "Account created successfully. Please sign in.",
  forgotNeedEmail: "Please enter your email before resetting password.",
  forgotEmailInvalid: "Please enter a valid email for password reset.",
  forgotSuccessGeneric: "If that email exists, reset instructions were sent.",
  forgotTitle: "Forgot password",
  forgotLead: "Enter your email to receive reset instructions.",
  forgotBody: "We'll send a password reset link to your email if an account exists.",
  forgotSubmit: "Send reset email",
  forgotBackToLogin: "Back to sign in",
  authNetworkError: "Unable to connect to the server. Please try again later.",
  authRequestFailed: "Something went wrong. Please try again.",
  loginFailedCredentials: "Invalid email or password.",
  registerFailedGeneric: "Unable to create your account right now. Please try again.",
  forgotFailedGeneric: "Unable to send reset email right now. Please try again.",
  socialLoginFailed: "Unable to sign in with social account right now. Please try again.",
};

const bundles: Record<AppLanguage, AuthBundle> = { vi, en };

export function getAuthScreenCopy(
  language: AppLanguage,
  mode: AuthMode,
  passwordMinLength: number,
): AuthScreenCopy {
  const m = bundles[language];
  const login = mode === "login";
  const forgot = mode === "forgot";
  return {
    backHome: m.backHome,
    badge: forgot ? m.badgeLogin : login ? m.badgeLogin : m.badgeRegister,
    title: forgot ? m.forgotTitle : login ? m.titleLogin : m.titleRegister,
    lead: forgot ? m.forgotLead : login ? m.leadLogin : m.leadRegister,
    body: forgot ? m.forgotBody : login ? m.bodyLogin : m.bodyRegister,
    asideKicker: m.asideKicker,
    asideTitle: m.asideTitle,
    email: m.email,
    password: m.password,
    confirmPassword: m.confirmPassword,
    forgotPassword: m.forgotPassword,
    rememberMe: m.rememberMe,
    submit: forgot ? m.forgotSubmit : login ? m.submitLogin : m.submitRegister,
    switchPrompt: forgot ? m.switchPromptRegister : login ? m.switchPromptLogin : m.switchPromptRegister,
    switchAction: forgot ? m.switchActionRegister : login ? m.switchActionLogin : m.switchActionRegister,
    switchHref: forgot ? m.switchHrefRegister : login ? m.switchHrefLogin : m.switchHrefRegister,
    feature1: m.feature1,
    feature2: m.feature2,
    feature3: m.feature3,
    submitting: login ? m.submitting : m.submittingRegister,
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
    registerPasswordMax: m.registerPasswordMax,
    registerPasswordConfirmationRequired: m.registerPasswordConfirmationRequired,
    registerPasswordConfirmationMin: m.registerPasswordConfirmationMinTpl.replace(
      "__MIN__",
      String(passwordMinLength),
    ),
    registerPasswordConfirmationMax: m.registerPasswordConfirmationMax,
    registerPasswordConfirmationMismatch: m.registerPasswordConfirmationMismatch,
    registerSuccess: m.registerSuccess,
    forgotNeedEmail: m.forgotNeedEmail,
    forgotEmailInvalid: m.forgotEmailInvalid,
    forgotSuccessGeneric: m.forgotSuccessGeneric,
    forgotTitle: m.forgotTitle,
    forgotLead: m.forgotLead,
    forgotBody: m.forgotBody,
    forgotSubmit: m.forgotSubmit,
    forgotBackToLogin: m.forgotBackToLogin,
    authNetworkError: m.authNetworkError,
    authRequestFailed: m.authRequestFailed,
    loginFailedCredentials: m.loginFailedCredentials,
    registerFailedGeneric: m.registerFailedGeneric,
    forgotFailedGeneric: m.forgotFailedGeneric,
    socialLoginFailed: m.socialLoginFailed,
  };
}
