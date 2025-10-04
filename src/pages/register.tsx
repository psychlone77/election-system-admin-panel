import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, UserPlus, ShieldCheck } from "lucide-react";
import { registerUser } from "../services/authServices";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    nic: "",
    email: "",
    role: "admin",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);
      await registerUser(formData);
      setSuccess("🎉 Registration successful!");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err: any) {
      setError(err.message || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-400 p-6">
      <div className="relative bg-white/90 backdrop-blur-xl shadow-2xl rounded-2xl w-full max-w-md p-8">
        {/* Decorative badge */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-indigo-600 text-white rounded-full p-3 shadow-lg">
          <ShieldCheck className="w-6 h-6" />
        </div>

        {/* Header */}
        <div className="text-center mb-6 mt-3">
          <h2 className="text-2xl font-bold text-gray-800">Create Admin Account</h2>
          <p className="text-gray-500 text-sm mt-1">Election Control Dashboard Access</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            label="Full Name"
            name="fullName"
            type="text"
            placeholder="Enter full name"
            value={formData.fullName}
            onChange={handleChange}
          />

          <InputField
            label="NIC"
            name="nic"
            type="text"
            placeholder="National ID"
            value={formData.nic}
            onChange={handleChange}
          />

          <InputField
            label="Email"
            name="email"
            type="email"
            placeholder="email@example.com"
            value={formData.email}
            onChange={handleChange}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            >
              <option value="admin">Admin</option>
              <option value="trustee">Trustee</option>
              <option value="observer">Observer</option>
            </select>
          </div>

          {/* Password field */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 text-sm pr-10"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-gray-500 hover:text-indigo-600"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <InputField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            placeholder="Re-enter password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          {/* Messages */}
          {error && <p className="text-red-600 text-sm">{error}</p>}
          {success && <p className="text-green-600 text-sm">{success}</p>}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="animate-pulse">Registering...</span>
            ) : (
              <>
                <UserPlus size={18} />
                Register Account
              </>
            )}
          </button>

          <p className="text-center text-sm text-gray-500 mt-3">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-indigo-600 hover:underline"
            >
              Login
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

/* 🧩 Reusable input component */
function InputField({
  label,
  name,
  type,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required
        className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
        placeholder={placeholder}
      />
    </div>
  );
}
