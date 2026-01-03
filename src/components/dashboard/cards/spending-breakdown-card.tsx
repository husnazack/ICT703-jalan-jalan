"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface SpendingCategory {
  name: string;
  percentage: number;
  color: string;
}

interface SpendingBreakdownCardProps {
  categories?: SpendingCategory[];
}

const defaultCategories: SpendingCategory[] = [
  { name: "Accommodation", percentage: 50, color: "bg-purple-500" },
  { name: "Transportation", percentage: 10, color: "bg-blue-500" },
  { name: "Food", percentage: 10, color: "bg-amber-500" },
  { name: "Shopping", percentage: 10, color: "bg-emerald-500" },
  { name: "Others", percentage: 10, color: "bg-slate-400" },
];

export function SpendingBreakdownCard({
  categories = defaultCategories,
}: SpendingBreakdownCardProps) {
  return (
    <Card className="border-purple-500 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold text-slate-700">
          My Spending
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {categories.map((category, index) => (
          <div key={index} className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">{category.name}</span>
              <span className="text-sm font-semibold text-slate-700">
                {category.percentage}%
              </span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={cn("h-full rounded-full transition-all duration-500", category.color)}
                style={{ width: `${category.percentage}%` }}
              />
            </div>
          </div>
        ))}

        {/* Total bar */}
        <div className="pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-700">Total Allocated</span>
            <span className="text-sm font-semibold text-slate-700">
              {categories.reduce((sum, cat) => sum + cat.percentage, 0)}%
            </span>
          </div>
          <div className="h-3 bg-slate-100 rounded-full overflow-hidden flex">
            {categories.map((category, index) => (
              <div
                key={index}
                className={cn("h-full transition-all duration-500", category.color)}
                style={{ width: `${category.percentage}%` }}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

