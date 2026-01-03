"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { MapPin, Clock, Coffee, Camera, ShoppingBag, Utensils, Moon } from "lucide-react";

interface TimelineItem {
  time: string;
  title: string;
  description?: string;
  icon: "location" | "coffee" | "camera" | "shopping" | "food" | "night";
  status?: "completed" | "current" | "upcoming";
}

interface ItineraryTimelineProps {
  date?: string;
  items?: TimelineItem[];
}

const defaultItems: TimelineItem[] = [
  {
    time: "9:00 AM",
    title: "Petronas Twin Towers",
    description: "Iconic landmark visit",
    icon: "camera",
    status: "completed",
  },
  {
    time: "11:00 AM",
    title: "Suria KLCC Mall",
    description: "Shopping & exploration",
    icon: "shopping",
    status: "completed",
  },
  {
    time: "1:00 PM",
    title: "KL Tower",
    description: "Panoramic city views",
    icon: "camera",
    status: "current",
  },
  {
    time: "2:30 PM",
    title: "Lunch at Jalan Alor",
    description: "Local street food experience",
    icon: "food",
    status: "upcoming",
  },
  {
    time: "4:00 PM",
    title: "Bukit Bintang",
    description: "Shopping district",
    icon: "shopping",
    status: "upcoming",
  },
  {
    time: "6:00 PM",
    title: "Pavilion KL / Lot 10",
    description: "Premium shopping",
    icon: "shopping",
    status: "upcoming",
  },
  {
    time: "8:00 PM",
    title: "Night walk around Saloma Bridge",
    description: "Evening stroll",
    icon: "night",
    status: "upcoming",
  },
];

export function ItineraryTimeline({
  date = "Day 1 - Thursday, 23 Jan 2025",
  items = defaultItems,
}: ItineraryTimelineProps) {
  const getIcon = (icon: TimelineItem["icon"]) => {
    const iconClass = "size-4";
    switch (icon) {
      case "location":
        return <MapPin className={iconClass} />;
      case "coffee":
        return <Coffee className={iconClass} />;
      case "camera":
        return <Camera className={iconClass} />;
      case "shopping":
        return <ShoppingBag className={iconClass} />;
      case "food":
        return <Utensils className={iconClass} />;
      case "night":
        return <Moon className={iconClass} />;
    }
  };

  const getStatusStyle = (status?: TimelineItem["status"]) => {
    switch (status) {
      case "completed":
        return {
          dot: "bg-emerald-500",
          line: "bg-emerald-200",
          text: "text-slate-500",
          bg: "bg-emerald-50",
        };
      case "current":
        return {
          dot: "bg-purple-500 ring-4 ring-purple-100",
          line: "bg-purple-200",
          text: "text-purple-700",
          bg: "bg-purple-50",
        };
      default:
        return {
          dot: "bg-slate-300",
          line: "bg-slate-200",
          text: "text-slate-600",
          bg: "bg-white",
        };
    }
  };

  return (
    <Card className="border-purple-500 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold text-slate-700">
          Suggested Itinerary Schedule
        </CardTitle>
        <p className="text-sm text-slate-500">{date}</p>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {items.map((item, index) => {
            const style = getStatusStyle(item.status);
            const isLast = index === items.length - 1;

            return (
              <div key={index} className="relative flex gap-4 pb-6 last:pb-0">
                {/* Timeline line */}
                {!isLast && (
                  <div
                    className={cn(
                      "absolute left-[11px] top-6 w-0.5 h-full",
                      style.line
                    )}
                  />
                )}

                {/* Timeline dot */}
                <div
                  className={cn(
                    "relative z-10 w-6 h-6 rounded-full flex items-center justify-center shrink-0",
                    style.dot
                  )}
                >
                  <span className="text-white">{getIcon(item.icon)}</span>
                </div>

                {/* Content */}
                <div
                  className={cn(
                    "flex-1 p-3 rounded-lg border",
                    style.bg,
                    item.status === "current" ? "border-purple-200" : "border-slate-100"
                  )}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={cn(
                        "font-semibold text-sm",
                        item.status === "current" ? "text-purple-700" : "text-slate-700"
                      )}
                    >
                      {item.title}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-slate-400">
                      <Clock className="size-3" />
                      {item.time}
                    </div>
                  </div>
                  {item.description && (
                    <p className="text-xs text-slate-500">{item.description}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

