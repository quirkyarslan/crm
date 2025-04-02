import React from "react"
import { DashboardGrid } from "@/components/dashboard-grid"
import { DashboardHeader } from "@/components/dashboard-header"


export default function Home() {
  return (
    <div className="flex-1">
      {/* <DashboardHeader /> */}
      <div className="container mx-auto p-4">
        <DashboardGrid />
      </div>
    </div>
  )
}

