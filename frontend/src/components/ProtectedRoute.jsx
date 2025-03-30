import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { ImSpinner2 } from "react-icons/im";

const ProtectedRoute = ({ children }) => {
	const accessToken = Cookies.get("access_token");
	const [isAuthorized, setIsAuthorized] = useState(null); // null = loading

	useEffect(() => {
		console.log("Access token:", accessToken);
		if (!accessToken) {
			console.warn("No access token found.");
			setIsAuthorized(false);
			return;
		}

		const fetchData = async () => {
			try {
				const res = await fetch("http://localhost:3000/api/auth", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${accessToken}`,
					},
					credentials: "include",
				});
				setIsAuthorized(res.ok);
			} catch (error) {
				console.error("Auth error:", error);
				setIsAuthorized(false);
			}
		};

		fetchData();
	}, [accessToken]);

	if (isAuthorized === null) {
		return <ImSpinner2 className='absolute top1/2 right1/2 -translate-1/2' />;
	}
	if (!isAuthorized) return <Navigate to='/login' replace />;
	return children;
};

export default ProtectedRoute;
