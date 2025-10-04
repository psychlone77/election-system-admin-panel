import axios from "axios";

const API_BASE = "http://localhost:5000/api"; // 🔁 change this to match backend

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

// ✅ Login user (NIC + password)
export async function loginUser(nic: string, password: string) {
  try {
    const res = await axios.post(`${API_BASE}/auth/login`, { nic, password });
    // Example: store token in localStorage
    if (res.data?.token) {
      localStorage.setItem("token", res.data.token);
    }
    return res.data;
  } catch (err: any) {
    console.error("Login failed:", err);
    throw new Error(err.response?.data?.message || "Invalid NIC or password");
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
