import { MaterialDetailContent } from "@/app/(dashboard)/materiais/[id]/MaterialDetailContent";

type MaterialDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function MaterialDetailPage({ params }: MaterialDetailPageProps) {
  const { id } = await params;

  return <MaterialDetailContent materialId={id} />;
}
