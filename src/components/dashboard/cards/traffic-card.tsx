"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, AlertTriangle, CheckCircle2, Clock } from "lucide-react";

interface TrafficUpdate {
  type: "closure" | "subside" | "clear";
  message: string;
  time?: string;
}

interface TrafficCardProps {
  updates?: TrafficUpdate[];
}

const defaultUpdates: TrafficUpdate[] = [
  { type: "closure", message: "Road closure", time: "Now" },
  { type: "subside", message: "Traffic subside", time: "30 min" },
  { type: "clear", message: "Road clear", time: "1 hr" },
];

export function TrafficCard({ updates = defaultUpdates }: TrafficCardProps) {
  const getIcon = (type: TrafficUpdate["type"]) => {
    switch (type) {
      case "closure":
        return <AlertTriangle className="size-4 text-red-500" />;
      case "subside":
        return <Clock className="size-4 text-amber-500" />;
      case "clear":
        return <CheckCircle2 className="size-4 text-emerald-500" />;
    }
  };

  const getStyle = (type: TrafficUpdate["type"]) => {
    switch (type) {
      case "closure":
        return "border-red-200 bg-red-50";
      case "subside":
        return "border-amber-200 bg-amber-50";
      case "clear":
        return "border-emerald-200 bg-emerald-50";
    }
  };

  return (
    <Card className="border-purple-500 shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Car className="size-4 text-purple-500" />
          <CardTitle className="text-base font-semibold text-slate-700">
            Traffic Movement
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {updates.map((update, index) => (
          <div
            key={index}
            className={`flex items-center justify-between p-2.5 rounded-lg border ${getStyle(
              update.type
            )}`}
          >
            <div className="flex items-center gap-2">
              {getIcon(update.type)}
              <span className="text-sm text-slate-700">{update.message}</span>
            </div>
            {update.time && (
              <span className="text-xs text-slate-500">{update.time}</span>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

