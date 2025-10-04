import React, { useEffect, useState } from "react";

export default function Dashboard() {
  const [voters, setVoters] = useState(0);
  const [candidates, setCandidates] = useState(0);
  const [votes, setVotes] = useState(0);

  // Target counts (you can replace with real API data later)
  const targetVoters = 1024;
  const targetCandidates = 8;
  const targetVotes = 432;

  // Smooth number animation function
  const animateValue = (setter, target, duration = 1000) => {
    let start = 0;
    const startTime = performance.now();

    const step = (currentTime) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const value = Math.floor(progress * target);
      setter(value);
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  // Trigger animations on mount
  useEffect(() => {
    animateValue(setVoters, targetVoters, 1500);
    animateValue(setCandidates, targetCandidates, 1200);
    animateValue(setVotes, targetVotes, 1800);
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
      <p className="text-gray-600">
        Welcome to the Election Admin Panel.  
        Use the sidebar to manage candidates, voters, and the election process.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <DashboardCard title="Registered Voters" value={voters} />
        <DashboardCard title="Candidates" value={candidates} />
        <DashboardCard title="Votes Cast" value={votes} />
      </div>
    </div>
  );
}

/* 🔹 Reusable Card Component */
function DashboardCard({ title, value }) {
  return (
    <div className="p-5 bg-white rounded-xl shadow-md transition hover:shadow-lg">
      <h2 className="text-sm text-gray-500">{title}</h2>
      <p className="text-3xl font-semibold text-indigo-600 mt-1">
        {value.toLocaleString()}
      </p>
    </div>
  );
}
