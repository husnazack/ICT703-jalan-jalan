"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Attraction {
  name: string;
  status: "Open" | "Closed";
  distance: string;
}

interface AttractionCardProps {
  attractions?: Attraction[];
  filter?: "All" | "Open";
  onFilterChange?: (filter: "All" | "Open") => void;
}

const defaultAttractions: Attraction[] = [
  { name: "Petrosains", status: "Open", distance: "0.4 KM" },
  { name: "Muzium Negara", status: "Open", distance: "3.0 KM" },
  { name: "Aquaria", status: "Closed", distance: "1.0 KM" },
  { name: "KL Tower", status: "Closed", distance: "5.0 KM" },
];

export function AttractionCard({
  attractions = defaultAttractions,
  filter = "All",
  onFilterChange,
}: AttractionCardProps) {
  const filteredAttractions =
    filter === "Open"
      ? attractions.filter((a) => a.status === "Open")
      : attractions;

  return (
    <Card className="border-purple-500 shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold text-slate-700">
            Attraction Operating Status
          </CardTitle>
          
          {/* Tabs */}
          <div className="flex items-center bg-slate-100 rounded-lg p-0.5">
            <button
              onClick={() => onFilterChange?.("All")}
              className={cn(
                "px-3 py-1 text-xs font-semibold rounded-md transition-all",
                filter === "All"
                  ? "bg-white text-slate-700 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              )}
            >
              All
            </button>
            <button
              onClick={() => onFilterChange?.("Open")}
              className={cn(
                "px-3 py-1 text-xs font-semibold rounded-md transition-all",
                filter === "Open"
                  ? "bg-white text-slate-700 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              )}
            >
              Open
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {filteredAttractions.map((attraction, index) => (
          <div
            key={index}
            className={cn(
              "flex items-center justify-between p-3 rounded-lg border",
              attraction.status === "Open"
                ? "border-emerald-400 bg-white"
                : "border-red-400 bg-white"
            )}
          >
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "w-1 h-8 rounded-full",
                  attraction.status === "Open" ? "bg-emerald-400" : "bg-red-400"
                )}
              />
              <div>
                <p className="text-xs font-semibold text-slate-700">
                  {attraction.name}
                </p>
                <div className="flex items-center gap-2 text-xs">
                  <span
                    className={cn(
                      "font-semibold",
                      attraction.status === "Open"
                        ? "text-emerald-500"
                        : "text-red-500"
                    )}
                  >
                    {attraction.status}
                  </span>
                  <span className="text-slate-600">{attraction.distance}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

