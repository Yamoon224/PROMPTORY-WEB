import type { ReactNode } from "react";
import { Card, CardBody } from "@/components/ui";
import { IconCoins, IconRobot, IconSparkle } from "@/components/ui/icons";

/** Mise en page commune a la connexion et a l'inscription. */
export function AuthPanel({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return (
    <div className="mx-auto grid max-w-5xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1fr_26rem] md:items-center md:py-16">
      <div className="hidden md:block">
        <h1 className="text-4xl font-extrabold leading-tight tracking-tight">
          Vos meilleurs prompts, <span className="grad-brand-text">enfin valorises</span>.
        </h1>
        <p className="mt-4 max-w-md text-[var(--muted)]">
          Un seul compte pour creer, publier et acheter des prompts IA prets a l&apos;emploi.
        </p>
        <ul className="mt-8 space-y-4 text-sm">
          {[
            { icon: <IconSparkle className="h-4 w-4" />, text: "Publiez vos prompts pour ChatGPT, Claude, Midjourney…" },
            { icon: <IconCoins className="h-4 w-4" />, text: "Fixez votre prix et suivez vos ventes en temps reel" },
            { icon: <IconRobot className="h-4 w-4" />, text: "Achetez des prompts testes et notes par la communaute" },
          ].map((item) => (
            <li key={item.text} className="flex items-center gap-3">
              <span className="grad-brand-soft flex h-9 w-9 items-center justify-center rounded-sm text-brand-600 dark:text-brand-400">
                {item.icon}
              </span>
              {item.text}
            </li>
          ))}
        </ul>
      </div>

      <Card>
        <CardBody className="p-5 sm:p-7">
          <h2 className="text-xl font-extrabold tracking-tight">{title}</h2>
          <span aria-hidden="true" className="grad-brand mt-2 block h-[3px] w-12 rounded-full" />
          <p className="mb-6 mt-3 text-sm text-[var(--muted)]">{description}</p>
          {children}
        </CardBody>
      </Card>
    </div>
  );
}
