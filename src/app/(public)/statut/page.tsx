"use client";

import { useCallback } from "react";
import { ErrorState, LoadingState, PageHeader } from "@/components/ui";
import { IconCheckCircle, IconAlert } from "@/components/ui/icons";
import { useAsyncData } from "@/hooks/useAsyncData";
import { systemService } from "@/services";

const CHECK_LABELS: Record<string, string> = {
  database: "Base de données",
};

export default function StatutPage() {
  const loader = useCallback(() => systemService.getHealth(), []);
  const { data, isLoading, error, reload } = useAsyncData(loader);

  return (
    <>
      <PageHeader title="Statut du service" description="État en temps réel de l'API et de ses dépendances." />

      {isLoading ? <LoadingState label="Vérification du statut…" /> : null}
      {error ? <ErrorState error={error} onRetry={reload} /> : null}

      {data ? (
        <div className="mx-auto flex max-w-2xl flex-col gap-4">
          <div
            className={
              data.status === "ok"
                ? "flex items-center gap-3 rounded-md border border-emerald-200 bg-emerald-50 px-5 py-4 dark:border-emerald-900 dark:bg-emerald-950/60"
                : "flex items-center gap-3 rounded-md border border-amber-200 bg-amber-50 px-5 py-4 dark:border-amber-900 dark:bg-amber-950/60"
            }
          >
            {data.status === "ok" ? (
              <IconCheckCircle className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
            ) : (
              <IconAlert className="h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" />
            )}
            <div>
              <p className="text-sm font-semibold text-[var(--foreground)]">
                {data.status === "ok" ? "Tous les systèmes sont opérationnels" : "Service dégradé"}
              </p>
              <p className="text-xs text-[var(--muted)]">
                Dernière vérification : {new Date(data.timestamp).toLocaleString("fr-FR")}
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-md border border-[var(--hairline)]">
            <ul className="divide-y divide-[var(--hairline)]">
              {Object.entries(data.checks).map(([key, value]) => (
                <li key={key} className="flex items-center justify-between px-4 py-3">
                  <span className="text-sm text-[var(--foreground)]">{CHECK_LABELS[key] ?? key}</span>
                  <span
                    className={
                      value === "ok"
                        ? "flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400"
                        : "flex items-center gap-1.5 text-xs font-semibold text-rose-700 dark:text-rose-400"
                    }
                  >
                    <span className={value === "ok" ? "h-1.5 w-1.5 rounded-full bg-emerald-500" : "h-1.5 w-1.5 rounded-full bg-rose-500"} />
                    {value === "ok" ? "Opérationnel" : "Indisponible"}
                  </span>
                </li>
              ))}
              <li className="flex items-center justify-between px-4 py-3">
                <span className="text-sm text-[var(--foreground)]">Moyens de paiement actifs</span>
                <span className="text-xs font-medium text-[var(--muted)]">
                  {data.payment_methods.length > 0 ? data.payment_methods.join(", ") : "Aucun configuré"}
                </span>
              </li>
            </ul>
          </div>
        </div>
      ) : null}
    </>
  );
}
