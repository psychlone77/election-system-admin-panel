
import { Users } from "lucide-react";
import { useEffect, useState } from "react";

interface Voter {
    firstName: string;
    lastName: string;
    age: number;
    registration_code: string;
    NIC: string;
    disabled: boolean;
}

export default function VoterManage() {
    const [voters, setVoters] = useState<Voter[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchVoters = async () => {
            try {
                const response = await fetch('http://localhost:3001/eligible-voters');
                if (!response.ok) {
                    throw new Error('Failed to fetch voters');
                }
                const data = await response.json();
                setVoters(data);
                setError(null);
            } catch (err) {
                setError('Failed to load voters data');
                console.error('Error fetching voters:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchVoters();
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center gap-3 mb-6">
                <Users size={28} className="text-indigo-600" />
                <h1 className="text-2xl font-bold text-gray-800">Voter Management</h1>
            </div>
            {isLoading ? (
                <div className="text-center py-8">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-600 border-t-transparent"></div>
                    <p className="mt-2 text-gray-600">Loading voters...</p>
                </div>
            ) : error ? (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <p className="font-medium">Error:</p>
                    <p>{error}</p>
                </div>
            ) : voters.length === 0 ? (
                <div className="bg-gray-50 text-gray-600 px-4 py-8 text-center rounded">
                    <p>No voters found.</p>
                </div>
            ) : (
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registration Code</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NIC</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {voters.map((voter, index) => (
                                <tr key={voter.NIC} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">
                                            {voter.firstName} {voter.lastName}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{voter.age}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{voter.registration_code}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{voter.NIC}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                            voter.disabled 
                                            ? 'bg-red-100 text-red-800' 
                                            : 'bg-green-100 text-green-800'
                                        }`}>
                                            {voter.disabled ? 'Disabled' : 'Active'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            )}
        </div>
    );
}