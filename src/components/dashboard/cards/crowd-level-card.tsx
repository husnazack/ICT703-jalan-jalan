"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

interface CrowdLevelCardProps {
  level?: "Low" | "Moderate" | "High";
  data?: number[];
}

const defaultData = [30, 45, 60, 55, 70, 65, 50, 45, 55, 60, 75, 80];

export function CrowdLevelCard({
  level = "Moderate",
  data = defaultData,
}: CrowdLevelCardProps) {
  const getLevelColor = () => {
    switch (level) {
      case "Low":
        return "text-emerald-500 bg-emerald-50";
      case "Moderate":
        return "text-amber-500 bg-amber-50";
      case "High":
        return "text-red-500 bg-red-50";
    }
  };

  const getChartColor = () => {
    switch (level) {
      case "Low":
        return "#10b981";
      case "Moderate":
        return "#f59e0b";
      case "High":
        return "#ef4444";
    }
  };

  const maxValue = Math.max(...data);
  const chartHeight = 60;

  return (
    <Card className="border-purple-500 shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="size-4 text-purple-500" />
            <CardTitle className="text-base font-semibold text-slate-700">
              Crowd Level
            </CardTitle>
          </div>
          <span
            className={`text-xs font-semibold px-2 py-1 rounded-full ${getLevelColor()}`}
          >
            {level}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        {/* Simple Area Chart */}
        <div className="relative h-16 mt-2">
          <svg
            width="100%"
            height={chartHeight}
            viewBox={`0 0 ${data.length * 20} ${chartHeight}`}
            preserveAspectRatio="none"
            className="overflow-visible"
          >
            {/* Area fill */}
            <path
              d={`
                M 0 ${chartHeight}
                ${data
                  .map(
                    (value, index) =>
                      `L ${index * 20 + 10} ${
                        chartHeight - (value / maxValue) * (chartHeight - 10)
                      }`
                  )
                  .join(" ")}
                L ${(data.length - 1) * 20 + 10} ${chartHeight}
                Z
              `}
              fill={getChartColor()}
              fillOpacity={0.2}
            />
            {/* Line */}
            <path
              d={`
                M 10 ${chartHeight - (data[0] / maxValue) * (chartHeight - 10)}
                ${data
                  .slice(1)
                  .map(
                    (value, index) =>
                      `L ${(index + 1) * 20 + 10} ${
                        chartHeight - (value / maxValue) * (chartHeight - 10)
                      }`
                  )
                  .join(" ")}
              `}
              fill="none"
              stroke={getChartColor()}
              strokeWidth={2}
            />
          </svg>
        </div>
        <div className="flex justify-between text-xs text-slate-400 mt-1">
          <span>6AM</span>
          <span>12PM</span>
          <span>6PM</span>
        </div>
      </CardContent>
    </Card>
  );
}

