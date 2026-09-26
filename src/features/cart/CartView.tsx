"use client";

import Link from "next/link";
import { useState } from "react";
import { Badge, Button, Card, CardBody, EmptyState, FormAlert, LinkButton } from "@/components/ui";
import { IconArrowRight, IconCart, IconCheckCircle, IconTrash } from "@/components/ui/icons";
import { useAuth } from "@/features/auth/AuthContext";
import { PaymentMethodModal } from "@/features/payments/PaymentMethodModal";
import type { PaymentSubmission } from "@/features/payments/PaymentMethodModal";
import { errorMessage } from "@/lib/api-client";
import { formatMoney } from "@/lib/format";
import { saleService } from "@/services";
import { useCart } from "./CartContext";
import type { CartItem } from "./CartContext";

interface CheckoutOutcome {
  item: CartItem;
  status: "success" | "error";
  message?: string;
}

/**
 * Le panier ne fait que rejouer, un par un, les achats existants
 * (`/prompts/{id}/purchase`, `/packs/{id}/purchase`) avec le meme moyen de
 * paiement : il n'existe pas de commande unique cote API. Un article achete
 * avec succes sort du panier immediatement ; un echec y reste, avec son
 * message, pour pouvoir reessayer sans re-choisir les autres articles.
 */
export function CartView() {
  const { user } = useAuth();
  const { items, subtotal, remove, clear } = useCart();
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState<unknown>(null);
  const [outcomes, setOutcomes] = useState<CheckoutOutcome[]>([]);

  async function onCheckout(submission: PaymentSubmission) {
    setIsCheckingOut(true);
    setCheckoutError(null);
    const results: CheckoutOutcome[] = [];

    for (const item of items) {
      try {
        if (item.kind === "prompt") {
          await saleService.purchasePrompt(item.id, submission);
        } else {
          await saleService.purchasePack(item.id, submission);
        }
        results.push({ item, status: "success" });
        remove(item.kind, item.id);
      } catch (error) {
        results.push({ item, status: "error", message: errorMessage(error, "Achat impossible.") });
      }
    }

    setIsCheckingOut(false);
    setOutcomes(results);

    if (results.every((result) => result.status === "success")) {
      setIsPaymentOpen(false);
    } else {
      setCheckoutError(new Error("Certains articles n'ont pas pu etre achetes."));
    }
  }

  if (items.length === 0 && outcomes.length === 0) {
    return (
      <EmptyState
        icon={<IconCart className="h-5 w-5" />}
        title="Votre panier est vide"
        description="Parcourez la marketplace et ajoutez des prompts ou des packs pour les acheter en une seule fois."
        action={
          <LinkButton href="/" icon={<IconArrowRight className="h-3.5 w-3.5" />} className="flex-row-reverse">
            Explorer les prompts
          </LinkButton>
        }
      />
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_20rem]">
      <div className="flex flex-col gap-3">
        {outcomes.length > 0 ? (
          <div className="flex flex-col gap-2">
            {outcomes.map((outcome) => (
              <FormAlert key={`${outcome.item.kind}-${outcome.item.id}`} tone={outcome.status === "success" ? "success" : "error"}>
                <span className="font-semibold">{outcome.item.title}</span> -{" "}
                {outcome.status === "success" ? "achete avec succes." : outcome.message}
              </FormAlert>
            ))}
          </div>
        ) : null}

        {items.length > 0 ? (
          <Card>
            <ul>
              {items.map((item) => (
                <li
                  key={`${item.kind}-${item.id}`}
                  className="flex items-center justify-between gap-3 border-b border-[var(--hairline)] px-4 py-3.5 last:border-0 sm:px-5"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <Link href={`/${item.kind === "prompt" ? "prompts" : "packs"}/${item.slug}`} className="truncate text-sm font-semibold hover:text-brand-600">
                        {item.title}
                      </Link>
                      <Badge tone={item.kind === "prompt" ? "brand" : "info"}>{item.kind === "prompt" ? "Prompt" : "Pack"}</Badge>
                    </div>
                    <p className="mt-0.5 text-xs text-[var(--muted)]">Par {item.creatorName}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <span className="text-sm font-bold tabular-nums text-brand-700 dark:text-brand-400">
                      {item.isFree ? "Gratuit" : formatMoney(item.price)}
                    </span>
                    <button
                      type="button"
                      onClick={() => remove(item.kind, item.id)}
                      aria-label={`Retirer « ${item.title} » du panier`}
                      className="flex h-8 w-8 items-center justify-center rounded-full text-[var(--muted)] hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/40"
                    >
                      <IconTrash className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        ) : null}
      </div>

      {items.length > 0 ? (
        <div>
          <Card className="lg:sticky lg:top-24">
            <CardBody className="flex flex-col gap-4">
              <div className="flex items-baseline justify-between">
                <p className="text-sm font-semibold text-[var(--muted)]">Total ({items.length} article{items.length > 1 ? "s" : ""})</p>
                <p className="text-2xl font-extrabold tabular-nums text-brand-700 dark:text-brand-400">{formatMoney(subtotal)}</p>
              </div>

              {user ? (
                <>
                  <Button size="lg" className="w-full" onClick={() => setIsPaymentOpen(true)}>
                    Passer la commande
                  </Button>
                  <PaymentMethodModal
                    isOpen={isPaymentOpen}
                    onClose={() => setIsPaymentOpen(false)}
                    title="Payer votre panier"
                    amountLabel={formatMoney(subtotal)}
                    onConfirm={onCheckout}
                    isPending={isCheckingOut}
                    error={checkoutError}
                  />
                </>
              ) : (
                <p className="text-sm text-[var(--muted)]">
                  <Link href="/connexion" className="font-semibold text-brand-600">
                    Connectez-vous
                  </Link>{" "}
                  pour passer commande.
                </p>
              )}

              {outcomes.length > 0 && outcomes.every((outcome) => outcome.status === "success") ? (
                <p className="flex items-center gap-1.5 text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                  <IconCheckCircle className="h-4 w-4" />
                  Achat termine - retrouvez-le dans{" "}
                  <Link href="/espace/mes-achats" className="underline underline-offset-2">
                    mes achats
                  </Link>
                  .
                </p>
              ) : null}

              {items.length > 0 ? (
                <button type="button" onClick={clear} className="self-start text-xs font-semibold text-[var(--muted)] hover:text-rose-600">
                  Vider le panier
                </button>
              ) : null}
            </CardBody>
          </Card>
        </div>
      ) : null}
    </div>
  );
}
