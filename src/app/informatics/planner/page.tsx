"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Plus,
  Calendar,
  Wallet,
  ChevronRight,
  Sparkles,
  Plane,
  Hotel,
  Utensils,
  Activity,
  Car,
  MoreHorizontal,
  Receipt,
  CalendarRange,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Navigation } from "@/components/shared/navigation";
import { GroupLabel } from "@/components/shared/group-label";
import {
  AnimatedBackground,
  UnifiedCard,
  PageHeader,
} from "@/components/shared/page-layout";
import { FlowGuide } from "@/components/shared/flow-guide";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { STORAGE_KEYS, DEFAULT_UPCOMING_TRIPS, type UpcomingTrip } from "@/lib/settings-defaults";

const TRIP_EMOJIS = ["🏝️", "🌿", "🍜", "🏔️", "🌊", "🏛️", "🎒", "✈️", "🗺️", "🌸"];

const pastTrips = [
  {
    id: 5,
    destination: "Johor Bahru",
    country: "Malaysia",
    dates: "May 5 - May 7",
    spent: 700,
    budget: 800,
    image: "🏖️",
  },
  {
    id: 6,
    destination: "Kuching",
    country: "Malaysia",
    dates: "Apr 12 - Apr 15",
    spent: 1100,
    budget: 1200,
    image: "🐱",
  },
  {
    id: 7,
    destination: "Ipoh",
    country: "Malaysia",
    dates: "Mar 8 - Mar 10",
    spent: 480,
    budget: 500,
    image: "🍲",
  },
];

