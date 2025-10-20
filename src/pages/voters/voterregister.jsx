import React, { useState } from "react";
import { UserPlus, Loader2 } from "lucide-react";


export default function VoterRegister() {
  const [formData, setFormData] = useState({
    name: "",
    party: "", 
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
  e.preventDefault();
  setMessage(null);
  setError(null);

  try {
    setLoading(true);
    const candidateData = {
      id: crypto.randomUUID(), // unique id
      name: formData.name,
      party: formData.party,
    };
    const response = await fetch("http://localhost:3001/post_candidates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(candidateData),
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const result = await response.json();
    console.log("Server response:", result);

    setMessage("✅ User successfully added!");
    setFormData({ name: "", party: "" });

  } catch (err) {
    console.error(err);
    setError(err.message || "Registration failed.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <UserPlus className="text-indigo-600" /> Register New Voter
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl"
      >
        <Input label="Full Name" name="name" value={formData.name} onChange={handleChange} />
        <Input label="Party" name="party" value={formData.party} onChange={handleChange} />
      
        <div className="col-span-full">
          {error && <p className="text-red-600 text-sm">{error}</p>}
          {message && <p className="text-green-600 text-sm">{message}</p>}
        </div>

        <div className="col-span-full flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg flex items-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin w-4 h-4" /> : "Add Voter"}
          </button>
        </div>
      </form>
    </div>
  );
}

/* 🔹 Reusable Input field (JS version) */
function Input({ label, name, value, onChange, placeholder }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
      />
    </div>
  );
}
