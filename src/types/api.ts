/**
 * Types du contrat d'API, alignes sur `backend/resources/openapi/openapi.yaml`.
 *
 * Ecrits a la main plutot que generes : le frontend ne consomme qu'une partie
 * du contrat. En contrepartie, les unions de statuts reprennent exactement les
 * enums PHP - toute divergence se voit a la compilation.
 */

// --- Enveloppes ---------------------------------------------------------------

export interface Paginated<T> {
  data: T[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export interface Single<T> {
  data: T;
}

export interface ListParams {
  page?: number;
  per_page?: number;
  search?: string;
  sort?: string;
  direction?: "asc" | "desc";
}

// --- Statuts --------------------------------------------------------------------

export type PromptStatus = "draft" | "pending_validation" | "published" | "archived";
export type PackStatus = "pending_validation" | "published" | "archived";
export type PaymentStatus = "pending" | "completed" | "failed";
export type SubscriptionType = "creator_premium" | "extension_premium";
export type SubscriptionStatus = "active" | "canceled" | "expired";
export type AttachmentType = "image" | "video" | "link";
export type ActivityAction =
  | "view"
  | "download"
  | "purchase"
  | "edit"
  | "save_folder"
  | "submit_validation"
  | "approve"
  | "reject";

export type RoleName = "admin" | "moderator" | "user";

// --- Comptes ----------------------------------------------------------------------

export interface AuthenticatedUser {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user";
  status: "active" | "inactive";
  profile_photo: string | null;
  permissions: string[];
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user";
  status: "active" | "inactive";
  profile_photo: string | null;
  roles?: RoleName[];
  created_at: string | null;
}

// --- Referentiel -----------------------------------------------------------------

export interface CategoryRef {
  id: number;
  name: string;
  slug: string;
}

export interface Category extends CategoryRef {
  description: string | null;
  parent: CategoryRef | null;
  parent_id: number | null;
  prompts_count?: number;
  created_at: string | null;
}

export interface TagRef {
  id: number;
  name: string;
  slug: string;
}

export interface Tag extends TagRef {
  prompts_count?: number;
}

export interface IaModelRef {
  id: number;
  name: string;
  slug: string;
}

export interface IaModel extends IaModelRef {
  description: string | null;
  is_active: boolean;
  prompts_count?: number;
}

// --- Dossiers et prompts ------------------------------------------------------------

export interface Folder {
  id: number;
  name: string;
  parent_id: number | null;
  prompts_count?: number;
  created_at: string | null;
}

export interface PromptAttachment {
  id: number;
  type: AttachmentType;
  url: string;
}

export interface Prompt {
  id: number;
  title: string;
  slug: string;
  content: string | null;
  price: number;
  is_free: boolean;
  status: PromptStatus;
  rejection_reason?: string | null;
  views_count: number;
  downloads_count: number;
  reviews_count?: number;
  average_rating: number | null;
  creator?: { id: number; name: string };
  folder_id: number | null;
  tags?: TagRef[];
  categories?: CategoryRef[];
  ia_models?: IaModelRef[];
  attachments?: PromptAttachment[];
  created_at: string | null;
}

export interface PromptInput {
  title: string;
  content: string;
  price?: number;
  folder_id?: number | null;
  tags?: number[];
  categories?: number[];
  ia_models?: number[];
}

// --- Packs -------------------------------------------------------------------------

export interface Pack {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  price: number;
  status: PackStatus;
  rejection_reason: string | null;
  prompts_count?: number;
  prompts?: Array<{ id: number; title: string; slug: string; price: number }>;
  creator?: { id: number; name: string };
  created_at: string | null;
}

export interface PackInput {
  title: string;
  description?: string | null;
  price: number;
  prompts: number[];
}

// --- Ventes et abonnements --------------------------------------------------------

export interface Sale {
  id: number;
  client_reference: string;
  prompt: { id: number; title: string; slug: string } | null;
  pack: { id: number; title: string; slug: string } | null;
  buyer?: { id: number; name: string };
  creator?: { id: number; name: string };
  price: number;
  commission: number;
  net_amount: number;
  payment_status: PaymentStatus;
  created_at: string | null;
}

export interface Subscription {
  id: number;
  type: SubscriptionType;
  price: number;
  status: SubscriptionStatus;
  start_date: string;
  end_date: string;
  is_active: boolean;
  user?: { id: number; name: string };
  created_at: string | null;
}

// --- Avis ---------------------------------------------------------------------------

export interface Review {
  id: number;
  rating: number;
  comment: string | null;
  user?: { id: number; name: string };
  created_at: string | null;
}

// --- Audit ---------------------------------------------------------------------------

export interface ActivityLogEntry {
  id: number;
  action: ActivityAction;
  user: { id: number; name: string } | null;
  prompt: { id: number; title: string; slug: string } | null;
  created_at: string | null;
}
