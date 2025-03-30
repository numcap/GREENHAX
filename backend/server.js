const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const insightsRoutes = require("./routes/insights");
const bcrypt = require("bcrypt");
const pg = require("pg");
const jwt = require("jsonwebtoken");
const { serialize } = require("cookie");
const cookieParser = require("cookie-parser");

// Load env variables, I keep the Krabby Patty secret formula in .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const { Pool } = pg;
const pool = new Pool({
	connectionString: process.env.PG_STRING,
	ssl: { rejectUnauthorized: false },
});

// Middleware setup
app.use(express.json());
app.use(
	cors({
		origin:
			process.env.NODE_ENV === "production"
				? process.env.FRONTEND_URL
				: "http://localhost:5173", // my frontend URL
		credentials: true, // Allow credentials (cookies, authorization headers)
		methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
		allowedHeaders: ["Content-Type", "Authorization"],
	})
); // Enable CORS for any frontend requests
app.use(cookieParser());

// Root route
app.get("/", (req, res) => {
	res.send("Hello, World!");
});
// Routes bcs we be like that (;
app.use("/api", insightsRoutes);

app.post("/api/login", async (req, res) => {
	const { username, password } = req.body;

	try {
		const user = await pool.query("SELECT * FROM users WHERE username=$1", [
			username,
		]);

		if (!user.rowCount) {
			return res.status(404).json({ error: "User not found" });
		}

		const dbUser = user.rows[0].username;
		const dbPassword = user.rows[0].password_hash;
		const dbID = user.rows[0].id;

		if (await bcrypt.compare(password, dbPassword)) {
			const accessToken = jwt.sign(
				{ dbID, dbUser },
				process.env.ACCESS_JWT_SECRET,
				{
					expiresIn: "1d",
				}
			);
			const refreshToken = jwt.sign(
				{ dbID, dbUser },
				process.env.REFRESH_JWT_SECRET,
				{ expiresIn: "7d" }
			);

			await pool.query("UPDATE users SET reset_token=$1 WHERE username=$2", [
				refreshToken,
				dbUser,
			]);

			res.set({
				"Set-Cookie": serialize("refresh_token", refreshToken, {
					httpOnly: true,
					secure: true, // change to true in prod
					sameSite: "None",
					path: "/",
					maxAge: 60 * 60 * 24 * 7,
				}),
				"Content-Type": "application/json",
			});

			res.status(200).json({ accessToken });
		} else {
			res.status(401).json({ error: "Incorrect password" });
		}
	} catch (err) {
		console.error(err);
		res.status(400).json({ err, error: "Could not sign in" });
	}
});

