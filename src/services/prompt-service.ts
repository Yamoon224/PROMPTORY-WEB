import { apiFetch } from "@/lib/api-client";
import type { ListParams, Paginated, Prompt, PromptInput, Single } from "@/types/api";

export interface PromptFilters extends ListParams {
  category?: string;
  tag?: string;
  ia_model?: string;
  free?: boolean;
  min_price?: number;
  max_price?: number;
}

export interface MyPromptFilters extends ListParams {
  status?: string;
  folder_id?: number;
}

// --- Marketplace publique -----------------------------------------------------------

export function browsePrompts(params: PromptFilters = {}): Promise<Paginated<Prompt>> {
  return apiFetch<Paginated<Prompt>>("/prompts", { query: { ...params } });
}

export async function getPrompt(slug: string): Promise<Prompt> {
  return (await apiFetch<Single<Prompt>>(`/prompts/${slug}`)).data;
}

// --- Dashboard createur ---------------------------------------------------------------

export function listMyPrompts(params: MyPromptFilters = {}): Promise<Paginated<Prompt>> {
  return apiFetch<Paginated<Prompt>>("/my/prompts", { query: { ...params } });
}

export async function createPrompt(input: PromptInput): Promise<Prompt> {
  return (await apiFetch<Single<Prompt>>("/prompts", { method: "POST", body: input })).data;
}

export async function updatePrompt(id: number, input: Partial<PromptInput>): Promise<Prompt> {
  return (await apiFetch<Single<Prompt>>(`/prompts/${id}`, { method: "PUT", body: input })).data;
}

export async function deletePrompt(id: number): Promise<void> {
  await apiFetch(`/prompts/${id}`, { method: "DELETE" });
}

export async function submitPrompt(id: number): Promise<Prompt> {
  return (await apiFetch<Single<Prompt>>(`/prompts/${id}/submit`, { method: "POST" })).data;
}

export async function archivePrompt(id: number): Promise<Prompt> {
  return (await apiFetch<Single<Prompt>>(`/prompts/${id}/archive`, { method: "POST" })).data;
}

export async function unarchivePrompt(id: number): Promise<Prompt> {
  return (await apiFetch<Single<Prompt>>(`/prompts/${id}/unarchive`, { method: "POST" })).data;
}

// --- Moderation ------------------------------------------------------------------------

export function listPendingPrompts(params: ListParams = {}): Promise<Paginated<Prompt>> {
  return apiFetch<Paginated<Prompt>>("/moderation/prompts", { query: { ...params } });
}

export async function approvePrompt(id: number): Promise<Prompt> {
  return (await apiFetch<Single<Prompt>>(`/moderation/prompts/${id}/approve`, { method: "POST" })).data;
}

export async function rejectPrompt(id: number, reason: string): Promise<Prompt> {
  return (await apiFetch<Single<Prompt>>(`/moderation/prompts/${id}/reject`, { method: "POST", body: { reason } })).data;
}
