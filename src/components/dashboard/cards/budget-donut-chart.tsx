"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BudgetDonutChartProps {
  expected?: number;
  actual?: number;
  currency?: string;
}

export function BudgetDonutChart({
  expected = 1000,
  actual = 650,
  currency = "RM",
}: BudgetDonutChartProps) {
  const percentage = Math.round((actual / expected) * 100);
  const remaining = expected - actual;

  // SVG donut chart calculations
  const size = 160;
  const strokeWidth = 20;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <Card className="border-purple-500 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold text-slate-700">
          Actual & Expected Budget
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center py-4">
        {/* Donut Chart */}
        <div className="relative">
          <svg width={size} height={size} className="transform -rotate-90">
            {/* Background circle */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="#e2e8f0"
              strokeWidth={strokeWidth}
            />
            {/* Progress circle */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="#8b5cf6"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-500"
            />
          </svg>
          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-slate-700">{percentage}%</span>
            <span className="text-xs text-slate-500">spent</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex gap-8 mt-6">
          <div className="text-center">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-3 h-3 rounded-full bg-slate-200" />
              <span className="text-xs text-slate-500">Expected</span>
            </div>
            <span className="text-lg font-semibold text-slate-700">
              {currency} {expected.toLocaleString()}
            </span>
          </div>
          <div className="text-center">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-3 h-3 rounded-full bg-purple-500" />
              <span className="text-xs text-slate-500">Actual</span>
            </div>
            <span className="text-lg font-semibold text-purple-600">
              {currency} {actual.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Remaining */}
        <div className="mt-4 px-4 py-2 bg-emerald-50 rounded-lg">
          <span className="text-sm text-emerald-600 font-medium">
            {currency} {remaining.toLocaleString()} remaining
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

