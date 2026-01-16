import { useState } from 'react';
import { Member } from '../../types';
import { Edit2, Save, X, DollarSign, Calendar, Heart, Users2 } from 'lucide-react';
import { allInterests, allSeasons } from '../../data/seed';

interface MemberCardProps {
    member: Member;
    onUpdate: (updatedMember: Member) => void;
}

export function MemberCard({ member, onUpdate }: MemberCardProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedMember, setEditedMember] = useState(member);

    const handleSave = () => {
        onUpdate(editedMember);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditedMember(member);
        setIsEditing(false);
    };

    const toggleInterest = (interest: string) => {
        setEditedMember((prev) => ({
            ...prev,
            interests: prev.interests.includes(interest)
                ? prev.interests.filter((i) => i !== interest)
                : [...prev.interests, interest],
        }));
    };

    const toggleSeason = (season: string) => {
        setEditedMember((prev) => ({
            ...prev,
            seasons: prev.seasons.includes(season)
                ? prev.seasons.filter((s) => s !== season)
                : [...prev.seasons, season],
        }));
    };

    return (
        <div className="bg-white rounded-xl border-1 border-purple-500 p-6">
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                    {member.avatar ? (
                        <img
                            src={member.avatar}
                            alt={member.name}
                            className="w-12 h-12 rounded-full object-cover"
                        />
                    ) : (
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold text-lg">
                            {member.name.split(' ').map((n) => n[0]).join('')}
                        </div>
                    )}
                    <div>
                        <h3 className="font-semibold text-lg">{member.name}</h3>
                        <p className="text-sm text-gray-500">Group Member</p>
                    </div>
                </div>

                {!isEditing ? (
                    <button
                        onClick={() => setIsEditing(true)}
                        aria-label="Edit member"
                        title="Edit member"
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <Edit2 className="w-4 h-4 text-gray-600" />
                    </button>

                ) : (
                    <div className="flex gap-2">
                        <button
                            onClick={handleSave}
                            aria-label="Save changes"
                            title="Save changes"
                            className="p-2 hover:bg-green-100 rounded-lg transition-colors"
                        >
                            <Save className="w-4 h-4 text-green-600" />
                        </button>

                        <button
                            onClick={handleCancel}
                            aria-label="Cancel editing"
                            title="Cancel editing"
                            className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                        >
                            <X className="w-4 h-4 text-red-600" />
                        </button>
                    </div>
                )}
            </div>

            <div className="space-y-4">
                {/* Budget */}
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="w-4 h-4 text-gray-600" />
                        <label className="text-sm font-medium text-gray-700">Budget Range</label>
                    </div>
                    {isEditing ? (
                        <div className="flex gap-2 items-center">
                            <input
                                type="number"
                                value={editedMember.budgetMin}
                                onChange={(e) =>
                                    setEditedMember((prev) => ({
                                        ...prev,
                                        budgetMin: parseInt(e.target.value) || 0,
                                    }))
                                }
                                className="flex-1 px-3 py-2 border rounded-lg"
                                placeholder="Min"
                            />
                            <span className="text-gray-500">-</span>
                            <input
                                type="number"
                                value={editedMember.budgetMax}
                                onChange={(e) =>
                                    setEditedMember((prev) => ({
                                        ...prev,
                                        budgetMax: parseInt(e.target.value) || 0,
                                    }))
                                }
                                className="flex-1 px-3 py-2 border rounded-lg"
                                placeholder="Max"
                            />
                        </div>
                    ) : (
                        <p className="text-gray-900 font-medium">
                            RM{member.budgetMin.toLocaleString()} - RM{member.budgetMax.toLocaleString()}
                        </p>
                    )}
                </div>

                {/* Seasons */}
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-4 h-4 text-gray-600" />
                        <label className="text-sm font-medium text-gray-700">Preferred Seasons</label>
                    </div>
                    {isEditing ? (
                        <div className="flex flex-wrap gap-2">
                            {allSeasons.map((season) => (
                                <button
                                    key={season}
                                    onClick={() => toggleSeason(season)}
                                    className={`px-3 py-1 rounded-full text-sm transition-colors ${editedMember.seasons.includes(season)
                                        ? 'bg-purple-500 text-white'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                        }`}
                                >
                                    {season}
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-wrap gap-2">
                            {member.seasons.map((season) => (
                                <span
                                    key={season}
                                    className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                                >
                                    {season}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* Interests */}
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Heart className="w-4 h-4 text-gray-600" />
                        <label className="text-sm font-medium text-gray-700">Interests</label>
                    </div>
                    {isEditing ? (
                        <div className="flex flex-wrap gap-2">
                            {allInterests.map((interest) => (
                                <button
                                    key={interest}
                                    onClick={() => toggleInterest(interest)}
                                    className={`px-3 py-1 rounded-full text-sm transition-colors ${editedMember.interests.includes(interest)
                                        ? 'bg-purple-500 text-white'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                        }`}
                                >
                                    {interest}
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-wrap gap-2">
                            {member.interests.map((interest) => (
                                <span
                                    key={interest}
                                    className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                                >
                                    {interest}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* Crowd Preference */}
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Users2 className="w-4 h-4 text-gray-600" />
                        <label className="text-sm font-medium text-gray-700">Crowd Preference</label>
                    </div>
                    {isEditing ? (
                        <div className="flex flex-wrap gap-2">
                            {(['avoid', 'okay', 'no-preference'] as const).map((pref) => (
                                <button
                                    key={pref}
                                    onClick={() => setEditedMember((prev) => ({ ...prev, crowdPreference: pref }))}
                                    className={`px-3 py-1 rounded-full text-sm transition-colors ${editedMember.crowdPreference === pref
                                        ? 'bg-pink-500 text-white'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                        }`}
                                >
                                    {pref === 'avoid' ? 'Avoid Crowds' : pref === 'okay' ? 'Okay with Crowds' : 'No Preference'}
                                </button>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-900 font-medium">
                            {member.crowdPreference === 'avoid'
                                ? 'Avoid Crowds'
                                : member.crowdPreference === 'okay'
                                    ? 'Okay with Crowds'
                                    : 'No Preference'}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}