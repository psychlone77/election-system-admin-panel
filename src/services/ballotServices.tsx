import axios from "axios";

const API_BASE = "http://10.220.190.160:3002"; // Backend API

export interface PublicBallot {
  public_ballot_id: string;
  hashed_ballot: string;
  created_at: Date;
}

// Fetch all ballots (MVP - no backend pagination)
export async function fetchBallots(ballotId?: string): Promise<PublicBallot[]> {
  try {
    const url = `${API_BASE}/ballots`;
    const res = await axios.get(url);

    let ballots = res.data;

    // Frontend-only filtering if ballotId provided
    if (ballotId) {
      ballots = ballots.filter((ballot: PublicBallot) =>
        ballot.public_ballot_id.toLowerCase().includes(ballotId.toLowerCase())
      );
    }

    return ballots;
  } catch (err) {
    console.error("Failed to fetch ballots:", err);
    if (axios.isAxiosError(err)) {
      throw new Error(err.response?.data?.message || "Failed to fetch ballots");
    }
    throw new Error("Failed to fetch ballots");
  }
}
