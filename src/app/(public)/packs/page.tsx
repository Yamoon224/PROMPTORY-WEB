import type { Metadata } from "next";
import { PageHeader } from "@/components/ui";
import { IconPackage } from "@/components/ui/icons";
import { PackBrowser } from "@/features/marketplace/PackBrowser";

export const metadata: Metadata = { title: "Packs" };

export default function PacksPage() {
  return (
    <>
      <PageHeader
        icon={<IconPackage className="h-5 w-5" />}
        title="Packs de prompts"
        description="Des lots de prompts complementaires, groupes a prix unique par leurs createurs."
      />
      <PackBrowser />
    </>
  );
}
