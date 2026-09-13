import Link from "next/link";
import { Badge, Card, CardBody, CardFooter } from "@/components/ui";
import { IconStar } from "@/components/ui/icons";
import { formatMoney } from "@/lib/format";
import type { Prompt } from "@/types/api";

/**
 * Vignette d'un prompt dans une grille de resultats.
 *
 * L'ordre de lecture reprend celui d'une fiche produit : titre, createur,
 * categories, puis prix — la seule information que l'oeil cherche en dernier,
 * une fois convaincu par le reste.
 */
export function PromptCard({ prompt }: { prompt: Prompt }) {
  return (
    <Link href={`/prompts/${prompt.slug}`} className="block h-full rounded-sm focus-visible:outline-2 focus-visible:outline-brand-500">
      <Card interactive className="h-full">
        <CardBody className="flex flex-1 flex-col gap-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-sm font-bold leading-snug text-zinc-900 dark:text-zinc-50">{prompt.title}</h3>
            {prompt.is_free ? <Badge tone="success">Gratuit</Badge> : null}
          </div>

          <p className="text-xs text-[var(--muted)]">Par {prompt.creator?.name ?? "Createur inconnu"}</p>

          {prompt.categories && prompt.categories.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {prompt.categories.slice(0, 2).map((category) => (
                <Badge key={category.id} tone="brand">
                  {category.name}
                </Badge>
              ))}
            </div>
          ) : null}

          {prompt.average_rating !== null ? (
            <p className="flex items-center gap-1 text-xs font-semibold text-amber-600 dark:text-amber-400">
              <IconStar className="h-3.5 w-3.5" />
              {prompt.average_rating.toFixed(1)}
              <span className="font-normal text-[var(--muted)]">({prompt.reviews_count ?? 0})</span>
            </p>
          ) : null}
        </CardBody>
        <CardFooter className="justify-between">
          <span className="text-xs text-[var(--muted)]">{prompt.downloads_count} telechargements</span>
          <span className="text-base font-extrabold tabular-nums text-brand-700 dark:text-brand-400">
            {prompt.is_free ? "Gratuit" : formatMoney(prompt.price)}
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}
