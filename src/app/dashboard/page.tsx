"use client";

import * as React from "react";
import { Navigation } from "@/components/shared/navigation";
import TabBar from "../../components/ui/TabBar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  AlertTriangle,
  CalendarDays,
  Coins,
  Heart,
  Users,
  Wallet,
  LayoutDashboard,
} from "lucide-react";
import { ConflictItem, SummaryStat, DashboardDestination } from "@/types";

// Mapping values to labels
const seasonLabels: Record<string, string> = {
  "chinese-new-year": "Chinese New Year",
  "hari-raya-aidilfitri": "Hari Raya Aidilfitri",
  "hari-raya-haji": "Hari Raya Haji",
  "deepavali": "Deepavali",
  "thaipusam": "Thaipusam",
  "wesak": "Wesak Day",
  "christmas": "Christmas",
  "merdeka": "Merdeka Day",
  "malaysia-day": "Malaysia Day",
  "school-holidays": "School Holidays",
};

const travelStyleLabels: Record<string, string> = {
  "low-budget": "Budget",
  "balanced": "Balanced",
  "comfortable": "Comfortable",
};

const crowdToleranceLabels: Record<string, string> = {
  "avoid-crowd": "Avoid crowds",
  "okay-crowd": "Okay with crowds",
  "no-preference": "No preference",
};

// Define gradients for icons
const summaryIconGradients = [
  "bg-gradient-to-br from-purple-400 to-purple-700",
  "bg-gradient-to-br from-green-400 to-green-600",
  "bg-gradient-to-br from-yellow-300 to-yellow-500",
  "bg-gradient-to-br from-pink-400 to-pink-600",
  "bg-gradient-to-br from-blue-400 to-blue-700",
];

const severityStyles = (severity: ConflictItem["severity"]) => {
  const styles = {
    high: {
      container: "bg-red-50 border-red-200 text-red-900",
      icon: "text-red-700",
      text: "text-red-900",
      sub: "text-red-800/80",
    },
    medium: {
      container: "bg-yellow-50 border-yellow-200 text-yellow-900",
      icon: "text-yellow-800",
      text: "text-yellow-900",
      sub: "text-yellow-900/80",
    },
    low: {
      container: "bg-blue-50 border-blue-200 text-blue-900",
      icon: "text-blue-700",
      text: "text-blue-900",
      sub: "text-blue-900/80",
    },
  };
  return styles[severity] || styles.low;
};

const Pill = ({
  dotClassName,
  children,
}: {
  dotClassName: string;
  children: React.ReactNode;
}) => (
  <div className="inline-flex items-center gap-2">
    <span className={`size-3 rounded-full ${dotClassName}`} />
    <span className="text-sm text-slate-700">{children}</span>
  </div>
);

