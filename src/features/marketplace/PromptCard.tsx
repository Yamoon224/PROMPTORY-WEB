import Link from "next/link";
import { Badge, Card, CardBody, CardFooter } from "@/components/ui";
import { IconStar } from "@/components/ui/icons";
import { AddToCartButton } from "@/features/cart/AddToCartButton";
import { formatMoney } from "@/lib/format";
import type { Prompt } from "@/types/api";
import { DECORATIVE_ICONS } from "./marketplace-icons";

/**
 * Vignette d'un prompt dans une grille de resultats.
 *
 * Sans photo produit (un prompt n'en a pas), la couverture reprend le
 * dégradé de marque en fond et une icône décorative - le même repère que les
 * chips de catégorie - pour que la carte se lise comme une fiche produit et
 * non comme une simple ligne de liste.
 *
 * L'ordre de lecture reprend celui d'une fiche produit : titre, createur,
 * outils IA / categories, puis prix - la seule information que l'oeil
 * cherche en dernier, une fois convaincu par le reste.
 *
 * Le bouton panier est un frere du lien de navigation, pas un enfant : un
 * `<a>` ne peut pas contenir de bouton, seul le pied de carte (prix + panier)
 * en sort donc.
 */
export function PromptCard({ prompt }: { prompt: Prompt }) {
  const Icon = DECORATIVE_ICONS[Math.abs(prompt.id) % DECORATIVE_ICONS.length];

  return (
    <Card interactive className="h-full">
      <Link
        href={`/prompts/${prompt.slug}`}
        className="flex flex-1 flex-col rounded-t-md focus-visible:outline-2 focus-visible:outline-brand-500"
      >
        <div className="relative flex h-24 shrink-0 items-center justify-center overflow-hidden grad-brand-soft">
          <Icon className="relative h-9 w-9 text-brand-400/70 dark:text-brand-400/40" />
          {prompt.is_free ? (
            <Badge tone="success" className="absolute right-2 top-2">
              Gratuit
            </Badge>
          ) : null}
        </div>

        <CardBody className="flex flex-1 flex-col gap-3">
          <h3 className="font-display text-base font-semibold leading-snug text-stone-900 dark:text-stone-50">
            {prompt.title}
          </h3>

          <p className="text-xs text-[var(--muted)]">Par {prompt.creator?.name ?? "Createur inconnu"}</p>

          {(prompt.ia_models && prompt.ia_models.length > 0) || (prompt.categories && prompt.categories.length > 0) ? (
            <div className="flex flex-wrap gap-1.5">
              {prompt.ia_models?.slice(0, 1).map((iaModel) => (
                <Badge key={`ia-${iaModel.id}`} tone="info">
                  {iaModel.name}
                </Badge>
              ))}
              {prompt.categories?.slice(0, 2).map((category) => (
                <Badge key={category.id} tone="brand">
                  {category.name}
                </Badge>
              ))}
            </div>
          ) : null}

          {typeof prompt.average_rating === "number" ? (
            <p className="flex items-center gap-1 text-xs font-semibold text-amber-600 dark:text-amber-400">
              <IconStar className="h-3.5 w-3.5" />
              {prompt.average_rating.toFixed(1)}
              <span className="font-normal text-[var(--muted)]">({prompt.reviews_count ?? 0})</span>
            </p>
          ) : null}
        </CardBody>
      </Link>
      <CardFooter className="justify-between">
        <span className="text-xs text-[var(--muted)]">{prompt.downloads_count} telechargements</span>
        <div className="flex items-center gap-2">
          <span className="font-display text-lg font-semibold tabular-nums text-brand-700 dark:text-brand-400">
            {prompt.is_free ? "Gratuit" : formatMoney(prompt.price)}
          </span>
          <AddToCartButton
            item={{
              kind: "prompt",
              id: prompt.id,
              title: prompt.title,
              slug: prompt.slug,
              price: prompt.price,
              isFree: prompt.is_free,
              creatorName: prompt.creator?.name ?? "Createur inconnu",
            }}
          />
        </div>
      </CardFooter>
    </Card>
  );
}
