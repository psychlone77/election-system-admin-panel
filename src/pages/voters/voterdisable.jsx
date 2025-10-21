import React, { useState } from "react";
import { UserX, AlertCircle, CheckCircle2 } from "lucide-react";

export default function VoterDisable() {
    const [NIC, setNIC] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);
        setIsLoading(true);

        try {
            const response = await fetch(`http://localhost:3001/disable-voter`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    NIC: NIC
                })
            });

            if (!response.ok) {
                throw new Error('Failed to disable voter');
            }

            setMessage({
                type: 'success',
                text: 'Voter has been disabled successfully'
            });

            // Clear form
            setNIC('');

            // Clear message after 3 seconds
            setTimeout(() => setMessage(null), 3000);

        } catch (err) {
            setMessage({
                type: 'error',
                text: err.message || 'Failed to disable voter'
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <UserX size={28} className="text-indigo-600" />
                <h1 className="text-2xl font-bold text-gray-800">Voter Disable Management</h1>
            </div>

            {/* NIC Input Form */}
            <div className="max-w-xl mx-auto">
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
                    <div className="mb-6">
                        <label htmlFor="nic" className="block text-sm font-medium text-gray-700 mb-1">
                            NIC Number
                        </label>
                        <input
                            id="nic"
                            type="text"
                            value={NIC}
                            onChange={(e) => setNIC(e.target.value)}
                            placeholder="Enter NIC number"
                            className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                            required
                            pattern="\d{9}[Vv]|\d{12}"
                            title="Please enter a valid NIC number (9 digits + V/v or 12 digits)"
                        />
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 flex items-center gap-2"
                        >
                            <UserX size={18} />
                            {isLoading ? 'Disabling...' : 'Disable Voter'}
                        </button>
                    </div>
                </form>

                {/* Status Messages */}
                {message && (
                    <div className={`mt-4 p-4 rounded-lg ${
                        message.type === 'success' 
                            ? 'bg-green-50 text-green-700 border border-green-200' 
                            : 'bg-red-50 text-red-700 border border-red-200'
                        }`}>
                        <div className="flex items-center gap-2">
                            {message.type === 'success' ? 
                                <CheckCircle2 className="h-5 w-5" /> : 
                                <AlertCircle className="h-5 w-5" />
                            }
                            {message.text}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
