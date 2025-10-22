import { Vote, BarChart3, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
            {/* Navigation */}
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex items-center">
                            <Vote className="h-8 w-8 text-indigo-600" />
                            <span className="ml-2 text-xl font-bold text-gray-800">Election System</span>
                        </div>
                        <button
                            onClick={() => navigate('/login')}
                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <LogIn className="h-4 w-4 mr-2" />
                            Login
                        </button>  
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center">
                    <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                        <span className="block">Welcome to the</span>
                        <span className="block text-indigo-600">Election Administration System</span>
                    </h1>
                    <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                        Manage elections efficiently and securely. Monitor voting progress, handle voter registration, and maintain election integrity.
                    </p>
                </div>

                {/* Features Section */}
                <div className="mt-20"></div>

                {/* Results Section */}
                <div className="mt-32 bg-indigo-50 rounded-xl p-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-gray-900">Election Results</h2>
                        <p className="mt-4 text-lg text-gray-600">
                            View the latest election results and statistics in real-time.
                        </p>
                        <button
                            onClick={() => navigate('/publictally')}
                            className="mt-6 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <BarChart3 className="h-5 w-5 mr-2" />
                            View Election Results
                        </button>
                    </div>
                </div>

                {/* vote Section */}
                <div className="mt-20 bg-emerald-50 rounded-xl p-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-gray-900">Cast Votes</h2>
                        <p className="mt-4 text-lg text-gray-600">
                            View all the cast votes.
                        </p>
                        <button
                            onClick={() => navigate('/vote')}
                            className="mt-6 inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                        >
                            <Vote className="h-5 w-5 mr-2" />
                            View Votes
                        </button>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="mt-20 text-center">
                    <button
                        onClick={() => navigate('/login')}
                        className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        <LogIn className="h-5 w-5 mr-2" />
                        Access Admin Panel
                    </button>
                    <p className="mt-4 text-sm text-gray-500">
                        Authorized personnel only. Please login to access the administration system.
                    </p>
                </div>
            </div>
        </div>
    );
}