app.post("/api/signup", async (req, res) => {
	const { name, username, password } = req.body;

	try {
		const users = await pool.query("SELECT * FROM users WHERE username=$1", [
			username,
		]);

		if (users.rowCount > 0) {
			return res.status(400).json({ error: "Username taken" }).send();
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		await pool.query(
			"INSERT INTO users(name, username, password_hash) VALUES($1,$2, $3)",
			[name, username, hashedPassword]
		);
		res.sendStatus(200);
	} catch (error) {
		res.status(400).json({ error: error }).send();
	}
});

app.get("/api/home", authenticateToken, async (req, res) => {
	const accessToken = req.headers["authorization"]?.split(" ")[1];

	try {
		const decodedJWT = jwt.decode(accessToken);
        console.log(decodedJWT.dbID);
        

		const data = await pool.query("SELECT * FROM entries WHERE user_id=$1 ORDER BY created_at ASC", [
			decodedJWT.dbID,
		]);

		if (data.rowCount === 0) {
			return res.status(204).json({ error: "No Content" });
		}

        // console.log(data);

		let totalCarbon = 0,
			totalEnergy = 0,
			totalEco = 0;
		data.rows.forEach((row) => {
			totalCarbon += row.carbon_footprint.value;
			totalEnergy += row.energy_intensity_score.value;
			totalEco += row.ecological_impact_score.value;
		});

		const avgCarbon = totalCarbon / data.rowCount;
		const avgEnergy = totalEnergy / data.rowCount;
		const avgEco = totalEco / data.rowCount;

		return res.status(200).json({
			average_carbon_footprint: avgCarbon,
			average_energy_intensity_score: avgEnergy,
			average_ecological_impact_score: avgEco,
			data: data.rows,
		});
	} catch (err) {
		console.log(err);

		res.status(500).json({ err });
	}
});

app.get("/api/leaderboards", authenticateToken, async (req, res) => {
    try {
		const result = await pool.query("SELECT * FROM users");

		// Sort results into 3 separate leaderboards
		const carbon = [...result.rows].sort((a, b) => a.avg_carbon_footprint - b.avg_carbon_footprint);
		const energy = [...result.rows].sort((a, b) => b.avg_energy_intensity - a.avg_energy_intensity);
		const impact = [...result.rows].sort((a, b) => b.avg_ecological_impact - a.avg_ecological_impact);

		res.json({
			carbonLeaderboard: carbon.map(u => ({ name: u.username, value: parseFloat(u.avg_carbon_footprint) })),
			energyLeaderboard: energy.map(u => ({ name: u.username, value: parseFloat(u.avg_energy_intensity) })),
			impactLeaderboard: impact.map(u => ({ name: u.username, value: parseFloat(u.avg_ecological_impact) }))
		});
	} catch (err) {
		console.error("Leaderboard error:", err);
		res.status(500).json({ error: "Could not load leaderboards" });
	}
})

app.post("/api/auth", async (req, res) => {
	const accessToken = req.headers["authorization"]?.split(" ")[1];
	const refreshToken = req.cookies["refresh_token"];

	try {
		const user = await pool.query(
			"SELECT * FROM users WHERE reset_token = $1",
			[refreshToken]
		);

		// check if there is Access token
		if (!accessToken) {
			generateNewAccessToken(res, refreshToken, user);
		}

		try {
			// check the access token, if verified then return ok status
			jwt.verify(authToken, process.env.ACCESS_JWT_SECRET);
			return res.sendStatus(200);
		} catch {
			return generateNewAccessToken(res, refreshToken, user);
		}
	} catch {
		return res.status(500).json({ error: "Server Error" });
	}
});

function generateNewAccessToken(res, refreshToken, user) {
	// check if user has an refresh token saved, if not they need to sign in
	if (!user.rowCount || user.rows[0].reset_token != refreshToken) {
		return res.status(403).json({ error: "Please Sign In" });
	}

	try {
		// verify the refresh token, and sign a new access token to return
		jwt.verify(refreshToken, process.env.REFRESH_JWT_SECRET);
		const accessToken = jwt.sign(
			{ dbUser: user.rows[0].username, dbID: user.rows[0].id },
			process.env.ACCESS_JWT_SECRET,
			{ expiresIn: 60 * 60 * 24 }
		);
		return res.status(200).json({ accessToken });
	} catch {
		// if it throws an error then the refresh token could not be verified
		return res.status(400).json({ error: "Could not verify Refresh Token" });
	}
}

// Middleware to authenticate token
function authenticateToken(req, res, next) {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];

	if (token) {
		jwt.verify(token, process.env.ACCESS_JWT_SECRET, (err, user) => {
			if (!err) {
				req.user = user;
				return next();
			}
			// If access token is invalid, check for refresh token
			const refreshToken = req.cookies["refresh_token"];
			if (refreshToken) {
				jwt.verify(
					refreshToken,
					process.env.REFRESH_JWT_SECRET,
					(err, userFromRefresh) => {
						if (!err) {
							// Issue a new access token and attach user info
							const newAccessToken = jwt.sign(
								{ dbID: userFromRefresh.dbID, dbUser: userFromRefresh.dbUser },
								process.env.ACCESS_JWT_SECRET,
								{ expiresIn: "1d" }
							);
							req.user = userFromRefresh;
							res.setHeader("x-access-token", newAccessToken);
							return next();
						} else {
							return res.status(401).json({ error: "Unauthorized" });
						}
					}
				);
			} else {
				return res.status(401).json({ error: "Unauthorized" });
			}
		});
	} else {
		// No access token, check for refresh token
		const refreshToken = req.cookies["refresh_token"];
		if (refreshToken) {
			jwt.verify(
				refreshToken,
				process.env.REFRESH_JWT_SECRET,
				(err, userFromRefresh) => {
					if (!err) {
						const newAccessToken = jwt.sign(
							{ dbID: userFromRefresh.dbID, dbUser: userFromRefresh.dbUser },
							process.env.ACCESS_JWT_SECRET,
							{ expiresIn: "1d" }
						);
						req.user = userFromRefresh;
						res.setHeader("x-access-token", newAccessToken);
						return next();
					} else {
						return res.status(401).json({ error: "Unauthorized" });
					}
				}
			);
		} else {
			return res.status(401).json({ error: "Unauthorized" });
		}
	}
}

// Start the server
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports.authenticateToken = authenticateToken;
