import { RequirePermission } from "@/features/auth/RequirePermission";
import { UserList } from "@/features/users/UserList";

export default function UsersPage() {
  return (
    <RequirePermission permission="platform.manage">
      <UserList />
    </RequirePermission>
  );
}
