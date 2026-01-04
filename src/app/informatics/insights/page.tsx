"use client";

import {
  TrendingUp,
  TrendingDown,
  PieChart,
  BarChart3,
  MapPin,
  Utensils,
  Hotel,
  Plane,
  Calendar,
  ShoppingBag,
  Coffee,
  Ticket,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const spendingCategories = [
  { name: "Accommodation", icon: Hotel, amount: 4200, percentage: 35, trend: "down" as const, change: -5 },
  { name: "Food & Dining", icon: Utensils, amount: 3000, percentage: 25, trend: "up" as const, change: 12 },
  { name: "Transportation", icon: Plane, amount: 2400, percentage: 20, trend: "down" as const, change: -8 },
  { name: "Activities", icon: Ticket, amount: 1200, percentage: 10, trend: "up" as const, change: 3 },
  { name: "Shopping", icon: ShoppingBag, amount: 720, percentage: 6, trend: "up" as const, change: 15 },
  { name: "Others", icon: Coffee, amount: 480, percentage: 4, trend: "down" as const, change: -2 },
];

const monthlyData = [
  { month: "Jan", spent: 2800, budget: 3000 },
  { month: "Feb", spent: 1900, budget: 2500 },
  { month: "Mar", spent: 4200, budget: 4000 },
  { month: "Apr", spent: 3500, budget: 3500 },
  { month: "May", spent: 5100, budget: 5000 },
  { month: "Jun", spent: 3800, budget: 4000 },
];

const destinationStats = [
  { destination: "Europe", trips: 3, avgSpend: 6500, satisfaction: 92 },
  { destination: "Southeast Asia", trips: 5, avgSpend: 2800, satisfaction: 88 },
  { destination: "Local (Malaysia)", trips: 8, avgSpend: 650, satisfaction: 85 },
  { destination: "East Asia", trips: 2, avgSpend: 5200, satisfaction: 95 },
];

const travelPatterns: { label: string; value: string; trend: "up" | "down" | "stable" }[] = [
  { label: "Average Trip Duration", value: "6.5 days", trend: "up" },
  { label: "Preferred Booking Window", value: "3 weeks", trend: "stable" },
  { label: "Most Visited Month", value: "December", trend: "stable" },
  { label: "Budget Adherence Rate", value: "78%", trend: "up" },
];

export default function InsightsPage() {
  const maxSpent = Math.max(...monthlyData.map((d) => d.spent));
  const totalSpent = monthlyData.reduce((sum, d) => sum + d.spent, 0);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="px-6 pt-8 pb-4">
        <div className="mb-2">
          <p className="text-muted-foreground text-sm">Analytics</p>
          <h1 className="text-2xl font-bold text-foreground">Spending Insights</h1>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="px-6 mb-6">
        <div className="grid grid-cols-2 gap-3">
          <Card className="p-4 text-center">
            <p className="text-muted-foreground text-xs mb-1">Total Spent (YTD)</p>
            <p className="text-xl font-bold text-foreground">RM {totalSpent.toLocaleString()}</p>
            <span className="text-green-600 text-xs">↓ 8% vs last year</span>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-muted-foreground text-xs mb-1">Trips This Year</p>
            <p className="text-xl font-bold text-foreground">18</p>
            <span className="text-primary text-xs">↑ 3 more than 2023</span>
          </Card>
        </div>
      </div>

      {/* Monthly Trend Chart */}
      <div className="px-6 mb-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-foreground">Monthly Spending</h2>
            <div className="flex items-center gap-1 text-green-600 text-sm">
              <TrendingDown className="w-4 h-4" />
              <span>-8% vs last year</span>
            </div>
          </div>

          {/* Simple Bar Chart */}
          <div className="h-32 flex items-end justify-between gap-2">
            {monthlyData.map((data) => {
              const chartHeight = 92;
              const barHeightPx = Math.max((data.spent / maxSpent) * chartHeight, 20);
              const isOverBudget = data.spent > data.budget;
              return (
                <div
                  key={data.month}
                  className="flex flex-col items-center justify-end gap-2 flex-1"
                  style={{ height: "100%" }}
                >
                  <div
                    className={`w-full rounded-t-lg ${isOverBudget ? "bg-yellow-500" : "bg-primary"}`}
                    style={{
                      height: `${barHeightPx}px`,
                      minHeight: "20px",
                    }}
                  />
                  <div className="flex flex-col items-center gap-0.5">
                    <span className="text-xs text-muted-foreground font-medium">{data.month}</span>
                    <span className="text-[10px] text-muted-foreground/70">
                      RM{(data.spent / 1000).toFixed(1)}k
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Spending by Category */}
      <div className="px-6 mb-6">
        <h2 className="font-semibold text-foreground mb-3">By Category</h2>
        <div className="space-y-3">
          {spendingCategories.map((category) => (
            <Card key={category.name} className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <category.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-foreground">{category.name}</span>
                    <span className="font-semibold text-foreground">
                      RM {category.amount.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={category.percentage} className="flex-1 h-2" />
                    <div
                      className={`flex items-center gap-1 text-xs ${
                        category.trend === "up" ? "text-yellow-600" : "text-green-600"
                      }`}
                    >
                      {category.trend === "up" ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingDown className="w-3 h-3" />
                      )}
                      <span>
                        {category.change > 0 ? "+" : ""}
                        {category.change}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Destination Stats */}
      <div className="px-6 mb-6">
        <h2 className="font-semibold text-foreground mb-3">By Destination</h2>
        <div className="space-y-3">
          {destinationStats.map((dest) => (
            <Card key={dest.destination} className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="font-medium text-foreground">{dest.destination}</span>
                </div>
                <span className="text-xs text-muted-foreground">{dest.trips} trips</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  Avg. Spend:{" "}
                  <span className="text-foreground font-semibold">
                    RM {dest.avgSpend.toLocaleString()}
                  </span>
                </span>
                <span className="text-green-600 text-xs">{dest.satisfaction}% satisfaction</span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Travel Patterns */}
      <div className="px-6 mb-6">
        <h2 className="font-semibold text-foreground mb-3">Travel Patterns</h2>
        <Card className="p-4 space-y-4">
          {travelPatterns.map((pattern) => (
            <div key={pattern.label} className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm">{pattern.label}</span>
              <div className="flex items-center gap-2">
                <span className="font-medium text-foreground">{pattern.value}</span>
                {pattern.trend === "up" && <TrendingUp className="w-3 h-3 text-green-600" />}
                {pattern.trend === "down" && <TrendingDown className="w-3 h-3 text-yellow-600" />}
              </div>
            </div>
          ))}
        </Card>
      </div>

      {/* Behavioural Insights */}
      <div className="px-6 mb-6">
        <h2 className="font-semibold text-foreground mb-3">Behavioural Insights</h2>
        <Card className="p-4 space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center flex-shrink-0">
              <BarChart3 className="w-4 h-4 text-yellow-600" />
            </div>
            <div>
              <p className="font-medium text-foreground text-sm">Peak Spending Days</p>
              <p className="text-muted-foreground text-xs">You spend 40% more on Saturdays</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0">
              <PieChart className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <p className="font-medium text-foreground text-sm">Budget Adherence</p>
              <p className="text-muted-foreground text-xs">You stayed under budget on 14 of 18 trips</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Calendar className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="font-medium text-foreground text-sm">Seasonal Preference</p>
              <p className="text-muted-foreground text-xs">
                You prefer travelling during school holidays
              </p>
            </div>
          </div>
        </Card>
      </div>

    </div>
  );
}

