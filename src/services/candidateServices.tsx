import axios from "axios";

const API_BASE = "http://localhost:5000/api"; 

export async function registerCandidate(data: {
  fullName: string;
  nic: string;
  party: string;
  district: string;
  symbol: string;
}) {
  try {
    const res = await axios.post(`${API_BASE}/candidates/register`, data);
    return res.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || "Registration failed");
  }
}

export async function getCandidates() {
  try {
    const res = await axios.get(`${API_BASE}/candidates`);
    return res.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || "Failed to fetch candidates");
  }
}

export async function deleteCandidate(id: string) {
  try {
    const res = await axios.delete(`${API_BASE}/candidates/${id}`);
    return res.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || "Delete failed");
  }
}
