import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui";

export const metadata: Metadata = { title: "Centre d'aide" };

const TOPICS: Array<{ title: string; questions: Array<{ question: string; answer: string }> }> = [
  {
    title: "Démarrer",
    questions: [
      {
        question: "Comment créer mon premier prompt ?",
        answer:
          "Depuis votre espace, ouvrez « Mes prompts » puis « Nouveau prompt ». Renseignez le contenu, les variables entre accolades ({ton}, {objectif}…) et enregistrez : il reste privé jusqu'à ce que vous décidiez de le publier.",
      },
      {
        question: "Comment organiser ma bibliothèque ?",
        answer:
          "Créez des dossiers depuis « Mes dossiers » pour regrouper vos prompts par thème, client ou outil IA. Vous pouvez aussi marquer vos prompts favoris pour un accès rapide.",
      },
    ],
  },
  {
    title: "Extension Chrome",
    questions: [
      {
        question: "Où installer l'extension ?",
        answer:
          "L'extension Promptory est disponible gratuitement sur le Chrome Web Store. Une fois installée, connectez-vous avec votre compte Promptory pour synchroniser votre bibliothèque.",
      },
      {
        question: "Comment injecter un prompt dans ChatGPT, Claude ou Gemini ?",
        answer:
          "Ouvrez l'outil IA, placez le curseur dans la zone de saisie puis utilisez le raccourci ALT+P pour ouvrir le sélecteur de prompts Promptory et insérer le prompt choisi, variables comprises.",
      },
    ],
  },
  {
    title: "Vendre sur la marketplace",
    questions: [
      {
        question: "Comment publier un prompt à la vente ?",
        answer:
          "Depuis l'édition d'un prompt, choisissez « Soumettre à la modération ». Une fois approuvé, il apparaît sur la marketplace au prix que vous avez fixé.",
      },
      {
        question: "Combien de temps prend la modération ?",
        answer: "La grande majorité des soumissions sont traitées en moins de 24h ouvrées.",
      },
    ],
  },
  {
    title: "Paiements et facturation",
    questions: [
      {
        question: "Quand suis-je payé pour mes ventes ?",
        answer:
          "Vos revenus (90% du prix de vente) sont visibles en temps réel dans « Mes ventes » et versés selon la périodicité de votre moyen de paiement enregistré.",
      },
      {
        question: "Puis-je me faire rembourser un achat ?",
        answer:
          "Les prompts étant des contenus numériques consultables immédiatement, les achats ne sont en principe pas remboursables - voir les conditions d'utilisation pour le détail.",
      },
    ],
  },
];

export default function AidePage() {
  return (
    <>
      <PageHeader title="Centre d'aide" description="Des réponses claires, classées par sujet." />

      <div className="mx-auto flex max-w-3xl flex-col gap-10">
        {TOPICS.map((topic) => (
          <section key={topic.title}>
            <h2 className="font-display text-lg font-semibold text-[var(--foreground)]">{topic.title}</h2>
            <dl className="mt-4 flex flex-col gap-5">
              {topic.questions.map((item) => (
                <div key={item.question}>
                  <dt className="text-sm font-semibold text-[var(--foreground)]">{item.question}</dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-[var(--muted)]">{item.answer}</dd>
                </div>
              ))}
            </dl>
          </section>
        ))}

        <section className="flex flex-col items-start gap-2 rounded-md border border-[var(--hairline)] bg-[var(--surface-muted)] px-5 py-4">
          <p className="text-sm font-semibold text-[var(--foreground)]">Vous ne trouvez pas votre réponse ?</p>
          <p className="text-sm text-[var(--muted)]">
            Consultez aussi la <Link href="/#faq" className="font-semibold text-brand-600 dark:text-brand-400">FAQ</Link> de
            la page d&apos;accueil, ou écrivez-nous directement à{" "}
            <a href="mailto:hello@promptory.io" className="font-semibold text-brand-600 dark:text-brand-400">
              hello@promptory.io
            </a>
            . Notre équipe répond en moins de 12h.
          </p>
        </section>
      </div>
    </>
  );
}
