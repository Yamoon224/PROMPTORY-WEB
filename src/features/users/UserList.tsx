"use client";

import { useCallback, useState } from "react";
import { Badge, Button, ConfirmDialog, DataTable, FormAlert, Modal, PasswordField, TextField } from "@/components/ui";
import type { Column } from "@/components/ui/DataTable";
import { MultiSelectField } from "@/components/ui/Combobox";
import { IconPencil, IconPlus, IconTrash, IconUsers } from "@/components/ui/icons";
import { useAuth } from "@/features/auth/AuthContext";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useMutation } from "@/hooks/useMutation";
import { usePaginatedData } from "@/hooks/usePaginatedData";
import { useSort } from "@/hooks/useSort";
import { ApiError, errorMessage } from "@/lib/api-client";
import { ROLE_LABEL } from "@/lib/labels";
import { userService } from "@/services";
import type { UserInput } from "@/services/user-service";
import type { User } from "@/types/api";

const AVAILABLE_ROLES = ["admin", "moderator", "user"];

export function UserList() {
  const { user: currentUser } = useAuth();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search);
  const { sort, setSort, sortParams } = useSort();
  const [editing, setEditing] = useState<User | "new" | null>(null);
  const [pendingDelete, setPendingDelete] = useState<User | null>(null);

  const fetcher = useCallback(
    (page: number, perPage: number) => userService.listUsers({ page, per_page: perPage, search: debouncedSearch || undefined, ...sortParams }),
    [debouncedSearch, sortParams],
  );

  const { items, meta, setPage, isLoading, error, reload } = usePaginatedData(fetcher);
  const deleteMutation = useMutation((id: number) => userService.deleteUser(id));

  const columns: Array<Column<User>> = [
    {
      key: "name",
      header: "Compte",
      sortKey: "name",
      cell: (user) => (
        <div>
          <p className="font-semibold">{user.name}</p>
          <p className="text-xs text-[var(--muted)]">{user.email}</p>
        </div>
      ),
    },
    {
      key: "roles",
      header: "Roles",
      cell: (user) => (
        <div className="flex flex-wrap gap-1">
          {(user.roles ?? []).map((role) => (
            <Badge key={role} tone="brand">
              {ROLE_LABEL[role] ?? role}
            </Badge>
          ))}
        </div>
      ),
      hideOnMobile: true,
    },
    {
      key: "status",
      header: "Statut",
      cell: (user) => <Badge tone={user.status === "active" ? "success" : "danger"}>{user.status === "active" ? "Actif" : "Inactif"}</Badge>,
    },
    {
      key: "actions",
      header: "",
      className: "text-right",
      headerClassName: "text-right",
      cell: (user) => (
        <div className="flex justify-end gap-1.5">
          <Button variant="secondary" size="sm" onClick={() => setEditing(user)} icon={<IconPencil className="h-3.5 w-3.5" />} />
          {user.id !== currentUser?.id ? (
            <Button variant="danger" size="sm" onClick={() => setPendingDelete(user)} icon={<IconTrash className="h-3.5 w-3.5" />} />
          ) : null}
        </div>
      ),
    },
  ];

  return (
    <>
      <DataTable
        title="Utilisateurs"
        description="Comptes et roles de la plateforme."
        icon={<IconUsers className="h-4 w-4" />}
        actions={
          <Button size="sm" onClick={() => setEditing("new")} icon={<IconPlus className="h-3.5 w-3.5" />}>
            Nouvel utilisateur
          </Button>
        }
        columns={columns}
        rows={items}
        getRowKey={(user) => String(user.id)}
        isLoading={isLoading}
        error={error}
        onRetry={reload}
        emptyTitle="Aucun utilisateur"
        search={{ value: search, onChange: setSearch }}
        sort={sort}
        onSortChange={setSort}
        meta={meta}
        onPageChange={setPage}
      />

      {editing !== null ? (
        <UserFormModal
          user={editing === "new" ? null : editing}
          onClose={() => setEditing(null)}
          onSaved={() => {
            setEditing(null);
            reload();
          }}
        />
      ) : null}

      <ConfirmDialog
        isOpen={pendingDelete !== null}
        onClose={() => setPendingDelete(null)}
        onConfirm={async () => {
          if (pendingDelete && (await deleteMutation.run(pendingDelete.id)) !== null) {
            setPendingDelete(null);
            reload();
          }
        }}
        title="Supprimer ce compte ?"
        confirmLabel="Supprimer"
        isPending={deleteMutation.isPending}
        error={deleteMutation.error}
      >
        Un compte qui a encaisse des ventes ne peut pas etre supprime.
      </ConfirmDialog>
    </>
  );
}

function UserFormModal({ user, onClose, onSaved }: { user: User | null; onClose: () => void; onSaved: () => void }) {
  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [password, setPassword] = useState("");
  const [roles, setRoles] = useState<string[]>(user?.roles ?? ["user"]);
  const [status, setStatus] = useState<"active" | "inactive">(user?.status ?? "active");

  const mutation = useMutation((input: UserInput) => (user ? userService.updateUser(user.id, input) : userService.createUser(input)));
  const fieldErrors = mutation.error instanceof ApiError ? mutation.error.fieldErrors : {};

  return (
    <Modal
      isOpen
      onClose={onClose}
      title={user ? "Modifier l'utilisateur" : "Nouvel utilisateur"}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Annuler
          </Button>
          <Button
            isLoading={mutation.isPending}
            onClick={async () => {
              const input: UserInput = { name: name.trim(), email: email.trim(), roles, status };
              if (password) input.password = password;
              const result = await mutation.run(input);
              if (result) onSaved();
            }}
          >
            Enregistrer
          </Button>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <TextField label="Nom complet" value={name} onChange={(event) => setName(event.target.value)} errors={fieldErrors.name} required autoFocus />
        <TextField label="Adresse e-mail" type="email" value={email} onChange={(event) => setEmail(event.target.value)} errors={fieldErrors.email} required />
        <PasswordField
          label={user ? "Nouveau mot de passe (facultatif)" : "Mot de passe"}
          placeholder={user ? "Laisser vide pour ne pas changer" : "8 caracteres minimum"}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          errors={fieldErrors.password}
          required={!user}
        />
        <MultiSelectField
          label="Roles"
          options={AVAILABLE_ROLES.map((role) => ({ value: role, label: ROLE_LABEL[role] ?? role }))}
          values={roles}
          onChange={setRoles}
          required
        />
        <label className="flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
          <input
            type="checkbox"
            checked={status === "active"}
            onChange={(event) => setStatus(event.target.checked ? "active" : "inactive")}
            className="h-4 w-4 rounded-sm border-[var(--field-border)] text-brand-600 focus:ring-brand-500"
          />
          Compte actif
        </label>
        {mutation.error && !(mutation.error instanceof ApiError && mutation.error.status === 422) ? <FormAlert>{errorMessage(mutation.error)}</FormAlert> : null}
      </div>
    </Modal>
  );
}
