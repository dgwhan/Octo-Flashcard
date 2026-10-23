/**
 * Secure Storage Utility for sensitive user credentials & profile
 * Obfuscates sensitive data (username, email) so they are not stored in plaintext in LocalStorage/SessionStorage.
 * Also cleans up any legacy plaintext "user" keys.
 */

interface StoredUserProfile {
  userId: string;
  username: string;
  email: string;
}

const STORAGE_KEY_PREFIX = "_octo_sec_";
const USER_KEY = `${STORAGE_KEY_PREFIX}p_enc`;
const SALT = "octo_flsh_salt_v2";

/**
 * Reversible obfuscation to prevent casual inspection and plain-text exposure in browser DevTools
 */
function obfuscate(data: string): string {
  try {
    const combined = `${SALT}:${encodeURIComponent(data)}`;
    let result = "";
    for (let i = 0; i < combined.length; i++) {
      result += String.fromCharCode(combined.charCodeAt(i) ^ (i % 7 + 1));
    }
    return btoa(unescape(encodeURIComponent(result)));
  } catch {
    return "";
  }
}

function deobfuscate(cipher: string): string | null {
  try {
    const raw = decodeURIComponent(escape(atob(cipher)));
    let result = "";
    for (let i = 0; i < raw.length; i++) {
      result += String.fromCharCode(raw.charCodeAt(i) ^ (i % 7 + 1));
    }
    if (result.startsWith(`${SALT}:`)) {
      return decodeURIComponent(result.slice(SALT.length + 1));
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Remove legacy unencrypted user keys from localStorage & sessionStorage
 */
export function purgeLegacyPlaintextStorage(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
  } catch {
    // ignore
  }
}

/**
 * Save obfuscated user profile
 */
export function saveSecureUser(user: StoredUserProfile, rememberMe: boolean = true): void {
  if (typeof window === "undefined") return;
  purgeLegacyPlaintextStorage();

  const serialized = JSON.stringify(user);
  const cipher = obfuscate(serialized);

  try {
    if (rememberMe) {
      localStorage.setItem(USER_KEY, cipher);
      sessionStorage.removeItem(USER_KEY);
    } else {
      sessionStorage.setItem(USER_KEY, cipher);
      localStorage.removeItem(USER_KEY);
    }
    // Dispatch custom event to notify listeners (like AppHeader) without exposing plaintext in storage event
    window.dispatchEvent(new Event("octo-auth-change"));
  } catch {
    // LocalStorage quota or access error
  }
}

/**
 * Retrieve and decode user profile from secure storage
 */
export function getSecureUser(): StoredUserProfile | null {
  if (typeof window === "undefined") return null;
  purgeLegacyPlaintextStorage();

  try {
    const cipher = localStorage.getItem(USER_KEY) || sessionStorage.getItem(USER_KEY);
    if (!cipher) return null;

    const raw = deobfuscate(cipher);
    if (!raw) return null;

    return JSON.parse(raw) as StoredUserProfile;
  } catch {
    return null;
  }
}

/**
 * Remove secured user profile
 */
export function clearSecureUser(): void {
  if (typeof window === "undefined") return;
  try {
    purgeLegacyPlaintextStorage();
    localStorage.removeItem(USER_KEY);
    sessionStorage.removeItem(USER_KEY);
    window.dispatchEvent(new Event("octo-auth-change"));
  } catch {
    // ignore
  }
}
