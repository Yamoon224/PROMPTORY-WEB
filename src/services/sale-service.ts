import { apiFetch } from "@/lib/api-client";
import type { ListParams, Paginated, Sale, Single } from "@/types/api";

export interface PurchaseInput {
  payment_method: "stripe" | "paypal";
  payment_token?: string | null;
  client_reference?: string | null;
}

export async function purchasePrompt(promptId: number, input: PurchaseInput): Promise<Sale> {
  return (await apiFetch<Single<Sale>>(`/prompts/${promptId}/purchase`, { method: "POST", body: input })).data;
}

export async function purchasePack(packId: number, input: PurchaseInput): Promise<Sale> {
  return (await apiFetch<Single<Sale>>(`/packs/${packId}/purchase`, { method: "POST", body: input })).data;
}

export function listMyPurchases(params: ListParams = {}): Promise<Paginated<Sale>> {
  return apiFetch<Paginated<Sale>>("/my/purchases", { query: { ...params } });
}

export function listMyEarnings(params: ListParams = {}): Promise<Paginated<Sale>> {
  return apiFetch<Paginated<Sale>>("/my/earnings", { query: { ...params } });
}

export function listAllSales(params: ListParams & { payment_status?: string } = {}): Promise<Paginated<Sale>> {
  return apiFetch<Paginated<Sale>>("/sales", { query: { ...params } });
}
