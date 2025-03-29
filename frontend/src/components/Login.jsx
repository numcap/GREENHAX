import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Login = () => {
	const [userInfo, setUserInfo] = useState({
		username: "",
		password: "",
	});

	const handleSubmit = () => {
		console.log(userInfo);
	};

	return (
		<div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg w-80'>
			<h2 className='text-2xl font-bold mb-6'>Login</h2>
			<div className='flex flex-col gap-4'>
				<div className='text-left'>
					<label
						htmlFor='username'
						className='block text-sm font-medium text-gray-700 mb-1'
					>
						Username
					</label>
					<input
						type='text'
						className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
						onChange={(e) =>
							setUserInfo({ ...userInfo, username: e.target.value })
						}
					/>
				</div>
				<div className='text-left'>
					<label className='block text-sm font-medium text-gray-700 mb-1'>
						Password
					</label>
					<input
						type='password'
						className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
						onChange={(e) =>
							setUserInfo({ ...userInfo, password: e.target.value })
						}
					/>
				</div>
				<button
					className='bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200'
					onClick={() => handleSubmit()}
				>
					Sign In
				</button>
			</div>
			<div className='mt-5'>
				<p>Don't have an account with us?</p>
				<Link
					to='/signup'
					className='text-blue-500 decoration-1 underline hover:text-blue-600 transition'
				>
					Sign Up
				</Link>
			</div>
		</div>
	);
};
