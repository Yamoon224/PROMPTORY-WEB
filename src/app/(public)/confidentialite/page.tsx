import type { Metadata } from "next";
import { LegalContent, LegalPlaceholderNotice, LegalSection } from "@/components/legal/LegalContent";
import { PageHeader } from "@/components/ui";

export const metadata: Metadata = { title: "Confidentialité" };

export default function ConfidentialitePage() {
  return (
    <>
      <PageHeader
        title="Politique de confidentialité"
        description="Comment Promptory collecte, utilise et protège vos données personnelles."
      />

      <LegalContent updatedAt="26 septembre 2026">
        <LegalPlaceholderNotice />

        <LegalSection title="1. Responsable du traitement">
          <p>
            Le responsable du traitement des données est [Raison sociale], éditeur de Promptory, dont les
            coordonnées figurent dans les{" "}
            <a href="/mentions-legales" className="font-semibold text-brand-600 dark:text-brand-400">
              mentions légales
            </a>
            .
          </p>
        </LegalSection>

        <LegalSection title="2. Données collectées">
          <p>Nous collectons les données strictement nécessaires au fonctionnement de la plateforme :</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Identité et contact : nom, adresse e-mail, mot de passe (chiffré).</li>
            <li>Activité créateur : prompts et packs publiés, ventes, revenus.</li>
            <li>Activité acheteur : historique d&apos;achats, favoris, dossiers.</li>
            <li>Données de facturation transmises à notre prestataire de paiement (jamais stockées en clair par Promptory).</li>
            <li>Données techniques : adresse IP, journaux de connexion, préférences de thème.</li>
          </ul>
        </LegalSection>

        <LegalSection title="3. Finalités et base légale">
          <p>
            Ces données sont traitées pour l&apos;exécution du contrat (création de compte, achats, ventes), le
            respect d&apos;obligations légales (facturation, lutte contre la fraude) et, avec votre consentement,
            l&apos;envoi de communications commerciales (formulaire d&apos;inscription à nos actualités).
          </p>
        </LegalSection>

        <LegalSection title="4. Durée de conservation">
          <p>
            Les données de compte sont conservées pendant toute la durée d&apos;utilisation du service, puis
            archivées ou supprimées conformément aux durées légales de conservation applicables (notamment en
            matière comptable et fiscale).
          </p>
        </LegalSection>

        <LegalSection title="5. Vos droits">
          <p>
            Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d&apos;un droit
            d&apos;accès, de rectification, d&apos;effacement, de limitation, d&apos;opposition et de portabilité
            de vos données. Vous pouvez exercer ces droits en écrivant à{" "}
            <a href="mailto:hello@promptory.io" className="font-semibold text-brand-600 dark:text-brand-400">
              hello@promptory.io
            </a>
            . Vous disposez également du droit d&apos;introduire une réclamation auprès de la CNIL
            (www.cnil.fr).
          </p>
        </LegalSection>

        <LegalSection title="6. Sous-traitants et hébergement">
          <p>
            Certaines données sont traitées par des prestataires tiers (hébergement, paiement, envoi
            d&apos;e-mails), dans le cadre de contrats garantissant un niveau de protection conforme au RGPD.
            Aucune donnée n&apos;est vendue à des tiers.
          </p>
        </LegalSection>

        <LegalSection title="7. Sécurité">
          <p>
            Les mots de passe sont stockés de manière chiffrée et les échanges avec l&apos;API sont réalisés en
            HTTPS. L&apos;accès aux données est restreint aux personnes habilitées.
          </p>
        </LegalSection>

        <LegalSection title="8. Modifications">
          <p>
            Cette politique peut être mise à jour pour refléter des évolutions légales ou fonctionnelles. La date
            de dernière mise à jour figure en haut de cette page.
          </p>
        </LegalSection>
      </LegalContent>
    </>
  );
}
