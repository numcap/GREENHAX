import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { Leaderboards } from "./components/Leaderboards";
import { AddEntry } from "./components/AddEntry";
import { Profile } from "./components/Profile";
import { Layout } from "./Layout";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path='/'
					element={
						<ProtectedRoute>
							<Layout />
						</ProtectedRoute>
					}
				>
					<Route index element={<Home />} />
					<Route path='leaderboards' element={<Leaderboards />} />
					<Route path='add' element={<AddEntry />} />
					<Route path='profile' element={<Profile />} />
				</Route>
				<Route path='login' element={<Login />} />
				<Route path='signup' element={<Signup />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
