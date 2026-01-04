"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
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

interface Expense {
  id: number;
  category: string;
  description: string;
  amount: number;
  date: string;
}

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
    destination: "Paris",
    country: "France",
    dates: "Dec 20 - Dec 30",
    budget: 9500,
    image: "🗼",
  };

  const [expenses, setExpenses] = useState<Expense[]>([
    { id: 1, category: "food", description: "Café breakfast", amount: 45, date: "Dec 20" },
    { id: 2, category: "transport", description: "Airport taxi", amount: 280, date: "Dec 20" },
    { id: 3, category: "activities", description: "Louvre tickets", amount: 85, date: "Dec 21" },
    { id: 4, category: "food", description: "Dinner at Le Petit", amount: 320, date: "Dec 21" },
    { id: 5, category: "shopping", description: "Souvenirs", amount: 150, date: "Dec 22" },
  ]);

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
    <div className="min-h-screen bg-background flex flex-col pb-8">
      {/* Header */}
      <div className="px-6 pt-8 pb-4">
        <div className="flex items-center gap-3 mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/informatics/planner")}
            className="h-8 w-8"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <p className="text-muted-foreground text-sm">Active Trip</p>
            <h1 className="text-xl font-bold text-foreground">
              {activeTrip.destination}, {activeTrip.country}
            </h1>
          </div>
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl">
            {activeTrip.image}
          </div>
        </div>
        <p className="text-xs text-muted-foreground flex items-center gap-1 ml-11">
          <Calendar className="w-3 h-3" />
          {activeTrip.dates}
        </p>
      </div>

      {/* Budget Overview Card */}
      <div className="px-6 mb-6">
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-muted-foreground text-xs mb-1">Total Spent</p>
              <p className="text-2xl font-bold text-foreground">RM {totalSpent.toLocaleString()}</p>
            </div>
            <div className="text-right">
              <p className="text-muted-foreground text-xs mb-1">Remaining</p>
              <p
                className={`text-lg font-semibold ${remaining >= 0 ? "text-green-600" : "text-red-600"}`}
              >
                RM {remaining.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <Progress
            value={Math.min(spentPercentage, 100)}
            className="h-3 mb-2"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{spentPercentage.toFixed(0)}% of budget</span>
            <span>RM {activeTrip.budget.toLocaleString()} total</span>
          </div>
        </Card>
      </div>

      {/* Category Breakdown */}
      {expensesByCategory.length > 0 && (
        <div className="px-6 mb-6">
          <h2 className="font-semibold text-foreground mb-3 text-sm">By Category</h2>
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-6 px-6">
            {expensesByCategory.map((cat) => {
              const Icon = cat.icon;
              return (
                <Card key={cat.id} className="p-3 flex-shrink-0 min-w-[100px]">
                  <div
                    className={`w-8 h-8 rounded-lg ${cat.color} flex items-center justify-center mb-2`}
                  >
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-xs text-muted-foreground">{cat.label}</p>
                  <p className="font-semibold text-foreground text-sm">
                    RM {cat.total.toLocaleString()}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Add Expense Button */}
      {!showAddForm && (
        <div className="px-6 mb-4">
          <Button onClick={() => setShowAddForm(true)} className="w-full rounded-xl" size="lg">
            <Plus className="w-4 h-4 mr-2" />
            Add Expense
          </Button>
        </div>
      )}

      {/* Add Expense Form */}
      {showAddForm && (
        <div className="px-6 mb-4">
          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">New Expense</h3>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setShowAddForm(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Category Selection */}
            <div className="mb-4">
              <p className="text-xs text-muted-foreground mb-2">Category</p>
              <div className="grid grid-cols-3 gap-2">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`p-3 rounded-xl flex flex-col items-center gap-1 transition-all ${
                        selectedCategory === cat.id
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary hover:bg-secondary/80"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-xs">{cat.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Amount Input */}
            <div className="mb-4">
              <p className="text-xs text-muted-foreground mb-2">Amount (RM)</p>
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
              <p className="text-xs text-muted-foreground mb-2">Description (optional)</p>
              <Input
                placeholder="What was this for?"
                value={expenseDescription}
                onChange={(e) => setExpenseDescription(e.target.value)}
              />
            </div>

            {/* Submit Button */}
            <Button
              onClick={handleAddExpense}
              className="w-full"
              disabled={!selectedCategory || !expenseAmount}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Expense
            </Button>
          </Card>
        </div>
      )}

      {/* Expenses List */}
      <div className="px-6">
        <h2 className="font-semibold text-foreground mb-3 text-sm">Recent Expenses</h2>
        <div className="space-y-2">
          {expenses.map((expense) => {
            const Icon = getCategoryIcon(expense.category);
            return (
              <Card key={expense.id} className="p-3 flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-lg ${getCategoryColor(expense.category)} flex items-center justify-center`}
                >
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground text-sm">{expense.description}</p>
                  <p className="text-xs text-muted-foreground">{expense.date}</p>
                </div>
                <p className="font-semibold text-foreground">RM {expense.amount.toLocaleString()}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

