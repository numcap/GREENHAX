const express = require("express");
const router = express.Router();
const { validateInputData } = require("../middleware/validation");
const { getEnvironmentalInsights } = require("../services/openai");
const jwt = require("jsonwebtoken");
const pg = require("pg");

const { Pool } = pg;

const pool = new Pool({
	connectionString: process.env.PG_STRING,
	ssl: { rejectUnauthorized: false },
});

// API endpoint for environmental insights
router.post("/environmental-insights", validateInputData, async (req, res) => {
	try {
		const insights = await getEnvironmentalInsights(req.body);
		const accessToken = req.headers["authorization"]?.split(" ")[1];

		const decodedJWT = jwt.decode(accessToken, { json: true });

		try {
			await pool.query(
				"INSERT INTO entries(user_id, carbon_footprint, energy_intensity_score, ecological_impact_score, sustainability_tips) VALUES($1, $2, $3, $4, $5)",
				[
					decodedJWT.dbID,
					JSON.stringify(insights.carbon_footprint),
					JSON.stringify(insights.energy_intensity_score),
					JSON.stringify(insights.ecological_impact_score),
					JSON.stringify(insights.sustainability_tips),
				]
			);
		} catch (err) {
			console.log(err);
			return res.status(500).json({ err, error: "SQL error" });
		}

		res.json(insights);
	} catch (error) {
		console.error("Error generating environmental insights:", error);
		res.status(500).json({
			error: "Failed to generate environmental insights",
			details: error.message,
		});
	}
});

// Health check endpoint
router.get("/health", (req, res) => {
	res.status(200).send("Server is running");
});

module.exports = router;
