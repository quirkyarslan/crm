import { LeadManagement } from "@/components/leads/lead-management"
import { LeadOverview } from "@/components/leads/lead-overview"
import { LeadNavigation } from "@/components/leads/lead-navigation"
import { LeadGeneration } from "@/components/leads/lead-generation"
import { LeadEngagements } from "@/components/leads/lead-engagements"

export default function LeadsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold tracking-tight">LEAD MANAGEMENT</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-3">
          <LeadManagement />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-3">
          <LeadOverview />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <LeadNavigation />
        </div>
        <div>
          <LeadGeneration />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div>
          <LeadEngagements />
        </div>
      </div>
    </div>
  )
}

