"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { ApiError, clearToken, onUnauthenticated } from "@/lib/api-client";
import { authService } from "@/services";
import type { RegisterInput } from "@/services/auth-service";
import type { AuthenticatedUser } from "@/types/api";

interface AuthContextValue {
  user: AuthenticatedUser | null;
  /** Vrai tant que la session initiale n'a pas ete verifiee aupres de l'API. */
  isInitialising: boolean;
  /** La session s'est refermee d'elle-meme (jeton expire), et non a la demande. */
  hasExpired: boolean;
  login: (email: string, password: string) => Promise<AuthenticatedUser>;
  register: (input: RegisterInput) => Promise<AuthenticatedUser>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
  /**
   * Le frontend ne decide de rien : il masque ce qui serait refuse, pour
   * eviter des 403 previsibles. L'autorisation reelle reste appliquee par
   * l'API sur chaque route.
   */
  can: (permission: string) => boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthenticatedUser | null>(null);
  const [isInitialising, setIsInitialising] = useState(true);
  const [hasExpired, setHasExpired] = useState(false);

  // Un jeton peut expirer pendant que l'ecran est ouvert : le client d'API le
  // signale ici, et la session se referme une fois.
  useEffect(
    () =>
      onUnauthenticated(() => {
        setUser(null);
        setHasExpired(true);
      }),
    [],
  );

  // Un jeton peut survivre a la fermeture du navigateur : on le confronte a
  // l'API au demarrage plutot que de faire confiance au stockage local.
  useEffect(() => {
    let active = true;

    authService
      .me()
      .then((current) => {
        if (active) setUser(current);
      })
      .catch((error: unknown) => {
        if (error instanceof ApiError && error.isUnauthenticated) clearToken();
      })
      .finally(() => {
        if (active) setIsInitialising(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const authenticated = await authService.login(email, password);
    setHasExpired(false);
    setUser(authenticated);

    return authenticated;
  }, []);

  const register = useCallback(async (input: RegisterInput) => {
    const created = await authService.register(input);
    setHasExpired(false);
    setUser(created);

    return created;
  }, []);

  const logout = useCallback(async () => {
    await authService.logout();
    setUser(null);
  }, []);

  const refresh = useCallback(async () => {
    setUser(await authService.me());
  }, []);

  const can = useCallback((permission: string) => permission === "" || (user?.permissions.includes(permission) ?? false), [user]);

  const value = useMemo<AuthContextValue>(
    () => ({ user, isInitialising, hasExpired, login, register, logout, refresh, can, isAdmin: user?.role === "admin" }),
    [user, isInitialising, hasExpired, login, register, logout, refresh, can],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error("useAuth doit etre utilise a l'interieur d'un AuthProvider.");
  }

  return context;
}
