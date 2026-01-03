"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, ArrowRight } from "lucide-react";

interface ItineraryCTACardProps {
  title?: string;
  description?: string;
  href?: string;
  buttonText?: string;
}

export function ItineraryCTACard({
  title = "Check the itinerary that we plan for you!",
  description = "View your personalized schedule",
  href = "/dashboard/schedule",
  buttonText = "Schedule & Updates",
}: ItineraryCTACardProps) {
  return (
    <Card className="border-purple-500 shadow-sm bg-gradient-to-br from-purple-50 to-indigo-50">
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-purple-100 rounded-xl">
            <CalendarDays className="size-6 text-purple-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-slate-800 mb-1">{title}</h3>
            <p className="text-sm text-slate-500 mb-3">{description}</p>
            <Link href={href}>
              <Button
                size="sm"
                className="bg-purple-600 hover:bg-purple-700 text-white gap-2"
              >
                {buttonText}
                <ArrowRight className="size-4" />
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

