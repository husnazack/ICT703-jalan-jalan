// ── Types ──

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
}

export interface PrivacySettings {
  dataSharing: boolean;
  analytics: boolean;
  locationTracking: boolean;
  profileVisibility: boolean;
}

export interface Expense {
  id: number;
  category: string;
  description: string;
  amount: number;
  date: string;
}

export interface TripReflection {
  [tripId: number]: { tags: string[]; note: string };
}

export interface UpcomingTrip {
  id: number;
  destination: string;
  country: string;
  dates: string;
  budget: number;
  status: string;
  image: string;
}

// ── Storage Keys ──

export const STORAGE_KEYS = {
  profile: "jj-user-profile",
  privacy: "jj-privacy-settings",
  expenses: "jj-expenses",
  reflections: "jj-reflections",
  upcomingTrips: "jj-upcoming-trips",
} as const;

// ── Defaults ──

export const DEFAULT_PROFILE: UserProfile = {
  name: "Travel Explorer",
  email: "explorer@email.com",
  avatar: "👤",
};

export const DEFAULT_PRIVACY: PrivacySettings = {
  dataSharing: false,
  analytics: true,
  locationTracking: true,
  profileVisibility: false,
};

export const DEFAULT_EXPENSES: Expense[] = [
  { id: 1, category: "food", description: "Chicken rice ball lunch", amount: 25, date: "Jun 8" },
  { id: 2, category: "transport", description: "Grab to Jonker Street", amount: 15, date: "Jun 8" },
  { id: 3, category: "activities", description: "A Famosa entrance", amount: 30, date: "Jun 9" },
  { id: 4, category: "food", description: "Nyonya dinner", amount: 65, date: "Jun 9" },
  { id: 5, category: "accommodation", description: "Hotel 2 nights", amount: 240, date: "Jun 8" },
  { id: 6, category: "shopping", description: "Souvenirs at Jonker", amount: 15, date: "Jun 10" },
];

export const DEFAULT_REFLECTIONS: TripReflection = {};

export const DEFAULT_UPCOMING_TRIPS: UpcomingTrip[] = [
  {
    id: 1,
    destination: "Langkawi",
    country: "Malaysia",
    dates: "Jan 5 - Jan 8",
    budget: 1800,
    status: "confirmed",
    image: "🏝️",
  },
  {
    id: 2,
    destination: "Cameron Highlands",
    country: "Malaysia",
    dates: "Mar 1 - Mar 3",
    budget: 800,
    status: "confirmed",
    image: "🌿",
  },
  {
    id: 3,
    destination: "Penang",
    country: "Malaysia",
    dates: "Apr 10 - Apr 13",
    budget: 1200,
    status: "planning",
    image: "🍜",
  },
];

// ── Avatar Options ──

export const AVATAR_OPTIONS = [
  "👤", "🧳", "✈️", "🌍", "🗺️", "🏝️",
  "🌸", "🦋", "🐱", "🐻", "🦊", "🐼",
  "🌈", "⭐", "🎒", "🚀", "🎯", "💎",
];
