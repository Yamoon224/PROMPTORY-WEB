import { PackDetail } from "@/features/marketplace/PackDetail";

export default async function PackPage({ params }: PageProps<"/packs/[slug]">) {
  const { slug } = await params;

  return <PackDetail slug={slug} />;
}
