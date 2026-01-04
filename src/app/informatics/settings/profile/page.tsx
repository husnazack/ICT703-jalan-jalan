"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, User, Camera, Mail, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

export default function ProfilePage() {
  const router = useRouter();
  const [name, setName] = useState("Travel Explorer");
  const [email, setEmail] = useState("explorer@email.com");

  const handleSave = () => {
    router.push("/informatics/settings");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col pb-8">
      {/* Header */}
      <div className="px-6 pt-8 pb-4">
        <div className="flex items-center gap-3 mb-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/informatics/settings")}
            className="h-8 w-8"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <p className="text-muted-foreground text-sm">Account</p>
            <h1 className="text-2xl font-bold text-foreground">Edit Profile</h1>
          </div>
        </div>
      </div>

      {/* Avatar Section */}
      <div className="px-6 mb-6">
        <Card className="p-6 flex flex-col items-center">
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-4xl">👤</span>
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-lg">
              <Camera className="w-4 h-4 text-primary-foreground" />
            </button>
          </div>
          <p className="text-xs text-muted-foreground">Tap to change photo</p>
        </Card>
      </div>

      {/* Form Fields */}
      <div className="px-6 space-y-4">
        <Card className="p-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2 text-sm">
                <User className="w-4 h-4 text-muted-foreground" />
                Display Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-muted-foreground" />
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
        </Card>
      </div>

      {/* Membership Info */}
      <div className="px-6 mt-6">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Membership</p>
              <p className="text-xs text-muted-foreground">Premium Member</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
              Active
            </span>
          </div>
        </Card>
      </div>

      {/* Save Button */}
      <div className="px-6 mt-6">
        <Button onClick={handleSave} className="w-full" size="lg">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>
    </div>
  );
}

