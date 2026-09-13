import type { Tone } from "@/components/ui/Badge";
import type { PackStatus, PaymentStatus, PromptStatus, SubscriptionStatus, SubscriptionType } from "@/types/api";

/**
 * Correspondance statut metier → tonalite visuelle et libelle.
 *
 * Centralisee pour qu'un meme statut ait la meme couleur sur tous les
 * ecrans : « rejete » en rouge ici et en gris la, et plus personne ne sait
 * lequel croire.
 */

export const PROMPT_STATUS_TONE: Record<PromptStatus, Tone> = {
  draft: "neutral",
  pending_validation: "warning",
  published: "success",
  archived: "danger",
};

export const PROMPT_STATUS_LABEL: Record<PromptStatus, string> = {
  draft: "Brouillon",
  pending_validation: "En attente de validation",
  published: "Publie",
  archived: "Archive",
};

export const PACK_STATUS_TONE: Record<PackStatus, Tone> = {
  pending_validation: "warning",
  published: "success",
  archived: "danger",
};

export const PACK_STATUS_LABEL: Record<PackStatus, string> = {
  pending_validation: "En attente de validation",
  published: "Publie",
  archived: "Archive",
};

export const PAYMENT_STATUS_TONE: Record<PaymentStatus, Tone> = {
  pending: "warning",
  completed: "success",
  failed: "danger",
};

export const PAYMENT_STATUS_LABEL: Record<PaymentStatus, string> = {
  pending: "En attente",
  completed: "Encaisse",
  failed: "Echoue",
};

export const SUBSCRIPTION_STATUS_TONE: Record<SubscriptionStatus, Tone> = {
  active: "success",
  canceled: "neutral",
  expired: "danger",
};

export const SUBSCRIPTION_STATUS_LABEL: Record<SubscriptionStatus, string> = {
  active: "Actif",
  canceled: "Annule",
  expired: "Expire",
};

export const SUBSCRIPTION_TYPE_LABEL: Record<SubscriptionType, string> = {
  creator_premium: "Createur premium",
  extension_premium: "Extension premium",
};

export const ROLE_LABEL: Record<string, string> = {
  admin: "Administrateur",
  moderator: "Moderateur",
  user: "Utilisateur",
};
