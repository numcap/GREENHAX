import React from "react";

const leaderboardData = [
  { name: "Alice", score: 95 },
  { name: "Bob", score: 89 },
  { name: "Charlie", score: 85 },
  { name: "Diana", score: 82 },
  { name: "Ethan", score: 80 },
];

const maxScore = Math.max(...leaderboardData.map(user => user.score));

export const Leaderboards = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-xl p-6">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Leaderboard</h1>
        <div className="space-y-4">
          {leaderboardData.map((user, index) => (
            <div key={index} className="flex flex-col">
              <div className="flex justify-between mb-1">
                <span className="text-gray-700 font-medium">
                  {index + 1}. {user.name}
                </span>
                <span className="text-gray-600 font-semibold">{user.score}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-blue-500 h-4 rounded-full"
                  style={{ width: `${(user.score / maxScore) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
