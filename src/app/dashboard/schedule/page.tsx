"use client";

import Link from "next/link";
import { ItineraryTimeline } from "@/components/dashboard/cards/itinerary-timeline";
import { BookingListCard } from "@/components/dashboard/cards/booking-list-card";
import { Navigation } from "@/components/shared/navigation";
import { GroupLabel } from "@/components/shared/group-label";

export default function SchedulePage() {
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
          <Link href="/dashboard/budget">
            <button className="px-3 py-1 text-sm font-semibold text-[#334155] rounded-lg">
              Overall Budget
            </button>
          </Link>
          <button className="px-3 py-1 text-sm font-semibold text-[#334155] bg-[#F3E8FF] rounded-lg shadow-sm">
            Schedule & Updates
          </button>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left: Timeline */}
          <ItineraryTimeline />

          {/* Right: Booking List */}
          <BookingListCard />
        </div>
      </main>
    </div>
  );
}
