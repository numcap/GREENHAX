import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { Leaderboards } from "./components/Leaderboards";
import { AddEntry } from "./components/AddEntry";
import { Profile } from "./components/Profile";
import { Layout } from "./Layout";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<Home />} />
					<Route path='leaderboards' element={<Leaderboards />} />
					<Route path='add' element={<AddEntry />} />
					<Route path='profile' element={<Profile />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
