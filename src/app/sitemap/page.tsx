"use client";

import Link from "next/link";
import { Navigation } from "@/components/shared/navigation";
import {
  MessageSquare,
  LayoutDashboard,
  PieChart,
  Users,
  Sparkles,
  Home,
  Search,
  Calendar,
  Wallet,
  Map,
  TrendingUp,
  Settings,
  User,
  Shield,
  BookOpen,
  PlusCircle,
  Flag,
  CheckCircle,
  CalendarDays,
  LogIn,
  UserPlus,
  ShieldCheck,
  FileText,
  SlidersHorizontal,
  ClipboardList
} from "lucide-react";
import { cn } from "@/lib/utils";

type RouteItem = {
  path: string;
  label: string;
  icon: React.ElementType;
  children?: RouteItem[];
};

type GroupConfig = {
  id: number;
  name: string;
  description: string;
  color: string;
  bgColor: string;
  borderColor: string;
  routes: RouteItem[];
};

const groups: GroupConfig[] = [
  {
    id: 1,
    name: "AI Chat Assistant",
    description: "AI-powered travel planning assistant with quick actions",
    color: "text-emerald-700",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
    routes: [
      { path: "/chat", label: "AI Travel Assistant", icon: MessageSquare },
    ],
  },
  {
    id: 2,
    name: "Wanderboard Dashboard",
    description: "Live destination data and travel analytics",
    color: "text-blue-700",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    routes: [
      { path: "/wanderboard", label: "Search Landing", icon: Search },
      {
        path: "/dashboard",
        label: "Live Data Dashboard",
        icon: LayoutDashboard,
        children: [
          { path: "/dashboard/budget", label: "Budget Overview", icon: Wallet },
          { path: "/dashboard/schedule", label: "Schedule & Updates", icon: Calendar },
          { path: "/dashboard/itinerary", label: "Itinerary View", icon: Map },
        ]
      },
    ],
  },
  {
    id: 3,
    name: "Informatics (My Travel)",
    description: "Personal travel tracking and expense management",
    color: "text-violet-700",
    bgColor: "bg-violet-50",
    borderColor: "border-violet-200",
    routes: [
      { path: "/informatics", label: "Onboarding", icon: Sparkles },
      { path: "/informatics/dashboard", label: "Personal Dashboard", icon: PieChart },
      { path: "/informatics/insights", label: "Travel Insights", icon: TrendingUp },
      {
        path: "/informatics/planner",
        label: "Trip Planner",
        icon: ClipboardList,
        children: [
          { path: "/informatics/planner/[id]/expenses", label: "Expense Tracking", icon: Wallet },
        ]
      },
      { path: "/informatics/reflection", label: "Travel Reflections", icon: BookOpen },
      {
        path: "/informatics/settings",
        label: "Settings",
        icon: Settings,
        children: [
          { path: "/informatics/settings/profile", label: "Edit Profile", icon: User },
          { path: "/informatics/settings/privacy", label: "Privacy Settings", icon: Shield },
        ]
      },
    ],
  },
  {
    id: 4,
    name: "Community",
    description: "Community stories, events, and user management",
    color: "text-orange-700",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    routes: [
      {
        path: "/community",
        label: "Community Hub",
        icon: Users,
        children: [
          {
            path: "/community/stories",
            label: "Community Stories",
            icon: BookOpen,
            children: [
              { path: "/community/stories/create", label: "Create Story", icon: PlusCircle },
              {
                path: "/community/stories/[id]",
                label: "Story Detail",
                icon: FileText,
                children: [
                  { path: "/community/stories/[id]/report", label: "Report Story", icon: Flag },
                  { path: "/community/stories/[id]/report/success", label: "Report Success", icon: CheckCircle },
                ]
              },
            ]
          },
          { path: "/community/events", label: "Upcoming Events", icon: CalendarDays },
        ]
      },
      { path: "/login", label: "User Login", icon: LogIn },
      { path: "/register", label: "User Registration", icon: UserPlus },
      {
        path: "/admin",
        label: "Admin Dashboard",
        icon: ShieldCheck,
        children: [
          { path: "/admin/reports/[id]", label: "Report Detail", icon: FileText },
        ]
      },
    ],
  },
  {
    id: 5,
    name: "Smart Predictions",
    description: "AI-powered trip planning and predictions",
    color: "text-rose-700",
    bgColor: "bg-rose-50",
    borderColor: "border-rose-200",
    routes: [
      { path: "/predictions", label: "Trip Planning Start", icon: Sparkles },
      { path: "/predictions/preferences", label: "Travel Preferences", icon: SlidersHorizontal },
      { path: "/predictions/plan", label: "AI-Generated Plan", icon: ClipboardList },
    ],
  },
];

