import { RequirePermission } from "@/features/auth/RequirePermission";
import { PromptModerationQueue } from "@/features/moderation/PromptModerationQueue";

export default function PromptModerationPage() {
  return (
    <RequirePermission permission="prompts.moderate">
      <PromptModerationQueue />
    </RequirePermission>
  );
}
