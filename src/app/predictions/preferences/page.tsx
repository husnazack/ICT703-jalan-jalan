"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Navigation } from "@/components/shared/navigation";
import { GroupLabel } from "@/components/shared/group-label";
import {
  Sparkles,
  ChevronLeft,
  DollarSign,
  Users,
  Shield,
  Bell,
  Check,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Step Indicator Component
function StepIndicator({ currentStep }: { currentStep: number }) {
  const steps = [
    { num: 1, label: "Trip Details" },
    { num: 2, label: "Preferences" },
    { num: 3, label: "Your Plan" },
  ];

  return (
    <div className="flex items-center justify-center gap-4 mb-8">
      {steps.map((step, index) => (
        <div key={step.num} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all",
                currentStep > step.num
                  ? "bg-teal-500 text-white"
                  : currentStep === step.num
                  ? "bg-teal-500 text-white"
                  : "bg-slate-200 text-slate-500"
              )}
            >
              {currentStep > step.num ? (
                <Check className="w-5 h-5" />
              ) : (
                step.num
              )}
            </div>
            <span
              className={cn(
                "text-xs mt-2 font-medium",
                currentStep >= step.num ? "text-teal-600" : "text-slate-400"
              )}
            >
              {step.label}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={cn(
                "w-24 h-1 mx-2 rounded-full transition-all",
                currentStep > step.num ? "bg-teal-500" : "bg-slate-200"
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// Radio Option Component
function RadioOption({
  selected,
  onSelect,
  title,
  description,
}: {
  selected: boolean;
  onSelect: () => void;
  title: string;
  description: string;
}) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        "w-full p-4 rounded-xl border-2 text-left transition-all",
        selected
          ? "border-teal-500 bg-teal-50"
          : "border-slate-200 hover:border-slate-300 bg-white"
      )}
    >
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all",
            selected ? "border-teal-500 bg-teal-500" : "border-slate-300"
          )}
        >
          {selected && <div className="w-2 h-2 rounded-full bg-white" />}
        </div>
        <div>
          <p className="font-medium text-slate-900">{title}</p>
          <p className="text-sm text-slate-500">{description}</p>
        </div>
      </div>
    </button>
  );
}

// Checkbox Option Component
function CheckboxOption({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={cn(
        "w-full p-4 rounded-xl text-left transition-all flex items-center gap-3",
        checked ? "bg-teal-500 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
      )}
    >
      <div
        className={cn(
          "w-5 h-5 rounded flex items-center justify-center transition-all",
          checked ? "bg-white" : "border-2 border-slate-300 bg-white"
        )}
      >
        {checked && <Check className="w-3 h-3 text-teal-500" />}
      </div>
      <span className="font-medium">{label}</span>
    </button>
  );
}

