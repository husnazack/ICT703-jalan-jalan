"use client";

import * as React from "react";
import Link from "next/link";
import { Navigation } from "@/components/shared/navigation";
import { Footer } from "@/components/shared/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import {
  Search,
  MapPin,
  Calendar,
  Users,
  Star,
  Filter,
  Clock,
  Sparkles,
  Heart,
  TrendingUp,
  Sun,
  CloudRain,
  Thermometer,
  ArrowRight,
  X,
} from "lucide-react";

// Mock destination data
const destinations = [
  {
    id: 1,
    name: "Langkawi",
    state: "Kedah",
    country: "Malaysia",
    description: "An archipelago of 99 islands in the Andaman Sea, known for beaches, mangroves, and duty-free shopping.",
    rating: 4.8,
    reviews: 2345,
    priceRange: "$$",
    bestTime: "Dec - Apr",
    avgTemp: "28°C",
    weather: "sunny",
    image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=600&h=400&fit=crop",
    tags: ["Beach", "Island", "Nature", "Duty-Free"],
    contextAlert: "Eagle Festival happening next month!",
    popularity: 95,
  },
  {
    id: 2,
    name: "Penang",
    state: "Penang",
    country: "Malaysia",
    description: "A vibrant island state with rich heritage, street art, temples, and world-famous street food.",
    rating: 4.7,
    reviews: 3456,
    priceRange: "$$",
    bestTime: "Dec - Feb",
    avgTemp: "29°C",
    weather: "partly-cloudy",
    image: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=600&h=400&fit=crop",
    tags: ["Heritage", "Food", "Culture", "Art"],
    contextAlert: "Chinese New Year celebrations in February",
    popularity: 92,
  },
  {
    id: 3,
    name: "Cameron Highlands",
    state: "Pahang",
    country: "Malaysia",
    description: "A hill station known for tea plantations, strawberry farms, and cool climate retreat.",
    rating: 4.6,
    reviews: 1987,
    priceRange: "$",
    bestTime: "Mar - Sep",
    avgTemp: "18°C",
    weather: "cloudy",
    image: "https://images.unsplash.com/photo-1591867833879-87ad7d96ceb5?w=600&h=400&fit=crop",
    tags: ["Nature", "Tea", "Cool Weather", "Hiking"],
    contextAlert: "Strawberry season at its peak!",
    popularity: 85,
  },
  {
    id: 4,
    name: "Malacca City",
    state: "Melaka",
    country: "Malaysia",
    description: "UNESCO World Heritage Site with colonial architecture, museums, and Peranakan culture.",
    rating: 4.5,
    reviews: 2876,
    priceRange: "$",
    bestTime: "Year-round",
    avgTemp: "30°C",
    weather: "sunny",
    image: "https://images.unsplash.com/photo-1563369915-3f23bb0bddaa?w=600&h=400&fit=crop",
    tags: ["Heritage", "History", "Culture", "Food"],
    contextAlert: null,
    popularity: 88,
  },
  {
    id: 5,
    name: "Kota Kinabalu",
    state: "Sabah",
    country: "Malaysia",
    description: "Gateway to Mount Kinabalu, tropical islands, and diverse wildlife of Malaysian Borneo.",
    rating: 4.7,
    reviews: 1654,
    priceRange: "$$",
    bestTime: "Mar - Sep",
    avgTemp: "27°C",
    weather: "partly-cloudy",
    image: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=600&h=400&fit=crop",
    tags: ["Adventure", "Nature", "Mountain", "Islands"],
    contextAlert: "Monsoon season ends in March",
    popularity: 80,
  },
  {
    id: 6,
    name: "Kuching",
    state: "Sarawak",
    country: "Malaysia",
    description: "The Cat City, featuring unique culture, orangutan sanctuaries, and pristine rainforests.",
    rating: 4.6,
    reviews: 1234,
    priceRange: "$",
    bestTime: "Apr - Sep",
    avgTemp: "28°C",
    weather: "sunny",
    image: "https://images.unsplash.com/photo-1562162854-6e8e0d8e2d7e?w=600&h=400&fit=crop",
    tags: ["Wildlife", "Culture", "Rainforest", "Adventure"],
    contextAlert: "Rainforest World Music Festival in July",
    popularity: 75,
  },
];

