import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { authApi } from "../api";
import type { ApiError } from "../api";
import { clearAccessToken, setAccessToken } from "../lib/authToken";

function isUnauthorized(err: unknown): boolean {
  return Boolean(err) && typeof err === "object" && (err as any).status === 401;
}

export type AuthUser = authApi.Customer;

type AuthState = {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: ApiError | null;
};

type AuthContextValue = AuthState & {
  refresh: () => Promise<void>;
  login: (args: { email: string; password: string }) => Promise<void>;
  register: (args: {
    name: string;
    email: string;
    password: string;
  }) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  const refresh = async () => {
    setError(null);

    try {
      const result = await authApi.me();
      setUser(result.customer);
    } catch (err: any) {
      // /auth/me returns 401 when not logged in; treat that as normal.
      if (isUnauthorized(err)) {
        clearAccessToken();
        setUser(null);
        return;
      }

      setUser(null);
      setError(err);
    }
  };

  useEffect(() => {
    let isActive = true;

    (async () => {
      try {
        await refresh();
      } finally {
        if (isActive) setIsLoading(false);
      }
    })();

    return () => {
      isActive = false;
    };
  }, []);

  const login: AuthContextValue["login"] = async ({ email, password }) => {
    setError(null);

    try {
      const result = await authApi.login({ email, password });
      if (result.accessToken) setAccessToken(result.accessToken);
      setUser(result.customer);
    } catch (err: any) {
      setError(err);
      throw err;
    }
  };

  const register: AuthContextValue["register"] = async ({
    name,
    email,
    password,
  }) => {
    setError(null);

    try {
      const result = await authApi.register({ name, email, password });
      if (result.accessToken) setAccessToken(result.accessToken);
      setUser(result.customer);

      // Used by Dashboard to show a first-time empty-state experience.
      sessionStorage.setItem("dd_is_new_user", "1");
    } catch (err: any) {
      setError(err);
      throw err;
    }
  };

  const logout = () => {
    authApi.logout().catch(() => {
      // ignore network errors; we still clear local state
    });
    clearAccessToken();
    setUser(null);
    setError(null);
  };

  const value: AuthContextValue = useMemo(
    () => ({
      user,
      isLoading,
      isAuthenticated: Boolean(user),
      error,
      refresh,
      login,
      register,
      logout,
    }),
    [user, isLoading, error]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within <AuthProvider>");
  }
  return ctx;
}
