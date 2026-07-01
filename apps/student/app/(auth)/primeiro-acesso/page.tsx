import { PrimeiroAcessoContent } from "@/components/auth/PrimeiroAcessoContent";

type PrimeiroAcessoPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function getTokenParam(value: string | string[] | undefined) {
  if (Array.isArray(value)) return value[0] ?? "";

  return value ?? "";
}

export default async function PrimeiroAcessoPage({
  searchParams,
}: PrimeiroAcessoPageProps) {
  const params = await searchParams;
  const initialToken = getTokenParam(params?.token).trim();

  return <PrimeiroAcessoContent initialToken={initialToken} />;
}
