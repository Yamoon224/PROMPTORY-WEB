import { RequirePermission } from "@/features/auth/RequirePermission";
import { SubscriptionTable } from "@/features/subscriptions/SubscriptionTable";

export default function AllSubscriptionsPage() {
  return (
    <RequirePermission permission="platform.manage">
      <SubscriptionTable />
    </RequirePermission>
  );
}
