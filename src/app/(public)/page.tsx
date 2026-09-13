import { Card, CardBody } from "@/components/ui";
import { IconCoins, IconRobot, IconSparkle } from "@/components/ui/icons";
import { PromptBrowser } from "@/features/marketplace/PromptBrowser";

const STEPS = [
  {
    icon: <IconSparkle className="h-5 w-5" />,
    title: "Trouvez le bon prompt",
    text: "Filtrez par categorie, tag ou outil IA et lisez les avis d'autres utilisateurs avant d'acheter.",
  },
  {
    icon: <IconCoins className="h-5 w-5" />,
    title: "Achetez en un clic",
    text: "Paiement securise, sans stocker vos donnees bancaires. Votre achat est immediatement disponible.",
  },
  {
    icon: <IconRobot className="h-5 w-5" />,
    title: "Utilisez-le partout",
    text: "Copiez le prompt et collez-le dans ChatGPT, Claude, Midjourney ou tout autre outil IA.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden rounded-sm">
        <div aria-hidden="true" className="grad-brand absolute inset-x-0 top-0 h-[22rem] rounded-sm sm:h-[20rem]" />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-[22rem] rounded-sm opacity-[0.12] sm:h-[20rem]"
          style={{ backgroundImage: "repeating-linear-gradient(135deg, #fff 0 18px, transparent 18px 36px)" }}
        />

        <div className="relative px-4 pb-10 pt-10 sm:px-8 sm:pt-14">
          <div className="max-w-2xl text-white">
            <p className="inline-flex items-center gap-2 rounded-sm bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-wider backdrop-blur">
              <IconSparkle className="h-3.5 w-3.5" />
              Marketplace de prompts IA
            </p>
            <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              Des prompts qui marchent, prets a copier-coller.
            </h1>
            <p className="mt-3 max-w-xl text-base text-white/90 sm:text-lg">
              Redaction, marketing, developpement, image : trouvez le prompt qu&apos;il vous faut, ou vendez les
              votres.
            </p>
          </div>
        </div>
      </section>

      <section className="py-10">
        <ol className="grid gap-5 md:grid-cols-3">
          {STEPS.map((step, index) => (
            <li key={step.title}>
              <Card interactive className="h-full">
                <CardBody className="p-5 sm:p-6">
                  <div className="flex items-center gap-3">
                    <span className="grad-brand flex h-11 w-11 items-center justify-center rounded-sm text-white shadow-card">
                      {step.icon}
                    </span>
                    <span className="text-4xl font-extrabold text-brand-100 dark:text-zinc-800">0{index + 1}</span>
                  </div>
                  <h3 className="mt-4 text-base font-bold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{step.text}</p>
                </CardBody>
              </Card>
            </li>
          ))}
        </ol>
      </section>

      <section className="pb-10">
        <h2 className="text-xl font-extrabold tracking-tight">Explorer les prompts</h2>
        <span aria-hidden="true" className="grad-brand mt-2 block h-[3px] w-12 rounded-full" />
        <div className="mt-6">
          <PromptBrowser />
        </div>
      </section>
    </>
  );
}
