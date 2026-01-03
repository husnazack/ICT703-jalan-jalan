"use client";

import { 
  Users, 
  Calendar, 
  Cloud, 
  Wallet, 
  MapPin, 
  AlertTriangle 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface QuickAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
}

const quickActions: QuickAction[] = [
  {
    id: "crowd-check",
    label: "Crowd Check",
    icon: <Users className="w-5 h-5" />,
    color: "bg-purple-500",
  },
  {
    id: "plan-itinerary",
    label: "Plan Itinerary",
    icon: <Calendar className="w-5 h-5" />,
    color: "bg-teal-500",
  },
  {
    id: "weather-travel",
    label: "Weather & Travel Time",
    icon: <Cloud className="w-5 h-5" />,
    color: "bg-blue-500",
  },
  {
    id: "budget-expenses",
    label: "Budget & Expenses",
    icon: <Wallet className="w-5 h-5" />,
    color: "bg-orange-500",
  },
  {
    id: "local-recommendations",
    label: "Local Recommendations",
    icon: <MapPin className="w-5 h-5" />,
    color: "bg-lime-500",
  },
  {
    id: "emergency-helper",
    label: "Emergency Helper",
    icon: <AlertTriangle className="w-5 h-5" />,
    color: "bg-red-500",
  },
];

interface QuickActionsProps {
  onSelect?: (actionId: string) => void;
}

export function QuickActions({ onSelect }: QuickActionsProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* First Row - 4 items */}
      <div className="flex justify-center gap-3">
        {quickActions.slice(0, 4).map((action) => (
          <QuickActionCard
            key={action.id}
            action={action}
            onClick={() => onSelect?.(action.id)}
          />
        ))}
      </div>
      {/* Second Row - 2 items centered */}
      <div className="flex justify-center gap-3">
        {quickActions.slice(4).map((action) => (
          <QuickActionCard
            key={action.id}
            action={action}
            onClick={() => onSelect?.(action.id)}
          />
        ))}
      </div>
    </div>
  );
}

interface QuickActionCardProps {
  action: QuickAction;
  onClick?: () => void;
}

function QuickActionCard({ action, onClick }: QuickActionCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 px-2 py-2 rounded-lg",
        "bg-white/60 border border-gray-200",
        "hover:bg-white hover:shadow-sm transition-all",
        "cursor-pointer"
      )}
    >
      <div
        className={cn(
          "w-7 h-7 rounded-md flex items-center justify-center text-white",
          action.color
        )}
      >
        {action.icon}
      </div>
      <span className="text-sm font-semibold text-neutral-800">{action.label}</span>
    </button>
  );
}

