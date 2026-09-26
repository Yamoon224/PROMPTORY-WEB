"use client";

import { useCallback } from "react";
import { Badge, DataTable } from "@/components/ui";
import type { Column } from "@/components/ui/DataTable";
import { IconCreditCard } from "@/components/ui/icons";
import { usePaginatedData } from "@/hooks/usePaginatedData";
import { formatDate, formatMoney } from "@/lib/format";
import { SUBSCRIPTION_STATUS_LABEL, SUBSCRIPTION_STATUS_TONE, SUBSCRIPTION_TYPE_LABEL } from "@/lib/labels";
import { subscriptionService } from "@/services";
import type { Subscription } from "@/types/api";

/** Tous les abonnements de la plateforme (back-office). */
export function SubscriptionTable() {
  const fetcher = useCallback((page: number, perPage: number) => subscriptionService.listAllSubscriptions({ page, per_page: perPage }), []);
  const { items, meta, setPage, setPerPage, isLoading, error, reload } = usePaginatedData(fetcher);

  const columns: Array<Column<Subscription>> = [
    { key: "user", header: "Compte", cell: (subscription) => subscription.user?.name ?? "-" },
    { key: "type", header: "Formule", cell: (subscription) => SUBSCRIPTION_TYPE_LABEL[subscription.type] },
    { key: "price", header: "Prix", cell: (subscription) => formatMoney(subscription.price), hideOnMobile: true },
    {
      key: "status",
      header: "Statut",
      cell: (subscription) => (
        <Badge dot tone={SUBSCRIPTION_STATUS_TONE[subscription.status]}>
          {SUBSCRIPTION_STATUS_LABEL[subscription.status]}
        </Badge>
      ),
    },
    { key: "end_date", header: "Echeance", cell: (subscription) => formatDate(subscription.end_date), hideOnMobile: true },
  ];

  return (
    <DataTable
      title="Abonnements"
      description="Createurs et extension premium."
      icon={<IconCreditCard className="h-4 w-4" />}
      columns={columns}
      rows={items}
      getRowKey={(subscription) => String(subscription.id)}
      isLoading={isLoading}
      error={error}
      onRetry={reload}
      emptyTitle="Aucun abonnement"
      meta={meta}
      onPageChange={setPage}
      onPerPageChange={setPerPage}
    />
  );
}
