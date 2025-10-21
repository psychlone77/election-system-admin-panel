
import { useState, useEffect } from 'react';
import { BarChart2, Award } from 'lucide-react';

interface Candidate {
    id: string;
    firstName: string;
    lastName: string;
    party: string;
    voteCount: number;
}

export default function Tally() {
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [totalVotes, setTotalVotes] = useState(0);

    // Dummy data for demonstration
    const dummyData: Candidate[] = [
        {
            id: "1",
            firstName: "Ranil",
            lastName: "Wickramasinghe",
            party: "UNP",
            voteCount: 5482
        },
        {
            id: "2",
            firstName: "Mahinda",
            lastName: "Rajapaksa",
            party: "SLPP",
            voteCount: 4925
        },
        {
            id: "3",
            firstName: "Anura",
            lastName: "Kumara",
            party: "JVP",
            voteCount: 3654
        },
        {
            id: "4",
            firstName: "Sajith",
            lastName: "Premadasa",
            party: "SJB",
            voteCount: 4125
        },
        {
            id: "5",
            firstName: "Champika",
            lastName: "Ranawaka",
            party: "NPP",
            voteCount: 2841
        }
    ];

    useEffect(() => {
        // Simulate API loading time
        const timer = setTimeout(() => {
            setCandidates(dummyData);
            const total = dummyData.reduce((sum, candidate) => sum + candidate.voteCount, 0);
            setTotalVotes(total);
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    // Sort candidates by vote count
    const sortedCandidates = [...candidates].sort((a, b) => b.voteCount - a.voteCount);
    const winner = sortedCandidates[0];

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
                <BarChart2 size={32} className="text-indigo-600" />
                <h1 className="text-3xl font-bold text-gray-800">Election Results</h1>
            </div>

            {isLoading ? (
                <div className="text-center py-8">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-600 border-t-transparent"></div>
                    <p className="mt-2 text-gray-600">Loading results...</p>
                </div>
            ) : (
                <>
                    {/* Winner Card */}
                    {winner && (
                        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-lg p-6 mb-8 text-white">
                            <div className="flex items-center gap-4">
                                <Award size={48} className="text-yellow-300" />
                                <div>
                                    <h2 className="text-2xl font-bold mb-1">Leading Candidate</h2>
                                    <p className="text-xl">
                                        {winner.firstName} {winner.lastName} - {winner.party}
                                    </p>
                                    <p className="text-lg mt-2">
                                        {winner.voteCount} votes ({((winner.voteCount / totalVotes) * 100).toFixed(1)}%)
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Results Table */}
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Candidate</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Party</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Votes</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Percentage</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {sortedCandidates.map((candidate, index) => (
                                        <tr key={candidate.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">#{index + 1}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {candidate.firstName} {candidate.lastName}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{candidate.party}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{candidate.voteCount}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="relative w-48 h-4 bg-gray-200 rounded-full overflow-hidden">
                                                        <div 
                                                            className="absolute top-0 left-0 h-full bg-indigo-600"
                                                            style={{ width: `${(candidate.voteCount / totalVotes) * 100}%` }}
                                                        ></div>
                                                    </div>
                                                    <span className="ml-2 text-sm text-gray-600">
                                                        {((candidate.voteCount / totalVotes) * 100).toFixed(1)}%
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Total Votes Counter */}
                    <div className="mt-6 text-center">
                        <p className="text-gray-600">Total Votes Cast</p>
                        <p className="text-3xl font-bold text-gray-800">{totalVotes}</p>
                    </div>
                </>
            )}
        </div>
    );
}
