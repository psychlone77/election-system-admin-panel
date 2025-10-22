import { useEffect, useState } from "react";
import { Users, Search, XCircle } from "lucide-react";
import { fetchCandidates, deleteCandidate, type Candidate } from "../../services/candidateServices";

export default function CandidateManage() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedParty, setSelectedParty] = useState("All");
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

  // Fetch candidates from backend
  useEffect(() => {
    const loadCandidates = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchCandidates();
        setCandidates(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load candidates");
        console.error("Error loading candidates:", err);
      } finally {
        setLoading(false);
      }
    };

    loadCandidates();
  }, []);

  const filteredCandidates = candidates.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesParty = selectedParty === "All" || c.party === selectedParty;
    return matchesSearch && matchesParty;
  });

  const parties = ["All", ...new Set(candidates.map((c) => c.party))];

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this candidate?")) return;
    try {
      await deleteCandidate(id);
      setCandidates((prev) => prev.filter((c) => c.id !== id));
      setSelectedCandidate(null);
    } catch (err) {
      console.error("Error deleting candidate:", err);
      alert(err instanceof Error ? err.message : "Failed to delete candidate");
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Users className="text-indigo-600" /> Manage Candidates
        </h2>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {loading && (
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">Loading candidates...</p>
        </div>
      )}

      {!loading && !error && (
        <>
          {/* Search + Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative w-full md:w-1/2">
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              />
            </div>

            <select
              value={selectedParty}
              onChange={(e) => setSelectedParty(e.target.value)}
              className="w-full md:w-1/4 px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            >
              {parties.map((party) => (
                <option key={party} value={party}>
                  {party}
                </option>
              ))}
            </select>
          </div>

          {/* Candidate Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCandidates.length > 0 ? (
              filteredCandidates.map((c) => (
                <div
                  key={c.id}
                  onClick={() => setSelectedCandidate(c)}
                  className="cursor-pointer bg-white rounded-xl shadow-md hover:shadow-lg transition p-5 border border-gray-100"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-lg">
                      {c.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{c.name}</h3>
                      <p className="text-sm text-gray-500">{c.party}</p>
                    </div>
                  </div>

                  <div className="mt-4 text-sm text-gray-600">
                    <p>
                      <strong>ID:</strong> {c.id}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center col-span-full">No candidates found.</p>
            )}
          </div>
        </>
      )}

      {/* Candidate Detail Modal */}
      {selectedCandidate && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              onClick={() => setSelectedCandidate(null)}
            >
              <XCircle size={22} />
            </button>

            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-lg">
                {selectedCandidate.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">{selectedCandidate.name}</h3>
                <p className="text-sm text-gray-500">{selectedCandidate.party}</p>
              </div>
            </div>

            <div className="space-y-2 text-sm text-gray-700">
              <p>
                <strong>ID:</strong> {selectedCandidate.id}
              </p>
            </div>

            <div className="mt-6 border-t pt-4">
              <p className="text-sm font-semibold text-red-700 mb-2">Danger Zone</p>
              <button
                onClick={() => handleDelete(selectedCandidate.id)}
                className="w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-semibold"
              >
                Delete Candidate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
