import Link from "next/link";
import { Badge, Card, CardBody, CardFooter } from "@/components/ui";
import { formatMoney } from "@/lib/format";
import type { Pack } from "@/types/api";

export function PackCard({ pack }: { pack: Pack }) {
  return (
    <Link href={`/packs/${pack.slug}`} className="block h-full rounded-sm focus-visible:outline-2 focus-visible:outline-brand-500">
      <Card interactive className="h-full">
        <CardBody className="flex flex-1 flex-col gap-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-sm font-bold leading-snug text-zinc-900 dark:text-zinc-50">{pack.title}</h3>
            <Badge tone="brand">{pack.prompts_count ?? pack.prompts?.length ?? 0} prompts</Badge>
          </div>
          {pack.description ? <p className="line-clamp-2 text-xs text-[var(--muted)]">{pack.description}</p> : null}
          <p className="text-xs text-[var(--muted)]">Par {pack.creator?.name ?? "Createur inconnu"}</p>
        </CardBody>
        <CardFooter className="justify-end">
          <span className="text-base font-extrabold tabular-nums text-brand-700 dark:text-brand-400">
            {formatMoney(pack.price)}
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}
