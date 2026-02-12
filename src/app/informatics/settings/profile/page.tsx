"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, User, Camera, Mail, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Navigation } from "@/components/shared/navigation";
import { GroupLabel } from "@/components/shared/group-label";
import {
  AnimatedBackground,
  UnifiedCard,
} from "@/components/shared/page-layout";
import { FlowGuide } from "@/components/shared/flow-guide";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { STORAGE_KEYS, DEFAULT_PROFILE, AVATAR_OPTIONS, type UserProfile } from "@/lib/settings-defaults";
import { cn } from "@/lib/utils";

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useLocalStorage<UserProfile>(
    STORAGE_KEYS.profile,
    DEFAULT_PROFILE
  );
  const [avatarOpen, setAvatarOpen] = useState(false);

  const handleSave = () => {
    router.push("/informatics/settings");
  };

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
            <User className="size-7 text-white" />
          </div>
          <div>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm">Account</p>
            <h1 className="text-2xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-100">
              Edit Profile
            </h1>
          </div>
        </div>

        {/* Avatar Section */}
        <UnifiedCard gradient className="p-6 mb-6">
          <div className="flex flex-col items-center">
            <Popover open={avatarOpen} onOpenChange={setAvatarOpen}>
              <PopoverTrigger asChild>
                <button className="relative mb-4 group">
                  <div className="size-24 rounded-full bg-gradient-to-br from-violet-100 to-purple-100 dark:from-violet-900/40 dark:to-purple-900/40 flex items-center justify-center">
                    <span className="text-4xl">{profile.avatar}</span>
                  </div>
                  <div className="absolute bottom-0 right-0 size-8 rounded-full bg-gradient-to-r from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/25">
                    <Camera className="size-4 text-white" />
                  </div>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-3" align="center">
                <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-2">Choose Avatar</p>
                <div className="grid grid-cols-6 gap-1.5">
                  {AVATAR_OPTIONS.map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => {
                        setProfile((prev) => ({ ...prev, avatar: emoji }));
                        setAvatarOpen(false);
                      }}
                      className={cn(
                        "size-9 rounded-lg flex items-center justify-center text-lg transition-all hover:scale-110",
                        profile.avatar === emoji
                          ? "ring-2 ring-violet-500 bg-violet-100 dark:bg-violet-900/40"
                          : "hover:bg-neutral-100 dark:hover:bg-neutral-800"
                      )}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">Tap to change avatar</p>
          </div>
        </UnifiedCard>

        {/* Form Fields */}
        <div className="mb-6">
          <h2 className="font-bold text-lg text-neutral-800 dark:text-neutral-100 mb-4">Profile Details</h2>
          <div className="space-y-3">
            <UnifiedCard className="p-4">
              <div className="space-y-2">
                <label htmlFor="name" className="flex items-center gap-2 text-sm font-medium text-neutral-500 dark:text-neutral-400">
                  <User className="size-4" />
                  Display Name
                </label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => setProfile((prev) => ({ ...prev, name: e.target.value }))}
                  className="text-neutral-800 dark:text-neutral-100"
                />
              </div>
            </UnifiedCard>

            <UnifiedCard className="p-4">
              <div className="space-y-2">
                <label htmlFor="email" className="flex items-center gap-2 text-sm font-medium text-neutral-500 dark:text-neutral-400">
                  <Mail className="size-4" />
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile((prev) => ({ ...prev, email: e.target.value }))}
                  className="text-neutral-800 dark:text-neutral-100"
                />
              </div>
            </UnifiedCard>
          </div>
        </div>

        {/* Membership Info */}
        <div className="mb-6">
          <h2 className="font-bold text-lg text-neutral-800 dark:text-neutral-100 mb-4">Membership</h2>
          <UnifiedCard className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-neutral-800 dark:text-neutral-100 text-sm">Plan</p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">Premium Member</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-xs font-medium">
                Active
              </span>
            </div>
          </UnifiedCard>
        </div>

        {/* Save Button */}
        <div className="mb-8">
          <Button
            onClick={handleSave}
            className="w-full rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white border-0 h-12 text-base"
            size="lg"
          >
            <Save className="size-4 mr-2" />
            Save Changes
          </Button>
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
