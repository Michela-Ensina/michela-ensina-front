const TRUE_FLAG_VALUE = "true";

export const STUDENT_AREA_URL = "https://aluno.michelaensina.com.br";
export const MODO_FLUENTE_HOTMART_URL = "https://pay.hotmart.com/W106208553I";

function isTrueFlag(value: string | undefined): boolean {
  return value?.toLowerCase() === TRUE_FLAG_VALUE;
}

export function getIsReleased(): boolean {
  return (
    isTrueFlag(process.env.WAS_RELEASED) ||
    isTrueFlag(process.env.NEXT_PUBLIC_WAS_RELEASED)
  );
}
