"use client";

import { Menu, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatHeaderProps {
  onToggleSidebar?: () => void;
  userName?: string;
}

export function ChatHeader({ onToggleSidebar, userName = "L" }: ChatHeaderProps) {
  return (
    <header className="flex items-center justify-between px-8 py-4 bg-white/80 backdrop-blur-sm border-b border-black/10">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          className="lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </Button>
        <div className="flex flex-col">
          <h1 className="text-base font-normal text-foreground tracking-tight">
            Travel Planning Assistant
          </h1>
          <p className="text-sm text-muted-foreground">
            Smart holiday planning with real-time insights
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* User Avatar */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-cyan-600 flex items-center justify-center">
            <span className="text-white font-normal text-base">{userName}</span>
          </div>
          <Button variant="ghost" size="icon">
            <MoreVertical className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
