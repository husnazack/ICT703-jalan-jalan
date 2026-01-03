"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

interface TrendingItem {
  tag: string;
  isHot?: boolean;
}

interface TrendingCardProps {
  items?: TrendingItem[];
}

const defaultItems: TrendingItem[] = [
  { tag: "#LangkawiSunset", isHot: true },
  { tag: "Penang Hot Air Balloon Fiesta", isHot: false },
  { tag: "Viral Char Kuey Teaw", isHot: false },
];

export function TrendingCard({ items = defaultItems }: TrendingCardProps) {
  return (
    <Card className="border-purple-500 shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <TrendingUp className="size-4 text-purple-500" />
          <CardTitle className="text-base font-semibold text-slate-700">
            Now Trending
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <span className="text-xs text-slate-400 w-4">{index + 1}.</span>
            <span className="text-sm text-slate-700 flex-1">{item.tag}</span>
            {item.isHot && (
              <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-medium">
                🔥 Hot
              </span>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