export default function PlannerPage() {
  const [upcomingTrips, setUpcomingTrips] = useLocalStorage<UpcomingTrip[]>(
    STORAGE_KEYS.upcomingTrips,
    DEFAULT_UPCOMING_TRIPS
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tripData, setTripData] = useState({
    destination: "",
    country: "",
    startDate: "",
    endDate: "",
    flights: "",
    accommodation: "",
    food: "",
    activities: "",
    transport: "",
    misc: "",
  });

  const calculateTotal = () => {
    const values = [
      tripData.flights,
      tripData.accommodation,
      tripData.food,
      tripData.activities,
      tripData.transport,
      tripData.misc,
    ];
    return values.reduce((sum, val) => sum + (parseFloat(val) || 0), 0);
  };

  const handleInputChange = (field: string, value: string) => {
    setTripData((prev) => ({ ...prev, [field]: value }));
  };

  const formatDateRange = (start: string, end: string): string => {
    if (!start || !end) return "TBD";
    const s = new Date(start);
    const e = new Date(end);
    const fmt = (d: Date) =>
      d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    return `${fmt(s)} - ${fmt(e)}`;
  };

  const handleSave = () => {
    if (tripData.destination) {
      const newTrip: UpcomingTrip = {
        id: Date.now(),
        destination: tripData.destination,
        country: tripData.country || "Malaysia",
        dates: formatDateRange(tripData.startDate, tripData.endDate),
        budget: calculateTotal(),
        status: "planning",
        image: TRIP_EMOJIS[Math.floor(Math.random() * TRIP_EMOJIS.length)],
      };
      setUpcomingTrips((prev) => [...prev, newTrip]);
    }
    setIsModalOpen(false);
    setTripData({
      destination: "",
      country: "",
      startDate: "",
      endDate: "",
      flights: "",
      accommodation: "",
      food: "",
      activities: "",
      transport: "",
      misc: "",
    });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 relative">
      <Navigation />
      <GroupLabel group={3} />
      <AnimatedBackground variant="subtle" />

      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <PageHeader
          title="Trip Tracker"
          subtitle="Log expenses, review spending & reflect"
          icon={<CalendarRange className="size-7 text-white" />}
          action={
            <Button
              size="sm"
              className="rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white border-0"
              onClick={() => setIsModalOpen(true)}
            >
              <Plus className="w-4 h-4 mr-1" />
              New Trip
            </Button>
          }
        />

        {/* Active Trip */}
        <div className="mb-6">
          <h2 className="font-bold text-lg text-neutral-800 dark:text-neutral-100 mb-4">Active Trip</h2>
          <Link href="/informatics/planner/1/expenses">
            <UnifiedCard gradient className="p-5">
              <div className="flex items-center gap-4">
                <div className="size-14 rounded-2xl bg-gradient-to-br from-violet-100 to-purple-100 dark:from-violet-900/40 dark:to-purple-900/40 flex items-center justify-center text-2xl shadow-sm">
                  🏛️
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-neutral-800 dark:text-neutral-100">Melaka</h3>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 font-medium">
                      Active
                    </span>
                  </div>
                  <p className="text-neutral-500 dark:text-neutral-400 text-sm">Malaysia</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-neutral-500 dark:text-neutral-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Jun 8 - Jun 10
                    </span>
                    <span className="flex items-center gap-1">
                      <Wallet className="w-3 h-3" />
                      RM 390 / 600
                    </span>
                  </div>
                  <Progress value={65} className="mt-2 h-1.5" />
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="size-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center shadow-lg shadow-violet-500/25">
                    <Receipt className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-[10px] text-neutral-500 dark:text-neutral-400">Expenses</span>
                </div>
              </div>
            </UnifiedCard>
          </Link>
        </div>

        {/* Upcoming Trips */}
        <div className="mb-6">
          <h2 className="font-bold text-lg text-neutral-800 dark:text-neutral-100 mb-4">Upcoming</h2>
          <div className="space-y-3">
            {upcomingTrips.map((trip) => (
              <UnifiedCard key={trip.id} className="p-4">
                <div className="flex items-center gap-4">
                  <div className="size-14 rounded-xl bg-violet-50 dark:bg-violet-900/20 flex items-center justify-center text-2xl">
                    {trip.image}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-neutral-800 dark:text-neutral-100">{trip.destination}</h3>
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-medium ${
                          trip.status === "confirmed"
                            ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400"
                            : "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400"
                        }`}
                      >
                        {trip.status === "confirmed" ? "Confirmed" : "Planning"}
                      </span>
                    </div>
                    <p className="text-neutral-500 dark:text-neutral-400 text-sm">{trip.country}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-neutral-500 dark:text-neutral-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {trip.dates}
                      </span>
                      <span className="flex items-center gap-1">
                        <Wallet className="w-3 h-3" />
                        RM {trip.budget.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-neutral-400" />
                </div>
              </UnifiedCard>
            ))}
          </div>
        </div>

        {/* AI Suggestion */}
        <div className="mb-6">
          <UnifiedCard gradient className="p-5">
            <div className="flex items-start gap-3">
              <div className="size-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-violet-500/25">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-neutral-800 dark:text-neutral-100 text-sm mb-1">Trip Suggestion</p>
                <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed">
                  Based on your Melaka spending, you&apos;re 35% under budget! Consider adding a river cruise
                  or visiting more heritage sites to make the most of your trip.
                </p>
              </div>
            </div>
          </UnifiedCard>
        </div>

        {/* Past Trips */}
        <div className="mb-8">
          <h2 className="font-bold text-lg text-neutral-800 dark:text-neutral-100 mb-4">Past Trips</h2>
          <div className="space-y-3">
            {pastTrips.map((trip) => {
              const overBudget = trip.spent > trip.budget;
              return (
                <UnifiedCard key={trip.id} className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="size-12 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-xl">
                      {trip.image}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-neutral-800 dark:text-neutral-100">{trip.destination}</h3>
                        <span
                          className={`text-sm font-semibold ${
                            overBudget ? "text-amber-600" : "text-emerald-600"
                          }`}
                        >
                          RM {trip.spent.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-neutral-500 dark:text-neutral-400 text-xs">{trip.dates}</p>
                      <Progress
                        value={Math.min((trip.spent / trip.budget) * 100, 100)}
                        className="mt-2 h-1.5"
                      />
                    </div>
                  </div>
                </UnifiedCard>
              );
            })}
          </div>
        </div>

        {/* Flow Guide */}
        <FlowGuide
          variant="card"
          title="Continue Your Journey"
          maxSuggestions={2}
        />
      </main>

      {/* New Trip Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Plan New Trip</DialogTitle>
            <DialogDescription>Calculate your trip budget breakdown</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Basic Info */}
            <div className="space-y-2">
              <Label htmlFor="destination">Destination</Label>
              <Input
                id="destination"
                placeholder="e.g., Langkawi"
                value={tripData.destination}
                onChange={(e) => handleInputChange("destination", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                placeholder="e.g., Malaysia"
                value={tripData.country}
                onChange={(e) => handleInputChange("country", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={tripData.startDate}
                  onChange={(e) => handleInputChange("startDate", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={tripData.endDate}
                  onChange={(e) => handleInputChange("endDate", e.target.value)}
                />
              </div>
            </div>

            {/* Budget Breakdown */}
            <div className="pt-4 border-t">
              <h3 className="font-semibold text-sm mb-3">Budget Breakdown</h3>

              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="flights" className="flex items-center gap-2">
                    <Plane className="w-4 h-4" />
                    Flights
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      RM
                    </span>
                    <Input
                      id="flights"
                      type="number"
                      placeholder="0.00"
                      className="pl-10"
                      value={tripData.flights}
                      onChange={(e) => handleInputChange("flights", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="accommodation" className="flex items-center gap-2">
                    <Hotel className="w-4 h-4" />
                    Accommodation
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      RM
                    </span>
                    <Input
                      id="accommodation"
                      type="number"
                      placeholder="0.00"
                      className="pl-10"
                      value={tripData.accommodation}
                      onChange={(e) => handleInputChange("accommodation", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="food" className="flex items-center gap-2">
                    <Utensils className="w-4 h-4" />
                    Food & Dining
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      RM
                    </span>
                    <Input
                      id="food"
                      type="number"
                      placeholder="0.00"
                      className="pl-10"
                      value={tripData.food}
                      onChange={(e) => handleInputChange("food", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="activities" className="flex items-center gap-2">
                    <Activity className="w-4 h-4" />
                    Activities & Tours
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      RM
                    </span>
                    <Input
                      id="activities"
                      type="number"
                      placeholder="0.00"
                      className="pl-10"
                      value={tripData.activities}
                      onChange={(e) => handleInputChange("activities", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="transport" className="flex items-center gap-2">
                    <Car className="w-4 h-4" />
                    Local Transport
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      RM
                    </span>
                    <Input
                      id="transport"
                      type="number"
                      placeholder="0.00"
                      className="pl-10"
                      value={tripData.transport}
                      onChange={(e) => handleInputChange("transport", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="misc" className="flex items-center gap-2">
                    <MoreHorizontal className="w-4 h-4" />
                    Miscellaneous
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      RM
                    </span>
                    <Input
                      id="misc"
                      type="number"
                      placeholder="0.00"
                      className="pl-10"
                      value={tripData.misc}
                      onChange={(e) => handleInputChange("misc", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Total */}
            <div className="pt-4 border-t">
              <div className="flex items-center justify-between p-3 bg-violet-50 dark:bg-violet-900/20 rounded-lg">
                <span className="font-semibold">Total Budget</span>
                <span className="text-xl font-bold text-violet-600 dark:text-violet-400">
                  RM{" "}
                  {calculateTotal().toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white border-0">
              Save Trip
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
