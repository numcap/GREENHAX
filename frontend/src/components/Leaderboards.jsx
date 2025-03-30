import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useState } from "react";

// const maxScore = (leaderboard) => Math.max(...leaderboard.map(user => user.score));

const renderLeaderboard = (title, data, unit) => {
	const maxValue = Math.max(...data.map((u) => u.value));
	return (
		<div className='bg-white shadow-xl rounded-2xl w-full max-w-xl p-6 mb-8'>
			<h1 className='text-2xl font-bold text-center text-gray-800 mb-6'>
				{title}
			</h1>
			<div className='space-y-4'>
				{data.map((user, index) => (
					<div key={index} className='flex flex-col'>
						<div className='flex justify-between mb-1'>
							<span className='text-gray-700 font-medium'>
								{index + 1}. {user.name}
							</span>
							<span className='text-gray-600 font-semibold'>
								{user.value} {unit}
							</span>
						</div>
						<div className='w-full bg-gray-200 rounded-full h-4'>
							<div
								className='bg-blue-500 h-4 rounded-full'
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
	const [leaderboards, setLeaderboards] = useState({});

	useEffect(() => {
		async function fetchData() {
			const accessToken = Cookies.get("access_token");
			await fetch("http://localhost:3000/api/leaderboards", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${accessToken}`,
				},
				credentials: "include",
			})
				.then((res) => res.json())
				.then((data) => {
					console.log(data);
					setLeaderboards(data);
				});
		}
		fetchData();
	}, []);

	return (
		<div className='min-h-screen bg-gray-100 flex flex-col items-center justify-start p-4 w-full'>
			{leaderboards.carbonLeaderboard &&
				renderLeaderboard(
					"Avg. Carbon Footprint",
					leaderboards.carbonLeaderboard,
					"kg CO₂e"
				)}
			{leaderboards.energyLeaderboard &&
				renderLeaderboard(
					"Avg. Energy Intensity",
					leaderboards.energyLeaderboard,
					"/10"
				)}
			{leaderboards.impactLeaderboard &&
				renderLeaderboard(
					"Avg. Ecological Impact",
					leaderboards.impactLeaderboard,
					"/100"
				)}
		</div>
	);
};
