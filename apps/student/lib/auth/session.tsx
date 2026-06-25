"use client";

import { createContext, useCallback, useEffect, useMemo, useState } from "react";

import {
  changePassword as changePasswordRequest,
  login as loginRequest,
  logout as logoutRequest,
} from "@/lib/api/auth";
import { getCurrentStudent } from "@/lib/api/student";
import {
  clearStoredSession,
  getStoredToken,
  getStoredUser,
  setStoredToken,
  setStoredUser,
} from "@/lib/auth/storage";
import { ApiClientError } from "@/lib/api/errors";
import type { AuthChangePasswordPayload, AuthLoginPayload } from "@/types/auth";
import type { User } from "@/types/student";

type AuthContextValue = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  sessionExpired: boolean;
  login: (payload: AuthLoginPayload) => Promise<{ mustChangePassword: boolean }>;
  changePassword: (payload: AuthChangePasswordPayload) => Promise<User>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<User | null>;
  setUser: (user: User | null) => void;
};

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sessionExpired, setSessionExpired] = useState(false);

  const applySession = useCallback((nextToken: string, nextUser: User) => {
    setSessionExpired(false);
    setToken(nextToken);
    setUser(nextUser);
    setStoredToken(nextToken);
    setStoredUser(nextUser);
  }, []);

  const clearSession = useCallback((options?: { expired?: boolean }) => {
    setSessionExpired(Boolean(options?.expired));
    setToken(null);
    setUser(null);
    clearStoredSession();
  }, []);

  const setUserInSession = useCallback((nextUser: User | null) => {
    setUser(nextUser);

    if (nextUser) {
      setStoredUser(nextUser);
      return;
    }

    clearStoredSession();
  }, []);

  const logout = useCallback(async () => {
    const currentToken = token ?? getStoredToken();

    if (currentToken) {
      try {
        await logoutRequest(currentToken);
      } catch {
        // limpeza local mesmo com falha remota
      }
    }

    clearSession();
  }, [clearSession, token]);

  const login = useCallback(
    async (payload: AuthLoginPayload) => {
      const response = await loginRequest(payload);

      let resolvedUser = response.user;

      try {
        resolvedUser = await getCurrentStudent(response.token);
      } catch {
        // fallback para o user do login caso /student/me falhe momentaneamente
      }

      applySession(response.token, resolvedUser);

      return { mustChangePassword: Boolean(resolvedUser.must_change_password) };
    },
    [applySession],
  );

  const refreshUser = useCallback(async () => {
    const currentToken = token ?? getStoredToken();

    if (!currentToken) {
      return null;
    }

    try {
      const freshUser = await getCurrentStudent(currentToken);
      applySession(currentToken, freshUser);
      return freshUser;
    } catch {
      return null;
    }
  }, [applySession, token]);

  const changePassword = useCallback(
    async (payload: AuthChangePasswordPayload) => {
      const currentToken = token ?? getStoredToken();
      const currentUser = user ?? getStoredUser();

      if (!currentToken || !currentUser) {
        throw new ApiClientError({
          status: 401,
          code: "UNAUTHORIZED",
          message: "Sua sessão expirou. Faça login novamente.",
        });
      }

      await changePasswordRequest(payload, currentToken);

      try {
        const nextSession = await loginRequest({
          email: currentUser.email,
          password: payload.password,
        });
        applySession(nextSession.token, nextSession.user);
        return nextSession.user;
      } catch (error) {
        clearSession();
        throw error;
      }
    },
    [applySession, clearSession, token, user],
  );

  useEffect(() => {
    async function hydrateSession() {
      const storedToken = getStoredToken();
      const storedUser = getStoredUser();

      if (!storedToken) {
        clearSession();
        setIsLoading(false);
        return;
      }

      if (storedUser) {
        setToken(storedToken);
        setUser(storedUser);
      }

      try {
        const freshUser = await getCurrentStudent(storedToken);
        applySession(storedToken, freshUser);
      } catch (error) {
        if (error instanceof ApiClientError && error.status === 401) {
          clearSession({ expired: true });
        } else if (error instanceof ApiClientError && error.status === 403 && storedUser) {
          setSessionExpired(false);
          setToken(storedToken);
          setUser(storedUser);
        } else {
          clearSession();
        }
      } finally {
        setIsLoading(false);
      }
    }

    void hydrateSession();
  }, [applySession, clearSession]);

  const contextValue = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token && user),
      isLoading,
      sessionExpired,
      login,
      changePassword,
      logout,
      refreshUser,
      setUser: setUserInSession,
    }),
    [changePassword, isLoading, login, logout, refreshUser, sessionExpired, setUserInSession, token, user],
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}
