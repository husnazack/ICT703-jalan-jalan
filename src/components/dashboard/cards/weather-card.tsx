"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cloud, CloudRain, Sun } from "lucide-react";

interface WeatherCardProps {
  temperature?: number;
  condition?: string;
  alert?: string;
}

export function WeatherCard({
  temperature = 28,
  condition = "Partly Cloudy",
  alert = "Moderate rain expected at 5PM",
}: WeatherCardProps) {
  const getWeatherIcon = () => {
    if (condition.toLowerCase().includes("rain")) {
      return <CloudRain className="size-16 text-blue-400" />;
    }
    if (condition.toLowerCase().includes("cloud")) {
      return <Cloud className="size-16 text-slate-400" />;
    }
    return <Sun className="size-16 text-amber-400" />;
  };

  return (
    <Card className="border-purple-500 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold text-slate-700">
          Weather
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center py-4">
        {getWeatherIcon()}
        <div className="flex items-baseline gap-1 mt-2">
          <span className="text-4xl font-bold text-slate-700">{temperature}</span>
          <span className="text-xl text-slate-500">°C</span>
        </div>
        <p className="text-xs text-slate-500 mt-1">{condition}</p>
        {alert && (
          <p className="text-xs text-amber-600 mt-3 text-center bg-amber-50 px-3 py-1.5 rounded-full">
            {alert}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

