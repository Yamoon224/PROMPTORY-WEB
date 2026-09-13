"use client";

import { Avatar, Badge, Card, CardBody, CardHeader } from "@/components/ui";
import { IconUser } from "@/components/ui/icons";
import { useAuth } from "@/features/auth/AuthContext";
import { ROLE_LABEL } from "@/lib/labels";

export function ProfileView() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <Card>
      <CardHeader icon={<IconUser className="h-4 w-4" />} title="Mon profil" description="Informations de votre compte." />
      <CardBody className="flex items-center gap-4">
        <Avatar name={user.name} />
        <div>
          <p className="text-base font-bold">{user.name}</p>
          <p className="text-sm text-[var(--muted)]">{user.email}</p>
          <div className="mt-2 flex gap-2">
            <Badge tone="brand">{ROLE_LABEL[user.role] ?? user.role}</Badge>
            <Badge tone={user.status === "active" ? "success" : "danger"}>{user.status === "active" ? "Actif" : "Inactif"}</Badge>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
