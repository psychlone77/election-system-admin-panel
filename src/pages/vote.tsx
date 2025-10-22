import { useState, useEffect } from "react";
import { Search, ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { fetchBallots, type PublicBallot } from "../services/ballotServices";

export default function Ballots() {
  const [allBallots, setAllBallots] = useState<PublicBallot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams] = useSearchParams();
  const [sortField, setSortField] = useState<"created_at" | "public_ballot_id">("created_at");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  // Load ballots from backend (MVP - all at once)
  useEffect(() => {
    const loadBallots = async () => {
      setLoading(true);
      setError(null);
      try {
        // Check for ballot_id search parameter
        const ballotIdParam = searchParams.get("ballot_id");
        const searchQuery = ballotIdParam || searchTerm;

        const ballots = await fetchBallots(searchQuery);
        setAllBallots(ballots);
        setCurrentPage(1); // Reset to first page on search
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load ballots");
        console.error("Error loading ballots:", err);
      } finally {
        setLoading(false);
      }
    };

    loadBallots();
  }, [searchTerm, searchParams]);

  // Handle sort click
  const handleSort = (field: "created_at" | "public_ballot_id") => {
    if (field === sortField) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Sort ballots
  const sortedBallots = [...allBallots].sort((a, b) => {
    let aValue: string | number;
    let bValue: string | number;
    if (sortField === "created_at") {
      aValue = new Date(a.created_at).getTime();
      bValue = new Date(b.created_at).getTime();
    } else {
      aValue = a.public_ballot_id;
      bValue = b.public_ballot_id;
    }

    if (sortDirection === "asc") {
      return aValue < bValue ? -1 : 1;
    } else {
      return aValue > bValue ? -1 : 1;
    }
  });

  // Frontend pagination
  const totalPages = Math.ceil(sortedBallots.length / pageSize);
  const paginatedBallots = sortedBallots.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-gray-500">Loading ballots data...</p>
        </div>
      </div>
    );

  return (
    <div className="p-4 md:p-6 min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Ballots</h1>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by Ballot ID..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Ballots Table - Responsive */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort("public_ballot_id")}
                  >
                    <div className="flex items-center gap-2">
                      <span>Ballot ID</span>
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </th>
                  <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hashed Ballot
                  </th>
                  <th
                    className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort("created_at")}
                  >
                    <div className="flex items-center gap-2">
                      <span className="hidden sm:inline">Created At</span>
                      <span className="sm:hidden">Date</span>
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedBallots.length > 0 ? (
                  paginatedBallots.map((ballot) => (
                    <tr key={ballot.public_ballot_id} className="hover:bg-gray-50">
                      <td className="px-4 md:px-6 py-4 text-sm text-gray-900 font-mono break-all">
                        {ballot.public_ballot_id}
                      </td>
                      <td className="px-4 md:px-6 py-4 text-sm text-gray-500 font-mono">
                        <div className="max-w-xs truncate" title={ballot.hashed_ballot}>
                          {ballot.hashed_ballot}
                        </div>
                      </td>
                      <td className="px-4 md:px-6 py-4 text-sm text-gray-900">
                        {new Date(ballot.created_at).toLocaleString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="px-4 md:px-6 py-8 text-center text-sm text-gray-500">
                      No ballots found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-500">Total Ballots: {allBallots.length}</div>
          <div className="flex gap-2 items-center">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <span className="text-sm text-gray-700 px-4">
              Page {currentPage} of {totalPages || 1}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
