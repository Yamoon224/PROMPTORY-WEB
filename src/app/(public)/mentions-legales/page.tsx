import type { Metadata } from "next";
import { LegalContent, LegalPlaceholderNotice, LegalSection } from "@/components/legal/LegalContent";
import { PageHeader } from "@/components/ui";

export const metadata: Metadata = { title: "Mentions légales" };

export default function MentionsLegalesPage() {
  return (
    <>
      <PageHeader title="Mentions légales" description="Informations légales relatives à l'éditeur du site Promptory." />

      <LegalContent updatedAt="26 septembre 2026">
        <LegalPlaceholderNotice />

        <LegalSection title="1. Éditeur du site">
          <p>
            Le site Promptory (app.promptory.io) est édité par [Raison sociale], [forme juridique], au capital de
            [montant] euros, immatriculée au Registre du Commerce et des Sociétés de [ville] sous le numéro
            [SIRET], dont le siège social est situé [adresse complète], Paris, France.
          </p>
          <p>Directeur de la publication : [Nom du représentant légal].</p>
          <p>
            Contact : <a href="mailto:hello@promptory.io" className="font-semibold text-brand-600 dark:text-brand-400">hello@promptory.io</a>
          </p>
        </LegalSection>

        <LegalSection title="2. Hébergement">
          <p>
            Le site est hébergé par [Nom de l&apos;hébergeur], [adresse de l&apos;hébergeur]. L&apos;infrastructure
            applicative (API et base de données) est hébergée par [Nom de l&apos;hébergeur cloud].
          </p>
        </LegalSection>

        <LegalSection title="3. Propriété intellectuelle">
          <p>
            La marque « Promptory », le logo et l&apos;ensemble des éléments graphiques, textuels et logiciels du
            site sont la propriété exclusive de [Raison sociale], sauf mention contraire. Toute reproduction ou
            représentation, totale ou partielle, sans autorisation préalable est interdite.
          </p>
          <p>
            Les prompts publiés par les créateurs restent la propriété intellectuelle de leurs auteurs respectifs,
            dans les conditions décrites dans les{" "}
            <a href="/conditions-utilisation" className="font-semibold text-brand-600 dark:text-brand-400">
              conditions d&apos;utilisation
            </a>
            .
          </p>
        </LegalSection>

        <LegalSection title="4. Données personnelles">
          <p>
            Le traitement des données personnelles des utilisateurs est décrit dans notre{" "}
            <a href="/confidentialite" className="font-semibold text-brand-600 dark:text-brand-400">
              politique de confidentialité
            </a>
            .
          </p>
        </LegalSection>

        <LegalSection title="5. Contact">
          <p>
            Pour toute question relative aux présentes mentions légales, vous pouvez nous écrire à{" "}
            <a href="mailto:hello@promptory.io" className="font-semibold text-brand-600 dark:text-brand-400">
              hello@promptory.io
            </a>
            .
          </p>
        </LegalSection>
      </LegalContent>
    </>
  );
}
