"use client";

import Link from "next/link";
import { useCallback } from "react";
import { Badge, Button, Card, CardBody, ErrorState, FormAlert, LoadingState } from "@/components/ui";
import { useAuth } from "@/features/auth/AuthContext";
import { useAsyncData } from "@/hooks/useAsyncData";
import { useMutation } from "@/hooks/useMutation";
import { formatMoney } from "@/lib/format";
import { packService, saleService } from "@/services";

export function PackDetail({ slug }: { slug: string }) {
  const { user } = useAuth();
  const loadPack = useCallback(() => packService.getPack(slug), [slug]);
  const { data: pack, isLoading, error, reload } = useAsyncData(loadPack);
  const purchase = useMutation(() => saleService.purchasePack(pack!.id));

  if (isLoading) return <LoadingState label="Chargement du pack…" />;
  if (error || !pack) return <ErrorState error={error} onRetry={reload} />;

  const isOwner = user?.id === pack.creator?.id;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_20rem]">
      <Card>
        <CardBody className="flex flex-col gap-4">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight">{pack.title}</h1>
            <p className="mt-1 text-sm text-[var(--muted)]">Par {pack.creator?.name ?? "Createur inconnu"}</p>
          </div>

          {pack.description ? <p className="text-sm text-[var(--muted)]">{pack.description}</p> : null}

          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
              Prompts inclus ({pack.prompts?.length ?? 0})
            </p>
            <ul className="flex flex-col gap-2">
              {pack.prompts?.map((prompt) => (
                <li key={prompt.id} className="flex items-center justify-between gap-3 rounded-sm border border-[var(--hairline)] px-3 py-2">
                  <Link href={`/prompts/${prompt.slug}`} className="truncate text-sm font-semibold hover:text-brand-600">
                    {prompt.title}
                  </Link>
                  <Badge tone="neutral">{prompt.price === 0 ? "Gratuit" : formatMoney(prompt.price)}</Badge>
                </li>
              ))}
            </ul>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody className="flex flex-col gap-4">
          <p className="text-3xl font-extrabold tabular-nums text-brand-700 dark:text-brand-400">{formatMoney(pack.price)}</p>

          {isOwner ? (
            <p className="text-sm text-[var(--muted)]">Vous etes le createur de ce pack.</p>
          ) : user ? (
            <>
              {purchase.error ? <FormAlert>Le paiement a echoue. Reessayez.</FormAlert> : null}
              <Button
                size="lg"
                className="w-full"
                isLoading={purchase.isPending}
                onClick={async () => {
                  await purchase.run(undefined);
                }}
              >
                Acheter le pack
              </Button>
            </>
          ) : (
            <p className="text-sm text-[var(--muted)]">
              <Link href="/connexion" className="font-semibold text-brand-600">
                Connectez-vous
              </Link>{" "}
              pour acheter ce pack.
            </p>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
