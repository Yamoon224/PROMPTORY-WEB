"use client";

import { useCallback, useState } from "react";
import { Badge, DataTable } from "@/components/ui";
import type { Column } from "@/components/ui/DataTable";
import { IconCart, IconCoins } from "@/components/ui/icons";
import { usePaginatedData } from "@/hooks/usePaginatedData";
import { formatDateTime, formatMoney } from "@/lib/format";
import { PAYMENT_STATUS_LABEL, PAYMENT_STATUS_TONE } from "@/lib/labels";
import { saleService } from "@/services";
import type { Sale } from "@/types/api";

const ITEM_COLUMN: Column<Sale> = {
  key: "item",
  header: "Article",
  cell: (sale) => sale.prompt?.title ?? sale.pack?.title ?? "—",
};

const PRICE_COLUMN: Column<Sale> = {
  key: "price",
  header: "Prix",
  sortKey: "price",
  cell: (sale) => formatMoney(sale.price),
};

const STATUS_COLUMN: Column<Sale> = {
  key: "status",
  header: "Statut",
  cell: (sale) => <Badge tone={PAYMENT_STATUS_TONE[sale.payment_status]}>{PAYMENT_STATUS_LABEL[sale.payment_status]}</Badge>,
};

const DATE_COLUMN: Column<Sale> = {
  key: "created_at",
  header: "Date",
  sortKey: "created_at",
  cell: (sale) => formatDateTime(sale.created_at),
  hideOnMobile: true,
};

/** Historique de mes achats : ce que j'ai paye, a qui, et pour combien. */
export function MyPurchasesTable() {
  const fetcher = useCallback((page: number, perPage: number) => saleService.listMyPurchases({ page, per_page: perPage }), []);
  const { items, meta, setPage, setPerPage, isLoading, error, reload } = usePaginatedData(fetcher);

  const columns: Array<Column<Sale>> = [
    ITEM_COLUMN,
    { key: "creator", header: "Createur", cell: (sale) => sale.creator?.name ?? "—", hideOnMobile: true },
    PRICE_COLUMN,
    STATUS_COLUMN,
    DATE_COLUMN,
  ];

  return (
    <DataTable
      title="Mes achats"
      description="Historique de vos prompts et packs achetes."
      icon={<IconCart className="h-4 w-4" />}
      columns={columns}
      rows={items}
      getRowKey={(sale) => String(sale.id)}
      isLoading={isLoading}
      error={error}
      onRetry={reload}
      emptyTitle="Vous n'avez encore rien achete"
      meta={meta}
      onPageChange={setPage}
      onPerPageChange={setPerPage}
    />
  );
}

/** Ventes en tant que createur : revenu brut, commission et net par transaction. */
export function MyEarningsTable() {
  const fetcher = useCallback((page: number, perPage: number) => saleService.listMyEarnings({ page, per_page: perPage }), []);
  const { items, meta, setPage, setPerPage, isLoading, error, reload } = usePaginatedData(fetcher);

  const columns: Array<Column<Sale>> = [
    ITEM_COLUMN,
    { key: "buyer", header: "Acheteur", cell: (sale) => sale.buyer?.name ?? "—", hideOnMobile: true },
    PRICE_COLUMN,
    { key: "commission", header: "Commission", cell: (sale) => formatMoney(sale.commission), hideOnMobile: true },
    { key: "net", header: "Net", cell: (sale) => <span className="font-semibold">{formatMoney(sale.net_amount)}</span> },
    STATUS_COLUMN,
    DATE_COLUMN,
  ];

  return (
    <DataTable
      title="Mes ventes"
      description="Revenus generes par vos prompts et packs."
      icon={<IconCoins className="h-4 w-4" />}
      columns={columns}
      rows={items}
      getRowKey={(sale) => String(sale.id)}
      isLoading={isLoading}
      error={error}
      onRetry={reload}
      emptyTitle="Aucune vente pour l'instant"
      meta={meta}
      onPageChange={setPage}
      onPerPageChange={setPerPage}
    />
  );
}

/** Toutes les ventes de la plateforme (back-office). */
export function AllSalesTable() {
  const [status, setStatus] = useState("");
  const fetcher = useCallback(
    (page: number, perPage: number) => saleService.listAllSales({ page, per_page: perPage, payment_status: status || undefined }),
    [status],
  );
  const { items, meta, setPage, setPerPage, isLoading, error, reload } = usePaginatedData(fetcher);

  const columns: Array<Column<Sale>> = [
    ITEM_COLUMN,
    { key: "buyer", header: "Acheteur", cell: (sale) => sale.buyer?.name ?? "—" },
    { key: "creator", header: "Createur", cell: (sale) => sale.creator?.name ?? "—", hideOnMobile: true },
    PRICE_COLUMN,
    { key: "commission", header: "Commission", cell: (sale) => formatMoney(sale.commission), hideOnMobile: true },
    STATUS_COLUMN,
    DATE_COLUMN,
  ];

  return (
    <DataTable
      title="Toutes les ventes"
      description="Suivi des transactions de la plateforme."
      icon={<IconCoins className="h-4 w-4" />}
      columns={columns}
      rows={items}
      getRowKey={(sale) => String(sale.id)}
      isLoading={isLoading}
      error={error}
      onRetry={reload}
      emptyTitle="Aucune vente enregistree"
      toolbar={
        <select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          aria-label="Filtrer par statut de paiement"
          className="h-10 rounded-full bg-[var(--surface)] px-3 text-sm font-medium ring-1 ring-inset ring-[var(--field-border)] focus:outline-none focus:ring-2 focus:ring-brand-500"
        >
          <option value="">Tous les statuts</option>
          <option value="pending">En attente</option>
          <option value="completed">Encaisse</option>
          <option value="failed">Echoue</option>
        </select>
      }
      meta={meta}
      onPageChange={setPage}
      onPerPageChange={setPerPage}
    />
  );
}
