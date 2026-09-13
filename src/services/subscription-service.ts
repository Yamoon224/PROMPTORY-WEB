import { apiFetch } from "@/lib/api-client";
import type { ListParams, Paginated, Single, Subscription, SubscriptionType } from "@/types/api";

export async function subscribe(type: SubscriptionType, paymentToken?: string | null): Promise<Subscription> {
  return (
    await apiFetch<Single<Subscription>>("/subscriptions", {
      method: "POST",
      body: { type, payment_token: paymentToken ?? null },
    })
  ).data;
}

export function listMySubscriptions(params: ListParams = {}): Promise<Paginated<Subscription>> {
  return apiFetch<Paginated<Subscription>>("/my/subscriptions", { query: { ...params } });
}

export async function cancelSubscription(id: number): Promise<Subscription> {
  return (await apiFetch<Single<Subscription>>(`/subscriptions/${id}/cancel`, { method: "POST" })).data;
}

export function listAllSubscriptions(
  params: ListParams & { type?: string; status?: string } = {},
): Promise<Paginated<Subscription>> {
  return apiFetch<Paginated<Subscription>>("/subscriptions", { query: { ...params } });
}
