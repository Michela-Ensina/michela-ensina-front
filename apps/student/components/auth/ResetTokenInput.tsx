import { useRef, useState } from "react";

import { cn } from "@/lib/utils/cn";

type ResetTokenInputProps = {
  disabled?: boolean;
  onChange: (value: string) => void;
  value: string;
};

const TOKEN_LENGTH = 8;

function normalizeToken(value: string) {
  return value.replace(/[^a-zA-Z0-9]/g, "").slice(0, TOKEN_LENGTH).toUpperCase();
}

export function ResetTokenInput({ disabled, onChange, value }: ResetTokenInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const normalizedValue = normalizeToken(value);
  const tokenChars = normalizedValue.padEnd(TOKEN_LENGTH, " ").split("");

  function handleChange(nextValue: string) {
    onChange(normalizeToken(nextValue));
  }

  return (
    <div
      className="relative"
      onClick={() => inputRef.current?.focus()}
    >
      <input
        ref={inputRef}
        aria-label="Código de redefinição"
        autoCapitalize="characters"
        autoComplete="one-time-code"
        className="absolute inset-0 z-10 h-full w-full cursor-text opacity-0"
        disabled={disabled}
        id="token"
        inputMode="text"
        maxLength={TOKEN_LENGTH}
        onBlur={() => setIsFocused(false)}
        onChange={(event) => handleChange(event.target.value)}
        onFocus={() => setIsFocused(true)}
        type="text"
        value={normalizedValue}
      />
      <div className="grid grid-cols-8 gap-1.5" aria-hidden="true">
        {tokenChars.map((char, index) => (
          <span
            key={index}
            className={cn(
              "grid aspect-square min-h-10 place-items-center rounded-[10px] border text-sm font-semibold transition",
              isFocused && index === Math.min(normalizedValue.length, TOKEN_LENGTH - 1)
                ? "ring-2 ring-[var(--color-secondary)]"
                : "",
            )}
            style={{
              backgroundColor: "var(--color-surface)",
              borderColor: "var(--color-border)",
              color: "var(--color-text)",
            }}
          >
            {char.trim() || ""}
          </span>
        ))}
      </div>
    </div>
  );
}
