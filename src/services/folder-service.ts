import { apiFetch } from "@/lib/api-client";
import type { Folder, Single } from "@/types/api";

export interface FolderInput {
  name: string;
  parent_id?: number | null;
}

export async function listFolders(): Promise<Folder[]> {
  return (await apiFetch<{ data: Folder[] }>("/folders")).data;
}

export async function createFolder(input: FolderInput): Promise<Folder> {
  return (await apiFetch<Single<Folder>>("/folders", { method: "POST", body: input })).data;
}

export async function updateFolder(id: number, input: Partial<FolderInput>): Promise<Folder> {
  return (await apiFetch<Single<Folder>>(`/folders/${id}`, { method: "PUT", body: input })).data;
}

export async function deleteFolder(id: number): Promise<void> {
  await apiFetch(`/folders/${id}`, { method: "DELETE" });
}
