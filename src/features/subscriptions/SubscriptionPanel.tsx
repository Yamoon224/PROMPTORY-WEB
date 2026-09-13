"use client";

import { useState } from "react";
import { Badge, Button, Card, CardBody, CardHeader, ConfirmDialog, ErrorState, LoadingState } from "@/components/ui";
import { IconCreditCard } from "@/components/ui/icons";
import { PaymentMethodModal } from "@/features/payments/PaymentMethodModal";
import type { PaymentSubmission } from "@/features/payments/PaymentMethodModal";
import { useAsyncData } from "@/hooks/useAsyncData";
import { useMutation } from "@/hooks/useMutation";
import { formatDate, formatMoney } from "@/lib/format";
import { SUBSCRIPTION_STATUS_LABEL, SUBSCRIPTION_STATUS_TONE, SUBSCRIPTION_TYPE_LABEL } from "@/lib/labels";
import { subscriptionService } from "@/services";
import type { SubscribeInput } from "@/services/subscription-service";
import type { SubscriptionType } from "@/types/api";

const PLANS: Array<{ type: SubscriptionType; price: number; description: string }> = [
  { type: "creator_premium", price: 9.99, description: "Fonctionnalites avancees, statistiques detaillees, visibilite accrue de vos prompts." },
  { type: "extension_premium", price: 4.99, description: "Organisation avancee, favoris, synchronisation cloud dans l'extension Chrome." },
];

/** Abonnements premium createur et extension, avec souscription et annulation en libre-service. */
export function SubscriptionPanel() {
  const { data: subscriptions, isLoading, error, reload } = useAsyncData(() => subscriptionService.listMySubscriptions({ per_page: 50 }));
  const subscribeMutation = useMutation((input: SubscribeInput) => subscriptionService.subscribe(input));
  const cancelMutation = useMutation((id: number) => subscriptionService.cancelSubscription(id));
  const [pendingCancelId, setPendingCancelId] = useState<number | null>(null);
  const [subscribingTo, setSubscribingTo] = useState<(typeof PLANS)[number] | null>(null);

  if (isLoading) return <LoadingState label="Chargement de vos abonnements…" />;
  if (error) return <ErrorState error={error} onRetry={reload} />;

  const activeByType = new Map((subscriptions?.data ?? []).filter((sub) => sub.is_active).map((sub) => [sub.type, sub]));

  async function onSubscribe(submission: PaymentSubmission) {
    if (!subscribingTo) return;

    const subscription = await subscribeMutation.run({ type: subscribingTo.type, ...submission });
    if (subscription) {
      setSubscribingTo(null);
      reload();
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-2">
        {PLANS.map((plan) => {
          const active = activeByType.get(plan.type);

          return (
            <Card key={plan.type}>
              <CardHeader icon={<IconCreditCard className="h-4 w-4" />} title={SUBSCRIPTION_TYPE_LABEL[plan.type]} />
              <CardBody className="flex flex-col gap-3">
                <p className="text-2xl font-extrabold tabular-nums text-brand-700 dark:text-brand-400">
                  {formatMoney(plan.price)}
                  <span className="text-sm font-medium text-[var(--muted)]"> / mois</span>
                </p>
                <p className="text-sm text-[var(--muted)]">{plan.description}</p>

                {active ? (
                  <>
                    <p className="text-sm">
                      <Badge tone={SUBSCRIPTION_STATUS_TONE[active.status]}>{SUBSCRIPTION_STATUS_LABEL[active.status]}</Badge>{" "}
                      jusqu&apos;au {formatDate(active.end_date)}
                    </p>
                    <Button variant="secondary" size="sm" className="self-start" onClick={() => setPendingCancelId(active.id)}>
                      Annuler l&apos;abonnement
                    </Button>
                  </>
                ) : (
                  <Button size="sm" className="self-start" onClick={() => setSubscribingTo(plan)}>
                    S&apos;abonner
                  </Button>
                )}
              </CardBody>
            </Card>
          );
        })}
      </div>

      {subscribingTo ? (
        <PaymentMethodModal
          isOpen
          onClose={() => setSubscribingTo(null)}
          title={`S'abonner — ${SUBSCRIPTION_TYPE_LABEL[subscribingTo.type]}`}
          amountLabel={`${formatMoney(subscribingTo.price)} / mois`}
          onConfirm={onSubscribe}
          isPending={subscribeMutation.isPending}
          error={subscribeMutation.error}
        />
      ) : null}

      <ConfirmDialog
        isOpen={pendingCancelId !== null}
        onClose={() => setPendingCancelId(null)}
        onConfirm={async () => {
          if (pendingCancelId && (await cancelMutation.run(pendingCancelId)) !== null) {
            setPendingCancelId(null);
            reload();
          }
        }}
        title="Annuler cet abonnement ?"
        confirmLabel="Annuler l'abonnement"
        isPending={cancelMutation.isPending}
        error={cancelMutation.error}
      >
        Vous perdrez les avantages associes des la fin de la periode en cours.
      </ConfirmDialog>
    </div>
  );
}
