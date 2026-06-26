import type { FormEventHandler } from "react";
import { X } from "lucide-react";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/PasswordInput";
import type { PasswordVisibilityField } from "@/lib/auth/password-change";

type SettingsPasswordDialogProps = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  errorMessage: string | null;
  isSubmitting: boolean;
  visiblePasswordFields: Record<PasswordVisibilityField, boolean>;
  onClose: () => void;
  onCurrentPasswordChange: (value: string) => void;
  onNewPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
  onSubmit: FormEventHandler<HTMLFormElement>;
  onTogglePasswordVisibility: (field: PasswordVisibilityField) => void;
};

export function SettingsPasswordDialog({
  currentPassword,
  newPassword,
  confirmPassword,
  errorMessage,
  isSubmitting,
  visiblePasswordFields,
  onClose,
  onCurrentPasswordChange,
  onNewPasswordChange,
  onConfirmPasswordChange,
  onSubmit,
  onTogglePasswordVisibility,
}: SettingsPasswordDialogProps) {
  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center px-4 py-8"
      style={{ backgroundColor: "rgb(10 5 20 / 0.72)" }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="password-dialog-title"
    >
      <div
        className="w-full max-w-xl rounded-[var(--radius-lg)] border p-5 shadow-[var(--shadow-md)] sm:p-6"
        style={{
          borderColor: "var(--color-border)",
          backgroundColor: "var(--color-surface)",
        }}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="password-dialog-title" className="text-2xl">
              Trocar senha
            </h2>
            <p className="mt-1 text-sm" style={{ color: "var(--color-text-muted)" }}>
              Use uma senha forte e diferente da senha atual.
            </p>
          </div>
          <button
            type="button"
            className="student-action student-hover-surface grid size-9 shrink-0 place-items-center rounded-xl border"
            style={{
              borderColor: "var(--color-border)",
              color: "var(--color-text-muted)",
              backgroundColor: "color-mix(in oklab, var(--color-surface-soft) 70%, transparent)",
            }}
            aria-label="Fechar troca de senha"
            onClick={onClose}
          >
            <X size={17} aria-hidden="true" />
          </button>
        </div>

        {errorMessage ? <Alert tone="error">{errorMessage}</Alert> : null}

        <form className="mt-5 grid gap-3" onSubmit={onSubmit}>
          <div className="block">
            <Label htmlFor="currentPassword">Senha atual</Label>
            <PasswordInput
              id="currentPassword"
              value={currentPassword}
              onChange={(event) => onCurrentPasswordChange(event.target.value)}
              placeholder="Senha atual"
              isVisible={visiblePasswordFields.current}
              onToggleVisibility={() => onTogglePasswordVisibility("current")}
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="block">
              <Label htmlFor="newPassword">Nova senha</Label>
              <PasswordInput
                id="newPassword"
                value={newPassword}
                onChange={(event) => onNewPasswordChange(event.target.value)}
                placeholder="Nova senha"
                isVisible={visiblePasswordFields.next}
                onToggleVisibility={() => onTogglePasswordVisibility("next")}
              />
            </div>
            <div className="block">
              <Label htmlFor="confirmPassword">Confirmar senha</Label>
              <PasswordInput
                id="confirmPassword"
                value={confirmPassword}
                onChange={(event) => onConfirmPasswordChange(event.target.value)}
                placeholder="Confirmar senha"
                isVisible={visiblePasswordFields.confirm}
                onToggleVisibility={() => onTogglePasswordVisibility("confirm")}
              />
            </div>
          </div>

          <div className="mt-2 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              variant="primary"
              style={{ opacity: isSubmitting ? 0.7 : 1 }}
            >
              {isSubmitting ? "Atualizando..." : "Atualizar senha"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
