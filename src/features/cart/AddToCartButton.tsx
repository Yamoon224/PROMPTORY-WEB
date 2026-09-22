"use client";

import { IconCart, IconCheck } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import type { CartItem } from "./CartContext";
import { useCart } from "./CartContext";

/**
 * Bouton rond ajouter/retirer du panier, pose sur une vignette de la
 * marketplace. Toujours un frere du `<Link>` de la carte (jamais imbrique
 * dedans) : un `<a>` ne peut pas contenir d'element interactif.
 */
export function AddToCartButton({ item, className }: { item: CartItem; className?: string }) {
  const { isInCart, toggle } = useCart();
  const inCart = isInCart(item.kind, item.id);

  return (
    <button
      type="button"
      onClick={() => toggle(item)}
      aria-pressed={inCart}
      aria-label={inCart ? `Retirer « ${item.title} » du panier` : `Ajouter « ${item.title} » au panier`}
      title={inCart ? "Retirer du panier" : "Ajouter au panier"}
      className={cn(
        "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors",
        inCart
          ? "bg-brand-500 text-white hover:bg-brand-600"
          : "bg-[var(--surface-muted)] text-[var(--muted)] hover:bg-brand-50 hover:text-brand-600 dark:hover:bg-stone-800 dark:hover:text-brand-400",
        className,
      )}
    >
      {inCart ? <IconCheck className="h-4 w-4" /> : <IconCart className="h-4 w-4" />}
    </button>
  );
}
