import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/shared/navigation";
import { Footer } from "@/components/shared/footer";
import { JourneySelector } from "@/components/shared/journey-selector";
import { EventCard } from "@/components/community/event-card";
import { StoryCard } from "@/components/community/story-card";
import {
  MessageCircle,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

import {
  UnifiedCard,
} from "@/components/shared/page-layout";
import { Badge } from "@/components/ui/badge";

// Trip Card component
function TripCard({ title, dates, status }: { title: string; dates: string; status: "Active" | "Upcoming" }) {
  return (
    <UnifiedCard className="group p-0">
      <div className="p-6 space-y-1">
        <h3 className="font-semibold text-neutral-800 dark:text-neutral-100">{title}</h3>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">{dates}</p>
      </div>
      <div className="px-6 pb-6 flex items-center justify-between">
        <Badge
          variant="outline"
          className={cn(
            "rounded-lg",
            status === "Active"
              ? "border-emerald-500/50 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400"
              : "border-orange-500/50 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400"
          )}
        >
          {status}
        </Badge>
        <span className="font-semibold text-neutral-600 dark:text-neutral-300 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
          View More
        </span>
      </div>
    </UnifiedCard>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />

      <main className="flex-1">
        {/* Compact Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-emerald-950/20 dark:via-teal-950/20 dark:to-cyan-950/20" />

          <div className="relative container mx-auto px-4 py-12 md:py-16">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                Your Travel Community
              </h1>

              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                Plan trips, share stories, and discover experiences with fellow travelers.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/predictions">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-0 shadow-lg shadow-emerald-500/25"
                  >
                    <Sparkles className="size-5 mr-2" />
                    Start Planning
                  </Button>
                </Link>
                <Link href="/chat">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    <MessageCircle className="size-5 mr-2" />
                    Talk to Trevllo AI
                  </Button>
                </Link>
              </div>

              {/* Journey Selector */}
              <div className="mt-10 max-w-2xl mx-auto">
                <JourneySelector />
              </div>
            </div>
          </div>
        </section>

        {/* My Trip Section */}
        <section className="container mx-auto px-4 py-16 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">
              My Trip
            </h2>
            <div className="relative flex items-center justify-center max-w-6xl mx-auto px-4">
              <p className="text-muted-foreground text-center max-w-2xl">
                Manage your active and upcoming travel itineraries
              </p>
              <Link
                href="/predictions"
                className="absolute right-0 text-base font-semibold text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition-colors hidden md:block"
              >
                Create New Trip →
              </Link>
            </div>
            <Link
              href="/predictions"
              className="md:hidden inline-block mt-4 text-base font-semibold text-orange-600 dark:text-orange-400"
            >
              Create New Trip →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <TripCard
              title="Malacca River Walk"
              dates="25th February - 26th February 2026"
              status="Active"
            />
            <TripCard
              title="Baba Nyonya Heritage Museum"
              dates="25th March - 26th March 2026"
              status="Upcoming"
            />
            <TripCard
              title="Menara Taming Sari"
              dates="25th April - 26th April 2026"
              status="Upcoming"
            />
          </div>
        </section>

        {/* Community Story Section */}
        <section className="bg-muted/30 py-12">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Community Story</h2>
              <div className="relative flex items-center justify-center max-w-6xl mx-auto px-4">
                <p className="text-muted-foreground text-center max-w-2xl">
                  Real experiences and authentic stories from verified travelers
                </p>
                <Link
                  href="/community/stories"
                  className="absolute right-0 text-base font-semibold text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition-colors hidden md:block"
                >
                  View More →
                </Link>
              </div>
              <Link
                href="/community/stories"
                className="md:hidden inline-block mt-4 text-base font-semibold text-orange-600 dark:text-orange-400"
              >
                View More →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              <StoryCard
                id={1}
                location="Melaka"
                place="Malacca Sultanate Museum"
                author="Imran Rosli"
                authorBadge="Verified Local"
                tags={["#LocalTourist", "#Melaka"]}
                bgGradient="bg-gradient-to-br from-blue-400 to-purple-500"
                image="story-01.webp"
              />
              <StoryCard
                id={2}
                location="Melaka"
                place="Muzium Samudera"
                author="Farah Shazwanie"
                authorBadge="Frequent Traveller"
                tags={["#Melaka"]}
                bgGradient="bg-gradient-to-br from-cyan-400 to-blue-500"
                image="story-02.webp"
              />
              <StoryCard
                id={3}
                location="Melaka"
                place="Kampung Morten"
                author="Hafiz Suhaimi"
                authorBadge="Verified Local"
                tags={["#Melaka", "#Local", "#Tourist"]}
                bgGradient="bg-gradient-to-br from-orange-400 to-red-500"
                image="story-03.webp"
              />
            </div>
          </div>
        </section>

        {/* Upcoming Events Section */}
        <section className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Upcoming Events</h2>
            <div className="relative flex items-center justify-center max-w-6xl mx-auto px-4">
              <p className="text-muted-foreground text-center max-w-2xl">
                Discover exciting events and activities happening across Malaysia
              </p>
              <Link
                href="/community/events"
                className="absolute right-0 text-base font-semibold text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition-colors hidden md:block"
              >
                View More →
              </Link>
            </div>
            <Link
              href="/community/events"
              className="md:hidden inline-block mt-4 text-base font-semibold text-orange-600 dark:text-orange-400"
            >
              View More →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <EventCard
              title="Jom Cuti Sekolah 2026"
              subtitle="School holiday travel deals and family activities"
              date="12 - 15 January 2026"
              location="Ayer Keroh, Melaka"
              type="Promotion Event"
              badges={["Family-friendly", "School Holiday"]}
              image="event-01.png"
              imageGradient="bg-gradient-to-br from-yellow-200 to-orange-300"
            />
            <EventCard
              title="Cuti Cuti Muslim-Friendly Fair"
              subtitle="Muslim-friendly travel packages and experiences"
              date="18 - 20 January 2026"
              location="Ayer Molek, Melaka"
              type="Travel Fair"
              badges={["Muslim-friendly", "Travel Deals"]}
              image="event-02.png"
              imageGradient="bg-gradient-to-br from-green-200 to-teal-300"
            />
            <EventCard
              title="Play Your Way to Joy Festival"
              subtitle="Interactive activities and attractions for all ages"
              date="5 - 7 February 2026"
              location="Pantai Klebang, Melaka"
              type="Festival"
              badges={["Family-friendly", "Popular Event"]}
              image="event-03.png"
              imageGradient="bg-gradient-to-br from-purple-200 to-pink-300"
            />
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Plan Your Perfect Trip?
            </h2>
            <p className="text-emerald-100 max-w-2xl mx-auto mb-8 text-lg">
              Join our community of travelers and start creating memorable holiday experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/predictions">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-white text-emerald-700 hover:bg-emerald-50"
                >
                  Start Planning Now
                  <ArrowRight className="size-5 ml-2" />
                </Button>
              </Link>
              <Link href="/chat">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-white text-white hover:bg-white/10"
                >
                  Talk to Trevllo AI
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
