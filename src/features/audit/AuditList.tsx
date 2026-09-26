"use client";

import { useCallback } from "react";
import { Badge, DataTable } from "@/components/ui";
import type { Column } from "@/components/ui/DataTable";
import { IconHistory } from "@/components/ui/icons";
import { usePaginatedData } from "@/hooks/usePaginatedData";
import { formatDateTime } from "@/lib/format";
import { activityService } from "@/services";
import type { ActivityAction, ActivityLogEntry } from "@/types/api";

const ACTION_LABEL: Record<ActivityAction, string> = {
  view: "Consultation",
  download: "Telechargement",
  purchase: "Achat",
  edit: "Modification",
  save_folder: "Creation de dossier",
  submit_validation: "Soumission a validation",
  approve: "Approbation",
  reject: "Rejet",
};

/** Journal d'activite de la plateforme (analytics produit, back-office). */
export function AuditList() {
  const fetcher = useCallback((page: number, perPage: number) => activityService.listActivity({ page, per_page: perPage }), []);
  const { items, meta, setPage, setPerPage, isLoading, error, reload } = usePaginatedData(fetcher);

  const columns: Array<Column<ActivityLogEntry>> = [
    { key: "action", header: "Action", cell: (entry) => <Badge tone="brand">{ACTION_LABEL[entry.action]}</Badge> },
    { key: "user", header: "Compte", cell: (entry) => entry.user?.name ?? "-" },
    { key: "prompt", header: "Prompt", cell: (entry) => entry.prompt?.title ?? "-", hideOnMobile: true },
    { key: "created_at", header: "Date", cell: (entry) => formatDateTime(entry.created_at), hideOnMobile: true },
  ];

  return (
    <DataTable
      title="Journal d'activite"
      description="Qui a fait quoi, et quand."
      icon={<IconHistory className="h-4 w-4" />}
      columns={columns}
      rows={items}
      getRowKey={(entry) => String(entry.id)}
      isLoading={isLoading}
      error={error}
      onRetry={reload}
      emptyTitle="Aucun evenement enregistre"
      meta={meta}
      onPageChange={setPage}
      onPerPageChange={setPerPage}
    />
  );
}
