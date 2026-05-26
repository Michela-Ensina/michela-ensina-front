import { SettingsContent } from "@/app/(dashboard)/configuracoes/SettingsContent";

type ConfiguracoesPageProps = {
  searchParams?: Promise<{ aviso?: string }>;
};

export default async function ConfiguracoesPage({ searchParams }: ConfiguracoesPageProps) {
  const resolvedSearchParams = await searchParams;

  return <SettingsContent showMustChangePasswordAlert={resolvedSearchParams?.aviso === "troca-senha"} />;
}
