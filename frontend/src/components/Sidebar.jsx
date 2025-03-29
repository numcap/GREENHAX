import { IoMdHome } from "react-icons/io";
import { MdLeaderboard } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { Link, NavLink } from "react-router";

export const Sidebar = () => {
	return (
		<div className='flex flex-col justify-center items-center h-screen'>
			<span className='mb-12'>GreenHax</span>
			<div className='flex flex-col items-baseline gap-4 text-[1.1rem]'>
				<Link to='/'>
					<span className='flex justify-center items-center gap-1.5'>
						<IoMdHome /> Home
					</span>
				</Link>
				<Link to='/leaderboards'>
					<span className='flex justify-center items-center gap-1.5'>
						<MdLeaderboard /> Leaderboards
					</span>
				</Link>
				<Link to='/add'>
					<span className='flex justify-center items-center gap-1.5'>
						<IoMdAdd /> Add
					</span>
				</Link>
				<Link to='/profile'>
					<span className='flex justify-center items-center gap-1.5'>
						<CgProfile /> Profile
					</span>
				</Link>
			</div>
		</div>
	);
};
