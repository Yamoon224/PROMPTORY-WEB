import { cn } from "@/lib/cn";

/**
 * Logos des moyens de paiement acceptes, chacun sur un fond blanc constant
 * (pastille) pour rester lisible quel que soit le fond du pied de page et
 * respecter la palette propre a chaque marque.
 */
function PaymentBadge({ className, children, label }: { className?: string; children: React.ReactNode; label: string }) {
  return (
    <span
      role="img"
      aria-label={label}
      className={cn(
        "flex h-8 w-12 shrink-0 items-center justify-center rounded-md bg-white shadow-sm ring-1 ring-black/5",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function VisaLogo() {
  return (
    <PaymentBadge label="Visa">
      <svg viewBox="0 0 48 16" className="h-3.5 w-8" aria-hidden="true">
        <text x="0" y="13" fontFamily="Arial, sans-serif" fontWeight="900" fontStyle="italic" fontSize="15" fill="#1a1f71">
          VISA
        </text>
      </svg>
    </PaymentBadge>
  );
}

export function MastercardLogo() {
  return (
    <PaymentBadge label="Mastercard">
      <svg viewBox="0 0 40 24" className="h-5 w-8" aria-hidden="true">
        <circle cx="16" cy="12" r="9" fill="#eb001b" />
        <circle cx="24" cy="12" r="9" fill="#f79e1b" />
        <path
          d="M20 5.2a9 9 0 0 1 0 13.6 9 9 0 0 1 0-13.6Z"
          fill="#ff5f00"
        />
      </svg>
    </PaymentBadge>
  );
}

export function PaypalLogo() {
  return (
    <PaymentBadge label="PayPal">
      <svg viewBox="0 0 48 16" className="h-3.5 w-8" aria-hidden="true">
        <text x="1" y="13" fontFamily="Arial, sans-serif" fontWeight="800" fontStyle="italic" fontSize="14" fill="#003087">
          Pay
        </text>
        <text x="26" y="13" fontFamily="Arial, sans-serif" fontWeight="800" fontStyle="italic" fontSize="14" fill="#0070ba">
          Pal
        </text>
      </svg>
    </PaymentBadge>
  );
}

export function PaymentLogos({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <VisaLogo />
      <MastercardLogo />
      <PaypalLogo />
    </div>
  );
}
