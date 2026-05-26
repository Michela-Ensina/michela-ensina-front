import type { User } from "@/types/student";

const STORAGE_TOKEN_KEY = "student-auth-token";
const STORAGE_USER_KEY = "student-auth-user";

function isBrowser() {
  return typeof window !== "undefined";
}

export function getStoredToken(): string | null {
  if (!isBrowser()) {
    return null;
  }

  return window.localStorage.getItem(STORAGE_TOKEN_KEY);
}

export function setStoredToken(token: string) {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(STORAGE_TOKEN_KEY, token);
}

export function removeStoredToken() {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.removeItem(STORAGE_TOKEN_KEY);
}

export function getStoredUser(): User | null {
  if (!isBrowser()) {
    return null;
  }

  const raw = window.localStorage.getItem(STORAGE_USER_KEY);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
}

export function setStoredUser(user: User) {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(user));
}

export function removeStoredUser() {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.removeItem(STORAGE_USER_KEY);
}

export function clearStoredSession() {
  removeStoredToken();
  removeStoredUser();
}
