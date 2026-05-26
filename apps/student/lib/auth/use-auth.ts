"use client";

import { useContext } from "react";

import { AuthContext } from "@/lib/auth/session";

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider.");
  }

  return context;
}
