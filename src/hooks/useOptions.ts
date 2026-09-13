"use client";

import { catalogService, folderService } from "@/services";
import type { Category, Folder, IaModel, Tag } from "@/types/api";
import { useAsyncData } from "./useAsyncData";

/**
 * Options des selecteurs de formulaire (categories, tags, outils IA, dossiers).
 *
 * Chargees une fois par ecran, non paginees : le referentiel tient largement
 * dans ce volume, et un selecteur paginerait la ou l'on veut juste choisir.
 *
 * `loader` doit deja etre une reference stable (une fonction de module,
 * jamais une closure recreee a chaque rendu) : c'est le cas de chacune des
 * fonctions de `services/`.
 */
function useList<T>(loader: () => Promise<T[]>): T[] {
  const { data } = useAsyncData(loader);

  return data ?? [];
}

export const useCategoryOptions = (): Category[] => useList<Category>(catalogService.allCategories);
export const useTagOptions = (): Tag[] => useList<Tag>(catalogService.allTags);
export const useIaModelOptions = (): IaModel[] => useList<IaModel>(catalogService.allIaModels);
export const useFolderOptions = (): Folder[] => useList<Folder>(folderService.listFolders);
