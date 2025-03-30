import React from "react";

const leaderboardData = [
  { name: "Alice", score: 95 },
  { name: "Bob", score: 89 },
  { name: "Charlie", score: 85 },
  { name: "Diana", score: 82 },
  { name: "Ethan", score: 80 },
];

const maxScore = Math.max(...leaderboardData.map(user => user.score));

const renderLeaderboard = (title, data, unit) => {
  const maxValue = Math.max(...data.map((u) => u.value));
  return (
    <div className="bg-white shadow-xl rounded-2xl w-full max-w-xl p-6 mb-8">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">{title}</h1>
      <div className="space-y-4">
        {data.map((user, index) => (
          <div key={index} className="flex flex-col">
            <div className="flex justify-between mb-1">
              <span className="text-gray-700 font-medium">{index + 1}. {user.name}</span>
              <span className="text-gray-600 font-semibold">
                {user.value} {unit}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-blue-500 h-4 rounded-full"
                style={{ width: `${(user.value / maxValue) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Leaderboards = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start p-4 w-full">
      {renderLeaderboard("Avg. Carbon Footprint", carbonData, "kg CO₂e")}
      {renderLeaderboard("Avg. Energy Intensity", energyData, "/10")}
      {renderLeaderboard("Avg. Ecological Impact", impactData, "/100")}
    </div>
  );
}