export interface Member {
    id: string;
    name: string;
    budgetMin: number;
    budgetMax: number;
    seasons: string[];
    interests: string[];
    crowdPreference: 'avoid' | 'okay' | 'no-preference';
    avatar?: string;
}

export interface Destination {
    id: string;
    name: string;
    cost: number;
    season: string;
    category: string[];
    description: string;
    duration: number; // Number of days for this destination
    image?: string;
}

export interface Conflict {
    memberId: string;
    memberName: string;
    type: 'budget' | 'interest' | 'season';
    message: string;
    severity: 'high' | 'medium' | 'low';
}