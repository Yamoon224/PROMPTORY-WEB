"use client";

import { useCallback } from "react";
import { LinkButton, LoadingState, StatCard } from "@/components/ui";
import { IconCart, IconCoins, IconCreditCard, IconPrompt } from "@/components/ui/icons";
import { useAsyncData } from "@/hooks/useAsyncData";
import { promptService, saleService, subscriptionService } from "@/services";

/**
 * Vue d'ensemble de l'espace createur.
 *
 * Chaque tuile ne demande que la premiere page d'une liste (`per_page: 1`) :
 * seul `meta.total` interesse ici, et charger cent lignes pour lire un
 * decompte serait le meme gaspillage qu'une pagination inutile.
 */
export function DashboardOverview() {
  const loadCounts = useCallback(async () => {
    const [prompts, publishedPrompts, purchases, sales, subscriptions] = await Promise.all([
      promptService.listMyPrompts({ per_page: 1 }),
      promptService.listMyPrompts({ per_page: 1, status: "published" }),
      saleService.listMyPurchases({ per_page: 1 }),
      saleService.listMyEarnings({ per_page: 1 }),
      subscriptionService.listMySubscriptions({ per_page: 5 }),
    ]);

    return {
      totalPrompts: prompts.meta.total,
      publishedPrompts: publishedPrompts.meta.total,
      totalPurchases: purchases.meta.total,
      totalSales: sales.meta.total,
      hasActiveSubscription: subscriptions.data.some((subscription) => subscription.is_active),
    };
  }, []);

  const { data, isLoading } = useAsyncData(loadCounts);

  if (isLoading || !data) return <LoadingState label="Chargement du tableau de bord…" />;

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Prompts publies"
          value={data.publishedPrompts}
          hint={`${data.totalPrompts} au total, tous statuts confondus`}
          icon={<IconPrompt className="h-5 w-5" />}
          tone="brand"
        />
        <StatCard
          label="Mes achats"
          value={data.totalPurchases}
          hint="Prompts achetes sur la marketplace"
          icon={<IconCart className="h-5 w-5" />}
        />
        <StatCard
          label="Mes ventes"
          value={data.totalSales}
          hint="Transactions encaissees sur vos creations"
          icon={<IconCoins className="h-5 w-5" />}
          tone="success"
        />
        <StatCard
          label="Abonnement"
          value={data.hasActiveSubscription ? "Actif" : "Aucun"}
          hint="Createur premium ou extension premium"
          icon={<IconCreditCard className="h-5 w-5" />}
          tone={data.hasActiveSubscription ? "success" : "neutral"}
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <LinkButton href="/espace/mes-prompts/nouveau" icon={<IconPrompt className="h-4 w-4" />}>
          Nouveau prompt
        </LinkButton>
        <LinkButton href="/espace/mes-packs/nouveau" variant="secondary">
          Nouveau pack
        </LinkButton>
      </div>
    </div>
  );
}
