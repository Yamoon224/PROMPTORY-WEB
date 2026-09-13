import { apiFetch } from "@/lib/api-client";
import type { Paginated, Review, Single } from "@/types/api";

export function listReviews(promptId: number): Promise<Paginated<Review>> {
  return apiFetch<Paginated<Review>>(`/prompts/id/${promptId}/reviews`);
}

export async function submitReview(promptId: number, rating: number, comment?: string | null): Promise<Review> {
  return (
    await apiFetch<Single<Review>>(`/prompts/id/${promptId}/reviews`, {
      method: "POST",
      body: { rating, comment: comment ?? null },
    })
  ).data;
}

export async function deleteReview(id: number): Promise<void> {
  await apiFetch(`/reviews/${id}`, { method: "DELETE" });
}
