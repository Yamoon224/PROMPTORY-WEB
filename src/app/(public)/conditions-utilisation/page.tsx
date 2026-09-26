import type { Metadata } from "next";
import { LegalContent, LegalPlaceholderNotice, LegalSection } from "@/components/legal/LegalContent";
import { PageHeader } from "@/components/ui";

export const metadata: Metadata = { title: "Conditions d'utilisation" };

export default function ConditionsUtilisationPage() {
  return (
    <>
      <PageHeader
        title="Conditions d'utilisation"
        description="Les règles qui encadrent l'utilisation de Promptory par les acheteurs et les créateurs."
      />

      <LegalContent updatedAt="26 septembre 2026">
        <LegalPlaceholderNotice />

        <LegalSection title="1. Objet">
          <p>
            Les présentes conditions régissent l&apos;accès et l&apos;utilisation de Promptory, plateforme de
            création, d&apos;organisation et de vente de prompts pour intelligences artificielles génératives
            (ChatGPT, Claude, Gemini et autres). L&apos;utilisation du service implique l&apos;acceptation pleine
            et entière de ces conditions.
          </p>
        </LegalSection>

        <LegalSection title="2. Compte utilisateur">
          <p>
            La création d&apos;un compte requiert une adresse e-mail valide. Vous êtes responsable de la
            confidentialité de vos identifiants et de toute activité réalisée depuis votre compte.
          </p>
        </LegalSection>

        <LegalSection title="3. Contenus publiés par les créateurs">
          <p>
            Tout prompt ou pack soumis à la marketplace passe par une modération avant publication. Promptory se
            réserve le droit de refuser ou de retirer un contenu qui enfreindrait la loi, les droits d&apos;un
            tiers ou les présentes conditions (contenu illicite, trompeur, ou visant à contourner les politiques
            d&apos;usage des outils d&apos;IA cibles).
          </p>
          <p>
            Le créateur conserve la propriété intellectuelle de ses prompts. En les publiant sur la marketplace,
            il concède à Promptory et aux acheteurs une licence d&apos;utilisation dans les conditions décrites
            ci-dessous.
          </p>
        </LegalSection>

        <LegalSection title="4. Achats, licences et remboursements">
          <p>
            L&apos;achat d&apos;un prompt ou d&apos;un pack confère à l&apos;acheteur un droit d&apos;usage
            personnel (ou professionnel selon le plan souscrit), non exclusif et non cessible. La revente ou la
            republication d&apos;un prompt acheté, en l&apos;état ou légèrement modifié, est interdite.
          </p>
          <p>
            Compte tenu de la nature numérique et immédiatement consommable des prompts, aucun remboursement
            n&apos;est possible une fois le contenu consulté, sauf disposition légale contraire.
          </p>
        </LegalSection>

        <LegalSection title="5. Commission et reversement aux créateurs">
          <p>
            Promptory prélève une commission de 10% sur chaque vente réalisée sur la marketplace. Les 90% restants
            sont reversés au créateur selon les modalités et échéances précisées dans son espace créateur.
          </p>
        </LegalSection>

        <LegalSection title="6. Extension Chrome">
          <p>
            L&apos;extension Chrome Promptory permet d&apos;injecter un prompt de votre bibliothèque directement
            dans l&apos;interface d&apos;un outil d&apos;IA tiers. Son utilisation reste soumise aux conditions
            d&apos;utilisation propres à chacun de ces outils, dont Promptory n&apos;est pas responsable.
          </p>
        </LegalSection>

        <LegalSection title="7. Résiliation">
          <p>
            Vous pouvez supprimer votre compte à tout moment depuis votre espace personnel. Promptory peut
            suspendre ou résilier un compte en cas de manquement grave ou répété aux présentes conditions.
          </p>
        </LegalSection>

        <LegalSection title="8. Limitation de responsabilité">
          <p>
            Promptory agit en tant qu&apos;intermédiaire technique entre créateurs et acheteurs. Le contenu des
            prompts publiés relève de la seule responsabilité de leurs auteurs. Promptory ne garantit pas les
            résultats obtenus en utilisant un prompt avec un outil d&apos;IA tiers.
          </p>
        </LegalSection>

        <LegalSection title="9. Droit applicable">
          <p>
            Les présentes conditions sont soumises au droit français. Tout litige relatif à leur interprétation ou
            à leur exécution relève des tribunaux compétents, à défaut de résolution amiable préalable.
          </p>
        </LegalSection>
      </LegalContent>
    </>
  );
}
