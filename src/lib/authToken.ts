export type AuthTokenStorage = "local" | "session";

const ACCESS_TOKEN_KEY = "dd_access_token";

export function getAccessToken(): string | null {
  return (
    sessionStorage.getItem(ACCESS_TOKEN_KEY) ??
    localStorage.getItem(ACCESS_TOKEN_KEY)
  );
}

export function setAccessToken(token: string, storage: AuthTokenStorage) {
  clearAccessToken();

  if (storage === "local") {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  } else {
    sessionStorage.setItem(ACCESS_TOKEN_KEY, token);
  }
}

export function clearAccessToken() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  sessionStorage.removeItem(ACCESS_TOKEN_KEY);
}
