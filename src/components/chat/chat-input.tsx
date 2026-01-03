"use client";

import { useState, FormEvent, KeyboardEvent } from "react";
import { Send, Mic, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSend?: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function ChatInput({
  onSend,
  disabled = false,
  placeholder = "Ask me anything about your trip... e.g., 'Is Jonker Street busy right now?' or 'Help me plan a budget for Penang'",
}: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e?: FormEvent) => {
    e?.preventDefault();
    if (message.trim() && !disabled) {
      onSend?.(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex flex-col items-center gap-3 px-8 py-3 bg-white/80 backdrop-blur-sm">
      <div className="w-full max-w-4xl">
        <div className="flex flex-col gap-4 p-4 bg-neutral-100 rounded-lg border border-black/0">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            rows={1}
            className={cn(
              "w-full resize-none bg-transparent text-sm text-foreground placeholder:text-muted-foreground",
              "focus:outline-none min-h-[24px] max-h-[200px]"
            )}
            style={{ height: "auto" }}
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="text-slate-600 hover:text-slate-900"
                disabled={disabled}
              >
                <Mic className="w-5 h-5" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="text-slate-600 hover:text-slate-900"
                disabled={disabled}
              >
                <Paperclip className="w-5 h-5" />
              </Button>
            </div>

            <Button
              type="button"
              onClick={() => handleSubmit()}
              disabled={disabled || !message.trim()}
              variant="outline"
              className="gap-2 border-purple-600 text-slate-700 hover:bg-purple-50 shadow-sm"
            >
              <Send className="w-4 h-4" />
              Send
            </Button>
          </div>
        </div>
      </div>
      <p className="text-xs text-muted-foreground">
        Trevllo.ai can make mistakes, so double-check it
      </p>
    </div>
  );
}
