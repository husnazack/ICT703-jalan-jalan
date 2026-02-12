"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  ChatSidebar,
  ChatHeader,
  ChatInput,
  AssistantMessage,
  UserMessage,
  QuickActions,
} from "@/components/chat";
import type { ChatMessageProps } from "@/components/chat";
import { Navigation } from "@/components/shared/navigation";
import { GroupLabel } from "@/components/shared/group-label";
import { PlayerAvatar } from "@/components/shared/player-avatar";
import { FlowGuide } from "@/components/shared/flow-guide";
import {
  AnimatedBackground,
  UnifiedCard,
} from "@/components/shared/page-layout";
import {
  loadConversations,
  saveConversation,
  deleteConversation,
  generateId,
  generateTitle,
  type ChatConversation,
} from "@/lib/chat-storage";

// Map quick action IDs to messages sent through the chatbot
const quickActionMessages: Record<string, string> = {
  "crowd-check": "Check crowd levels",
  "plan-itinerary": "Plan my itinerary",
  "weather-travel": "Check weather and travel times",
  "budget-expenses": "Budget and expenses tips",
  "local-recommendations": "Local recommendations",
  "emergency-helper": "Emergency and safety help",
};

export default function ChatPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [messages, setMessages] = useState<ChatMessageProps[]>([]);
  const [activeConvId, setActiveConvId] = useState<string | null>(null);
  const [conversations, setConversations] = useState<ChatConversation[]>([]);
  const [showLanding, setShowLanding] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load chat history from localStorage on mount
  useEffect(() => {
    setConversations(loadConversations());
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Persist conversation to localStorage whenever messages change (skip welcome-only and typing states)
  const persistConversation = useCallback(
    (convId: string, msgs: ChatMessageProps[]) => {
      const userMessages = msgs.filter((m) => m.role === "user");
      if (userMessages.length === 0) return;

      const conv: ChatConversation = {
        id: convId,
        title: generateTitle(userMessages[0].content as string),
        messages: msgs.map((m) => ({
          role: m.role as "user" | "assistant",
          content: m.content as string,
          timestamp: m.timestamp || "",
        })),
        updatedAt: Date.now(),
      };
      saveConversation(conv);
      setConversations(loadConversations());
    },
    []
  );

  const handleSend = async (message: string) => {
    // Determine conversation ID — create new if none active
    let convId = activeConvId;
    if (!convId) {
      convId = generateId();
      setActiveConvId(convId);
    }

    if (showLanding) setShowLanding(false);

    const newUserMessage: ChatMessageProps = {
      role: "user",
      content: message,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const updatedWithUser = [...messages, newUserMessage];
    setMessages(updatedWithUser);

    // Typing indicator
    const typingMsg: ChatMessageProps = {
      role: "assistant",
      content: "Typing...",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages([...updatedWithUser, typingMsg]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          userId: "faris",
          chatId: convId,
        }),
      });

      const data = await res.json();

      const assistantResponse: ChatMessageProps = {
        role: "assistant",
        content: data?.reply ?? "No reply returned",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      const finalMessages = [...updatedWithUser, assistantResponse];
      setMessages(finalMessages);
      persistConversation(convId, finalMessages);
    } catch {
      const errorMsg: ChatMessageProps = {
        role: "assistant",
        content:
          "Sorry, I couldn't connect to the server. Please try again later.",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      const finalMessages = [...updatedWithUser, errorMsg];
      setMessages(finalMessages);
      persistConversation(convId, finalMessages);
    }
  };

  // Quick actions now send the message through the chatbot API
  const handleQuickAction = (actionId: string) => {
    const message =
      quickActionMessages[actionId] || "Help me plan my trip";
    handleSend(message);
  };

  const handleNewChat = () => {
    setMessages([]);
    setActiveConvId(null);
    setShowLanding(true);
  };

  const handleSelectChat = (chatId: string) => {
    const conv = conversations.find((c) => c.id === chatId);
    if (!conv) return;

    setActiveConvId(chatId);
    setShowLanding(false);
    setMessages(
      conv.messages.map((m) => ({
        role: m.role,
        content: m.content,
        timestamp: m.timestamp,
      }))
    );
  };

  const handleDeleteChat = (chatId: string) => {
    deleteConversation(chatId);
    setConversations(loadConversations());

    // If we deleted the active chat, go back to landing
    if (activeConvId === chatId) {
      handleNewChat();
    }
  };

  // Sidebar chat list derived from localStorage conversations
  const sidebarChats = conversations.map((c) => ({
    id: c.id,
    title: c.title,
    updatedAt: c.updatedAt,
  }));

  // Landing view
  if (showLanding) {
    return (
      <div className="relative flex flex-col min-h-screen overflow-hidden bg-white dark:bg-neutral-950">
        <Navigation />
        <GroupLabel group={1} />
        <AnimatedBackground variant="vibrant" />

        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-4 py-12">
          <div className="flex flex-col items-center gap-10 w-full max-w-3xl">
            {/* Header */}
            <div className="flex flex-col items-center gap-4">
              <PlayerAvatar autoAnimate size={80} />
              <h1 className="text-3xl md:text-4xl font-bold text-neutral-800 dark:text-neutral-100 text-center tracking-tight">
                Trevllo.ai — Smarter Planning. Smoother Journeys.
              </h1>
            </div>

            {/* Chat Input Card */}
            <UnifiedCard gradient className="w-full p-6 md:p-8">
              <ChatInput onSend={handleSend} />
            </UnifiedCard>

            {/* Quick Actions */}
            <QuickActions onSelect={handleQuickAction} />

            {/* Flow Guide */}
            <div className="mt-4">
              <FlowGuide variant="inline" title="Or explore:" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Chat view
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-white dark:bg-neutral-950">
      <Navigation />
      <GroupLabel group={1} />
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <ChatSidebar
          chats={sidebarChats}
          activeChat={activeConvId || undefined}
          onSelectChat={handleSelectChat}
          onNewChat={handleNewChat}
          onDeleteChat={handleDeleteChat}
          isCollapsed={!sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
        />

        {/* Main Content */}
        <div className="flex flex-col flex-1 relative">
          <AnimatedBackground variant="subtle" />

          {/* Header */}
          <ChatHeader onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto relative z-10">
            <div className="max-w-4xl mx-auto px-6 py-8 flex flex-col gap-6">
              {messages.map((message, index) =>
                message.role === "user" ? (
                  <UserMessage
                    key={index}
                    content={message.content}
                    timestamp={message.timestamp}
                  />
                ) : (
                  <AssistantMessage
                    key={index}
                    content={message.content}
                    timestamp={message.timestamp}
                  />
                )
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Area */}
          <div className="relative z-10 border-t border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl">
            <div className="max-w-4xl mx-auto p-4">
              <ChatInput onSend={handleSend} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
