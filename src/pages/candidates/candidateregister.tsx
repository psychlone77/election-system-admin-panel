import { useState } from "react";
import { UserPlus, Loader2 } from "lucide-react";
import { registerCandidate } from "../../services/candidateServices";

interface FormData {
  name: string;
  party: string;
}

interface FormMessage {
  type: "success" | "error";
  text: string;
}

export default function CandidateRegister() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    party: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<FormMessage | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(null);

    try {
      setLoading(true);
      await registerCandidate(formData);

      setMessage({
        type: "success",
        text: "✅ Candidate successfully added!",
      });
      setFormData({ name: "", party: "" });
    } catch (err) {
      console.error(err);
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Registration failed.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <UserPlus className="text-indigo-600" /> Register New Candidate
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl"
      >
        <Input label="Full Name" name="name" value={formData.name} onChange={handleChange} />
        <Input label="Party" name="party" value={formData.party} onChange={handleChange} />

        <div className="col-span-full">
          {message && (
            <p
              className={
                message.type === "error" ? "text-red-600 text-sm" : "text-green-600 text-sm"
              }
            >
              {message.text}
            </p>
          )}
        </div>

        <div className="col-span-full flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg flex items-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin w-4 h-4" /> : "Add Candidate"}
          </button>
        </div>
      </form>
    </div>
  );
}

/* 🔹 Reusable Input field */
interface InputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

function Input({ label, name, value, onChange, placeholder }: InputProps) {
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
