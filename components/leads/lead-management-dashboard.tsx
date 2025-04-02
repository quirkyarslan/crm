import { LeadMetrics } from "@/components/leads/lead-metrics";
import { LeadOverviewChart } from "@/components/leads/lead-overview-chart";
import { LeadDistribution } from "@/components/leads/lead-distribution";
import { LeadConversionRate } from "@/components/leads/lead-conversion-rate";
import { LeadSources } from "@/components/leads/lead-sources";
import { LeadActivity } from "@/components/leads/lead-activity";

export function LeadManagementDashboard() {
  return (
    <div className="space-y-4">
      <LeadMetrics />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <LeadOverviewChart />
        <LeadDistribution />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <LeadConversionRate />
        <LeadSources />
        <LeadActivity />
      </div>
    </div>
  );
}
