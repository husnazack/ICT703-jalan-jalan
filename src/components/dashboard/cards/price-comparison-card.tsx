"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowDownNarrowWide } from "lucide-react";
import { cn } from "@/lib/utils";

interface Hotel {
  rank: number;
  name: string;
  source: string;
  price: number;
}

interface PriceComparisonCardProps {
  hotels?: Hotel[];
  sortOrder?: "asc" | "desc";
  onSortChange?: () => void;
}

const defaultHotels: Hotel[] = [
  { rank: 1, name: "OYO Hotel", source: "Agoda.com", price: 50 },
  { rank: 2, name: "Boutique Hotel", source: "Booking.com", price: 80 },
  { rank: 3, name: "Swiss Garden", source: "Booking.com", price: 150 },
];

export function PriceComparisonCard({
  hotels = defaultHotels,
  sortOrder = "asc",
  onSortChange,
}: PriceComparisonCardProps) {
  const sortedHotels = [...hotels].sort((a, b) =>
    sortOrder === "asc" ? a.price - b.price : b.price - a.price
  );

  const getPriceColor = (price: number) => {
    if (price <= 50) return "text-emerald-500 border-emerald-200";
    if (price <= 100) return "text-amber-500 border-amber-200";
    return "text-red-500 border-red-200";
  };

  return (
    <Card className="border-purple-500 shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold text-slate-700">
            Price Comparison
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={onSortChange}
            className="text-xs gap-1.5 border-slate-200"
          >
            <ArrowDownNarrowWide className="size-3.5" />
            {sortOrder === "asc" ? "Low to High" : "High to Low"}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-0">
          {sortedHotels.map((hotel, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-500 w-4">{hotel.rank}</span>
                <span className="text-xs font-medium text-slate-700">
                  {hotel.name}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-500">{hotel.source}</span>
                <span
                  className={cn(
                    "text-xs font-semibold px-2 py-0.5 rounded border",
                    getPriceColor(hotel.price)
                  )}
                >
                  RM {hotel.price}/ Night
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

