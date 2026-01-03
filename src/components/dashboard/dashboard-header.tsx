"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Search, Users, Calendar, ChevronDown } from "lucide-react";

interface DashboardHeaderProps {
  destination?: string;
  date?: string;
  pax?: number;
}

export function DashboardHeader({
  destination = "Kuala Lumpur",
  date = "23/01/25",
  pax = 1,
}: DashboardHeaderProps) {
  const pathname = usePathname();
  const [showBookingMenu, setShowBookingMenu] = useState(false);

  const tabs = [
    { href: "/dashboard", label: "Live Itinerary", active: pathname === "/dashboard" },
    {
      label: "Booking Details",
      hasDropdown: true,
      items: [
        { href: "/dashboard/budget", label: "Overall Budget" },
        { href: "/dashboard/schedule", label: "Schedule & Updates" },
      ],
    },
  ];

  const isBookingActive = pathname.includes("/budget") || pathname.includes("/schedule");

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="container mx-auto px-6 lg:px-24">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="font-semibold text-xl tracking-tight text-purple-900">
              Wanderboard
            </span>
          </Link>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1">
            <Link href="/dashboard">
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "rounded-lg transition-all",
                  pathname === "/dashboard"
                    ? "bg-purple-100 text-purple-900 font-semibold"
                    : "text-slate-600 hover:text-slate-900"
                )}
              >
                Live Itinerary
              </Button>
            </Link>

            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowBookingMenu(!showBookingMenu)}
                className={cn(
                  "rounded-lg transition-all flex items-center gap-1",
                  isBookingActive
                    ? "bg-purple-100 text-purple-900 font-semibold"
                    : "text-slate-600 hover:text-slate-900"
                )}
              >
                Booking Details
                <ChevronDown className="size-4" />
              </Button>

              {showBookingMenu && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border p-2 z-50">
                  <Link
                    href="/dashboard/budget"
                    onClick={() => setShowBookingMenu(false)}
                    className={cn(
                      "block px-3 py-2 rounded-md text-sm transition-colors",
                      pathname === "/dashboard/budget"
                        ? "bg-purple-50 text-purple-900 font-medium"
                        : "text-slate-600 hover:bg-slate-50"
                    )}
                  >
                    Overall Budget
                  </Link>
                  <Link
                    href="/dashboard/schedule"
                    onClick={() => setShowBookingMenu(false)}
                    className={cn(
                      "block px-3 py-2 rounded-md text-sm transition-colors",
                      pathname === "/dashboard/schedule"
                        ? "bg-purple-50 text-purple-900 font-medium"
                        : "text-slate-600 hover:bg-slate-50"
                    )}
                  >
                    Schedule & Updates
                  </Link>
                </div>
              )}
            </div>
          </nav>

          {/* User Avatar */}
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-slate-100 flex items-center justify-center">
              <span className="text-sm font-semibold text-slate-600">AF</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="container mx-auto px-6 lg:px-24 py-3 bg-white">
        <div className="flex flex-wrap items-center gap-3">
          {/* Destination Input */}
          <div className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg shadow-sm flex-1 min-w-[200px] max-w-xs">
            <Search className="size-4 text-slate-400" />
            <input
              type="text"
              placeholder="Where are you travelling to?"
              defaultValue={destination}
              className="flex-1 text-sm bg-transparent outline-none text-slate-700 placeholder:text-slate-400"
            />
          </div>

          {/* Pax Selector */}
          <div className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg shadow-sm min-w-[100px]">
            <Users className="size-4 text-slate-400" />
            <span className="text-sm text-slate-600">{pax}</span>
            <ChevronDown className="size-4 text-slate-400" />
          </div>

          {/* Date Picker */}
          <div className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg shadow-sm min-w-[120px]">
            <Calendar className="size-4 text-slate-400" />
            <span className="text-sm text-slate-600">{date}</span>
          </div>

          {/* Search Button */}
          <Button className="bg-slate-900 hover:bg-slate-800 text-white px-6">
            Search
          </Button>
        </div>
      </div>
    </header>
  );
}

