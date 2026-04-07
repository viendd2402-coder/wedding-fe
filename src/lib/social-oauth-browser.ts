/** OAuth trên trình duyệt: Google dùng OAuth2 token client (popup, không FedCM); Facebook dùng SDK. */

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (resp: { credential?: string }) => void;
            auto_select?: boolean;
            ux_mode?: "popup";
          }) => void;
          prompt: (momentListener?: (notification: {
            isNotDisplayed: () => boolean;
            isSkippedMoment: () => boolean;
            getNotDisplayedReason: () => string;
            getSkippedReason: () => string;
          }) => void) => void;
        };
        oauth2: {
          initTokenClient: (config: {
            client_id: string;
            scope: string;
            callback: (resp: {
              access_token?: string;
              error?: string;
              error_description?: string;
            }) => void;
          }) => { requestAccessToken: (overrideConfig?: { prompt?: string }) => void };
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

/**
 * Google Identity Services — mở popup chọn tài khoản, trả về ID token (JWT).
 * Dùng cho backend verify danh tính người dùng.
 */
export function requestGoogleIdToken(clientId: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const googleId = window.google?.accounts?.id;
    if (!googleId) {
      reject(new Error("Google sign-in is not ready"));
      return;
    }
    googleId.initialize({
      client_id: clientId,
      callback: (resp) => {
        if (resp.credential) {
          resolve(resp.credential);
          return;
        }
        reject(new Error("Google did not return an ID token"));
      },
      ux_mode: "popup",
    });
    googleId.prompt((notification) => {
      if (notification.isNotDisplayed()) {
        reject(new Error(notification.getNotDisplayedReason() || "Google sign-in popup was not displayed"));
        return;
      }
      if (notification.isSkippedMoment()) {
        reject(new Error(notification.getSkippedReason() || "Google sign-in was skipped"));
      }
    });
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
