import type { Metadata } from "next";
import { PageHeader } from "@/components/ui";
import { IconCart } from "@/components/ui/icons";
import { CartView } from "@/features/cart/CartView";

export const metadata: Metadata = { title: "Panier" };

export default function CartPage() {
  return (
    <>
      <PageHeader icon={<IconCart className="h-5 w-5" />} title="Panier" description="Vos prompts et packs avant paiement." />
      <CartView />
    </>
  );
}
