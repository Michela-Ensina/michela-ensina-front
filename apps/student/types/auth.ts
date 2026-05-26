import type { User } from "@/types/student";

export type AuthLoginPayload = {
  email: string;
  password: string;
};

export type AuthLoginResponse = {
  token: string;
  user: User;
};

export type AuthForgotPasswordPayload = {
  email: string;
};

export type AuthResetPasswordPayload = {
  email: string;
  token: string;
  password: string;
  password_confirmation: string;
};

export type AuthFirstAccessPayload = {
  token: string;
  password: string;
  password_confirmation: string;
};

export type AuthChangePasswordPayload = {
  current_password: string;
  password: string;
  password_confirmation: string;
};

export type MessageResponse = {
  message: string;
};

export type AuthFirstAccessResponse = {
  message: string;
  user: User;
};
