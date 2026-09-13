import { EditPackScreen } from "@/features/packs/EditPackScreen";

export default async function EditPackPage({ params }: PageProps<"/espace/mes-packs/[id]/modifier">) {
  const { id } = await params;

  return <EditPackScreen packId={Number(id)} />;
}
