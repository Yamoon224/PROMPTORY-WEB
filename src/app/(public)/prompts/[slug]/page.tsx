import { PromptDetail } from "@/features/marketplace/PromptDetail";

export default async function PromptPage({ params }: PageProps<"/prompts/[slug]">) {
  const { slug } = await params;

  return <PromptDetail slug={slug} />;
}
