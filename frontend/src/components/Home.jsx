import React, { useEffect, useState } from "react";
import {
	ResponsiveContainer,
	BarChart,
	XAxis,
	YAxis,
	Tooltip,
	Bar,
} from "recharts";
import Cookies from "js-cookie";

export const Home = () => {
	const accessToken = Cookies.get("access_token");
	const [averageStats, setAverageStats] = useState();
	const [chartData, setChartData] = useState([
		{ name: "Carbon Footprint", value: 0 },
		{ name: "Energy Intensity", value: 0 },
		{ name: "Ecological Impact", value: 0 },
	]);

	useEffect(() => {
		async function getData() {
			await fetch("http://localhost:3000/api/home", {
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

					setAverageStats(data.data);
					console.log(data.data);

					setChartData([
						{ name: "Carbon Footprint", value: data.average_carbon_footprint },
						{
							name: "Energy Intensity",
							value: data.average_energy_intensity_score,
						},
						{
							name: "Ecological Impact",
							value: data.average_ecological_impact_score,
						},
					]);
				})
				.catch((err) => console.error(err));
		}
		getData();
	}, []);

	return averageStats ? (
		<div className='h-screen w-full flex flex-col justify-start items-center overflow-y-auto overflow-x-hidden gap-6 '>
			<div className='bg-white rounded-2xl shadow-xl w-full max-w-md p-6 mt-5 text-center'>
				<h3 className='text-lg font-semibold text-gray-800 mb-4'>
					Environmental Insights Overview
				</h3>

				<div className='grid grid-cols-1 gap-4 text-sm text-gray-700 mb-6'>
					<div>
						<p className='font-bold'>{chartData[0].value} CO2e</p>
						<p>Avg. Carbon Footprint</p>
					</div>
					<div>
						<p className='font-bold'>{chartData[1].value} / 10</p>
						<p>Avg. Energy Intensity</p>
					</div>
					<div>
						<p className='font-bold'>{chartData[2].value} / 100</p>
						<p>Avg. Ecological Impact</p>
					</div>
				</div>

				{/* Bar Graph */}
				<ResponsiveContainer width='100%' height={250}>
					<BarChart data={chartData}>
						<XAxis dataKey='name' stroke='#4B5563' />
						<YAxis stroke='#4B5563' />
						<Tooltip />
						<Bar dataKey='value' fill='#3B82F6' radius={[4, 4, 0, 0]} />
					</BarChart>
				</ResponsiveContainer>
			</div>
			<div>
				{averageStats.map((stat, index) => (
					<InsightEntry entry={stat} key={index} />
				))}
			</div>
		</div>
	) : (
		<></>
	);
};

const InsightEntry = ({ entry }) => {
	const formatDate = (isoString) =>
		new Date(isoString).toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});

	return (
		<div className='bg-white rounded-xl shadow-md p-6 mb-6 max-w-2xl text-left m-10'>
			<h4 className='text-lg font-semibold text-gray-800 mb-2'>
				Environmental Insight — {formatDate(entry.created_at)}
			</h4>

			<div className='space-y-3 text-sm text-gray-700'>
				<div>
					<p className='font-medium'>
						🌍 Carbon Footprint: {entry.carbon_footprint.value}{" "}
						{entry.carbon_footprint.unit}
					</p>
					<p className='text-gray-500 italic'>
						{entry.carbon_footprint.explanation}
					</p>
				</div>

				<div>
					<p className='font-medium'>
						⚡ Energy Intensity Score: {entry.energy_intensity_score.value} / 10
					</p>
					<p className='text-gray-500 italic'>
						{entry.energy_intensity_score.explanation}
					</p>
				</div>

				<div>
					<p className='font-medium'>
						🌱 Ecological Impact Score: {entry.ecological_impact_score.value} /
						100
					</p>
					<p className='text-gray-500 italic'>
						{entry.ecological_impact_score.explanation}
					</p>
				</div>

				<div>
					<p className='font-medium mb-1'>💡 Sustainability Tips:</p>
					<ul className='list-disc list-inside text-gray-600'>
						{entry.sustainability_tips.map((tip, i) => (
							<li key={i}>{tip}</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};
