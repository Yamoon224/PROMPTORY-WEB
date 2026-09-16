import Link from "next/link";
import { Badge, Card, CardBody, CardFooter } from "@/components/ui";
import { IconPackage } from "@/components/ui/icons";
import { AddToCartButton } from "@/features/cart/AddToCartButton";
import { formatMoney } from "@/lib/format";
import type { Pack } from "@/types/api";

export function PackCard({ pack }: { pack: Pack }) {
  const promptsCount = pack.prompts_count ?? pack.prompts?.length ?? 0;

  return (
    <Card interactive className="h-full">
      <Link
        href={`/packs/${pack.slug}`}
        className="flex flex-1 flex-col rounded-t-lg focus-visible:outline-2 focus-visible:outline-brand-500"
      >
        <div className="relative flex h-24 shrink-0 items-center justify-center overflow-hidden grad-brand-soft">
          <IconPackage className="relative h-9 w-9 text-brand-400/70 dark:text-brand-400/40" />
          <Badge tone="brand" className="absolute right-2 top-2">
            {promptsCount} prompt{promptsCount > 1 ? "s" : ""}
          </Badge>
        </div>

        <CardBody className="flex flex-1 flex-col gap-3">
          <h3 className="text-sm font-bold leading-snug text-zinc-900 dark:text-zinc-50">{pack.title}</h3>
          {pack.description ? <p className="line-clamp-2 text-xs text-[var(--muted)]">{pack.description}</p> : null}
          <p className="text-xs text-[var(--muted)]">Par {pack.creator?.name ?? "Createur inconnu"}</p>
        </CardBody>
      </Link>
      <CardFooter className="justify-end">
        <span className="text-base font-extrabold tabular-nums text-brand-700 dark:text-brand-400">
          {formatMoney(pack.price)}
        </span>
        <AddToCartButton
          item={{
            kind: "pack",
            id: pack.id,
            title: pack.title,
            slug: pack.slug,
            price: pack.price,
            isFree: false,
            creatorName: pack.creator?.name ?? "Createur inconnu",
          }}
        />
      </CardFooter>
    </Card>
  );
}
