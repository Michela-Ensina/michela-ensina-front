import type { User } from "@/types/student";

const STORAGE_TOKEN_KEY = "student-auth-token";
const STORAGE_USER_KEY = "student-auth-user";

function isBrowser() {
  return typeof window !== "undefined";
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object";
}

function isStoredUser(value: unknown): value is User {
  if (!isRecord(value)) return false;

  return (
    typeof value.id === "string" &&
    typeof value.name === "string" &&
    typeof value.email === "string" &&
    typeof value.is_active === "boolean" &&
    typeof value.must_change_password === "boolean" &&
    Array.isArray(value.roles)
  );
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
    const parsedUser: unknown = JSON.parse(raw);
    return isStoredUser(parsedUser) ? parsedUser : null;
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
