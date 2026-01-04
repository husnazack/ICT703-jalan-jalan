"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navigation } from "@/components/shared/navigation";
import { GroupLabel } from "@/components/shared/group-label";
import { Camera, Image, Plus, Search, X } from "lucide-react";

export default function CreateStoryPage() {
  const [tags, setTags] = useState([
    "#Muslimfriendly",
    "#staycation",
    "#localfood",
  ]);
  const [newTag, setNewTag] = useState("");
  const [agreed, setAgreed] = useState(false);

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const addTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag.startsWith("#") ? newTag : `#${newTag}`]);
      setNewTag("");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <GroupLabel group={4} />

      {/* Main Content */}
      <main className="px-4 sm:px-6 md:px-12 lg:px-16 xl:px-[90px] py-8">
        {/* Page Title */}
        <h1 className="text-xl md:text-2xl lg:text-[30px] font-semibold tracking-tight text-slate-700 mb-8">
          Create a Community Story
        </h1>

        {/* Upload Photo Section */}
        <div className="mb-8 flex justify-center">
          <div className="w-40 h-40 md:w-52 md:h-48 lg:w-[222px] lg:h-[207px] relative opacity-40">
            <Camera className="w-[77px] h-[70px] text-slate-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Add a title */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-slate-700 px-6 py-2">
            Add a title
          </h2>
          <div className="mt-2">
            <Input
              placeholder="Write your interesting title"
              className="border-purple-900 shadow-sm"
            />
          </div>
        </div>

        {/* Add Location */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-slate-700 px-6 py-2">
            Add Location
          </h2>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 mt-2">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
                <Input
                  placeholder="Search location"
                  className="pl-10 border-purple-900 shadow-sm"
                />
              </div>
            </div>
            <Button className="bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 text-slate-50 text-sm font-semibold">
              Search
            </Button>
          </div>
        </div>

        {/* Tell us about your trip */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-slate-700 px-6 py-2">
            Tell us about your trip
          </h2>
          <div className="mt-2 border border-purple-900 rounded-[15px] p-6 min-h-48 md:min-h-64 lg:min-h-[382px]">
            <p className="text-sm text-slate-500">
              Share about your trip with maximum 100 words
            </p>
          </div>
        </div>

        {/* Share Image Section */}
        <div className="mb-6 px-6">
          <h2 className="text-xl font-semibold text-slate-700">Share Image</h2>
          <p className="text-sm text-slate-500 mt-1">
            Upload and share your amazing travel photo
          </p>
          <div className="mt-4 w-40 h-40 md:w-52 md:h-48 lg:w-[222px] lg:h-[207px] border border-dashed border-black rounded flex items-center justify-center">
            <Image className="w-[101px] h-[101px] text-slate-300" />
          </div>
        </div>

        {/* Create Tags */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-slate-700 px-6 py-2">
            Create Tags
          </h2>
          <div className="flex flex-col gap-7 mt-2">
            {/* Tag input */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
              <Plus className="w-6 h-6 text-slate-600 hidden sm:block" />
              <div className="flex-1 sm:max-w-[536px]">
                <div className="relative">
                  <Input
                    placeholder="Create Tags"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    className="border-purple-900 shadow-sm"
                  />
                </div>
              </div>
              <Button
                onClick={addTag}
                className="bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 text-slate-50 text-sm font-semibold"
              >
                Create
              </Button>
            </div>

            {/* Tag badges */}
            <div className="flex items-center gap-2">
              {tags.map((tag) => (
                <div
                  key={tag}
                  className="flex items-center gap-2 px-2 py-[3px] text-xs font-semibold text-slate-700 border border-purple-900 rounded-lg bg-white/10"
                >
                  <span>{tag}</span>
                  <button
                    onClick={() => removeTag(tag)}
                    className="hover:text-red-500"
                  >
                    <X className="w-[18px] h-[18px]" />
                  </button>
                </div>
              ))}
            </div>

            {/* Confirmation checkbox and Submit */}
            <div className="flex flex-col gap-7">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="confirm"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="w-[14px] h-[14px] border border-black/40 rounded"
                />
                <label htmlFor="confirm" className="text-sm text-slate-500">
                  I confirm that all photos and videos I have uploaded are my
                  own, and I agree to be bound by JalanJalan's
                </label>
              </div>

              <Button
                disabled={!agreed}
                className="w-full sm:w-auto sm:min-w-[308px] h-[51px] bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 text-slate-50 text-sm font-semibold disabled:opacity-50"
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