const DashboardPage = () => {
  const [conflictFilter, setConflictFilter] = React.useState<string>("all");
  const [jsonData, setJsonData] = React.useState<any>(null); // Store the fetched JSON data here

  // Fetch the latest JSON data from API
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/data"); // Fetch data from the /api/data route
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        setJsonData(data); // Set the fetched data in state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Fetch data when the component mounts
  }, []); // This useEffect runs only once when the component mounts

  if (!jsonData) {
    return <div>Loading...</div>; // Show loading message until data is fetched
  }

  // Extract the Group Size from the travelers array
  const groupSize = jsonData.travelers ? jsonData.travelers.length : 0;

  // Calculate the average budget per person
  const averageBudget =
    jsonData.travelers &&
    jsonData.travelers.length > 0
      ? jsonData.travelers.reduce((total: number, traveler: any) => {
          const minBudget = parseFloat(traveler.preferences.budgetMin);
          const maxBudget = parseFloat(traveler.preferences.budgetMax);
          return total + (minBudget + maxBudget) / 2;
        }, 0) / jsonData.travelers.length
      : 0;

  const formattedAvgBudget = averageBudget
    ? `RM ${averageBudget.toFixed(0)}`
    : "RM 0";

  // Function to find the most selected value from an array of values
  const getMostSelected = (array: string[]) => {
    const counts = array.reduce((acc: any, value: string) => {
      acc[value] = (acc[value] || 0) + 1;
      return acc;
    }, {});
    const mostSelectedValue = Object.entries(counts).reduce(
      (a, b) => (a[1] > b[1] ? a : b),
      ["", 0]
    );
    return mostSelectedValue;
  };

  // Get most selected preferred seasons
  const allPreferredSeasons = jsonData.travelers
    ? jsonData.travelers.flatMap((traveler: any) => traveler.preferences.preferredSeasons)
    : [];
  const [mostPreferredSeason, seasonCount] = getMostSelected(allPreferredSeasons);

  // Get most selected travel style
  const allTravelStyles = jsonData.travelers
    ? jsonData.travelers.map((traveler: any) => traveler.preferences.travelStyle)
    : [];
  const [mostCommonTravelStyle, styleCount] = getMostSelected(allTravelStyles);

  // Get most selected crowd tolerance
  const allCrowdTolerances = jsonData.travelers
    ? jsonData.travelers.map((traveler: any) => traveler.preferences.crowdTolerance)
    : [];
  const [mostCommonCrowdPreference, crowdCount] = getMostSelected(allCrowdTolerances);

  // Now define the summary array after all dynamic data has been processed
  const summary: SummaryStat[] = [
    {
      label: "Group Size",
      value: groupSize.toString(), // Display the dynamic group size
      sub: "travelers",
      icon: <Users className="size-4 text-violet-700" />,
    },
    {
      label: "Avg. Budget",
      value: formattedAvgBudget, // Display the dynamic average budget
      sub: "per person",
      icon: <Wallet className="size-4 text-violet-700" />,
    },
    {
      label: "Preferred Seasons",
      value: seasonLabels[mostPreferredSeason] || "None", // Map to season label
      sub: `${seasonCount} traveler(s)`,
      icon: <CalendarDays className="size-4 text-violet-700" />,
    },
    {
      label: "Common Travel Style",
      value: travelStyleLabels[mostCommonTravelStyle] || "None", // Map to travel style label
      sub: `${styleCount} traveler(s)`,
      icon: <Heart className="size-4 text-violet-700" />,
    },
    {
      label: "Crowd Preference",
      value: crowdToleranceLabels[mostCommonCrowdPreference] || "None", // Map to crowd preference label
      sub: `${crowdCount} traveler(s)`,
      icon: <Users className="size-4 text-violet-700" />,
    },
  ];

  // Conflicts based on different traveler preferences
 // Conflicts based on different traveler preferences
const conflicts: ConflictItem[] = [];

