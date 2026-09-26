import { apiFetch } from "@/lib/api-client";

export async function subscribeToNewsletter(email: string): Promise<{ message: string }> {
  return apiFetch<{ message: string }>("/newsletter/subscribe", { method: "POST", body: { email } });
}
