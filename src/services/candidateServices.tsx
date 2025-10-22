import axios from "axios";

const API_BASE = "http://10.220.190.160:3001"; // Backend API

export interface Candidate {
  id: string;
  name: string;
  party: string;
}

// Fetch all candidates
export async function fetchCandidates(): Promise<Candidate[]> {
  try {
    const res = await axios.get(`${API_BASE}/candidates`);
    return res.data;
  } catch (err) {
    console.error("Failed to fetch candidates:", err);
    if (axios.isAxiosError(err)) {
      throw new Error(err.response?.data?.message || "Failed to fetch candidates");
    }
    throw new Error("Failed to fetch candidates");
  }
}

// Delete a candidate
export async function deleteCandidate(id: string): Promise<void> {
  try {
    await axios.delete(`${API_BASE}/candidates/${id}`);
  } catch (err) {
    console.error("Failed to delete candidate:", err);
    if (axios.isAxiosError(err)) {
      throw new Error(err.response?.data?.message || "Failed to delete candidate");
    }
    throw new Error("Failed to delete candidate");
  }
}

// Register a new candidate
export async function registerCandidate(data: Omit<Candidate, "id">): Promise<Candidate> {
  try {
    const candidateData = {
      ...data,
    };
    const res = await axios.post(`${API_BASE}/post_candidates`, candidateData);
    return res.data;
  } catch (err) {
    console.error("Failed to register candidate:", err);
    if (axios.isAxiosError(err)) {
      throw new Error(err.response?.data?.message || "Failed to register candidate");
    }
    throw new Error("Failed to register candidate");
  }
}