function getExamplePath(path: string): string {
  // Replace dynamic segments with example values
  return path
    .replace("[id]", "1")
    .replace("[slug]", "example");
}

function RouteLink({ route, depth = 0 }: { route: RouteItem; depth?: number }) {
  const Icon = route.icon;
  const isDynamic = route.path.includes("[");
  const examplePath = getExamplePath(route.path);

  return (
    <div className={cn("flex flex-col", depth > 0 && "ml-6 border-l-2 border-slate-200 pl-4")}>
      <div className="flex items-center gap-2 py-2">
        <Icon className="w-4 h-4 text-slate-500" />
        <Link
          href={examplePath}
          className="text-sm text-slate-700 hover:text-blue-600 hover:underline"
        >
          {route.label}
        </Link>
        <code className="text-xs text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
          {route.path}
        </code>
        {isDynamic && (
          <span className="text-xs text-blue-500 bg-blue-50 px-1.5 py-0.5 rounded">
            example: {examplePath}
          </span>
        )}
      </div>
      {route.children?.map((child) => (
        <RouteLink key={child.path} route={child} depth={depth + 1} />
      ))}
    </div>
  );
}

function GroupCard({ group }: { group: GroupConfig }) {
  const pageCount = countPages(group.routes);

  return (
    <div className={cn("rounded-xl border-2 p-6", group.borderColor, group.bgColor)}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={cn(
            "w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold",
            group.bgColor, group.color
          )}>
            {group.id}
          </div>
          <div>
            <h2 className={cn("text-lg font-semibold", group.color)}>
              Group {group.id}: {group.name}
            </h2>
            <p className="text-sm text-slate-500">{group.description}</p>
          </div>
        </div>
        <div className={cn(
          "px-3 py-1 rounded-full text-sm font-medium",
          group.bgColor, group.color
        )}>
          {pageCount} pages
        </div>
      </div>

      <div className="bg-white rounded-lg p-4 border border-slate-200">
        {group.routes.map((route) => (
          <RouteLink key={route.path} route={route} />
        ))}
      </div>
    </div>
  );
}

function countPages(routes: RouteItem[]): number {
  return routes.reduce((count, route) => {
    return count + 1 + (route.children ? countPages(route.children) : 0);
  }, 0);
}

export default function SitemapPage() {
  const totalPages = groups.reduce((sum, g) => sum + countPages(g.routes), 0) + 2; // +2 for home and search

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />

      <main className="container mx-auto px-6 py-12 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">
            Jalan-Jalan Sitemap
          </h1>
          <p className="text-lg text-slate-600 mb-6">
            ICT703 Travel Planning Platform - Route Structure by Group
          </p>
          <div className="flex items-center justify-center gap-4 text-sm">
            <span className="px-4 py-2 bg-white rounded-full border border-slate-200 font-medium">
              {groups.length} Groups
            </span>
            <span className="px-4 py-2 bg-white rounded-full border border-slate-200 font-medium">
              {totalPages} Total Pages
            </span>
          </div>
        </div>

        {/* Shared Pages */}
        <div className="rounded-xl border-2 border-slate-200 bg-white p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
              <Home className="w-5 h-5 text-slate-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-700">Shared Pages</h2>
              <p className="text-sm text-slate-500">Global pages accessible from anywhere</p>
            </div>
          </div>
          <div className="bg-slate-50 rounded-lg p-4">
            <div className="flex items-center gap-2 py-2">
              <Home className="w-4 h-4 text-slate-500" />
              <Link href="/" className="text-sm text-slate-700 hover:text-blue-600 hover:underline">
                Home / Landing Page
              </Link>
              <code className="text-xs text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">/</code>
            </div>
            <div className="flex items-center gap-2 py-2">
              <Search className="w-4 h-4 text-slate-500" />
              <Link href="/search" className="text-sm text-slate-700 hover:text-blue-600 hover:underline">
                Global Search
              </Link>
              <code className="text-xs text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">/search</code>
            </div>
          </div>
        </div>

        {/* Group Cards */}
        <div className="space-y-6">
          {groups.map((group) => (
            <GroupCard key={group.id} group={group} />
          ))}
        </div>

        {/* Legend */}
        <div className="mt-12 p-6 bg-white rounded-xl border border-slate-200">
          <h3 className="font-semibold text-slate-700 mb-4">Legend</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
            {groups.map((group) => (
              <div key={group.id} className="flex items-center gap-2">
                <div className={cn("w-4 h-4 rounded", group.bgColor, "border", group.borderColor)} />
                <span className="text-slate-600">Group {group.id}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
