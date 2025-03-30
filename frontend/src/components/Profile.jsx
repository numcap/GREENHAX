import React, { useState } from "react";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
} from "recharts";

export const currentUser = {
	name: "Betty Wang",
	role: "Carbon Conscious User",
	age: 22,
	followers: 348,
	emissions: {
		co2: 1.8, // in tonnes
		treesSaved: 12,
		carKmAvoided: 420,
		energySaved: 230, // kWh
		wasteRecycled: 50, // kg
		waterSaved: 1800, // liters
	},
	score: 88,
};

export const emissionsChartData = [
	{ name: "CO₂", value: currentUser.emissions.co2 },
	{ name: "Trees", value: currentUser.emissions.treesSaved },
	{ name: "Km Avoided", value: currentUser.emissions.carKmAvoided },
	{ name: "Energy", value: currentUser.emissions.energySaved },
	{ name: "Waste", value: currentUser.emissions.wasteRecycled },
	{ name: "Water", value: currentUser.emissions.waterSaved },
];

export const Profile = () => {
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const handlePasswordChange = () => {
		if (password === confirmPassword) {
			alert("Password changed successfully!");
			setPassword("");
			setConfirmPassword("");
		} else {
			alert("Passwords do not match.");
		}
	};

	return (
		<div className='min-h-screen bg-gradient-to-b from-white to-blue-100 flex flex-col items-center justify-start p-6 space-y-8'>
			{/* Profile Card */}
			<div className='bg-white rounded-2xl shadow-xl w-full max-w-md p-6 text-center'>
				<h2 className='text-xl font-bold text-gray-800'>{currentUser.name}</h2>
				<p className='text-sm text-gray-500 mb-4'>{currentUser.role}</p>

				<div className='flex justify-center gap-4 mb-4'>
					<button className='bg-blue-500 text-white px-4 py-1 rounded-full hover:bg-blue-600'>
						Follow
					</button>
					<button className='bg-gray-200 text-gray-800 px-4 py-1 rounded-full hover:bg-gray-300'>
						Message
					</button>
				</div>

				<p className='text-sm text-gray-600'>
					{currentUser.followers} followers
				</p>
			</div>

			{/* Emissions Overview */}
			<div className='bg-white rounded-2xl shadow-xl w-full max-w-md p-6 text-center'>
				<h3 className='text-lg font-semibold text-gray-800 mb-4'>
					Carbon Emissions Overview
				</h3>
				<div className='grid grid-cols-2 gap-4 text-sm text-gray-700 mb-6'>
					<div>
						<p className='font-bold'>{currentUser.emissions.co2} t</p>
						<p>CO₂ Emitted</p>
					</div>
					<div>
						<p className='font-bold'>{currentUser.emissions.treesSaved}</p>
						<p>Trees Saved</p>
					</div>
					<div>
						<p className='font-bold'>{currentUser.emissions.carKmAvoided} km</p>
						<p>Car Travel Avoided</p>
					</div>
					<div>
						<p className='font-bold'>{currentUser.emissions.energySaved} kWh</p>
						<p>Energy Saved</p>
					</div>
					<div>
						<p className='font-bold'>
							{currentUser.emissions.wasteRecycled} kg
						</p>
						<p>Waste Recycled</p>
					</div>
					<div>
						<p className='font-bold'>{currentUser.emissions.waterSaved} L</p>
						<p>Water Saved</p>
					</div>
				</div>

				{/* Bar Graph */}
				<ResponsiveContainer width='100%' height={250}>
					<BarChart data={emissionsChartData}>
						<XAxis dataKey='name' stroke='#4B5563' />
						<YAxis stroke='#4B5563' />
						<Tooltip />
						<Bar dataKey='value' fill='#3B82F6' radius={[4, 4, 0, 0]} />
					</BarChart>
				</ResponsiveContainer>
			</div>

			{/* Password Change Section */}
			<div className='bg-white rounded-2xl shadow-xl w-full max-w-md p-6'>
				<h2 className='text-lg font-bold text-gray-800 mb-4 text-center'>
					Change Password
				</h2>
				<div className='space-y-4'>
					<input
						type='password'
						placeholder='New Password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
					/>
					<input
						type='password'
						placeholder='Confirm Password'
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
					/>
					<button
						onClick={handlePasswordChange}
						className='w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600'
					>
						Update Password
					</button>
				</div>
			</div>
		</div>
	);
};
