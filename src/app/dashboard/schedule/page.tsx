"use client";

import Link from "next/link";
import { DashboardHeader } from "@/components/dashboard";
import { ItineraryTimeline } from "@/components/dashboard/cards/itinerary-timeline";
import { BookingListCard } from "@/components/dashboard/cards/booking-list-card";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, CalendarDays, Bell, RefreshCw } from "lucide-react";

export default function SchedulePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardHeader />

      <main className="container mx-auto px-6 lg:px-24 py-8">
        {/* Page Title */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Schedule & Updates</h1>
            <p className="text-slate-500 text-sm mt-1">
              Your itinerary and booking status
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="gap-2">
              <Bell className="size-4" />
              Notifications
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <RefreshCw className="size-4" />
              Sync
            </Button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="border-purple-500 shadow-sm bg-gradient-to-br from-purple-50 to-indigo-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <CalendarDays className="size-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Trip Duration</p>
                  <p className="font-semibold text-slate-800">3 Days, 2 Nights</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-500 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <CalendarDays className="size-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Activities Planned</p>
                  <p className="font-semibold text-slate-800">7 Activities</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-500 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <Bell className="size-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Pending Updates</p>
                  <p className="font-semibold text-slate-800">2 Updates</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Timeline */}
          <ItineraryTimeline />

          {/* Right: Booking List */}
          <div className="space-y-6">
            <BookingListCard />

            {/* CTA Card */}
            <Card className="border-purple-500 shadow-sm bg-gradient-to-br from-purple-50 to-indigo-50">
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-purple-100 rounded-xl">
                    <CalendarDays className="size-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-800 mb-1">
                      Need to modify your itinerary?
                    </h3>
                    <p className="text-sm text-slate-500 mb-3">
                      Use our AI assistant to adjust your plans
                    </p>
                    <Link href="/chat">
                      <Button
                        size="sm"
                        className="bg-purple-600 hover:bg-purple-700 text-white gap-2"
                      >
                        Open AI Assistant
                        <ArrowRight className="size-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