const categories = [
  { label: "All", value: "all", icon: MapPin },
  { label: "Beach & Islands", value: "beach", icon: Sun },
  { label: "Heritage & Culture", value: "heritage", icon: Clock },
  { label: "Nature & Adventure", value: "nature", icon: TrendingUp },
  { label: "Food & Dining", value: "food", icon: Star },
];

const travelContexts = [
  "Solo Travel",
  "Couple's Getaway",
  "Family with Kids",
  "Group Adventure",
  "Business Trip",
];

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("all");
  const [selectedContext, setSelectedContext] = React.useState("");
  const [showFilters, setShowFilters] = React.useState(false);
  const [favorites, setFavorites] = React.useState<number[]>([]);

  const filteredDestinations = destinations.filter((dest) => {
    const matchesSearch =
      dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategory === "all" ||
      (selectedCategory === "beach" && dest.tags.some((t) => ["Beach", "Island", "Islands"].includes(t))) ||
      (selectedCategory === "heritage" && dest.tags.some((t) => ["Heritage", "History", "Culture"].includes(t))) ||
      (selectedCategory === "nature" && dest.tags.some((t) => ["Nature", "Adventure", "Hiking", "Mountain", "Rainforest", "Wildlife"].includes(t))) ||
      (selectedCategory === "food" && dest.tags.includes("Food"));

    return matchesSearch && matchesCategory;
  });

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fId) => fId !== id) : [...prev, id]
    );
  };

  const WeatherIcon = ({ weather }: { weather: string }) => {
    switch (weather) {
      case "sunny":
        return <Sun className="size-4 text-amber-500" />;
      case "cloudy":
        return <CloudRain className="size-4 text-gray-500" />;
      default:
        return <Sun className="size-4 text-amber-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />

      <main className="flex-1">
        {/* Search Header */}
        <section className="bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-emerald-950/20 dark:via-teal-950/20 dark:to-cyan-950/20 py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Discover Your Perfect Destination
                </h1>
                <p className="text-muted-foreground">
                  Search with context-aware intelligence that considers local events, weather, and travel conditions.
                </p>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Search destinations, activities, or tags..."
                      className="pl-12 h-14 text-lg rounded-xl border-2 focus:border-emerald-500"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-14 px-6 rounded-xl"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <Filter className="size-5 mr-2" />
                    Filters
                  </Button>
                  <Button
                    size="lg"
                    className="h-14 px-8 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white"
                  >
                    <Search className="size-5 mr-2" />
                    Search
                  </Button>
                </div>

                {/* AI Suggestion */}
                <div className="mt-4 flex items-start gap-2 p-3 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 rounded-lg">
                  <Sparkles className="size-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <span className="font-medium text-emerald-700 dark:text-emerald-300">AI Suggestion:</span>{" "}
                    <span className="text-muted-foreground">
                      Based on current weather patterns and upcoming events, Langkawi and Penang are excellent choices for travel this month.
                    </span>
                  </div>
                </div>
              </div>

              {/* Filters Panel */}
              {showFilters && (
                <Card className="mt-4">
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Travel Context */}
                      <div>
                        <h4 className="font-medium mb-3 flex items-center gap-2">
                          <Users className="size-4" />
                          Travel Context
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {travelContexts.map((context) => (
                            <Button
                              key={context}
                              variant={selectedContext === context ? "default" : "outline"}
                              size="sm"
                              className={selectedContext === context ? "bg-emerald-600 hover:bg-emerald-700" : ""}
                              onClick={() => setSelectedContext(selectedContext === context ? "" : context)}
                            >
                              {context}
                            </Button>
                          ))}
                        </div>
                      </div>

                      {/* Date Range */}
                      <div>
                        <h4 className="font-medium mb-3 flex items-center gap-2">
                          <Calendar className="size-4" />
                          Travel Dates
                        </h4>
                        <div className="flex gap-2">
                          <Input type="date" className="flex-1" />
                          <Input type="date" className="flex-1" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </section>

        {/* Category Tabs */}
        <section className="border-b sticky top-16 bg-background z-40">
          <div className="container mx-auto px-4">
            <div className="flex gap-1 overflow-x-auto py-3 -mx-4 px-4 md:mx-0 md:px-0">
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <Button
                    key={cat.value}
                    variant={selectedCategory === cat.value ? "default" : "ghost"}
                    size="sm"
                    className={
                      selectedCategory === cat.value
                        ? "bg-emerald-600 hover:bg-emerald-700 text-white shrink-0"
                        : "shrink-0"
                    }
                    onClick={() => setSelectedCategory(cat.value)}
                  >
                    <Icon className="size-4 mr-2" />
                    {cat.label}
                  </Button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <p className="text-muted-foreground">
              Showing <span className="font-medium text-foreground">{filteredDestinations.length}</span> destinations
              {searchQuery && (
                <>
                  {" "}for &quot;{searchQuery}&quot;
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-2 h-6 px-2"
                    onClick={() => setSearchQuery("")}
                  >
                    <X className="size-3 mr-1" />
                    Clear
                  </Button>
                </>
              )}
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <TrendingUp className="size-4" />
              Sorted by popularity
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDestinations.map((destination) => (
              <Card key={destination.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300">
                {/* Image */}
                <div className="relative h-48 bg-muted overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Favorite Button */}
                  <button
                    className="absolute top-3 right-3 z-20 p-2 rounded-full bg-white/90 hover:bg-white transition-colors"
                    onClick={() => toggleFavorite(destination.id)}
                  >
                    <Heart
                      className={`size-5 ${
                        favorites.includes(destination.id)
                          ? "fill-rose-500 text-rose-500"
                          : "text-gray-600"
                      }`}
                    />
                  </button>

                  {/* Context Alert */}
                  {destination.contextAlert && (
                    <div className="absolute top-3 left-3 z-20 flex items-center gap-1 bg-amber-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                      <Sparkles className="size-3" />
                      Event Alert
                    </div>
                  )}

                  {/* Location Badge */}
                  <div className="absolute bottom-3 left-3 z-20 text-white">
                    <h3 className="font-bold text-xl">{destination.name}</h3>
                    <p className="text-white/80 text-sm flex items-center gap-1">
                      <MapPin className="size-3" />
                      {destination.state}, {destination.country}
                    </p>
                  </div>
                </div>

                <CardContent className="p-4">
                  {/* Context Alert Message */}
                  {destination.contextAlert && (
                    <div className="mb-3 p-2 bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 rounded-lg text-sm">
                      <span className="text-amber-700 dark:text-amber-300">{destination.contextAlert}</span>
                    </div>
                  )}

                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {destination.description}
                  </p>

                  {/* Stats Row */}
                  <div className="flex items-center justify-between text-sm mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="size-4 fill-amber-400 text-amber-400" />
                      <span className="font-medium">{destination.rating}</span>
                      <span className="text-muted-foreground">({destination.reviews})</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <WeatherIcon weather={destination.weather} />
                        {destination.avgTemp}
                      </span>
                      <span>{destination.priceRange}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {destination.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-muted text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                    {destination.tags.length > 3 && (
                      <span className="px-2 py-1 text-muted-foreground text-xs">
                        +{destination.tags.length - 3} more
                      </span>
                    )}
                  </div>
                </CardContent>

                <CardFooter className="p-4 pt-0 flex gap-2">
                  <Link href={`/dashboard/itinerary?destination=${destination.name}`} className="flex-1">
                    <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white">
                      Plan Trip
                      <ArrowRight className="size-4 ml-2" />
                    </Button>
                  </Link>
                  <Button variant="outline" size="icon">
                    <Calendar className="size-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {filteredDestinations.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <Search className="size-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No destinations found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or filters to find what you&apos;re looking for.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
              >
                Clear all filters
              </Button>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
