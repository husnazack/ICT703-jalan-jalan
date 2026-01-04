"use client";

import { cn } from "@/lib/utils";

type GroupNumber = 1 | 2 | 3 | 4 | 5;

interface GroupLabelProps {
  group: GroupNumber;
  className?: string;
}

const groupConfig: Record<GroupNumber, { name: string; color: string; bg: string }> = {
  1: {
    name: "Context-Aware Planning Assistant",
    color: "text-emerald-700 dark:text-emerald-300",
    bg: "bg-emerald-100 dark:bg-emerald-900/50 border-emerald-200 dark:border-emerald-800",
  },
  2: {
    name: "Interactive Travel Dashboard",
    color: "text-blue-700 dark:text-blue-300",
    bg: "bg-blue-100 dark:bg-blue-900/50 border-blue-200 dark:border-blue-800",
  },
  3: {
    name: "Personal Travel Informatics",
    color: "text-violet-700 dark:text-violet-300",
    bg: "bg-violet-100 dark:bg-violet-900/50 border-violet-200 dark:border-violet-800",
  },
  4: {
    name: "Social & Community Layer",
    color: "text-orange-700 dark:text-orange-300",
    bg: "bg-orange-100 dark:bg-orange-900/50 border-orange-200 dark:border-orange-800",
  },
  5: {
    name: "Predictive & Collective Analytics",
    color: "text-rose-700 dark:text-rose-300",
    bg: "bg-rose-100 dark:bg-rose-900/50 border-rose-200 dark:border-rose-800",
  },
};

export function GroupLabel({ group, className }: GroupLabelProps) {
  const config = groupConfig[group];

  return (
    <div
      className={cn(
        "fixed bottom-4 right-4 z-50 flex items-center gap-2 px-3 py-2 rounded-full border shadow-lg backdrop-blur-sm",
        config.bg,
        className
      )}
    >
      <div
        className={cn(
          "flex items-center justify-center size-6 rounded-full text-xs font-bold",
          "bg-white dark:bg-gray-800 shadow-sm",
          config.color
        )}
      >
        {group}
      </div>
      <span className={cn("text-sm font-medium", config.color)}>
        Group {group}: {config.name}
      </span>
    </div>
  );
}
