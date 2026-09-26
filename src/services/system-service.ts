import { apiFetch } from "@/lib/api-client";

export interface SystemHealth {
  status: "ok" | "degraded";
  checks: { database: "ok" | "unreachable" };
  payment_methods: string[];
  timestamp: string;
}

export async function getHealth(): Promise<SystemHealth> {
  return apiFetch<SystemHealth>("/health");
}
