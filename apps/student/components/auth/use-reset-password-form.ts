import { useMemo, useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { resetPassword, verifyResetPasswordToken } from "@/lib/api/auth";
import { ApiClientError } from "@/lib/api/errors";
import { assessPasswordStrength } from "@/lib/auth/password-strength";
import { isValidEmail } from "@/lib/utils/validation";

import {
  validateResetPasswordPair,
  validateRequiredEmail,
  validateRequiredToken,
} from "./password-recovery-validation";

type ResetPasswordStep = "code" | "password";
type ResetPasswordField = "password" | "passwordConfirmation";

const RESET_TOKEN_LENGTH = 8;

function getSearchParam(name: string) {
  if (typeof window === "undefined") return "";

  const params = new URLSearchParams(window.location.search);
  return params.get(name) ?? "";
}

function normalizeToken(value: string) {
  return value.replace(/[^a-zA-Z0-9]/g, "").slice(0, RESET_TOKEN_LENGTH).toUpperCase();
}

export function useResetPasswordForm() {
  const router = useRouter();
  const [email, setEmail] = useState(() => getSearchParam("email"));
  const [token, setTokenValue] = useState(() => normalizeToken(getSearchParam("token")));
  const [step, setStep] = useState<ResetPasswordStep>("code");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [visiblePasswordFields, setVisiblePasswordFields] = useState<
    Record<ResetPasswordField, boolean>
  >({
    password: false,
    passwordConfirmation: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerifyingToken, setIsVerifyingToken] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const lastVerifiedTokenKey = useRef<string | null>(null);

  const passwordStrength = useMemo(() => {
    return assessPasswordStrength(password);
  }, [password]);

  async function verifyToken(nextEmail: string, nextToken: string) {
    const trimmedEmail = nextEmail.trim();
    const normalizedToken = normalizeToken(nextToken);
    const verificationKey = `${trimmedEmail}:${normalizedToken}`;

    if (
      !isValidEmail(trimmedEmail) ||
      normalizedToken.length !== RESET_TOKEN_LENGTH ||
      lastVerifiedTokenKey.current === verificationKey
    ) {
      return;
    }

    setIsVerifyingToken(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const response = await verifyResetPasswordToken({
        email: trimmedEmail,
        token: normalizedToken,
      });
      lastVerifiedTokenKey.current = verificationKey;
      setStep("password");
      setSuccessMessage(response.message);
      toast.success(response.message);
    } catch (error) {
      lastVerifiedTokenKey.current = null;
      setStep("code");
      const message =
        error instanceof ApiClientError
          ? error.fields?.token?.[0] ?? error.fields?.email?.[0] ?? error.message
          : "Não foi possível verificar o código agora.";
      setErrorMessage(message);
      toast.error(message);
    } finally {
      setIsVerifyingToken(false);
    }
  }

  function setEmailAndVerify(nextEmail: string) {
    setEmail(nextEmail);

    if (step === "password") {
      setStep("code");
      lastVerifiedTokenKey.current = null;
    }

    void verifyToken(nextEmail, token);
  }

  function setToken(nextToken: string) {
    const normalizedToken = normalizeToken(nextToken);
    setTokenValue(normalizedToken);

    if (normalizedToken.length < RESET_TOKEN_LENGTH) {
      setStep("code");
      lastVerifiedTokenKey.current = null;
      return;
    }

    void verifyToken(email, normalizedToken);
  }

  function togglePasswordVisibility(field: ResetPasswordField) {
    setVisiblePasswordFields((current) => ({
      ...current,
      [field]: !current[field],
    }));
  }

  function showCodeStep() {
    setStep("code");
    lastVerifiedTokenKey.current = null;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    const validationMessage =
      validateRequiredEmail(email) ??
      validateRequiredToken(token) ??
      (step !== "password" ? "Verifique o código recebido por e-mail antes de criar a nova senha." : null) ??
      validateResetPasswordPair({
        password,
        passwordConfirmation,
      });

    if (validationMessage) {
      setErrorMessage(validationMessage);
      toast.error(validationMessage);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await resetPassword({
        email: email.trim(),
        token: token.trim(),
        password,
        password_confirmation: passwordConfirmation,
      });
      setSuccessMessage(response.message);
      toast.success(response.message);
      router.replace("/login?motivo=senha-redefinida");
    } catch (error) {
      const message =
        error instanceof ApiClientError
          ? error.fields?.token?.[0] ?? error.fields?.password?.[0] ?? error.message
          : "Não foi possível redefinir a senha agora.";
      setErrorMessage(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    email,
    errorMessage,
    handleSubmit,
    isSubmitting,
    isVerifyingToken,
    password,
    passwordConfirmation,
    passwordStrength,
    setEmail: setEmailAndVerify,
    setPassword,
    setPasswordConfirmation,
    setToken,
    showCodeStep,
    step,
    successMessage,
    token,
    togglePasswordVisibility,
    visiblePasswordFields,
  };
}
