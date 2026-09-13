import { apiFetch } from "@/lib/api-client";
import type { ListParams, Pack, PackInput, Paginated, Single } from "@/types/api";

export function browsePacks(params: ListParams = {}): Promise<Paginated<Pack>> {
  return apiFetch<Paginated<Pack>>("/packs", { query: { ...params } });
}

export async function getPack(slug: string): Promise<Pack> {
  return (await apiFetch<Single<Pack>>(`/packs/${slug}`)).data;
}

export function listMyPacks(params: ListParams & { status?: string } = {}): Promise<Paginated<Pack>> {
  return apiFetch<Paginated<Pack>>("/my/packs", { query: { ...params } });
}

export async function createPack(input: PackInput): Promise<Pack> {
  return (await apiFetch<Single<Pack>>("/packs", { method: "POST", body: input })).data;
}

export async function updatePack(id: number, input: Partial<PackInput>): Promise<Pack> {
  return (await apiFetch<Single<Pack>>(`/packs/${id}`, { method: "PUT", body: input })).data;
}

export async function deletePack(id: number): Promise<void> {
  await apiFetch(`/packs/${id}`, { method: "DELETE" });
}

export async function archivePack(id: number): Promise<Pack> {
  return (await apiFetch<Single<Pack>>(`/packs/${id}/archive`, { method: "POST" })).data;
}

export async function resubmitPack(id: number): Promise<Pack> {
  return (await apiFetch<Single<Pack>>(`/packs/${id}/resubmit`, { method: "POST" })).data;
}

export function listPendingPacks(params: ListParams = {}): Promise<Paginated<Pack>> {
  return apiFetch<Paginated<Pack>>("/moderation/packs", { query: { ...params } });
}

export async function approvePack(id: number): Promise<Pack> {
  return (await apiFetch<Single<Pack>>(`/moderation/packs/${id}/approve`, { method: "POST" })).data;
}

export async function rejectPack(id: number, reason: string): Promise<Pack> {
  return (await apiFetch<Single<Pack>>(`/moderation/packs/${id}/reject`, { method: "POST", body: { reason } })).data;
}
