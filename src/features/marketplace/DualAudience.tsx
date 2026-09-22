import Link from "next/link";
import { Card, CardBody } from "@/components/ui";
import { IconArrowRight, IconCart, IconCoins } from "@/components/ui/icons";

/**
 * Les deux publics de la marketplace, cote a cote : un acheteur et un
 * createur n'arrivent pas avec la meme intention, chacun merite sa propre
 * porte d'entree plutot qu'un CTA generique.
 */
export function DualAudience() {
  return (
    <section className="py-10">
      <div className="grid gap-5 md:grid-cols-2">
        <Card interactive className="h-full">
          <CardBody className="flex flex-col gap-3 p-6 sm:p-8">
            <span className="grad-brand flex h-11 w-11 items-center justify-center rounded-sm text-white shadow-card">
              <IconCart className="h-5 w-5" />
            </span>
            <h3 className="font-display mt-1 text-lg font-semibold tracking-tight">Je veux acheter</h3>
            <p className="text-sm leading-relaxed text-[var(--muted)]">
              Parcourez des prompts testes par outil IA, categorie ou tag, et payez en toute securite par carte ou
              PayPal.
            </p>
            <Link
              href="/#browser"
              className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300"
            >
              Explorer les prompts
              <IconArrowRight className="h-3.5 w-3.5" />
            </Link>
          </CardBody>
        </Card>

        <Card interactive className="h-full">
          <CardBody className="flex flex-col gap-3 p-6 sm:p-8">
            <span className="grad-brand flex h-11 w-11 items-center justify-center rounded-sm text-white shadow-card">
              <IconCoins className="h-5 w-5" />
            </span>
            <h3 className="font-display mt-1 text-lg font-semibold tracking-tight">Je veux vendre</h3>
            <p className="text-sm leading-relaxed text-[var(--muted)]">
              Publiez vos prompts ou packs, fixez votre prix et suivez vos ventes depuis votre espace createur.
            </p>
            <Link
              href="/inscription"
              className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300"
            >
              Devenir createur
              <IconArrowRight className="h-3.5 w-3.5" />
            </Link>
          </CardBody>
        </Card>
      </div>
    </section>
  );
}
