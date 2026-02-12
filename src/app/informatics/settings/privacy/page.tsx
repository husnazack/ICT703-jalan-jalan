"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Shield, Share2, BarChart3, MapPin, Eye, Download, Trash2 } from "lucide-react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { STORAGE_KEYS, DEFAULT_PRIVACY, type PrivacySettings } from "@/lib/settings-defaults";
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

export default function PrivacyPage() {
  const router = useRouter();
  const [privacy, setPrivacy] = useLocalStorage<PrivacySettings>(
    STORAGE_KEYS.privacy,
    DEFAULT_PRIVACY
  );

  const updateField = (field: keyof PrivacySettings) => (value: boolean) => {
    setPrivacy((prev) => ({ ...prev, [field]: value }));
  };

  const privacyOptions = [
    {
      icon: Share2,
      label: "Data Sharing",
      description: "Share anonymized data to improve recommendations",
      value: privacy.dataSharing,
      onChange: updateField("dataSharing"),
      color: "bg-violet-100 dark:bg-violet-900/30",
      iconColor: "text-violet-600 dark:text-violet-400",
    },
    {
      icon: BarChart3,
      label: "Usage Analytics",
      description: "Help us understand how you use the app",
      value: privacy.analytics,
      onChange: updateField("analytics"),
      color: "bg-emerald-100 dark:bg-emerald-900/30",
      iconColor: "text-emerald-600 dark:text-emerald-400",
    },
    {
      icon: MapPin,
      label: "Location Services",
      description: "Enable location-based features and suggestions",
      value: privacy.locationTracking,
      onChange: updateField("locationTracking"),
      color: "bg-amber-100 dark:bg-amber-900/30",
      iconColor: "text-amber-600 dark:text-amber-400",
    },
    {
      icon: Eye,
      label: "Public Profile",
      description: "Allow others to see your travel stats",
      value: privacy.profileVisibility,
      onChange: updateField("profileVisibility"),
      color: "bg-violet-100 dark:bg-violet-900/30",
      iconColor: "text-violet-600 dark:text-violet-400",
    },
  ];

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
            onClick={() => router.push("/informatics/settings")}
            className="size-10 rounded-xl hover:bg-violet-100 dark:hover:bg-violet-900/30"
          >
            <ArrowLeft className="size-5" />
          </Button>
          <div className="size-14 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center shadow-xl shadow-violet-500/30">
            <Shield className="size-7 text-white" />
          </div>
          <div>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm">Account</p>
            <h1 className="text-2xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-100">
              Privacy Settings
            </h1>
          </div>
        </div>

        {/* Privacy Info */}
        <UnifiedCard gradient className="p-5 mb-6">
          <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
            Control how your data is used and shared. Your privacy is important to us — all
            settings can be changed at any time.
          </p>
        </UnifiedCard>

        {/* Privacy Options */}
        <div className="mb-6">
          <h2 className="font-bold text-lg text-neutral-800 dark:text-neutral-100 mb-4">Privacy Controls</h2>
          <div className="space-y-3">
            {privacyOptions.map((option) => {
              const Icon = option.icon;
              return (
                <UnifiedCard key={option.label} className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`size-10 rounded-lg ${option.color} flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`size-5 ${option.iconColor}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-neutral-800 dark:text-neutral-100 text-sm">{option.label}</p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">{option.description}</p>
                    </div>
                    <Switch checked={option.value} onCheckedChange={option.onChange} />
                  </div>
                </UnifiedCard>
              );
            })}
          </div>
        </div>

        {/* Data Management */}
        <div className="mb-8">
          <h2 className="font-bold text-lg text-neutral-800 dark:text-neutral-100 mb-4">Data Management</h2>
          <div className="space-y-3">
            <UnifiedCard hover className="p-0 overflow-hidden">
              <button className="w-full flex items-center gap-3 p-4 transition-colors">
                <div className="size-10 rounded-lg bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center flex-shrink-0">
                  <Download className="size-5 text-violet-600 dark:text-violet-400" />
                </div>
                <span className="flex-1 text-left font-medium text-neutral-800 dark:text-neutral-100 text-sm">
                  Download My Data
                </span>
                <span className="text-xs text-neutral-400 flex-shrink-0">Request copy</span>
              </button>
            </UnifiedCard>

            <UnifiedCard hover className="p-0 overflow-hidden">
              <button className="w-full flex items-center gap-3 p-4 transition-colors">
                <div className="size-10 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0">
                  <Trash2 className="size-5 text-red-600 dark:text-red-400" />
                </div>
                <span className="flex-1 text-left font-medium text-red-600 dark:text-red-400 text-sm">
                  Delete Account
                </span>
                <span className="text-xs text-neutral-400 flex-shrink-0">Permanent</span>
              </button>
            </UnifiedCard>
          </div>
        </div>

        {/* Last Updated */}
        <p className="text-neutral-400 dark:text-neutral-500 text-xs text-center mb-8">
          Privacy policy last updated: December 2024
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
