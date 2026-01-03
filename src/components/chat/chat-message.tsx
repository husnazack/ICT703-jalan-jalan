"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export interface ChatMessageProps {
  role: "user" | "assistant";
  content: string | ReactNode;
  timestamp?: string;
}

export function ChatMessage({ role, content, timestamp }: ChatMessageProps) {
  const isUser = role === "user";

  return (
    <div
      className={cn(
        "flex gap-4 w-full",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      {/* Avatar */}
      {!isUser && (
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-[#313131] flex items-center justify-center">
            <span className="text-white font-bold text-sm">T</span>
          </div>
        </div>
      )}

      <div
        className={cn(
          "flex flex-col gap-1.5 max-w-[672px]",
          isUser ? "items-end" : "items-start"
        )}
      >
        {/* Message Bubble */}
        <div
          className={cn(
            "px-4 py-4 rounded-[14px]",
            isUser
              ? "bg-white rounded-tr-none"
              : "bg-white"
          )}
        >
          {typeof content === "string" ? (
            <p className="text-base leading-relaxed text-foreground whitespace-pre-wrap">
              {content}
            </p>
          ) : (
            content
          )}
        </div>

        {/* Timestamp */}
        {timestamp && (
          <span className="text-xs text-muted-foreground px-1">
            {timestamp}
          </span>
        )}
      </div>
    </div>
  );
}

// User message variant with slightly different styling
export function UserMessage({ content, timestamp }: Omit<ChatMessageProps, "role">) {
  return (
    <div className="flex justify-end gap-4 w-full px-6">
      <div className="flex flex-col gap-1.5 items-end max-w-[672px]">
        <div className="px-4 py-4 bg-white rounded-[14px] rounded-tr-none">
          <p className="text-base leading-relaxed text-neutral-800 whitespace-pre-wrap">
            {content as string}
          </p>
        </div>
        {timestamp && (
          <span className="text-xs text-muted-foreground px-1">
            {timestamp}
          </span>
        )}
      </div>
    </div>
  );
}

// Assistant message variant
export function AssistantMessage({ content, timestamp }: Omit<ChatMessageProps, "role">) {
  return (
    <div className="flex gap-4 w-full">
      <div className="flex-shrink-0">
        <div className="w-10 h-10 rounded-full bg-[#313131] flex items-center justify-center">
          <span className="text-white font-bold text-sm">T</span>
        </div>
      </div>
      <div className="flex flex-col gap-1.5 items-start max-w-[672px]">
        <div className="px-4 py-4 bg-white rounded-[14px]">
          {typeof content === "string" ? (
            <p className="text-base leading-relaxed text-foreground whitespace-pre-wrap">
              {content}
            </p>
          ) : (
            content
          )}
        </div>
        {timestamp && (
          <span className="text-xs text-muted-foreground px-1">
            {timestamp}
          </span>
        )}
      </div>
    </div>
  );
}
