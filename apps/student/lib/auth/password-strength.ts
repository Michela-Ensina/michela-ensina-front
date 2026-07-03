export type PasswordStrengthLevel = "empty" | "weak" | "medium" | "strong";

export type PasswordStrengthAssessment = {
  blockedReasons: string[];
  level: PasswordStrengthLevel;
  metRequirements: PasswordRequirementKey[];
  score: number;
  value: number;
};

export type PasswordRequirementKey =
  | "minimumLength"
  | "letter"
  | "number"
  | "notCommon";

const COMMON_PASSWORDS = [
  "12345678",
  "123456789",
  "senha123",
  "password",
  "password123",
  "qwerty123",
  "admin123",
  "michela123",
];

const SEQUENCES = [
  "0123456789",
  "abcdefghijklmnopqrstuvwxyz",
  "qwertyuiop",
];

function normalize(value: string) {
  return value.trim().toLowerCase();
}

function hasLongSequence(password: string) {
  const normalizedPassword = normalize(password);

  return SEQUENCES.some((sequence) => {
    for (let index = 0; index <= sequence.length - 4; index += 1) {
      const chunk = sequence.slice(index, index + 4);
      if (normalizedPassword.includes(chunk)) return true;
    }

    return false;
  });
}

function hasRepetition(password: string) {
  return /(.)\1{3,}/i.test(password);
}

export function assessPasswordStrength(password: string): PasswordStrengthAssessment {
  if (!password) {
    return {
      blockedReasons: [],
      level: "empty",
      metRequirements: [],
      score: 0,
      value: 0,
    };
  }

  const normalizedPassword = normalize(password);
  const hasMinimumLength = password.length >= 8;
  const hasLongLength = password.length >= 10;
  const hasLetter = /[A-Za-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[^A-Za-z0-9]/.test(password);
  const isCommon = COMMON_PASSWORDS.includes(normalizedPassword);
  const hasSequenceOrRepetition = hasLongSequence(password) || hasRepetition(password);

  const metRequirements: PasswordRequirementKey[] = [];
  if (hasMinimumLength) metRequirements.push("minimumLength");
  if (hasLetter) metRequirements.push("letter");
  if (hasNumber) metRequirements.push("number");
  if (!isCommon) metRequirements.push("notCommon");

  const blockedReasons = [];
  if (!hasMinimumLength) blockedReasons.push("A senha deve ter pelo menos 8 caracteres.");
  if (!hasLetter) blockedReasons.push("A senha deve ter pelo menos uma letra.");
  if (!hasNumber) blockedReasons.push("A senha deve ter pelo menos um número.");
  if (isCommon) blockedReasons.push("Escolha uma senha menos comum.");

  if (blockedReasons.length > 0) {
    return {
      blockedReasons,
      level: "weak",
      metRequirements,
      score: metRequirements.length,
      value: Math.max(16, Math.min(44, metRequirements.length * 8)),
    };
  }

  if (hasLongLength && hasLetter && hasNumber && !hasSequenceOrRepetition) {
    return {
      blockedReasons,
      level: "strong",
      metRequirements,
      score: metRequirements.length + (hasSymbol ? 1 : 0),
      value: 100,
    };
  }

  return {
    blockedReasons,
    level: "medium",
    metRequirements,
    score: metRequirements.length,
    value: hasSequenceOrRepetition ? 58 : 72,
  };
}
