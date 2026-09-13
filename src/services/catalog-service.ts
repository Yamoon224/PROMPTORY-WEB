import { apiFetch } from "@/lib/api-client";
import type { Category, IaModel, ListParams, Paginated, Single, Tag } from "@/types/api";

export interface CategoryInput {
  name: string;
  description?: string | null;
  parent_id?: number | null;
}

export interface TagInput {
  name: string;
}

export interface IaModelInput {
  name: string;
  description?: string | null;
  is_active?: boolean;
}

// --- Categories --------------------------------------------------------------------

export function listCategories(params: ListParams = {}): Promise<Paginated<Category>> {
  return apiFetch<Paginated<Category>>("/categories", { query: { ...params } });
}

export async function allCategories(): Promise<Category[]> {
  return (await apiFetch<{ data: Category[] }>("/categories", { query: { all: true } })).data;
}

export async function createCategory(input: CategoryInput): Promise<Category> {
  return (await apiFetch<Single<Category>>("/categories", { method: "POST", body: input })).data;
}

export async function updateCategory(id: number, input: Partial<CategoryInput>): Promise<Category> {
  return (await apiFetch<Single<Category>>(`/categories/${id}`, { method: "PUT", body: input })).data;
}

export async function deleteCategory(id: number): Promise<void> {
  await apiFetch(`/categories/${id}`, { method: "DELETE" });
}

// --- Tags --------------------------------------------------------------------------

export function listTags(params: ListParams = {}): Promise<Paginated<Tag>> {
  return apiFetch<Paginated<Tag>>("/tags", { query: { ...params } });
}

export async function allTags(): Promise<Tag[]> {
  return (await apiFetch<{ data: Tag[] }>("/tags", { query: { all: true } })).data;
}

export async function createTag(input: TagInput): Promise<Tag> {
  return (await apiFetch<Single<Tag>>("/tags", { method: "POST", body: input })).data;
}

export async function updateTag(id: number, input: Partial<TagInput>): Promise<Tag> {
  return (await apiFetch<Single<Tag>>(`/tags/${id}`, { method: "PUT", body: input })).data;
}

export async function deleteTag(id: number): Promise<void> {
  await apiFetch(`/tags/${id}`, { method: "DELETE" });
}

// --- Outils IA -----------------------------------------------------------------------

export function listIaModels(params: ListParams = {}): Promise<Paginated<IaModel>> {
  return apiFetch<Paginated<IaModel>>("/ia-models", { query: { ...params } });
}

export async function allIaModels(): Promise<IaModel[]> {
  return (await apiFetch<{ data: IaModel[] }>("/ia-models", { query: { all: true } })).data;
}

export async function createIaModel(input: IaModelInput): Promise<IaModel> {
  return (await apiFetch<Single<IaModel>>("/ia-models", { method: "POST", body: input })).data;
}

export async function updateIaModel(id: number, input: Partial<IaModelInput>): Promise<IaModel> {
  return (await apiFetch<Single<IaModel>>(`/ia-models/${id}`, { method: "PUT", body: input })).data;
}

export async function deleteIaModel(id: number): Promise<void> {
  await apiFetch(`/ia-models/${id}`, { method: "DELETE" });
}
