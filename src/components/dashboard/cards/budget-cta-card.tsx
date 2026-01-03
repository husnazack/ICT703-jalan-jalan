"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet, ArrowRight } from "lucide-react";

interface BudgetCTACardProps {
  title?: string;
  description?: string;
  href?: string;
  buttonText?: string;
}

export function BudgetCTACard({
  title = "Manage your budget & booking!",
  description = "Track expenses and view booking details",
  href = "/dashboard/budget",
  buttonText = "Go to Module 3",
}: BudgetCTACardProps) {
  return (
    <Card className="border-purple-500 shadow-sm bg-gradient-to-br from-emerald-50 to-teal-50">
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-emerald-100 rounded-xl">
            <Wallet className="size-6 text-emerald-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-slate-800 mb-1">{title}</h3>
            <p className="text-sm text-slate-500 mb-3">{description}</p>
            <Link href={href}>
              <Button
                size="sm"
                className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2"
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

