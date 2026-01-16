import { Member, Destination } from '../types';

export const initialMembers: Member[] = [
    {
        id: '1',
        name: 'Nurul Aisyah',
        budgetMin: 1000,
        budgetMax: 2000,
        seasons: ['Raya', 'CNY'],
        interests: ['Beach', 'Culture', 'Food'],
        crowdPreference: 'avoid',
        avatar: 'https://images.unsplash.com/photo-1495846169286-978b877c3062?...',
    },
    {
        id: '2',
        name: 'Wong Wei Ming',
        budgetMin: 1500,
        budgetMax: 3000,
        seasons: ['Merdeka', 'Deepavali'],
        interests: ['Adventure', 'Nature', 'Photography'],
        crowdPreference: 'avoid',
        avatar: 'https://images.unsplash.com/photo-1695800998493-ccff5ea292ea?...',
    },
    {
        id: '3',
        name: 'Priya Devi',
        budgetMin: 800,
        budgetMax: 1500,
        seasons: ['CNY', 'Raya'],
        interests: ['Culture', 'Shopping', 'Food'],
        crowdPreference: 'okay',
        avatar: 'https://images.unsplash.com/photo-1669659033487-203d254e35a4?...',
    },
    {
        id: '4',
        name: 'Ahmad Zaki',
        budgetMin: 2000,
        budgetMax: 4000,
        seasons: ['Merdeka', 'Raya'],
        interests: ['Adventure', 'Beach', 'Nightlife'],
        crowdPreference: 'no-preference',
        avatar: 'https://images.unsplash.com/photo-1762709412730-321a0d81b517?...',
    },
];

export const initialDestinations: Destination[] = [
    {
        id: 'd1',
        name: 'Melaka Historic City',
        cost: 800,
        duration: 3,
        season: 'Raya',
        category: ['Culture', 'Food', 'Shopping'],
        description: 'UNESCO World Heritage Site with rich history...',
    },
    {
        id: 'd2',
        name: 'Jonker Street & Chinatown',
        cost: 600,
        duration: 2,
        season: 'CNY',
        category: ['Culture', 'Food', 'Shopping'],
        description: 'Vibrant night market...',
    },
    {
        id: 'd3',
        name: "A Famosa & St. Paul's Hill",
        cost: 500,
        duration: 2,
        season: 'Raya',
        category: ['Culture', 'Photography', 'Nature'],
        description: 'Historic Portuguese fortress...',
    },
    {
        id: 'd4',
        name: 'Melaka River Cruise',
        cost: 700,
        duration: 2,
        season: 'Raya',
        category: ['Nature', 'Photography', 'Culture'],
        description: 'Scenic river cruise...',
    },
];

export const allInterests = [
    'Beach',
    'Culture',
    'Food',
    'Adventure',
    'Nature',
    'Photography',
    'Shopping',
    'Nightlife',
];

export const allSeasons = ['CNY', 'Raya', 'Deepavali', 'Merdeka'];
