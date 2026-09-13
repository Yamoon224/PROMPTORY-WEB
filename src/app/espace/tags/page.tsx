import { TagList } from "@/features/catalog/TagList";
import { RequirePermission } from "@/features/auth/RequirePermission";

export default function TagsPage() {
  return (
    <RequirePermission permission="platform.manage">
      <TagList />
    </RequirePermission>
  );
}
