const ACCESS_TOKEN_KEY = "dd_access_token";
const TOKEN_CHANGED_EVENT = "dd-auth-token-changed";

function notifyTokenChanged() {
  // Custom event for same-tab listeners (e.g., AuthProvider)
  window.dispatchEvent(new Event(TOKEN_CHANGED_EVENT));
}

export function getAccessToken(): string | null {
  // Session-only auth (clears when the browser/tab closes)
  return sessionStorage.getItem(ACCESS_TOKEN_KEY);
}

export function setAccessToken(token: string) {
  clearAccessToken();

  sessionStorage.setItem(ACCESS_TOKEN_KEY, token);

  notifyTokenChanged();
}

export function clearAccessToken() {
  sessionStorage.removeItem(ACCESS_TOKEN_KEY);

  notifyTokenChanged();
}

export function getAuthTokenChangedEventName() {
  return TOKEN_CHANGED_EVENT;
}
