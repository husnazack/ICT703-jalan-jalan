"use client";

import { useState } from "react";
import {
  DashboardHeader,
  AttractionCard,
  PriceComparisonCard,
  SafetyCard,
  WeatherCard,
  TrendingCard,
  CrowdLevelCard,
  TrafficCard,
  ItineraryCTACard,
  BudgetCTACard,
} from "@/components/dashboard";

export default function DashboardPage() {
  const [attractionFilter, setAttractionFilter] = useState<"All" | "Open">("All");
  const [priceSortOrder, setPriceSortOrder] = useState<"asc" | "desc">("asc");

  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardHeader />

      <main className="container mx-auto px-6 lg:px-24 py-8">
        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-800">Live Itinerary</h1>
          <p className="text-slate-500 text-sm mt-1">
            Real-time travel information for your trip to Kuala Lumpur
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <AttractionCard
              filter={attractionFilter}
              onFilterChange={setAttractionFilter}
            />
            <PriceComparisonCard
              sortOrder={priceSortOrder}
              onSortChange={() =>
                setPriceSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
              }
            />
            <SafetyCard />
          </div>

          {/* Middle Column */}
          <div className="space-y-6">
            <WeatherCard />
            <TrendingCard />
            <CrowdLevelCard />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <TrafficCard />
            <ItineraryCTACard />
            <BudgetCTACard />
          </div>
        </div>
      </main>
    </div>
  );
}

