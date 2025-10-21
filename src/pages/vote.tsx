
import { useState, useEffect } from 'react';
import { Search, ArrowUpDown, Eye, EyeOff } from 'lucide-react';

interface Vote {
    id: string;
    voterNIC: string;
    timestamp: string;
    cipherText: string;
    plainText: string;
    candidateId: string;
}

export default function Vote() {
    const [votes, setVotes] = useState<Vote[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortField, setSortField] = useState<keyof Vote>('timestamp');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
    const [showPlainText, setShowPlainText] = useState<{ [key: string]: boolean }>({});

        // Load dummy data
    useEffect(() => {
            // Simulate loading delay
            setTimeout(() => {
                const dummyVotes = [
                    {
                        id: '1',
                        voterNIC: '199912345678',
                        timestamp: '2025-10-21T10:30:00Z',
                        cipherText: 'AES256-CBC:Xj9K2mP8vL4nR7tY3wQ1aZ5dC6bN9mH',
                        plainText: 'Candidate A',
                        candidateId: 'CAND001'
                    },
                    {
                        id: '2',
                        voterNIC: '199887654321',
                        timestamp: '2025-10-21T10:35:00Z',
                        cipherText: 'AES256-CBC:Ht6M4kL9wS2xF8vB5nC7jR3yU1pQ4dE',
                        plainText: 'Candidate B',
                        candidateId: 'CAND002'
                    },
                    {
                        id: '3',
                        voterNIC: '200012345678',
                        timestamp: '2025-10-21T10:40:00Z',
                        cipherText: 'AES256-CBC:Zx8V2mN4bK7hG9fT5wQ3jL6sP1yR4cA',
                        plainText: 'Candidate C',
                        candidateId: 'CAND003'
                    },
                    {
                        id: '4',
                        voterNIC: '200087654321',
                        timestamp: '2025-10-21T10:45:00Z',
                        cipherText: 'AES256-CBC:Qw3E5tY7uI9oP2lK4jH6gF8dS1aM5nB',
                        plainText: 'Candidate A',
                        candidateId: 'CAND001'
                    },
                    {
                        id: '5',
                        voterNIC: '199912398765',
                        timestamp: '2025-10-21T10:50:00Z',
                        cipherText: 'AES256-CBC:Jk7L9mN4pH2tR5vX8cB6wS3yF1qA4dE',
                        plainText: 'Candidate B',
                        candidateId: 'CAND002'
                    },
                    {
                        id: '6',
                        voterNIC: '200112345678',
                        timestamp: '2025-10-21T10:55:00Z',
                        cipherText: 'AES256-CBC:Mv5K8nB3jH6tG9fL4wS2xP7yR1cQ4aZ',
                        plainText: 'Candidate C',
                        candidateId: 'CAND003'
                    },
                    {
                        id: '7',
                        voterNIC: '199976543210',
                        timestamp: '2025-10-21T11:00:00Z',
                        cipherText: 'AES256-CBC:Dt7Y4mK9pH2nR5vX8cB6wS3yF1qA4bE',
                        plainText: 'Candidate A',
                        candidateId: 'CAND001'
                    },
                    {
                        id: '8',
                        voterNIC: '200023456789',
                        timestamp: '2025-10-21T11:05:00Z',
                        cipherText: 'AES256-CBC:Wx6L9mN4pH2tR5vX8cB6wS3yF1qA4kE',
                        plainText: 'Candidate B',
                        candidateId: 'CAND002'
                    },
                    {
                        id: '9',
                        voterNIC: '199934567890',
                        timestamp: '2025-10-21T11:10:00Z',
                        cipherText: 'AES256-CBC:Uy7H4nB3jK6tG9fL4wS2xP7yR1cQ4mZ',
                        plainText: 'Candidate C',
                        candidateId: 'CAND003'
                    },
                    {
                        id: '10',
                        voterNIC: '200045678901',
                        timestamp: '2025-10-21T11:15:00Z',
                        cipherText: 'AES256-CBC:Nv5K8bT3jH6tG9fL4wS2xP7yR1cQ4pZ',
                        plainText: 'Candidate A',
                        candidateId: 'CAND001'
                    }
                ];
                setVotes(dummyVotes);
                setLoading(false);
            }, 1000); // 1 second loading delay to simulate API call
    }, []);

    // Toggle plain text visibility for a specific vote
    const togglePlainText = (voteId: string) => {
        setShowPlainText(prev => ({
            ...prev,
            [voteId]: !prev[voteId]
        }));
    };

    // Filter votes based on search term
    const filteredVotes = votes.filter(vote => 
        vote.voterNIC.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vote.candidateId.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort votes
    const sortedVotes = [...filteredVotes].sort((a, b) => {
        const aValue = a[sortField];
        const bValue = b[sortField];
        if (sortDirection === 'asc') {
            return aValue < bValue ? -1 : 1;
        } else {
            return aValue > bValue ? -1 : 1;
        }
    });

    // Handle sort click
    const handleSort = (field: keyof Vote) => {
        if (field === sortField) {
            setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    if (loading) return <div className="flex items-center justify-center h-screen">Loading votes data...</div>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Cast Votes</h1>
            
            {/* Search Bar */}
            <div className="mb-6">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search by NIC or Candidate ID..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
            </div>

            {/* Votes Table */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleSort('timestamp')}>
                                    <div className="flex items-center gap-2">
                                        Timestamp
                                        <ArrowUpDown className="h-4 w-4" />
                                    </div>
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleSort('voterNIC')}>
                                    <div className="flex items-center gap-2">
                                        Voter NIC
                                        <ArrowUpDown className="h-4 w-4" />
                                    </div>
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Cipher Text
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Plain Text
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleSort('candidateId')}>
                                    <div className="flex items-center gap-2">
                                        Candidate ID
                                        <ArrowUpDown className="h-4 w-4" />
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {sortedVotes.map((vote) => (
                                <tr key={vote.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {new Date(vote.timestamp).toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {vote.voterNIC}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                                        <div className="max-w-xs truncate">
                                            {vote.cipherText}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <div className="flex items-center gap-2">
                                            <span className={showPlainText[vote.id] ? 'text-gray-900' : 'text-gray-400'}>
                                                {showPlainText[vote.id] ? vote.plainText : '••••••••'}
                                            </span>
                                            <button
                                                onClick={() => togglePlainText(vote.id)}
                                                className="text-gray-400 hover:text-gray-600"
                                            >
                                                {showPlainText[vote.id] ? (
                                                    <EyeOff className="h-4 w-4" />
                                                ) : (
                                                    <Eye className="h-4 w-4" />
                                                )}
                                            </button>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {vote.candidateId}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Vote Count */}
            <div className="mt-4 text-sm text-gray-500">
                Total Votes: {votes.length}
            </div>
        </div>
    );
}