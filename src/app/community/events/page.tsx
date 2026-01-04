"use client";

import { Navigation } from "@/components/shared/navigation";
import { GroupLabel } from "@/components/shared/group-label";
import { EventCard } from "@/components/community/event-card";

export default function UpcomingEventsPage() {
  const events = [
    {
      title: "Jom Cuti Sekolah 2025",
      subtitle: "School holiday travel deals and family activities",
      date: "12 - 15 January 2025",
      location: "Kuala Lumpur",
      type: "Promotion Event",
      badges: ["Family-friendly", "School Holiday"],
      imageGradient: "bg-gradient-to-br from-yellow-200 to-orange-300"
    },
    {
      title: "Cuti Cuti Muslim-Friendly Fair",
      subtitle: "Muslim-friendly travel packages and experiences",
      date: "18- 20 January 2025",
      location: "Kuala Lumpur",
      type: "Travel Fair",
      badges: ["Muslim-friendly", "Travel Deals"],
      imageGradient: "bg-gradient-to-br from-green-200 to-teal-300"
    },
    {
      title: "Play Your Way to Joy Festival",
      subtitle: "Interactive activities and attractions for all ages",
      date: "5- 7 February",
      location: "Sunway Lagoon, Selangor",
      type: "Festival",
      badges: ["Family-friendly", "Popular Event"],
      imageGradient: "bg-gradient-to-br from-purple-200 to-pink-300"
    },
    {
      title: "Jom Cuti Sekolah 2025",
      subtitle: "School holiday travel deals and family activities",
      date: "12 - 15 January 2025",
      location: "Kuala Lumpur",
      type: "Promotion Event",
      badges: ["Family-friendly", "School Holiday"],
      imageGradient: "bg-gradient-to-br from-yellow-200 to-orange-300"
    },
    {
      title: "Cuti Cuti Muslim-Friendly Fair",
      subtitle: "Muslim-friendly travel packages and experiences",
      date: "18- 20 January 2025",
      location: "Kuala Lumpur",
      type: "Travel Fair",
      badges: ["Muslim-friendly", "Travel Deals"],
      imageGradient: "bg-gradient-to-br from-green-200 to-teal-300"
    },
    {
      title: "Play Your Way to Joy Festival",
      subtitle: "Interactive activities and attractions for all ages",
      date: "5- 7 February",
      location: "Sunway Lagoon, Selangor",
      type: "Festival",
      badges: ["Family-friendly", "Popular Event"],
      imageGradient: "bg-gradient-to-br from-purple-200 to-pink-300"
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <GroupLabel group={4} />

      {/* Title Section */}
      <section className="px-4 sm:px-6 md:px-12 lg:px-16 xl:px-[90px] py-8">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold text-slate-700" style={{ letterSpacing: "-0.03em" }}>
          Upcoming Events
        </h1>
      </section>

      {/* Events Grid */}
      <section className="px-4 sm:px-6 md:px-12 lg:px-16 xl:px-[90px] pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {events.map((event, i) => (
            <EventCard key={i} {...event} />
          ))}
        </div>
      </section>
    </div>
  );
}

