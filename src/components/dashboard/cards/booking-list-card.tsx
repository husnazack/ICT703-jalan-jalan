"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Ticket, Hotel, Plane, CheckCircle2, XCircle, Clock, AlertCircle } from "lucide-react";

interface Booking {
  type: "ticket" | "hotel" | "flight";
  name: string;
  date?: string;
  status: "confirmed" | "cancelled" | "pending" | "updated";
  statusMessage?: string;
}

interface BookingListCardProps {
  bookings?: Booking[];
}

const defaultBookings: Booking[] = [
  {
    type: "ticket",
    name: "Museum Ticket",
    date: "23 Jan 2025",
    status: "cancelled",
    statusMessage: "Refund processed",
  },
  {
    type: "hotel",
    name: "Hotel",
    date: "23-25 Jan 2025",
    status: "confirmed",
    statusMessage: "Check-in at 2PM",
  },
  {
    type: "flight",
    name: "Flight",
    date: "23 Jan 2025",
    status: "updated",
    statusMessage: "Gate changed to B12",
  },
];

export function BookingListCard({ bookings = defaultBookings }: BookingListCardProps) {
  const getIcon = (type: Booking["type"]) => {
    switch (type) {
      case "ticket":
        return <Ticket className="size-5" />;
      case "hotel":
        return <Hotel className="size-5" />;
      case "flight":
        return <Plane className="size-5" />;
    }
  };

  const getStatusStyle = (status: Booking["status"]) => {
    switch (status) {
      case "confirmed":
        return {
          bg: "bg-emerald-50",
          text: "text-emerald-600",
          border: "border-emerald-200",
          icon: <CheckCircle2 className="size-4" />,
          label: "Confirmed",
        };
      case "cancelled":
        return {
          bg: "bg-red-50",
          text: "text-red-600",
          border: "border-red-200",
          icon: <XCircle className="size-4" />,
          label: "Cancelled",
        };
      case "pending":
        return {
          bg: "bg-amber-50",
          text: "text-amber-600",
          border: "border-amber-200",
          icon: <Clock className="size-4" />,
          label: "Pending",
        };
      case "updated":
        return {
          bg: "bg-blue-50",
          text: "text-blue-600",
          border: "border-blue-200",
          icon: <AlertCircle className="size-4" />,
          label: "Updated",
        };
    }
  };

  return (
    <Card className="border-purple-500 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold text-slate-700">
          Booking List & Updates
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {bookings.map((booking, index) => {
          const statusStyle = getStatusStyle(booking.status);

          return (
            <div
              key={index}
              className={cn(
                "flex items-center gap-4 p-4 rounded-xl border",
                statusStyle.border,
                statusStyle.bg
              )}
            >
              {/* Icon */}
              <div
                className={cn(
                  "p-2.5 rounded-lg",
                  booking.status === "cancelled"
                    ? "bg-red-100 text-red-600"
                    : booking.status === "confirmed"
                    ? "bg-emerald-100 text-emerald-600"
                    : "bg-blue-100 text-blue-600"
                )}
              >
                {getIcon(booking.type)}
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-slate-700">{booking.name}</span>
                  <div
                    className={cn(
                      "flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full",
                      statusStyle.bg,
                      statusStyle.text
                    )}
                  >
                    {statusStyle.icon}
                    {statusStyle.label}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  {booking.date && (
                    <span className="text-xs text-slate-500">{booking.date}</span>
                  )}
                  {booking.statusMessage && (
                    <span className={cn("text-xs", statusStyle.text)}>
                      {booking.statusMessage}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

