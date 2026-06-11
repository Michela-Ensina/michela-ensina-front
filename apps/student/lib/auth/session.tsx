"use client";

import { createContext, useCallback, useEffect, useMemo, useState } from "react";

import { login as loginRequest, logout as logoutRequest } from "@/lib/api/auth";
import { getCurrentStudent } from "@/lib/api/student";
import {
  clearStoredSession,
  getStoredToken,
  getStoredUser,
  setStoredToken,
  setStoredUser,
} from "@/lib/auth/storage";
import { ApiClientError } from "@/lib/api/errors";
import {
  createPreviewLoginSession,
  getPreviewStudent,
  PRE_INTEGRATION_PREVIEW_ENABLED,
  PRE_INTEGRATION_PREVIEW_TOKEN,
} from "@/lib/pre-integration/student-preview";
import type { AuthLoginPayload } from "@/types/auth";
import type { User } from "@/types/student";

type AuthContextValue = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (payload: AuthLoginPayload) => Promise<{ mustChangePassword: boolean }>;
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

  const applySession = useCallback((nextToken: string, nextUser: User) => {
    setToken(nextToken);
    setUser(nextUser);
    setStoredToken(nextToken);
    setStoredUser(nextUser);
  }, []);

  const clearSession = useCallback(() => {
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

    if (PRE_INTEGRATION_PREVIEW_ENABLED) {
      clearSession();
      return;
    }

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
      if (PRE_INTEGRATION_PREVIEW_ENABLED) {
        const previewSession = createPreviewLoginSession(payload);
        applySession(previewSession.token, previewSession.user);
        return { mustChangePassword: previewSession.mustChangePassword };
      }

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

    if (PRE_INTEGRATION_PREVIEW_ENABLED) {
      const previewUser = getPreviewStudent();
      applySession(PRE_INTEGRATION_PREVIEW_TOKEN, previewUser);
      return previewUser;
    }

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

  useEffect(() => {
    async function hydrateSession() {
      if (PRE_INTEGRATION_PREVIEW_ENABLED) {
        applySession(PRE_INTEGRATION_PREVIEW_TOKEN, getPreviewStudent());
        setIsLoading(false);
        return;
      }

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
        if (error instanceof ApiClientError && (error.status === 401 || error.status === 403)) {
          clearSession();
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
      login,
      logout,
      refreshUser,
      setUser: setUserInSession,
    }),
    [isLoading, login, logout, refreshUser, setUserInSession, token, user],
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}
