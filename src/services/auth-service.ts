import { apiFetch, clearToken, storeToken } from "@/lib/api-client";
import type { AuthenticatedUser, Single } from "@/types/api";

interface SessionResponse {
  data: AuthenticatedUser;
  token: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

/**
 * Le jeton est persiste ici et nulle part ailleurs : c'est le seul endroit du
 * frontend qui sait comment une session commence et se termine.
 */
export async function login(email: string, password: string): Promise<AuthenticatedUser> {
  const response = await apiFetch<SessionResponse>("/login", {
    method: "POST",
    body: { email, password, device_name: "web" },
  });

  storeToken(response.token);

  return response.data;
}

export async function register(input: RegisterInput): Promise<AuthenticatedUser> {
  const response = await apiFetch<SessionResponse>("/register", { method: "POST", body: input });

  storeToken(response.token);

  return response.data;
}

export async function logout(): Promise<void> {
  try {
    await apiFetch<void>("/logout", { method: "POST" });
  } finally {
    // Efface meme si l'appel echoue : rester « connecte » avec un jeton deja
    // revoque serait pire que la deconnexion elle-meme.
    clearToken();
  }
}

export async function me(): Promise<AuthenticatedUser> {
  return (await apiFetch<Single<AuthenticatedUser>>("/me")).data;
}
