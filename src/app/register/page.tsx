"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navigation } from "@/components/shared/navigation";
import { GroupLabel } from "@/components/shared/group-label";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navigation />
      <GroupLabel group={4} />

      {/* Main Content - Two Column Layout */}
      <main className="flex-1 w-full grid grid-cols-1 lg:grid-cols-2 gap-0">
        {/* Left Column - Register Form */}
        <div className="flex items-center justify-center p-4 lg:p-8">
          <div className="w-full max-w-[588px] border-4 border-[#3B0764] rounded-[20px] relative">
            {/* Form Container */}
            <div className="px-8 md:px-12 lg:px-16 pt-8 pb-8 flex flex-col items-center gap-3 w-full">
              {/* Title */}
              <h1 
                className="w-full max-w-[386px] text-[30px] font-semibold text-black text-center leading-[1em] tracking-[-0.03333em]"
                style={{ fontFamily: "Inter" }}
              >
                Welcome to Jalan²
              </h1>

              {/* Name Field */}
              <div className="w-full max-w-[355px] flex flex-col gap-1.5">
                <label 
                  className="text-base font-semibold text-[#334155]"
                  style={{ fontFamily: "Inter", lineHeight: "1.5em" }}
                >
                  Name
                </label>
                <Input
                  type="text"
                  placeholder="Name"
                  className="w-full border border-[#3B0764] shadow-sm rounded-lg px-3 py-[7.5px] text-sm text-[#737373]"
                  style={{ fontFamily: "Inter", lineHeight: "1.5em", letterSpacing: "0.5%" }}
                />
              </div>

              {/* Email Field */}
              <div className="w-full max-w-[355px] flex flex-col gap-1.5">
                <label 
                  className="text-base font-semibold text-[#334155]"
                  style={{ fontFamily: "Inter", lineHeight: "1.5em" }}
                >
                  Email
                </label>
                <Input
                  type="email"
                  placeholder="Email"
                  className="w-full border border-[#3B0764] shadow-sm rounded-lg px-3 py-[7.5px] text-sm text-[#737373]"
                  style={{ fontFamily: "Inter", lineHeight: "1.5em", letterSpacing: "0.5%" }}
                />
              </div>

              {/* Password Field */}
              <div className="w-full max-w-[355px] flex flex-col gap-1.5">
                <label 
                  className="text-base font-semibold text-[#334155]"
                  style={{ fontFamily: "Inter", lineHeight: "1.5em" }}
                >
                  Password
                </label>
                <Input
                  type="password"
                  placeholder="Password"
                  className="w-full border border-[#3B0764] shadow-sm rounded-lg px-3 py-[7.5px] text-sm text-[#737373]"
                  style={{ fontFamily: "Inter", lineHeight: "1.5em", letterSpacing: "0.5%" }}
                />
              </div>

              {/* City of Residence Field */}
              <div className="w-full max-w-[355px] flex flex-col gap-1.5">
                <label 
                  className="text-base font-semibold text-[#334155]"
                  style={{ fontFamily: "Inter", lineHeight: "1.5em" }}
                >
                  City of Residence
                </label>
                <Input
                  type="text"
                  placeholder="City of Residence"
                  className="w-full border border-[#3B0764] shadow-sm rounded-lg px-3 py-[7.5px] text-sm text-[#737373]"
                  style={{ fontFamily: "Inter", lineHeight: "1.5em", letterSpacing: "0.5%" }}
                />
              </div>

              {/* Frequent Visited City Field */}
              <div className="w-full max-w-[355px] flex flex-col gap-1.5">
                <label 
                  className="text-base font-semibold text-[#334155]"
                  style={{ fontFamily: "Inter", lineHeight: "1.5em" }}
                >
                  Frequent Visited City
                </label>
                <Input
                  type="text"
                  placeholder="Frequent Visited City"
                  className="w-full border border-[#3B0764] shadow-sm rounded-lg px-3 py-[7.5px] text-sm text-[#737373]"
                  style={{ fontFamily: "Inter", lineHeight: "1.5em", letterSpacing: "0.5%" }}
                />
              </div>

              {/* Confirm Button */}
              <Button 
                className="w-full max-w-[354px] bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 text-[#F8FAFC] text-sm font-semibold rounded-lg px-4 py-[7.5px]"
                style={{ 
                  fontFamily: "Inter", 
                  lineHeight: "1.5em", 
                  letterSpacing: "0.5%",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                Confirm
              </Button>

              {/* Back Link */}
              <Link href="/login" className="w-full max-w-[355px]">
                <Input
                  type="button"
                  value="Back"
                  className="w-full border border-[#3B0764] shadow-sm rounded-lg px-3 py-[7.5px] text-center text-sm text-[#737373] cursor-pointer hover:bg-slate-50"
                  style={{ 
                    fontFamily: "Inter", 
                    lineHeight: "1.5em", 
                    letterSpacing: "0.5%",
                    justifyContent: "center"
                  }}
                />
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column - Illustration */}
        <div className="hidden lg:flex items-center justify-center bg-white p-4 lg:p-8">
          <div className="w-full max-w-[723px] aspect-[723/680] relative">
            <Image
              src="/register-illustration.png"
              alt="Travel Illustration"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </main>
    </div>
  );
}

