import { IaModelList } from "@/features/catalog/IaModelList";
import { RequirePermission } from "@/features/auth/RequirePermission";

export default function IaModelsPage() {
  return (
    <RequirePermission permission="platform.manage">
      <IaModelList />
    </RequirePermission>
  );
}
