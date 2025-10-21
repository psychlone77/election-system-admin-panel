import React, { useEffect, useState } from "react";
import { LayoutDashboard, Users, UserPlus, AlertTriangle, Loader2 } from "lucide-react";

interface Voter {
    firstName: string;
    lastName: string;
    NIC: string;
    disabled: boolean;
}

interface Candidate {
    firstName: string;
    lastName: string;
    party: string;
}

export default function Dashboard() {
    const [eligibleVoters, setEligibleVoters] = useState<Voter[]>([]);
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const [votersResponse, candidatesResponse] = await Promise.all([
                fetch('http://localhost:3001/eligible-voters'),
                fetch('http://localhost:3001/candidates')
            ]);

            if (!votersResponse.ok || !candidatesResponse.ok) {
                throw new Error('Failed to fetch data');
            }

            const votersData = await votersResponse.json();
            const candidatesData = await candidatesResponse.json();

            setEligibleVoters(votersData);
            setCandidates(candidatesData);
            setError(null);
        } catch (err) {
            setError('Failed to load dashboard data');
            console.error('Error fetching dashboard data:', err);
        } finally {
            setIsLoading(false);
        }
    };

    // Calculate statistics
    const totalVoters = eligibleVoters.length;
    const activeVoters = eligibleVoters.filter(voter => !voter.disabled).length;
    const disabledVoters = eligibleVoters.filter(voter => voter.disabled).length;
    const totalCandidates = candidates.length;

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
                <LayoutDashboard size={32} className="text-indigo-600" />
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
                    <p className="text-gray-600 mt-1">Overview of the election system</p>
                </div>
            </div>

            {isLoading ? (
                <div className="text-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-indigo-600 mx-auto" />
                    <p className="mt-2 text-gray-600">Loading dashboard data...</p>
                </div>
            ) : error ? (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <div className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5" />
                        <p>{error}</p>
                    </div>
                </div>
            ) : (
                <>
                    {/* Statistics Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <DashboardCard
                            title="Total Voters"
                            value={totalVoters}
                            icon={<Users className="h-6 w-6 text-blue-600" />}
                            color="blue"
                        />
                        <DashboardCard
                            title="Active Voters"
                            value={activeVoters}
                            icon={<Users className="h-6 w-6 text-green-600" />}
                            color="green"
                        />
                        <DashboardCard
                            title="Disabled Voters"
                            value={disabledVoters}
                            icon={<Users className="h-6 w-6 text-red-600" />}
                            color="red"
                        />
                        <DashboardCard
                            title="Total Candidates"
                            value={totalCandidates}
                            icon={<UserPlus className="h-6 w-6 text-purple-600" />}
                            color="purple"
                        />
                    </div>

                    {/* Additional Statistics */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Voter Statistics</h2>
                        <div className="relative pt-1">
                            <div className="flex items-center justify-between mb-2">
                                <div>
                                    <span className="text-xs font-semibold inline-block text-blue-600">
                                        Active Voters
                                    </span>
                                </div>
                                <div className="text-right">
                                    <span className="text-xs font-semibold inline-block text-blue-600">
                                        {((activeVoters / totalVoters) * 100).toFixed(1)}%
                                    </span>
                                </div>
                            </div>
                            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                                <div
                                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"
                                    style={{ width: `${(activeVoters / totalVoters) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

interface DashboardCardProps {
    title: string;
    value: number;
    icon: React.ReactNode;
    color: 'blue' | 'green' | 'red' | 'purple';
}

function DashboardCard({ title, value, icon, color }: DashboardCardProps) {
    const colorClasses = {
        blue: 'bg-blue-50',
        green: 'bg-green-50',
        red: 'bg-red-50',
        purple: 'bg-purple-50'
    };

    return (
        <div className={`${colorClasses[color]} p-6 rounded-lg shadow-sm`}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-600">{title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                        {value.toLocaleString()}
                    </p>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm">
                    {icon}
                </div>
            </div>
        </div>
    );
}
