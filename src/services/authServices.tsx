import axios from "axios";

const API_BASE = "http://localhost:3001"; // 🔁 change this to match backend

// ✅ Register user
export async function registerUser(data: {
  fullName: string;
  nic: string;
  email: string;
  role: string;
  password: string;
}) {
  try {
    const res = await axios.post(`${API_BASE}/auth/register`, data);
    return res.data;
  } catch (err: any) {
    console.error("Registration failed:", err);
    throw new Error(err.response?.data?.message || "Registration failed");
  }
}

// ✅ Login user (email + password)
export async function loginUser(email: string, password: string) {
  try {
    const res = await axios.post(`${API_BASE}/login`, { email, password });
    // Example: store token in localStorage
    if (res.data?.token) {
      localStorage.setItem("token", res.data.token);
    } else {
      // Backend didn't return a token. For local development, set a fallback token
      // so RequireAuth can detect a logged-in state. Remove this in production.
      localStorage.setItem("token", "__dev_token__");
    }
    return res.data;
  } catch (err: any) {
    console.error("Login failed:", err);
    throw new Error(err.response?.data?.message || "Invalid email or password");
  }
}

// ✅ Check if logged in
export function getCurrentUser() {
  const token = localStorage.getItem("token");
  return token ? { token } : null;
}

// ✅ Logout
export function logoutUser() {
  localStorage.removeItem("token");
}
