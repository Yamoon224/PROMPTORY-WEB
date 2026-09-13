import { CategoryList } from "@/features/catalog/CategoryList";
import { RequirePermission } from "@/features/auth/RequirePermission";

export default function CategoriesPage() {
  return (
    <RequirePermission permission="platform.manage">
      <CategoryList />
    </RequirePermission>
  );
}
