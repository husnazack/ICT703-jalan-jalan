"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Check, BookOpen, Calendar } from "lucide-react";
import { Navigation } from "@/components/shared/navigation";
import { GroupLabel } from "@/components/shared/group-label";
import {
  AnimatedBackground,
  UnifiedCard,
  PageHeader,
} from "@/components/shared/page-layout";
import { FlowGuide } from "@/components/shared/flow-guide";
import { cn } from "@/lib/utils";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { STORAGE_KEYS, DEFAULT_REFLECTIONS, type TripReflection } from "@/lib/settings-defaults";

interface Trip {
  id: number;
  name: string;
  destination: string;
  country: string;
  dates: string;
  image: string;
  budgetData: {
    category: string;
    planned: number;
    actual: number;
  }[];
}

const trips: Trip[] = [
  {
    id: 1,
    name: "Melaka Heritage",
    destination: "Melaka",
    country: "Malaysia",
    dates: "Jun 8 - Jun 10",
    image: "🏛️",
    budgetData: [
      { category: "Transport", planned: 100, actual: 15 },
      { category: "Accommodation", planned: 250, actual: 240 },
      { category: "Food", planned: 200, actual: 90 },
      { category: "Activities", planned: 50, actual: 45 },
    ],
  },
  {
    id: 2,
    name: "Johor Getaway",
    destination: "Johor Bahru",
    country: "Malaysia",
    dates: "May 5 - May 7",
    image: "🏖️",
    budgetData: [
      { category: "Transport", planned: 200, actual: 180 },
      { category: "Accommodation", planned: 300, actual: 280 },
      { category: "Food", planned: 200, actual: 170 },
      { category: "Activities", planned: 100, actual: 70 },
    ],
  },
  {
    id: 3,
    name: "Kuching Trip",
    destination: "Kuching",
    country: "Malaysia",
    dates: "Apr 12 - Apr 15",
    image: "🐱",
    budgetData: [
      { category: "Transport", planned: 350, actual: 320 },
      { category: "Accommodation", planned: 450, actual: 420 },
      { category: "Food", planned: 250, actual: 230 },
      { category: "Activities", planned: 150, actual: 130 },
    ],
  },
  {
    id: 4,
    name: "Ipoh Getaway",
    destination: "Ipoh",
    country: "Malaysia",
    dates: "Mar 8 - Mar 10",
    image: "🍲",
    budgetData: [
      { category: "Transport", planned: 120, actual: 100 },
      { category: "Accommodation", planned: 200, actual: 190 },
      { category: "Food", planned: 130, actual: 140 },
      { category: "Activities", planned: 50, actual: 50 },
    ],
  },
];

const tags = ["Hidden Fees", "Impulse Buy", "Transport", "Emergency", "Dining Out", "Shopping"];

