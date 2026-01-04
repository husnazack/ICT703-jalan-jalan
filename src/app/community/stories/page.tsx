"use client";

import { MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/shared/navigation";
import { GroupLabel } from "@/components/shared/group-label";
import Link from "next/link";

// Story Card component
function StoryCard({
  id,
  location,
  place,
  author,
  authorBadge,
  tags,
  bgColor
}: {
  id: number;
  location: string;
  place: string;
  author: string;
  authorBadge?: string;
  tags: string[];
  bgColor: string;
}) {
  return (
    <Link href={`/community/stories/${id}`}>
      <Card className="w-full border border-purple-950 shadow-sm rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
        <div className="p-6 space-y-1">
          <div className="flex items-center gap-1">
            <MapPin className="w-6 h-6" />
            <span className="font-semibold text-slate-700">{location}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">{author}</span>
            {authorBadge && <Badge variant="outline" className="rounded-lg border-purple-950">{authorBadge}</Badge>}
          </div>
        </div>
        <div className={`h-64 md:h-80 lg:h-96 ${bgColor} relative`}>
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <span className="text-sm font-semibold text-white">{place}</span>
          </div>
        </div>
        <div className="p-4 flex flex-wrap gap-2">
          {tags.map((tag, i) => (
            <Badge key={i} variant="outline" className="rounded-lg border-purple-950">{tag}</Badge>
          ))}
        </div>
      </Card>
    </Link>
  );
}

export default function CommunityStoriesPage() {
  const stories = [
    {
      id: 1,
      location: "Kuala Lumpur, Malaysia",
      place: "Kuala Lumpur City Centre",
      author: "Imran Rosli",
      authorBadge: "Verified Local",
      tags: ["#LocalTourist", "#KLCC"],
      bgColor: "bg-gradient-to-br from-blue-400 to-purple-500"
    },
    {
      id: 2,
      location: "Langkawi Island, Malaysia",
      place: "Langkawi Island Bridge",
      author: "Farah Shazwanie",
      authorBadge: "Frequent Traveller",
      tags: ["#Langkawi"],
      bgColor: "bg-gradient-to-br from-cyan-400 to-blue-500"
    },
    {
      id: 3,
      location: "Macau, Hong Kong",
      place: "Lisboeta, Macau",
      author: "Saranya Mohabatten",
      authorBadge: "Verified Local",
      tags: ["#Macau", "#Local", "#Tourist"],
      bgColor: "bg-gradient-to-br from-orange-400 to-red-500"
    },
    {
      id: 4,
      location: "Kuala Lumpur, Malaysia",
      place: "Kuala Lumpur City Centre",
      author: "Imran Rosli",
      authorBadge: "Verified Local",
      tags: ["#LocalTourist"],
      bgColor: "bg-gradient-to-br from-blue-400 to-purple-500"
    },
    {
      id: 5,
      location: "Langkawi Island, Malaysia",
      place: "Langkawi Island Bridge",
      author: "Farah Shazwanie",
      authorBadge: "Frequent Traveller",
      tags: ["#Langkawi"],
      bgColor: "bg-gradient-to-br from-cyan-400 to-blue-500"
    },
    {
      id: 6,
      location: "Macau, Hong Kong",
      place: "Lisboeta, Macau",
      author: "Saranya Mohabatten",
      authorBadge: "Verified Local",
      tags: ["#Macau", "#Local", "#Tourist"],
      bgColor: "bg-gradient-to-br from-orange-400 to-red-500"
    },
    {
      id: 7,
      location: "Kuala Lumpur, Malaysia",
      place: "Kuala Lumpur City Centre",
      author: "Imran Rosli",
      authorBadge: "Verified Local",
      tags: ["#LocalTourist"],
      bgColor: "bg-gradient-to-br from-blue-400 to-purple-500"
    },
    {
      id: 8,
      location: "Langkawi Island, Malaysia",
      place: "Langkawi Island Bridge",
      author: "Farah Shazwanie",
      authorBadge: "Frequent Traveller",
      tags: ["#Langkawi"],
      bgColor: "bg-gradient-to-br from-cyan-400 to-blue-500"
    },
    {
      id: 9,
      location: "Macau, Hong Kong",
      place: "Lisboeta, Macau",
      author: "Saranya Mohabatten",
      authorBadge: "Verified Local",
      tags: ["#Macau", "#Local", "#Tourist"],
      bgColor: "bg-gradient-to-br from-orange-400 to-red-500"
    },
    {
      id: 10,
      location: "Kuala Lumpur, Malaysia",
      place: "Kuala Lumpur City Centre",
      author: "Imran Rosli",
      authorBadge: "Verified Local",
      tags: ["#LocalTourist"],
      bgColor: "bg-gradient-to-br from-blue-400 to-purple-500"
    },
    {
      id: 11,
      location: "Langkawi Island, Malaysia",
      place: "Langkawi Island Bridge",
      author: "Farah Shazwanie",
      authorBadge: "Frequent Traveller",
      tags: ["#Langkawi"],
      bgColor: "bg-gradient-to-br from-cyan-400 to-blue-500"
    },
    {
      id: 12,
      location: "Macau, Hong Kong",
      place: "Lisboeta, Macau",
      author: "Saranya Mohabatten",
      authorBadge: "Verified Local",
      tags: ["#Macau", "#Local", "#Tourist"],
      bgColor: "bg-gradient-to-br from-orange-400 to-red-500"
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <GroupLabel group={4} />

      {/* Title Section */}
      <section className="px-4 sm:px-6 md:px-12 lg:px-16 xl:px-[90px] py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold text-slate-700" style={{ letterSpacing: "-0.03em" }}>
            Community Story
          </h1>
          <Link href="/community/stories/create">
            <Button className="bg-blue-900 hover:bg-blue-800 text-white font-semibold px-4 py-2 rounded-lg w-full sm:w-auto">
              Create Community Story
            </Button>
          </Link>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="px-4 sm:px-6 md:px-12 lg:px-16 xl:px-[90px] pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {stories.map((story) => (
            <StoryCard key={story.id} {...story} />
          ))}
        </div>
      </section>
    </div>
  );
}

