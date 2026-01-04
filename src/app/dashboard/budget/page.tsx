"use client";

import Link from "next/link";
import { BudgetDonutChart } from "@/components/dashboard/cards/budget-donut-chart";
import { SpendingBreakdownCard } from "@/components/dashboard/cards/spending-breakdown-card";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/shared/navigation";
import { GroupLabel } from "@/components/shared/group-label";

export default function BudgetPage() {
  return (
    <div className="min-h-screen bg-[#F1F5F9]">
      <Navigation />
      <GroupLabel group={2} />

      <main className="container mx-auto px-6 lg:px-24 py-8">
        {/* Page Title */}
        <h2 className="text-2xl md:text-[30px] font-semibold text-[#334155] leading-tight tracking-tight mb-6">
          Check your booking details!
        </h2>

        {/* Tab Navigation */}
        <div className="flex gap-1 p-1 bg-white rounded-lg w-fit mb-8">
          <button className="px-3 py-1 text-sm font-semibold text-[#3B0764] bg-[#F3E8FF] rounded-lg shadow-sm">
            Overall Budget
          </button>
          <Link href="/dashboard/schedule">
            <button className="px-3 py-1 text-sm font-semibold text-[#334155] rounded-lg">
              Schedule & Updates
            </button>
          </Link>
        </div>

        {/* Main Budget Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left: Donut Chart */}
          <BudgetDonutChart expected={1000} actual={650} />

          {/* Right: Spending Breakdown */}
          <SpendingBreakdownCard />
        </div>

        {/* CTA Card */}
        <Card className="mt-6 border-[#9333EA] shadow-sm bg-white">
          <CardContent className="flex items-center gap-8 p-4">
            <p className="font-normal text-base text-[#334155]">
              Manage your budget & booking!
            </p>
            <Button className="bg-[#0F172A] text-[#F8FAFC] px-4 text-sm font-semibold rounded-lg">
              Go to Module 3
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
