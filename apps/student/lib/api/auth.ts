import { apiPost } from "@/lib/api/client";
import type {
  AuthChangePasswordPayload,
  AuthFirstAccessPayload,
  AuthFirstAccessResponse,
  AuthForgotPasswordPayload,
  AuthLoginPayload,
  AuthLoginResponse,
  AuthResetPasswordPayload,
  AuthVerifyResetPasswordTokenPayload,
  MessageResponse,
} from "@/types/auth";

export function login(payload: AuthLoginPayload) {
  return apiPost<AuthLoginResponse, AuthLoginPayload>("/auth/login", payload);
}

export function logout(token: string) {
  return apiPost<MessageResponse>("/auth/logout", undefined, { token });
}

export function forgotPassword(payload: AuthForgotPasswordPayload) {
  return apiPost<MessageResponse, AuthForgotPasswordPayload>("/auth/forgot-password", payload);
}

export function resetPassword(payload: AuthResetPasswordPayload) {
  return apiPost<MessageResponse, AuthResetPasswordPayload>("/auth/reset-password", payload);
}

export function verifyResetPasswordToken(payload: AuthVerifyResetPasswordTokenPayload) {
  return apiPost<MessageResponse, AuthVerifyResetPasswordTokenPayload>(
    "/auth/reset-password/verify-token",
    payload,
  );
}

export function firstAccess(payload: AuthFirstAccessPayload) {
  return apiPost<AuthFirstAccessResponse, AuthFirstAccessPayload>("/auth/first-access", payload);
}

export function changePassword(payload: AuthChangePasswordPayload, token: string) {
  return apiPost<MessageResponse, AuthChangePasswordPayload>("/auth/change-password", payload, {
    token,
  });
}
