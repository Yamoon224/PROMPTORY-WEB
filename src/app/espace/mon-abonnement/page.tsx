import { PageHeader } from "@/components/ui";
import { IconCreditCard } from "@/components/ui/icons";
import { SubscriptionPanel } from "@/features/subscriptions/SubscriptionPanel";

export default function MySubscriptionPage() {
  return (
    <>
      <PageHeader icon={<IconCreditCard className="h-5 w-5" />} title="Mon abonnement" description="Createur premium et extension premium." />
      <SubscriptionPanel />
    </>
  );
}
