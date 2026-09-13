import { PageHeader } from "@/components/ui";
import { IconDashboard } from "@/components/ui/icons";
import { DashboardOverview } from "@/features/dashboard/DashboardOverview";

export default function DashboardPage() {
  return (
    <>
      <PageHeader icon={<IconDashboard className="h-5 w-5" />} title="Tableau de bord" description="Vue d'ensemble de votre activite sur Promptory." />
      <DashboardOverview />
    </>
  );
}