export default function ReflectionPage() {
  const router = useRouter();
  const [reflections, setReflections] = useLocalStorage<TripReflection>(
    STORAGE_KEYS.reflections,
    DEFAULT_REFLECTIONS
  );
  const [selectedTripId, setSelectedTripId] = useState<number>(1);

  const selectedTrip = trips.find((trip) => trip.id === selectedTripId) || trips[0];
  const budgetData = selectedTrip.budgetData;

  const currentReflection = reflections[selectedTripId] || { tags: [], note: "" };
  const selectedTags = currentReflection.tags;
  const note = currentReflection.note;

  const toggleTag = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];
    setReflections((prev) => ({
      ...prev,
      [selectedTripId]: { ...currentReflection, tags: newTags },
    }));
  };

  const setNote = (value: string) => {
    setReflections((prev) => ({
      ...prev,
      [selectedTripId]: { ...currentReflection, note: value },
    }));
  };

  const maxValue = Math.max(...budgetData.flatMap((d) => [d.planned, d.actual]));

  const handleSave = () => {
    router.push("/informatics/dashboard");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 relative">
      <Navigation />
      <GroupLabel group={3} />
      <AnimatedBackground variant="subtle" />

      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <PageHeader
          title="Trip Reflection"
          subtitle="Learn from your spending & plan better"
          icon={<BookOpen className="size-7 text-white" />}
        />

        {/* Trip Selection */}
        <div className="mb-6">
          <h2 className="font-bold text-lg text-neutral-800 dark:text-neutral-100 mb-4">Select Trip</h2>
          <div className="grid grid-cols-2 gap-3">
            {trips.map((trip) => (
              <UnifiedCard
                key={trip.id}
                hover
                className={cn(
                  "p-4 cursor-pointer",
                  selectedTripId === trip.id && "ring-2 ring-violet-500 dark:ring-violet-400"
                )}
              >
                <button
                  onClick={() => setSelectedTripId(trip.id)}
                  className="w-full text-left"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{trip.image}</span>
                    <h3 className="font-semibold text-sm text-neutral-800 dark:text-neutral-100 truncate">
                      {trip.destination}
                    </h3>
                  </div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">{trip.country}</p>
                  <div className="flex items-center gap-1 mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                    <Calendar className="w-3 h-3" />
                    <span>{trip.dates}</span>
                  </div>
                </button>
              </UnifiedCard>
            ))}
          </div>
        </div>

        {/* Selected Trip Info */}
        <div className="mb-6">
          <UnifiedCard gradient className="p-5">
            <div className="flex items-center gap-4">
              <div className="size-14 rounded-2xl bg-gradient-to-br from-violet-100 to-purple-100 dark:from-violet-900/40 dark:to-purple-900/40 flex items-center justify-center text-2xl shadow-sm">
                {selectedTrip.image}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-neutral-800 dark:text-neutral-100">{selectedTrip.destination}</h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">{selectedTrip.country}</p>
                <div className="flex items-center gap-3 mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {selectedTrip.dates}
                  </span>
                </div>
              </div>
            </div>
          </UnifiedCard>
        </div>

        {/* Bar Chart */}
        <div className="mb-6">
          <h2 className="font-bold text-lg text-neutral-800 dark:text-neutral-100 mb-4">Budget vs Actual Spend</h2>
          <UnifiedCard className="p-5">
            <div className="space-y-4">
              {budgetData.map((item, index) => {
                const plannedWidth = (item.planned / maxValue) * 100;
                const actualWidth = (item.actual / maxValue) * 100;
                const isOver = item.actual > item.planned;

                return (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">{item.category}</span>
                      <span
                        className={cn(
                          "text-xs font-medium",
                          isOver
                            ? "text-amber-600 dark:text-amber-400"
                            : "text-emerald-600 dark:text-emerald-400"
                        )}
                      >
                        {isOver ? "+" : ""}
                        {(((item.actual - item.planned) / item.planned) * 100).toFixed(0)}%
                      </span>
                    </div>
                    <div className="relative h-6 flex gap-1">
                      <div
                        className="h-full bg-neutral-200 dark:bg-neutral-700 rounded-md transition-all duration-500"
                        style={{ width: `${plannedWidth}%` }}
                      />
                      <div
                        className={cn(
                          "h-full rounded-md transition-all duration-700",
                          isOver
                            ? "bg-amber-500 dark:bg-amber-400"
                            : "bg-emerald-500 dark:bg-emerald-400"
                        )}
                        style={{ width: `${actualWidth}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-800">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-neutral-200 dark:bg-neutral-700" />
                <span className="text-xs text-neutral-500 dark:text-neutral-400">Planned</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-emerald-500 dark:bg-emerald-400" />
                <span className="text-xs text-neutral-500 dark:text-neutral-400">Under</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-amber-500 dark:bg-amber-400" />
                <span className="text-xs text-neutral-500 dark:text-neutral-400">Over</span>
              </div>
            </div>
          </UnifiedCard>
        </div>

        {/* Reason Tags */}
        <div className="mb-6">
          <h2 className="font-bold text-lg text-neutral-800 dark:text-neutral-100 mb-4">
            Why did you exceed the budget?
          </h2>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={cn(
                  "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                  selectedTags.includes(tag)
                    ? "bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-500/25"
                    : "bg-white/80 dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:border-violet-300 dark:hover:border-violet-700"
                )}
              >
                {selectedTags.includes(tag) && <Check className="w-3 h-3 inline mr-1" />}
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Note to Future Self */}
        <div className="mb-6">
          <h2 className="font-bold text-lg text-neutral-800 dark:text-neutral-100 mb-4">Note to future self</h2>
          <UnifiedCard className="p-1">
            <Textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="What would you do differently next time?"
              className="min-h-[120px] resize-none border-0 bg-transparent focus-visible:ring-0 text-neutral-800 dark:text-neutral-100 placeholder:text-neutral-400"
            />
          </UnifiedCard>
        </div>

        {/* Save Button */}
        <div className="mb-8">
          <Button
            onClick={handleSave}
            className="w-full bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white border-0 rounded-xl h-12 text-base"
            size="lg"
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Save Lesson to Profile
          </Button>
        </div>

        {/* Flow Guide */}
        <FlowGuide
          variant="card"
          title="Share Your Experience"
          maxSuggestions={2}
        />
      </main>
    </div>
  );
}
