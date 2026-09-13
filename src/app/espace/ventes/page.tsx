import { RequirePermission } from "@/features/auth/RequirePermission";
import { AllSalesTable } from "@/features/sales/SaleTable";

export default function AllSalesPage() {
  return (
    <RequirePermission permission="platform.manage">
      <AllSalesTable />
    </RequirePermission>
  );
}
