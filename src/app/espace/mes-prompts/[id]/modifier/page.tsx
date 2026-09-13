import { EditPromptScreen } from "@/features/prompts/EditPromptScreen";

export default async function EditPromptPage({ params }: PageProps<"/espace/mes-prompts/[id]/modifier">) {
  const { id } = await params;

  return <EditPromptScreen promptId={Number(id)} />;
}
