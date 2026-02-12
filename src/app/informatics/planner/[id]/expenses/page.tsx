"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  Plus,
  Utensils,
  Car,
  Bed,
  Ticket,
  ShoppingBag,
  MoreHorizontal,
  Calendar,
  X,
} from "lucide-react";
import { Navigation } from "@/components/shared/navigation";
import { GroupLabel } from "@/components/shared/group-label";
import {
  AnimatedBackground,
  UnifiedCard,
} from "@/components/shared/page-layout";
import { FlowGuide } from "@/components/shared/flow-guide";
import { cn } from "@/lib/utils";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { STORAGE_KEYS, DEFAULT_EXPENSES, type Expense } from "@/lib/settings-defaults";

const categories = [
  { id: "food", label: "Food", icon: Utensils, color: "bg-orange-500" },
  { id: "transport", label: "Transport", icon: Car, color: "bg-blue-500" },
  { id: "accommodation", label: "Stay", icon: Bed, color: "bg-purple-500" },
  { id: "activities", label: "Activities", icon: Ticket, color: "bg-green-500" },
  { id: "shopping", label: "Shopping", icon: ShoppingBag, color: "bg-pink-500" },
  { id: "other", label: "Other", icon: MoreHorizontal, color: "bg-gray-500" },
];

export default function TripExpensePage() {
  const router = useRouter();
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseDescription, setExpenseDescription] = useState("");

  // Mock active trip data
  const activeTrip = {
    destination: "Melaka",
    country: "Malaysia",
    dates: "Jun 8 - Jun 10",
    budget: 600,
    image: "🏛️",
  };

  const [expenses, setExpenses] = useLocalStorage<Expense[]>(
    STORAGE_KEYS.expenses,
    DEFAULT_EXPENSES
  );

  const totalSpent = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const remaining = activeTrip.budget - totalSpent;
  const spentPercentage = (totalSpent / activeTrip.budget) * 100;

  const getCategoryIcon = (categoryId: string) => {
    const category = categories.find((c) => c.id === categoryId);
    if (!category) return MoreHorizontal;
    return category.icon;
  };

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find((c) => c.id === categoryId);
    return category?.color || "bg-gray-500";
  };

  const handleAddExpense = () => {
    if (!selectedCategory || !expenseAmount) return;

    const newExpense: Expense = {
      id: Date.now(),
      category: selectedCategory,
      description:
        expenseDescription || categories.find((c) => c.id === selectedCategory)?.label || "Expense",
      amount: parseFloat(expenseAmount),
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    };

    setExpenses([newExpense, ...expenses]);
    setShowAddForm(false);
    setSelectedCategory("");
    setExpenseAmount("");
    setExpenseDescription("");
  };

  const expensesByCategory = categories
    .map((cat) => ({
      ...cat,
      total: expenses.filter((e) => e.category === cat.id).reduce((sum, e) => sum + e.amount, 0),
    }))
    .filter((cat) => cat.total > 0);

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 relative">
      <Navigation />
      <GroupLabel group={3} />
      <AnimatedBackground variant="subtle" />

      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/informatics/planner")}
            className="size-10 rounded-xl hover:bg-violet-100 dark:hover:bg-violet-900/30"
          >
            <ArrowLeft className="size-5" />
          </Button>
          <div className="size-14 rounded-2xl bg-gradient-to-br from-violet-100 to-purple-100 dark:from-violet-900/40 dark:to-purple-900/40 flex items-center justify-center text-2xl shadow-sm">
            {activeTrip.image}
          </div>
          <div className="flex-1">
            <p className="text-neutral-500 dark:text-neutral-400 text-sm">Active Trip</p>
            <h1 className="text-2xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-100">
              {activeTrip.destination}, {activeTrip.country}
            </h1>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 flex items-center gap-1 mt-1">
              <Calendar className="size-3" />
              {activeTrip.dates}
            </p>
          </div>
        </div>

        {/* Budget Overview Card */}
        <UnifiedCard gradient className="p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-neutral-500 dark:text-neutral-400 text-xs mb-1">Total Spent</p>
              <p className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">RM {totalSpent.toLocaleString()}</p>
            </div>
            <div className="text-right">
              <p className="text-neutral-500 dark:text-neutral-400 text-xs mb-1">Remaining</p>
              <p
                className={cn(
                  "text-lg font-semibold",
                  remaining >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-red-500"
                )}
              >
                RM {remaining.toLocaleString()}
              </p>
            </div>
          </div>

          <Progress
            value={Math.min(spentPercentage, 100)}
            className="h-3 mb-2"
          />
          <div className="flex justify-between text-xs text-neutral-500 dark:text-neutral-400">
            <span>{spentPercentage.toFixed(0)}% of budget</span>
            <span>RM {activeTrip.budget.toLocaleString()} total</span>
          </div>
        </UnifiedCard>

        {/* Category Breakdown */}
        {expensesByCategory.length > 0 && (
          <div className="mb-6">
            <h2 className="font-bold text-lg text-neutral-800 dark:text-neutral-100 mb-4">By Category</h2>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
              {expensesByCategory.map((cat) => {
                const Icon = cat.icon;
                return (
                  <UnifiedCard key={cat.id} className="p-4">
                    <div
                      className={cn("size-9 rounded-lg flex items-center justify-center mb-2", cat.color)}
                    >
                      <Icon className="size-4 text-white" />
                    </div>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">{cat.label}</p>
                    <p className="font-semibold text-neutral-800 dark:text-neutral-100 text-sm tabular-nums">
                      RM {cat.total.toLocaleString()}
                    </p>
                  </UnifiedCard>
                );
              })}
            </div>
          </div>
        )}

        {/* Add Expense Button */}
        {!showAddForm && (
          <div className="mb-6">
            <Button
              onClick={() => setShowAddForm(true)}
              className="w-full rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white border-0 h-12 text-base"
              size="lg"
            >
              <Plus className="size-4 mr-2" />
              Add Expense
            </Button>
          </div>
        )}

        {/* Add Expense Form */}
        {showAddForm && (
          <div className="mb-6">
            <UnifiedCard className="p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-neutral-800 dark:text-neutral-100">New Expense</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8 rounded-lg hover:bg-violet-100 dark:hover:bg-violet-900/30"
                  onClick={() => setShowAddForm(false)}
                >
                  <X className="size-4" />
                </Button>
              </div>

              {/* Category Selection */}
              <div className="mb-4">
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-2 font-medium">Category</p>
                <div className="grid grid-cols-3 gap-2">
                  {categories.map((cat) => {
                    const Icon = cat.icon;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={cn(
                          "p-3 rounded-xl flex flex-col items-center gap-1 transition-all duration-200",
                          selectedCategory === cat.id
                            ? "bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-500/25"
                            : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                        )}
                      >
                        <Icon className="size-5" />
                        <span className="text-xs">{cat.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Amount Input */}
              <div className="mb-4">
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-2 font-medium">Amount (RM)</p>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={expenseAmount}
                  onChange={(e) => setExpenseAmount(e.target.value)}
                  className="text-lg font-semibold"
                />
              </div>

              {/* Description Input */}
              <div className="mb-4">
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-2 font-medium">Description (optional)</p>
                <Input
                  placeholder="What was this for?"
                  value={expenseDescription}
                  onChange={(e) => setExpenseDescription(e.target.value)}
                />
              </div>

              {/* Submit Button */}
              <Button
                onClick={handleAddExpense}
                className="w-full rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white border-0"
                disabled={!selectedCategory || !expenseAmount}
              >
                <Plus className="size-4 mr-2" />
                Add Expense
              </Button>
            </UnifiedCard>
          </div>
        )}

        {/* Expenses List */}
        <div className="mb-8">
          <h2 className="font-bold text-lg text-neutral-800 dark:text-neutral-100 mb-4">Recent Expenses</h2>
          <div className="space-y-3">
            {expenses.map((expense) => {
              const Icon = getCategoryIcon(expense.category);
              return (
                <UnifiedCard key={expense.id} className="p-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={cn("size-10 rounded-lg flex items-center justify-center flex-shrink-0", getCategoryColor(expense.category))}
                    >
                      <Icon className="size-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-neutral-800 dark:text-neutral-100 text-sm truncate">{expense.description}</p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">{expense.date}</p>
                    </div>
                    <p className="font-semibold text-neutral-800 dark:text-neutral-100 text-sm flex-shrink-0 tabular-nums">
                      RM {expense.amount.toLocaleString()}
                    </p>
                  </div>
                </UnifiedCard>
              );
            })}
          </div>
        </div>

        {/* Flow Guide */}
        <FlowGuide
          variant="card"
          title="Continue Your Journey"
          maxSuggestions={2}
        />
      </main>
    </div>
  );
}
