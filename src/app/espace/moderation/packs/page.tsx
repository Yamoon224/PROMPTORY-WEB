import { RequirePermission } from "@/features/auth/RequirePermission";
import { PackModerationQueue } from "@/features/moderation/PackModerationQueue";

export default function PackModerationPage() {
  return (
    <RequirePermission permission="prompts.moderate">
      <PackModerationQueue />
    </RequirePermission>
  );
}
