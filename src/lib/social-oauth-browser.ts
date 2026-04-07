/** OAuth trên trình duyệt: Google Sign-In dùng FedCM (GIS `use_fedcm_for_button`); Facebook dùng SDK. */

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (resp: { credential?: string }) => void;
            auto_select?: boolean;
            use_fedcm_for_button?: boolean;
            button_auto_select?: boolean;
          }) => void;
          renderButton: (
            parent: HTMLElement,
            options: {
              type?: "standard" | "icon";
              theme?: "outline" | "filled_blue" | "filled_black";
              size?: "small" | "medium" | "large";
              text?: string;
              shape?: "rectangular" | "pill" | "circle" | "square";
              logo_alignment?: "left" | "center";
              width?: number;
              locale?: string;
            },
          ) => void;
          prompt: (momentListener?: (notification: {
            isSkippedMoment: () => boolean;
            isDismissedMoment: () => boolean;
            getDismissedReason: () => string;
          }) => void) => void;
        };
      };
    };
    FB?: FacebookSDK;
    fbAsyncInit?: () => void;
  }
}

type FacebookAuthResponse = {
  accessToken: string;
};

type FacebookLoginResponse = {
  status: "connected" | "not_authorized" | "unknown";
  authResponse?: FacebookAuthResponse;
};

type FacebookSDK = {
  init: (params: { appId: string; cookie?: boolean; xfbml?: boolean; version: string }) => void;
  login: (
    callback: (response: FacebookLoginResponse) => void,
    opts?: { scope?: string },
  ) => void;
};

let googleScriptPromise: Promise<void> | null = null;

export function ensureGoogleIdentityScript(): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Google sign-in requires a browser"));
  }
  if (window.google?.accounts?.id) {
    return Promise.resolve();
  }
  if (!googleScriptPromise) {
    googleScriptPromise = new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = "https://accounts.google.com/gsi/client";
      s.async = true;
      s.defer = true;
      s.onload = () => resolve();
      s.onerror = () => reject(new Error("Failed to load Google sign-in script"));
      document.head.appendChild(s);
    });
  }
  return googleScriptPromise;
}

export type GoogleFedCmButtonOptions = {
  /** Nhận ID token (JWT) sau khi người dùng đăng nhập qua FedCM / nút chính thức. */
  onCredential: (idToken: string) => void;
  /** Giao diện sáng / tối — chọn theme nút Google phù hợp. */
  isDark?: boolean;
  /** Mã ngôn ngữ nút (vd `vi`, `en`). */
  locale?: string;
};

/**
 * Vẽ nút "Sign in with Google" chính thức với FedCM (`use_fedcm_for_button`),
 * không dùng third-party cookie / One Tap `prompt` kiểu cũ.
 */
export function renderGoogleFedCmSignInButton(
  container: HTMLElement,
  clientId: string,
  opts: GoogleFedCmButtonOptions,
): void {
  const googleId = window.google?.accounts?.id;
  if (!googleId) {
    throw new Error("Google sign-in is not ready");
  }
  container.innerHTML = "";
  const theme = opts.isDark ? "filled_blue" : "outline";
  const widthPx = Math.max(240, Math.floor(container.getBoundingClientRect().width) || 320);

  googleId.initialize({
    client_id: clientId,
    use_fedcm_for_button: true,
    callback: (resp) => {
      if (resp.credential) {
        opts.onCredential(resp.credential);
        return;
      }
    },
  });

  googleId.renderButton(container, {
    type: "standard",
    theme,
    size: "large",
    text: "continue_with",
    shape: "pill",
    width: widthPx,
    locale: opts.locale,
    logo_alignment: "left",
  });
}

let facebookSdkPromise: Promise<void> | null = null;

export function ensureFacebookSdk(appId: string): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Facebook sign-in requires a browser"));
  }
  if (window.FB) {
    return Promise.resolve();
  }
  if (!facebookSdkPromise) {
    facebookSdkPromise = new Promise((resolve, reject) => {
      if (!document.getElementById("fb-root")) {
        const root = document.createElement("div");
        root.id = "fb-root";
        document.body.appendChild(root);
      }
      const prev = window.fbAsyncInit;
      window.fbAsyncInit = () => {
        try {
          prev?.();
        } catch {
          /* ignore */
        }
        window.FB!.init({
          appId,
          cookie: true,
          xfbml: false,
          version: "v21.0",
        });
        resolve();
      };
      const s = document.createElement("script");
      s.src = "https://connect.facebook.net/en_US/sdk.js";
      s.async = true;
      s.defer = true;
      s.crossOrigin = "anonymous";
      s.onerror = () => reject(new Error("Failed to load Facebook SDK"));
      document.body.appendChild(s);
    });
  }
  return facebookSdkPromise;
}

export function requestFacebookAccessToken(): Promise<string> {
  return new Promise((resolve, reject) => {
    const FB = window.FB;
    if (!FB) {
      reject(new Error("Facebook SDK is not ready"));
      return;
    }
    FB.login(
      (response) => {
        if (response.status === "connected" && response.authResponse?.accessToken) {
          resolve(response.authResponse.accessToken);
          return;
        }
        reject(new Error("Facebook sign-in was cancelled or failed"));
      },
      { scope: "public_profile,email" },
    );
  });
}
