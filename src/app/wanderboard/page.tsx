"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navigation } from "@/components/shared/navigation";
import { GroupLabel } from "@/components/shared/group-label";
import {
  Search,
  Calendar,
  Users,
  ChevronDown,
} from "lucide-react";

export default function WanderboardLandingPage() {
  const router = useRouter();
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [pax, setPax] = useState<number | null>(null);
  const [showPaxDropdown, setShowPaxDropdown] = useState(false);

  const handleSearch = () => {
    router.push(`/dashboard?destination=${encodeURIComponent(destination)}&date=${date}&pax=${pax || 1}`);
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9]">
      <Navigation />
      <GroupLabel group={2} />

      {/* Main Content */}
      <main className="container mx-auto px-6 lg:px-24 pt-24 md:pt-32 lg:pt-48">
        {/* Headline */}
        <h1 className="text-4xl md:text-5xl font-semibold text-[#334155] leading-tight tracking-tight mb-8 md:mb-12">
          Get live data from<br />
          your destination.
        </h1>

        {/* Search Form */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Destination Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-[#64748B]" />
            <Input
              type="text"
              placeholder="Where are you travelling to?"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="pl-10 h-9 w-full sm:w-[244px] border-[#E2E8F0] bg-white shadow-sm text-sm text-[#64748B] rounded-lg"
            />
          </div>

          {/* Date Picker */}
          <div className="relative">
            <Calendar className="absolute left-2 top-1/2 -translate-y-1/2 size-5 text-[#64748B]" />
            <Input
              type="text"
              placeholder="Pick a date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              onFocus={(e) => e.target.type = 'date'}
              onBlur={(e) => { if (!e.target.value) e.target.type = 'text' }}
              className="pl-9 h-8 w-full sm:w-[197px] border-[#E2E8F0] bg-white shadow-sm text-sm text-[#64748B] rounded-lg"
            />
          </div>

          {/* Pax Selector */}
          <div className="relative">
            <button
              onClick={() => setShowPaxDropdown(!showPaxDropdown)}
              className="h-8 px-2 flex items-center gap-2 border border-[#E2E8F0] rounded-lg bg-white shadow-sm text-sm w-full sm:w-[128px]"
            >
              <Users className="size-5 text-[#64748B]" />
              <span className="text-[#737373]">{pax || 'Pax'}</span>
              <ChevronDown className="size-4 text-[#A3A3A3] ml-auto" />
            </button>
            
            {showPaxDropdown && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#E2E8F0] rounded-lg shadow-md z-50">
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <button
                    key={num}
                    onClick={() => {
                      setPax(num);
                      setShowPaxDropdown(false);
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-[#334155]"
                  >
                    {num}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search Button */}
          <Button 
            onClick={handleSearch}
            className="bg-[#0F172A] text-[#F8FAFC] px-4 h-9 text-sm font-semibold rounded-lg"
          >
            Search
          </Button>
        </div>
      </main>
    </div>
  );
}
