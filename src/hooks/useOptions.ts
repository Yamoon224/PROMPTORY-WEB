"use client";

import { useCallback } from "react";
import { catalogService, folderService } from "@/services";
import type { Category, Folder, IaModel, Tag } from "@/types/api";
import { useAsyncData } from "./useAsyncData";

/**
 * Options des selecteurs de formulaire (categories, tags, outils IA, dossiers).
 *
 * Chargees une fois par ecran, non paginees : le referentiel tient largement
 * dans ce volume, et un selecteur paginerait la ou l'on veut juste choisir.
 */
function useList<T>(loader: () => Promise<T[]>): T[] {
  const stable = useCallback(loader, [loader]);
  const { data } = useAsyncData(stable);

  return data ?? [];
}

export const useCategoryOptions = (): Category[] => useList<Category>(catalogService.allCategories);
export const useTagOptions = (): Tag[] => useList<Tag>(catalogService.allTags);
export const useIaModelOptions = (): IaModel[] => useList<IaModel>(catalogService.allIaModels);
export const useFolderOptions = (): Folder[] => useList<Folder>(folderService.listFolders);
