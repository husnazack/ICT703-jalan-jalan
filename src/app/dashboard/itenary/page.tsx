"use client";  // Add this directive to mark the file as a Client Component


import { Navigation } from "@/components/shared/navigation";
import TabBar from "@/components/ui/TabBar"; // Correct relative path for Itinerary Page

export default function ItineraryPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 relative">
      {/* Navigation Bar */}
      <Navigation />

      {/* Tab Bar Below Navigation */}
      <TabBar />

      <main className="container mx-auto px-6 lg:px-24 py-8">
        {/* Itinerary content */}
        <div className="bg-yellow-100 p-4 text-center rounded-md mb-8">
          <p className="text-lg font-semibold text-yellow-800">
            This page is currently under development. Please check back later.
          </p>
        </div>
      </main>
    </div>
  );
}
