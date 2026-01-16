import { Member } from '../../types';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

interface PreferenceChartProps {
    members: Member[];
}

export function PreferenceChart({ members }: PreferenceChartProps) {
    // Calculate interest distribution
    const interestCounts: { [key: string]: number } = {};
    members.forEach((member) => {
        member.interests.forEach((interest) => {
            interestCounts[interest] = (interestCounts[interest] || 0) + 1;
        });
    });

    const pieData = Object.entries(interestCounts).map(([name, value]) => ({
        name,
        value,
    }));

    // Calculate season preferences
    const seasonCounts: { [key: string]: number } = {};
    members.forEach((member) => {
        member.seasons.forEach((season) => {
            seasonCounts[season] = (seasonCounts[season] || 0) + 1;
        });
    });

    const radarData = Object.entries(seasonCounts).map(([season, count]) => ({
        season,
        count,
    }));

    const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#06b6d4', '#ef4444', '#6366f1'];

    return (
        <div className="bg-white rounded-xl border-1 border-purple-500 p-6">
            <h2 className="text-xl font-semibold mb-6">Group Preferences Overview</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Interest Distribution */}
                <div className="px-8 py-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-4 text-center">
                        Interest Distribution
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={(props: { name?: string; percent?: number }) =>
                                    `${props.name ?? ''} ${((props.percent ?? 0) * 100).toFixed(0)}%`
                                }
                                outerRadius={70}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Season Preferences */}
                <div className="px-8 py-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-4 text-center">
                        Season Preferences
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <RadarChart data={radarData}>
                            <PolarGrid />
                            <PolarAngleAxis dataKey="season" />
                            <Radar
                                name="Preferences"
                                dataKey="count"
                                stroke="#8b5cf6"
                                fill="#8b5cf6"
                                fillOpacity={0.6}
                            />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}