import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Signup = () => {
	const navigate = useNavigate();
	const [userInfo, setUserInfo] = useState({
		name: "",
		username: "",
		password: "",
	});

	const handleSubmit = () => {
		fetch("http://localhost:3000/api/signup", {
			method: "POST",
            mode: "cors",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify(userInfo),
		})
			.then((res) => {
				if (res.ok) {
					navigate("/login");
				}
			})
			.catch((err) => console.error(err));
	};

	return (
		<div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg w-80'>
			<h2 className='text-2xl font-bold mb-6'>Sign Up</h2>
			<div className='flex flex-col gap-4'>
				<div className='text-left'>
					<label
						htmlFor='name'
						className='block text-sm font-medium text-gray-700 mb-1'
					>
						Name
					</label>
					<input
						type='text'
						id='name'
						className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
						onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
					/>
				</div>
				<div className='text-left'>
					<label
						htmlFor='username'
						className='block text-sm font-medium text-gray-700 mb-1'
					>
						Username
					</label>
					<input
						type='username'
						id='username'
						className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
						onChange={(e) =>
							setUserInfo({ ...userInfo, username: e.target.value })
						}
					/>
				</div>
				<div className='text-left'>
					<label
						htmlFor='password'
						className='block text-sm font-medium text-gray-700 mb-1'
					>
						Password
					</label>
					<input
						type='password'
						id='password'
						className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
						onChange={(e) =>
							setUserInfo({ ...userInfo, password: e.target.value })
						}
					/>
				</div>
				<button
					className='bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200 cursor-pointer'
					onClick={() => handleSubmit()}
				>
					Create Account
				</button>
			</div>
			<div className='mt-5'>
				<p>Have an Account with us?</p>
				<Link
					to='/login'
					className='text-blue-500 decoration-1 underline hover:text-blue-600 transition'
				>
					Log In
				</Link>
			</div>
		</div>
	);
};
