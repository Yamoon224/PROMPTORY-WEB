import { Card, CardBody } from "@/components/ui";
import { IconCheckCircle, IconDashboard, IconDownload, IconLock, IconRobot, IconTag } from "@/components/ui/icons";

const REASONS = [
  {
    icon: <IconLock className="h-5 w-5" />,
    title: "Paiement securise",
    text: "Carte bancaire ou PayPal : aucune donnee de paiement n'est stockee sur nos serveurs.",
  },
  {
    icon: <IconCheckCircle className="h-5 w-5" />,
    title: "Prompts moderes",
    text: "Chaque prompt publie passe par une validation avant d'apparaitre sur la marketplace.",
  },
  {
    icon: <IconDownload className="h-5 w-5" />,
    title: "Acces immediat",
    text: "Votre achat est disponible tout de suite, pret a copier-coller.",
  },
  {
    icon: <IconRobot className="h-5 w-5" />,
    title: "Multi-outils IA",
    text: "ChatGPT, Claude, Midjourney et bien d'autres, filtrables par outil.",
  },
  {
    icon: <IconTag className="h-5 w-5" />,
    title: "Recherche precise",
    text: "Categories, tags et filtres pour trouver le prompt qu'il vous faut en quelques clics.",
  },
  {
    icon: <IconDashboard className="h-5 w-5" />,
    title: "Espace createur",
    text: "Statistiques de ventes, gestion des prompts et abonnement premium optionnel.",
  },
];

export function WhyPromptory() {
  return (
    <section className="py-10">
      <h2 className="text-xl font-extrabold tracking-tight">Pourquoi Promptory ?</h2>
      <span aria-hidden="true" className="grad-brand mt-2 block h-[3px] w-12 rounded-full" />

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {REASONS.map((reason) => (
          <Card key={reason.title} className="h-full">
            <CardBody className="flex flex-col gap-2.5 p-5 sm:p-6">
              <span className="grad-brand-soft flex h-10 w-10 items-center justify-center rounded-sm text-brand-600 dark:text-brand-400">
                {reason.icon}
              </span>
              <h3 className="mt-1 text-sm font-bold">{reason.title}</h3>
              <p className="text-sm leading-relaxed text-[var(--muted)]">{reason.text}</p>
            </CardBody>
          </Card>
        ))}
      </div>
    </section>
  );
}
