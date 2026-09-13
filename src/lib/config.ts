/**
 * Configuration lue depuis l'environnement.
 *
 * Regroupee ici pour qu'aucun composant n'aille chercher `process.env`
 * lui-meme : une URL d'API en dur dans un composant ne se decouvre qu'au
 * premier deploiement en recette.
 */

const DEFAULT_API_URL = "http://localhost:8000/api";

export const config = {
  /** URL de base de l'API Laravel, sans slash final. */
  apiUrl: (process.env.NEXT_PUBLIC_API_URL ?? DEFAULT_API_URL).replace(/\/$/, ""),

  /** Cle de stockage du jeton d'authentification. */
  tokenStorageKey: "promptory_auth_token",

  /** Taille de page par defaut des listes. */
  defaultPageSize: 15,

  /** Devise unique du lot. Doit rester alignee sur `config/promptory.php` cote backend. */
  currency: "EUR",
} as const;
