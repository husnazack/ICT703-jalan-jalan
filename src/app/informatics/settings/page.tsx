"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  RotateCcw,
  User,
  Bell,
  Shield,
  HelpCircle,
  ChevronRight,
  LogOut,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Navigation } from "@/components/shared/navigation";
import { GroupLabel } from "@/components/shared/group-label";
import {
  AnimatedBackground,
  UnifiedCard,
  PageHeader,
} from "@/components/shared/page-layout";
import { FlowGuide } from "@/components/shared/flow-guide";
import { cn } from "@/lib/utils";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { STORAGE_KEYS, DEFAULT_PROFILE, type UserProfile } from "@/lib/settings-defaults";

export default function SettingsPage() {
  const router = useRouter();
  const [profile] = useLocalStorage<UserProfile>(STORAGE_KEYS.profile, DEFAULT_PROFILE);
  const [notifications, setNotifications] = useState(true);
  const [priceAlerts, setPriceAlerts] = useState(true);
  const [weeklyReport, setWeeklyReport] = useState(false);

  const handleResetPlanning = () => {
    router.push("/informatics");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 relative">
      <Navigation />
      <GroupLabel group={3} />
      <AnimatedBackground variant="subtle" />

      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <PageHeader
          title="Settings"
          subtitle="Manage your preferences & account"
          icon={<Settings className="size-7 text-white" />}
        />

        {/* User Profile Card */}
        <UnifiedCard gradient className="p-5 mb-6">
          <div className="flex items-center gap-4">
            <div className="size-16 rounded-full bg-gradient-to-br from-violet-100 to-purple-100 dark:from-violet-900/40 dark:to-purple-900/40 flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">{profile.avatar}</span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-neutral-800 dark:text-neutral-100">{profile.name}</h3>
              <p className="text-neutral-500 dark:text-neutral-400 text-sm">{profile.email}</p>
              <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 text-xs font-medium">
                Premium Member
              </span>
            </div>
          </div>
        </UnifiedCard>

        {/* Account Section */}
        <div className="mb-6">
          <h2 className="font-bold text-lg text-neutral-800 dark:text-neutral-100 mb-4">Account</h2>
          <div className="space-y-3">
            <UnifiedCard hover className="p-0 overflow-hidden">
              <button
                onClick={() => router.push("/informatics/settings/profile")}
                className="w-full flex items-center gap-3 p-4 transition-colors"
              >
                <div className="size-10 rounded-lg bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center flex-shrink-0">
                  <User className="size-5 text-violet-600 dark:text-violet-400" />
                </div>
                <span className="flex-1 text-left font-medium text-neutral-800 dark:text-neutral-100 text-sm">
                  Edit Profile
                </span>
                <ChevronRight className="size-5 text-neutral-400" />
              </button>
            </UnifiedCard>

            <UnifiedCard hover className="p-0 overflow-hidden">
              <button
                onClick={() => router.push("/informatics/settings/privacy")}
                className="w-full flex items-center gap-3 p-4 transition-colors"
              >
                <div className="size-10 rounded-lg bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center flex-shrink-0">
                  <Shield className="size-5 text-violet-600 dark:text-violet-400" />
                </div>
                <span className="flex-1 text-left font-medium text-neutral-800 dark:text-neutral-100 text-sm">
                  Privacy Settings
                </span>
                <ChevronRight className="size-5 text-neutral-400" />
              </button>
            </UnifiedCard>
          </div>
        </div>

        {/* Preferences Section */}
        <div className="mb-6">
          <h2 className="font-bold text-lg text-neutral-800 dark:text-neutral-100 mb-4">Preferences</h2>
          <div className="space-y-3">
            <UnifiedCard className="p-4">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-lg bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center flex-shrink-0">
                  <Bell className="size-5 text-violet-600 dark:text-violet-400" />
                </div>
                <span className="flex-1 font-medium text-neutral-800 dark:text-neutral-100 text-sm">
                  Push Notifications
                </span>
                <Switch checked={notifications} onCheckedChange={setNotifications} />
              </div>
            </UnifiedCard>

            <UnifiedCard className="p-4">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0">
                  <Bell className="size-5 text-amber-600 dark:text-amber-400" />
                </div>
                <span className="flex-1 font-medium text-neutral-800 dark:text-neutral-100 text-sm">
                  Price Drop Alerts
                </span>
                <Switch checked={priceAlerts} onCheckedChange={setPriceAlerts} />
              </div>
            </UnifiedCard>

            <UnifiedCard className="p-4">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0">
                  <Bell className="size-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <span className="flex-1 font-medium text-neutral-800 dark:text-neutral-100 text-sm">
                  Weekly Summary
                </span>
                <Switch checked={weeklyReport} onCheckedChange={setWeeklyReport} />
              </div>
            </UnifiedCard>
          </div>
        </div>

        {/* Support Section */}
        <div className="mb-6">
          <h2 className="font-bold text-lg text-neutral-800 dark:text-neutral-100 mb-4">Support</h2>
          <UnifiedCard hover className="p-0 overflow-hidden">
            <button className="w-full flex items-center gap-3 p-4 transition-colors">
              <div className="size-10 rounded-lg bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center flex-shrink-0">
                <HelpCircle className="size-5 text-violet-600 dark:text-violet-400" />
              </div>
              <span className="flex-1 text-left font-medium text-neutral-800 dark:text-neutral-100 text-sm">
                Help Centre
              </span>
              <ChevronRight className="size-5 text-neutral-400" />
            </button>
          </UnifiedCard>
        </div>

        {/* Data Management */}
        <div className="mb-6">
          <h2 className="font-bold text-lg text-neutral-800 dark:text-neutral-100 mb-4">Data Management</h2>
          <UnifiedCard hover className="p-0 overflow-hidden">
            <button
              onClick={handleResetPlanning}
              className="w-full flex items-center gap-3 p-4 transition-colors"
            >
              <div className="size-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0">
                <RotateCcw className="size-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div className="flex-1 min-w-0 text-left">
                <p className="font-medium text-neutral-800 dark:text-neutral-100 text-sm">Reset Travel Planning</p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">Clear all trips and start fresh</p>
              </div>
              <ChevronRight className="size-5 text-neutral-400 flex-shrink-0" />
            </button>
          </UnifiedCard>
        </div>

        {/* Sign Out */}
        <div className="mb-8">
          <Button
            variant="outline"
            className="w-full rounded-xl border-red-500/30 text-red-600 hover:bg-red-500/10 h-12 text-base"
            size="lg"
          >
            <LogOut className="size-4 mr-2" />
            Sign Out
          </Button>
        </div>

        {/* App Version */}
        <p className="text-neutral-400 dark:text-neutral-500 text-xs text-center mb-8">
          Travel Pulse v1.0.0
        </p>

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
