import type { Metadata } from "next";
import { LegalContent, LegalSection } from "@/components/legal/LegalContent";
import { PageHeader } from "@/components/ui";
import { config } from "@/lib/config";

export const metadata: Metadata = { title: "Documentation API" };

interface Endpoint {
  method: string;
  path: string;
  description: string;
}

const PUBLIC_ENDPOINTS: Endpoint[] = [
  { method: "GET", path: "/health", description: "Etat de sante de la plateforme (base de donnees, moyens de paiement actifs)." },
  { method: "POST", path: "/register", description: "Creation de compte." },
  { method: "POST", path: "/login", description: "Connexion, retourne un jeton Bearer." },
  { method: "POST", path: "/forgot-password", description: "Envoi d'un lien de reinitialisation de mot de passe." },
  { method: "POST", path: "/reset-password", description: "Reinitialisation du mot de passe via jeton." },
  { method: "GET", path: "/prompts", description: "Liste des prompts publies, avec filtres (recherche, categorie, tag, outil IA)." },
  { method: "GET", path: "/prompts/{slug}", description: "Detail d'un prompt publie." },
  { method: "GET", path: "/packs", description: "Liste des packs publies." },
  { method: "GET", path: "/packs/{slug}", description: "Detail d'un pack publie." },
  { method: "GET", path: "/categories", description: "Referentiel des categories de la marketplace." },
  { method: "GET", path: "/tags", description: "Referentiel des tags de la marketplace." },
  { method: "GET", path: "/ia-models", description: "Outils IA compatibles (ChatGPT, Claude, Gemini…)." },
];

const AUTHENTICATED_ENDPOINTS: Endpoint[] = [
  { method: "GET", path: "/me", description: "Profil du compte connecte." },
  { method: "GET", path: "/my/prompts", description: "Prompts du createur connecte, tous statuts confondus." },
  { method: "POST", path: "/prompts/{id}/purchase", description: "Achat d'un prompt." },
  { method: "GET", path: "/my/purchases", description: "Historique des achats du compte connecte." },
  { method: "GET", path: "/my/earnings", description: "Revenus generes par les ventes du compte connecte." },
];

export default function DocumentationApiPage() {
  return (
    <>
      <PageHeader
        title="Documentation API"
        description="Reference technique de l'API Promptory, consommee par le web, l'extension Chrome et toute integration tierce."
      />

      <LegalContent>
        <LegalSection title="URL de base">
          <p>
            Toutes les routes ci-dessous sont relatives a l&apos;URL de base de l&apos;API :
          </p>
          <p className="rounded-sm bg-[var(--surface-muted)] px-3 py-2 font-mono text-xs text-[var(--foreground)]">
            {config.apiUrl}
          </p>
        </LegalSection>

        <LegalSection title="Authentification">
          <p>
            L&apos;API utilise des jetons Bearer (Laravel Sanctum). Apres <code className="font-mono">POST /login</code> ou{" "}
            <code className="font-mono">POST /register</code>, le jeton retourne doit etre transmis dans l&apos;en-tete{" "}
            <code className="font-mono">Authorization: Bearer &lt;token&gt;</code> de chaque requete authentifiee.
          </p>
        </LegalSection>

        <LegalSection title="Format des erreurs">
          <p>Toute erreur retourne un corps JSON de la forme :</p>
          <pre className="overflow-x-auto rounded-sm bg-[var(--surface-muted)] px-3 py-3 font-mono text-xs text-[var(--foreground)]">
{`{
  "message": "Description lisible de l'erreur",
  "error_code": "code_stable_pour_le_client",
  "context": {},
  "errors": { "champ": ["message de validation"] }
}`}
          </pre>
          <p>
            Le champ <code className="font-mono">errors</code> n&apos;apparait que sur les erreurs de validation
            (422). L&apos;integration doit brancher son comportement sur <code className="font-mono">error_code</code>,
            stable, jamais sur <code className="font-mono">message</code>.
          </p>
        </LegalSection>

        <LegalSection title="Endpoints publics">
          <EndpointTable endpoints={PUBLIC_ENDPOINTS} />
        </LegalSection>

        <LegalSection title="Endpoints authentifies (extrait)">
          <p>Un compte createur a en outre acces a la gestion de ses prompts, packs, ventes et abonnement :</p>
          <EndpointTable endpoints={AUTHENTICATED_ENDPOINTS} />
        </LegalSection>

        <LegalSection title="Limites de debit">
          <p>
            Certains endpoints sensibles (inscription a la newsletter, authentification) sont soumis a une limite
            de requetes par minute et par adresse IP. Une limite atteinte retourne un code{" "}
            <code className="font-mono">429</code> avec <code className="font-mono">error_code: &quot;too_many_requests&quot;</code>.
          </p>
        </LegalSection>
      </LegalContent>
    </>
  );
}

function EndpointTable({ endpoints }: { endpoints: Endpoint[] }) {
  return (
    <div className="overflow-hidden rounded-sm border border-[var(--hairline)]">
      <ul className="divide-y divide-[var(--hairline)]">
        {endpoints.map((endpoint) => (
          <li key={`${endpoint.method} ${endpoint.path}`} className="flex flex-col gap-1 px-3 py-2.5 sm:flex-row sm:items-center sm:gap-3">
            <span className="flex items-center gap-2 sm:w-56 sm:shrink-0">
              <span className="rounded-md bg-brand-50 px-2 py-0.5 text-[11px] font-bold text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">
                {endpoint.method}
              </span>
              <code className="truncate font-mono text-xs text-[var(--foreground)]">{endpoint.path}</code>
            </span>
            <span className="text-xs text-[var(--muted)]">{endpoint.description}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
