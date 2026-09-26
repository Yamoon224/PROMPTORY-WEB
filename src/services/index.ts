/**
 * Services d'acces a l'API, un module par domaine backend.
 *
 * Ce sont les seules fonctions autorisees a connaitre les URL de l'API. Les
 * composants appellent ces services ; ils ne construisent jamais de chemin
 * eux-memes. Renommer un endpoint se regle donc dans un seul fichier.
 */

export * as authService from "./auth-service";
export * as catalogService from "./catalog-service";
export * as folderService from "./folder-service";
export * as promptService from "./prompt-service";
export * as packService from "./pack-service";
export * as saleService from "./sale-service";
export * as subscriptionService from "./subscription-service";
export * as reviewService from "./review-service";
export * as userService from "./user-service";
export * as activityService from "./activity-service";
export * as marketingService from "./marketing-service";
export * as systemService from "./system-service";
