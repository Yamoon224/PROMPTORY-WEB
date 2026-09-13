import { AuditList } from "@/features/audit/AuditList";
import { RequirePermission } from "@/features/auth/RequirePermission";

export default function ActivityLogPage() {
  return (
    <RequirePermission permission="platform.manage">
      <AuditList />
    </RequirePermission>
  );
}
