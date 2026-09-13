import { apiFetch } from "@/lib/api-client";
import type { ListParams, Paginated, Single, User } from "@/types/api";

export interface UserInput {
  name: string;
  email: string;
  password?: string;
  status?: "active" | "inactive";
  roles: string[];
}

export function listUsers(params: ListParams & { role?: string; status?: string } = {}): Promise<Paginated<User>> {
  return apiFetch<Paginated<User>>("/users", { query: { ...params } });
}

export async function createUser(input: UserInput): Promise<User> {
  return (await apiFetch<Single<User>>("/users", { method: "POST", body: input })).data;
}

export async function updateUser(id: number, input: Partial<UserInput>): Promise<User> {
  return (await apiFetch<Single<User>>(`/users/${id}`, { method: "PUT", body: input })).data;
}

export async function deleteUser(id: number): Promise<void> {
  await apiFetch(`/users/${id}`, { method: "DELETE" });
}
