import { apiFetch } from "@/lib/api-client";
import type { ListParams, Paginated, Single, Subscription, SubscriptionType } from "@/types/api";

export interface SubscribeInput {
  type: SubscriptionType;
  payment_method: "stripe" | "paypal";
  payment_token?: string | null;
}

export async function subscribe(input: SubscribeInput): Promise<Subscription> {
  return (
    await apiFetch<Single<Subscription>>("/subscriptions", {
      method: "POST",
      body: { ...input, payment_token: input.payment_token ?? null },
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