export default function PreferencesPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingStep, setLoadingStep] = useState(0);

  // Form state
  const [travelStyle, setTravelStyle] = useState("balanced");
  const [crowdPreference, setCrowdPreference] = useState("avoid");
  const [minBudget, setMinBudget] = useState("");
  const [maxBudget, setMaxBudget] = useState("");

  // Safety Options
  const [avoidLateNight, setAvoidLateNight] = useState(true);
  const [preferWellLit, setPreferWellLit] = useState(true);
  const [verifiedTransport, setVerifiedTransport] = useState(true);

  // Alert Preferences
  const [highCrowd, setHighCrowd] = useState(true);
  const [weatherDisruptions, setWeatherDisruptions] = useState(true);
  const [priceDrops, setPriceDrops] = useState(true);
  const [safetyWarnings, setSafetyWarnings] = useState(true);

  const loadingSteps = [
    "Analyzing your travel preferences...",
    "Finding the best routes and attractions...",
    "Optimizing your itinerary...",
  ];

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setLoadingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            // Navigate to plan page after completion
            setTimeout(() => {
              router.push("/predictions/plan");
            }, 500);
            return 100;
          }
          return prev + 2;
        });
      }, 60);

      const stepInterval = setInterval(() => {
        setLoadingStep((prev) => {
          if (prev >= loadingSteps.length - 1) return prev;
          return prev + 1;
        });
      }, 1000);

      return () => {
        clearInterval(interval);
        clearInterval(stepInterval);
      };
    }
  }, [isLoading, router, loadingSteps.length]);

  const handleGeneratePlan = () => {
    // Store preferences
    sessionStorage.setItem(
      "travelPreferences",
      JSON.stringify({
        travelStyle,
        crowdPreference,
        budget: { min: minBudget, max: maxBudget },
        safetyOptions: { avoidLateNight, preferWellLit, verifiedTransport },
        alertPreferences: { highCrowd, weatherDisruptions, priceDrops, safetyWarnings },
      })
    );
    setIsLoading(true);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      <GroupLabel group={5} />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Step Indicator */}
        <StepIndicator currentStep={2} />

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">
            Your Travel Preferences
          </h1>
          <p className="text-slate-500">Customize your travel experience</p>
        </div>

        {/* Preferences Form */}
        <Card className="shadow-sm border-slate-200 mb-6">
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Travel Style */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <DollarSign className="w-4 h-4 text-teal-600" />
                    <span className="font-semibold text-slate-900">Travel Style</span>
                  </div>
                  <div className="space-y-3">
                    <RadioOption
                      selected={travelStyle === "low-budget"}
                      onSelect={() => setTravelStyle("low-budget")}
                      title="Low Budget"
                      description="Save money, maximize experiences"
                    />
                    <RadioOption
                      selected={travelStyle === "balanced"}
                      onSelect={() => setTravelStyle("balanced")}
                      title="Balanced"
                      description="Mix of comfort and value"
                    />
                    <RadioOption
                      selected={travelStyle === "comfortable"}
                      onSelect={() => setTravelStyle("comfortable")}
                      title="Comfortable"
                      description="Prioritize comfort and convenience"
                    />
                  </div>
                </div>

                {/* Crowd Preference */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Users className="w-4 h-4 text-teal-600" />
                    <span className="font-semibold text-slate-900">Crowd Preference</span>
                  </div>
                  <div className="space-y-3">
                    <RadioOption
                      selected={crowdPreference === "avoid"}
                      onSelect={() => setCrowdPreference("avoid")}
                      title="Avoid crowds as much as possible"
                      description=""
                    />
                    <RadioOption
                      selected={crowdPreference === "some"}
                      onSelect={() => setCrowdPreference("some")}
                      title="Okay with some crowd"
                      description=""
                    />
                    <RadioOption
                      selected={crowdPreference === "no-preference"}
                      onSelect={() => setCrowdPreference("no-preference")}
                      title="No preference"
                      description=""
                    />
                  </div>
                </div>

                {/* Budget */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <DollarSign className="w-4 h-4 text-teal-600" />
                    <span className="font-semibold text-slate-900">Budget (per person)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-slate-500">RM</span>
                      <Input
                        type="text"
                        placeholder="Min"
                        value={minBudget}
                        onChange={(e) => setMinBudget(e.target.value)}
                        className="w-24 h-10"
                      />
                    </div>
                    <span className="text-slate-400">to</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-slate-500">RM</span>
                      <Input
                        type="text"
                        placeholder="Max"
                        value={maxBudget}
                        onChange={(e) => setMaxBudget(e.target.value)}
                        className="w-24 h-10"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Safety Options */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Shield className="w-4 h-4 text-teal-600" />
                    <span className="font-semibold text-slate-900">Safety Options</span>
                  </div>
                  <div className="space-y-3">
                    <CheckboxOption
                      checked={avoidLateNight}
                      onChange={setAvoidLateNight}
                      label="Avoid late-night activities"
                    />
                    <CheckboxOption
                      checked={preferWellLit}
                      onChange={setPreferWellLit}
                      label="Prefer well-lit / busy areas at night"
                    />
                    <CheckboxOption
                      checked={verifiedTransport}
                      onChange={setVerifiedTransport}
                      label="Only show verified transport providers"
                    />
                  </div>
                </div>

                {/* Alert Preferences */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Bell className="w-4 h-4 text-teal-600" />
                    <span className="font-semibold text-slate-900">Alert Preferences</span>
                  </div>
                  <div className="space-y-3">
                    <CheckboxOption
                      checked={highCrowd}
                      onChange={setHighCrowd}
                      label="High crowd predictions"
                    />
                    <CheckboxOption
                      checked={weatherDisruptions}
                      onChange={setWeatherDisruptions}
                      label="Weather disruptions"
                    />
                    <CheckboxOption
                      checked={priceDrops}
                      onChange={setPriceDrops}
                      label="Price drops"
                    />
                    <CheckboxOption
                      checked={safetyWarnings}
                      onChange={setSafetyWarnings}
                      label="Safety warnings"
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="flex-1 h-12 text-slate-600 border-slate-300"
          >
            Back
          </Button>
          <Button
            onClick={handleGeneratePlan}
            className="flex-1 h-12 bg-teal-500 hover:bg-teal-600 text-white"
          >
            Generate Travel Plan
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </main>

      {/* Loading Dialog */}
      <Dialog open={isLoading} onOpenChange={() => {}}>
        <DialogContent showCloseButton={false} className="sm:max-w-md">
          <div className="flex flex-col items-center text-center py-4">
            {/* Icon */}
            <div className="w-16 h-16 rounded-full bg-teal-500 flex items-center justify-center mb-6">
              <Sparkles className="w-8 h-8 text-white animate-pulse" />
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Generating Your Travel Plan
            </h3>
            <p className="text-slate-500 mb-6">
              Our AI is analyzing your preferences and creating a personalized itinerary...
            </p>

            {/* Loading Steps */}
            <div className="w-full space-y-3 mb-6">
              {loadingSteps.map((step, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-lg transition-all",
                    index <= loadingStep
                      ? "bg-slate-50"
                      : "opacity-50"
                  )}
                >
                  <div
                    className={cn(
                      "w-2 h-2 rounded-full",
                      index <= loadingStep ? "bg-teal-500" : "bg-slate-300"
                    )}
                  />
                  <span className="text-sm text-slate-600">{step}</span>
                </div>
              ))}
            </div>

            {/* Progress Bar */}
            <div className="w-full space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Progress</span>
                <span className="text-teal-600 font-medium">{loadingProgress}%</span>
              </div>
              <Progress value={loadingProgress} className="h-2 bg-slate-200 [&>div]:bg-teal-500" />
            </div>

            {/* Powered by AI */}
            <div className="flex items-center gap-2 mt-6 text-sm text-slate-400">
              <Sparkles className="w-4 h-4" />
              Powered by AI
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