jsonData.travelers.forEach((traveler: any) => {
  // Budget Conflict
  const travelerMinBudget = parseInt(traveler.preferences.budgetMin);
  const travelerMaxBudget = parseInt(traveler.preferences.budgetMax);

  const budgetConflictSeverity = (travelerMinBudget < averageBudget * 0.7 || travelerMaxBudget < averageBudget * 0.7) ? "high" :
    (travelerMinBudget < averageBudget * 0.9 || travelerMaxBudget < averageBudget * 0.9) ? "medium" : "low";

  if (budgetConflictSeverity !== "low") {
    conflicts.push({
      severity: budgetConflictSeverity,
      title: traveler.name,
      description: `${traveler.name} prefers a budget between RM${travelerMinBudget} and RM${travelerMaxBudget}, which is ${budgetConflictSeverity} compared to the group's average budget.`,
    });
  }

  // Travel Style Conflict
  if (traveler.preferences.travelStyle !== mostCommonTravelStyle) {
    conflicts.push({
      severity: "medium",
      title: traveler.name,
      description: `${traveler.name} prefers a different travel style`,
    });
  }

  // Crowd Tolerance Conflict
  if (traveler.preferences.crowdTolerance !== mostCommonCrowdPreference) {
    conflicts.push({
      severity: "low",
      title: traveler.name,
      description: `${traveler.name} prefers a different crowd tolerance`,
    });
  }

  // Safety Preferences Conflict
  const travelerSafety = traveler.preferences.safetyOptions;
  if (travelerSafety.avoidLateNight !== true) {
    conflicts.push({
      severity: "medium",
      title: traveler.name,
      description: `${traveler.name} prefers late-night activities (safety conflict)`,
    });
  }

  // Season Preferences Conflict
  const travelerSeasons = traveler.preferences.preferredSeasons;
  const seasonDiff = travelerSeasons.filter((season: string) => season !== mostPreferredSeason);
  if (seasonDiff.length > 0) {
    conflicts.push({
      severity: "medium",
      title: traveler.name,
      description: `${traveler.name} prefers different seasons for travel`,
    });
  }

  // Notification Preferences Conflict
  const travelerNotifications = traveler.preferences.notifications;
  if (Object.values(travelerNotifications).some((value: boolean) => value !== true)) {
    conflicts.push({
      severity: "low",
      title: traveler.name,
      description: `${traveler.name} has different notification preferences`,
    });
  }
});


  const filteredConflicts = conflicts.filter((c) =>
    conflictFilter === "all" ? true : c.severity === conflictFilter
  );

  const conflictCounts = {
    high: conflicts.filter((c) => c.severity === "high").length,
    medium: conflicts.filter((c) => c.severity === "medium").length,
    low: conflicts.filter((c) => c.severity === "low").length,
  };

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(to bottom, #f5f3ff 0%, #F1F5F9 20%)" }}>
      <div className="sticky top-0 z-20">
        <Navigation />
        <TabBar />
      </div>

      <main className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-24 py-0">
        <div className="flex flex-col gap-6">
          <header className="flex items-center gap-7 pt-15 mb-2">
            <div className="shrink-0 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 p-4 transition-transform duration-300 group-hover:scale-110">
              <LayoutDashboard className="size-8 text-white" strokeWidth={2} />
            </div>
            <h1 className="text-3xl font-bold text-slate-900">My Dashboard</h1>
          </header>

          {/* Group Summary */}
          <Card className="border-[#AD46FF] bg-white mt-0">
            <CardHeader className="pb-0">
              <CardTitle className="text-xl font-bold">Group Summary</CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
                {summary.map((s, i) => (
                  <div key={s.label} className="flex items-start gap-3 rounded-xl bg-white">
                    <div className={`shrink-0 rounded-2xl ${summaryIconGradients[i]} p-4 flex items-center justify-center`}>
                      {React.isValidElement(s.icon)
                        ? React.cloneElement(s.icon, { className: "size-10 text-white" })
                        : null}
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm text-slate-600">{s.label}</div>
                      <div className="mt-1 text-xl font-bold text-slate-900">{s.value}</div>
                      <div className="text-xs text-slate-500">{s.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Budget Fit + Potential Conflicts */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card className="border-[#AD46FF] bg-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-bold">Budget Fit</CardTitle>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-slate-600">Budget Compatibility</div>
                  <div className="text-sm font-bold text-slate-900">{Math.round((averageBudget / 2625) * 100)}%</div>
                </div>

                <div className="mt-2">
                  <Progress value={Math.round((averageBudget / 2625) * 100)} className="h-2 bg-violet-100 [&_[data-slot=progress-indicator]]:bg-red-400" />
                </div>

                <div className="mt-4 flex items-center gap-2 text-sm font-medium text-red-700">
                  <AlertTriangle className="size-5" />
                  {averageBudget > 2625 ? "Significantly over budget" : "Budget within range"}
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#AD46FF] gap-1 bg-white">
              <CardHeader className="pb-0">
                <CardTitle className="text-xl font-bold">Potential Conflicts</CardTitle>
                <div className="flex items-center gap-3 mt-2">
                  <span className="font-semibold text-slate-800">Conflict Level:</span>
                  <Pill dotClassName="bg-red-500">High</Pill>
                  <Pill dotClassName="bg-yellow-400">Medium</Pill>
                  <Pill dotClassName="bg-blue-500">Low</Pill>
                </div>
              </CardHeader>
              <CardContent className="pt-1">
                <div className="mt-4 max-h-[260px] overflow-y-auto pr-2 flex flex-col gap-2">
                  {filteredConflicts.map((c, idx) => {
                    const s = severityStyles(c.severity);
                    return (
                      <div
                        key={`${c.title}-${idx}`}
                        className={`flex items-start gap-3 rounded-xl border p-3 ${s.container}`}
                      >
                        <div className="mt-0.5 rounded-md bg-white/60 p-1">
                          <AlertTriangle className={`size-4 ${s.icon}`} />
                        </div>
                        <div className="min-w-0">
                          <div className={`text-sm font-semibold ${s.text}`}>{c.title}</div>
                          <div className={`text-xs ${s.sub}`}>{c.description}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
