import { apiFetch } from "@/lib/api-client";
import type { ActivityLogEntry, ListParams, Paginated } from "@/types/api";

export function listActivity(
  params: ListParams & { user_id?: number; prompt_id?: number; action?: string } = {},
): Promise<Paginated<ActivityLogEntry>> {
  return apiFetch<Paginated<ActivityLogEntry>>("/activity-log", { query: { ...params } });
}
