import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [currentUser, setCurrentUser] = useState({});
  const navigate = useNavigate()

	const handlePasswordChange = async () => {
		const accessToken = Cookies.get("access_token");

		await fetch("http://localhost:3000/api/changePassword", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${accessToken}`,
			},
			credentials: "include",
			body: JSON.stringify({ currentPassword, newPassword }),
		});
	};

	async function handleLogOut() {
    const accessToken = Cookies.get("access_token")
		Cookies.remove("access_token");

		const res = await fetch("http://localhost:3000/api/logout", {
			method: "POST",
			credentials: "include",
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
		});

    if (res.ok) {
      navigate("/login")
    }
	}

	useEffect(() => {
		async function fetchData() {
			const accessToken = Cookies.get("access_token");

			await fetch("http://localhost:3000/api/getProfile", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${accessToken}`,
				},
				credentials: "include",
			})
				.then((res) => res.json())
				.then((data) => {
					setCurrentUser(data);
				})
				.catch((err) => console.log(err));
		}

		fetchData();
	}, []);

	return (
		<div className='min-h-screen bg-gradient-to-b from-white to-blue-100 flex flex-col items-center justify-center p-6 space-y-8 w-full'>
			<div className='bg-white rounded-2xl shadow-xl w-full max-w-md p-6 text-center'>
				<h2 className='text-xl font-bold text-gray-800'>{currentUser.name}</h2>
				<h3>{currentUser.username}</h3>
			</div>

			<div className='bg-white rounded-2xl shadow-xl w-full max-w-md p-6'>
				<h2 className='text-lg font-bold text-gray-800 mb-4 text-center'>
					Change Password
				</h2>
				<div className='space-y-4'>
					<input
						type='password'
						placeholder='Current Password'
						value={currentPassword}
						onChange={(e) => setCurrentPassword(e.target.value)}
						className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
					/>
					<input
						type='password'
						placeholder='New Password'
						value={newPassword}
						onChange={(e) => setNewPassword(e.target.value)}
						className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
					/>
					<button
						onClick={handlePasswordChange}
						className='w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 cursor-pointer transition'
					>
						Update Password
					</button>
				</div>
			</div>
			<div className='bg-white rounded-2xl shadow-xl w-full max-w-md p-6 text-center'>
				<button
					onClick={handleLogOut}
					className='w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 cursor-pointer transition'
				>
					Log Out
				</button>
			</div>
		</div>
	);
};
