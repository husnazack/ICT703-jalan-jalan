"use client";

import Link from "next/link";
import { DashboardHeader } from "@/components/dashboard";
import { BudgetDonutChart } from "@/components/dashboard/cards/budget-donut-chart";
import { SpendingBreakdownCard } from "@/components/dashboard/cards/spending-breakdown-card";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, TrendingDown, Wallet, CreditCard, PiggyBank } from "lucide-react";

export default function BudgetPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardHeader />

      <main className="container mx-auto px-6 lg:px-24 py-8">
        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-800">Overall Budget</h1>
          <p className="text-slate-500 text-sm mt-1">
            Track and manage your travel expenses
          </p>
        </div>

        {/* Budget Overview Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Quick Stats */}
          <Card className="border-purple-500 shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Wallet className="size-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Total Budget</p>
                  <p className="text-xl font-bold text-slate-800">RM 1,000</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-emerald-600">
                <TrendingDown className="size-4" />
                <span className="text-sm">35% under budget</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-500 shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <CreditCard className="size-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Spent So Far</p>
                  <p className="text-xl font-bold text-slate-800">RM 650</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-amber-600">
                <TrendingUp className="size-4" />
                <span className="text-sm">65% of budget used</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-500 shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <PiggyBank className="size-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Remaining</p>
                  <p className="text-xl font-bold text-slate-800">RM 350</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <span className="text-sm">For 3 days remaining</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Budget Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Donut Chart */}
          <BudgetDonutChart expected={1000} actual={650} />

          {/* Right: Spending Breakdown */}
          <SpendingBreakdownCard />
        </div>

        {/* CTA Card */}
        <Card className="mt-8 border-purple-500 shadow-sm bg-gradient-to-br from-emerald-50 to-teal-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-emerald-100 rounded-xl">
                  <Wallet className="size-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 mb-1">
                    Manage your budget & booking!
                  </h3>
                  <p className="text-sm text-slate-500">
                    View detailed expense reports and track your bookings
                  </p>
                </div>
              </div>
              <Link href="/dashboard/schedule">
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2">
                  Go to Module 3
                  <ArrowRight className="size-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

