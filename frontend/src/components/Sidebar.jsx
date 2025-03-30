import { IoMdHome } from "react-icons/io";
import { MdLeaderboard } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";

export const Sidebar = () => {
	return (
		<div className='flex flex-col justify-center items-center h-screen p-5 border-r border-r-gray-300'>
			<span className='mb-12'>GreenHax</span>
			<div className='flex flex-col items-baseline gap-4 text-[1.1rem]'>
				<Link to='/'>
					<span className='flex justify-center items-center gap-1.5 hover:bg-gray-200 rounded-2xl p-2 transition'>
						<IoMdHome /> Home
					</span>
				</Link>
				<Link to='/leaderboards'>
					<span className='flex justify-center items-center gap-1.5 hover:bg-gray-200 rounded-2xl p-2 transition'>
						<MdLeaderboard /> Leaderboards
					</span>
				</Link>
				<Link to='/add'>
					<span className='flex justify-center items-center gap-1.5 hover:bg-gray-200 rounded-2xl p-2 transition'>
						<IoMdAdd /> Add
					</span>
				</Link>
				<Link to='/profile'>
					<span className='flex justify-center items-center gap-1.5 hover:bg-gray-200 rounded-2xl p-2 transition'>
						<CgProfile /> Profile
					</span>
				</Link>
			</div>
		</div>
	);
};
