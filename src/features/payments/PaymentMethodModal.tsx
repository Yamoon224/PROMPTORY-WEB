"use client";

import { useState } from "react";
import { Button, FormAlert, Modal, TextField } from "@/components/ui";
import { IconCreditCard, IconLock } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { errorMessage } from "@/lib/api-client";

export type PaymentMethod = "stripe" | "paypal";

export interface PaymentSubmission {
  payment_method: PaymentMethod;
  payment_token: string;
}

/**
 * Choix du moyen de paiement, conforme au cahier des charges (Stripe ou
 * PayPal), et saisie des informations correspondantes.
 *
 * **Environnement de demonstration** : sans cles Stripe/PayPal configurees
 * cote backend (voir `.env`), aucune carte ni compte reel n'est debite — le
 * jeton produit ici est un identifiant synthetique que l'agregateur simule
 * accepte ou refuse (voir `App\Domains\Payments\Gateways`). Une carte se
 * terminant par `0000` simule un refus, ce qui permet de tester le chemin
 * d'echec sans carte reelle. Avec de vraies cles configurees, ce meme
 * formulaire devrait etre remplace par Stripe Elements / le SDK PayPal, qui
 * seuls sont autorises a manipuler un numero de carte reel.
 */
export function PaymentMethodModal({
  isOpen,
  onClose,
  title,
  amountLabel,
  onConfirm,
  isPending,
  error,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  amountLabel: string;
  onConfirm: (submission: PaymentSubmission) => void;
  isPending: boolean;
  error?: unknown;
}) {
  const [method, setMethod] = useState<PaymentMethod>("stripe");
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");

  const digitsOnly = cardNumber.replace(/\D/g, "");
  const isCardValid = cardName.trim().length > 1 && digitsOnly.length >= 12 && /^\d{2}\/\d{2}$/.test(cardExpiry) && cardCvc.length >= 3;

  function formatCardNumber(value: string): string {
    return value
      .replace(/\D/g, "")
      .slice(0, 19)
      .replace(/(\d{4})(?=\d)/g, "$1 ");
  }

  function formatExpiry(value: string): string {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
  }

  function submitCard() {
    // Jeton synthetique pour cet environnement de demonstration (voir la
    // documentation du composant) : un vrai front Stripe appellerait
    // `stripe.createPaymentMethod()` ici et n'enverrait jamais le numero de
    // carte lui-meme au backend.
    const last4 = digitsOnly.slice(-4);
    onConfirm({ payment_method: "stripe", payment_token: `pm_card_${last4}` });
  }

  function submitPaypal() {
    const orderId = `ORDER-${Date.now().toString(36).toUpperCase()}`;
    onConfirm({ payment_method: "paypal", payment_token: orderId });
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      description={`Montant a regler : ${amountLabel}`}
      footer={
        method === "stripe" ? (
          <>
            <Button variant="secondary" onClick={onClose} disabled={isPending}>
              Annuler
            </Button>
            <Button onClick={submitCard} isLoading={isPending} disabled={!isCardValid}>
              Payer {amountLabel}
            </Button>
          </>
        ) : (
          <Button variant="secondary" onClick={onClose} disabled={isPending}>
            Annuler
          </Button>
        )
      }
    >
      <div className="flex flex-col gap-4">
        <div role="tablist" aria-label="Moyen de paiement" className="grid grid-cols-2 gap-2">
          <button
            type="button"
            role="tab"
            aria-selected={method === "stripe"}
            onClick={() => setMethod("stripe")}
            className={cn(
              "flex items-center justify-center gap-2 rounded-full border px-3 py-2.5 text-sm font-semibold transition-colors",
              method === "stripe"
                ? "border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300"
                : "border-[var(--hairline)] text-stone-600 hover:bg-stone-50 dark:text-stone-300 dark:hover:bg-stone-800",
            )}
          >
            <IconCreditCard className="h-4 w-4" />
            Carte bancaire
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={method === "paypal"}
            onClick={() => setMethod("paypal")}
            className={cn(
              "flex items-center justify-center gap-2 rounded-full border px-3 py-2.5 text-sm font-bold transition-colors",
              method === "paypal"
                ? "border-[#0070ba] bg-[#f5faff] text-[#003087] dark:bg-[#0a2540] dark:text-[#4d9fff]"
                : "border-[var(--hairline)] text-stone-600 hover:bg-stone-50 dark:text-stone-300 dark:hover:bg-stone-800",
            )}
          >
            <span className="text-[#003087] dark:text-[#4d9fff]">Pay</span>
            <span className="text-[#0070ba] dark:text-[#00a0e6]">Pal</span>
          </button>
        </div>

        {method === "stripe" ? (
          <div className="flex flex-col gap-4">
            <TextField
              label="Nom sur la carte"
              placeholder="Camille Createur"
              value={cardName}
              onChange={(event) => setCardName(event.target.value)}
              autoComplete="cc-name"
              required
              autoFocus
            />
            <TextField
              label="Numero de carte"
              placeholder="4242 4242 4242 4242"
              value={cardNumber}
              onChange={(event) => setCardNumber(formatCardNumber(event.target.value))}
              inputMode="numeric"
              autoComplete="cc-number"
              required
            />
            <div className="grid grid-cols-2 gap-3">
              <TextField
                label="Expiration (MM/AA)"
                placeholder="12/28"
                value={cardExpiry}
                onChange={(event) => setCardExpiry(formatExpiry(event.target.value))}
                inputMode="numeric"
                autoComplete="cc-exp"
                required
              />
              <TextField
                label="CVC"
                placeholder="123"
                value={cardCvc}
                onChange={(event) => setCardCvc(event.target.value.replace(/\D/g, "").slice(0, 4))}
                inputMode="numeric"
                autoComplete="cc-csc"
                required
              />
            </div>
            <p className="flex items-center gap-1.5 text-xs text-[var(--muted)]">
              <IconLock className="h-3.5 w-3.5" />
              Environnement de demonstration : aucune carte n&apos;est reellement debitee. Une carte se terminant par
              0000 simule un refus.
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 rounded-sm bg-[var(--surface-muted)] px-4 py-8 text-center">
            <p className="text-sm text-[var(--muted)]">
              Vous allez etre redirige vers PayPal pour approuver le paiement de <strong>{amountLabel}</strong>.
            </p>
            <button
              type="button"
              onClick={submitPaypal}
              disabled={isPending}
              className="flex h-11 w-full max-w-xs items-center justify-center rounded-full bg-[#ffc439] text-base font-bold text-[#003087] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending ? (
                "Redirection…"
              ) : (
                <>
                  <span>Pay</span>
                  <span className="text-[#0070ba]">Pal</span>
                </>
              )}
            </button>
            <p className="flex items-center gap-1.5 text-xs text-[var(--muted)]">
              <IconLock className="h-3.5 w-3.5" />
              Environnement de demonstration : aucun compte PayPal n&apos;est reellement debite.
            </p>
          </div>
        )}

        {error ? <FormAlert>{errorMessage(error, "Le paiement a echoue.")}</FormAlert> : null}
      </div>
    </Modal>
  );
}
