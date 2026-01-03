"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldAlert } from "lucide-react";

interface SafetyCardProps {
  percentage?: number;
  warning?: string;
}

export function SafetyCard({
  percentage = 60,
  warning = "Caution: History of Pickpockets",
}: SafetyCardProps) {
  return (
    <Card className="border-purple-500 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold text-slate-700">
          Safety Level
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center py-4">
        <div className="relative">
          <ShieldAlert className="size-20 text-amber-400 opacity-50" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-bold text-slate-700">{percentage} %</span>
          </div>
        </div>
        <p className="text-xs text-slate-600 mt-3 text-center">{warning}</p>
      </CardContent>
    </Card>
  );
}

