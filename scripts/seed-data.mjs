import mongoose from "mongoose";
import { config } from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// Load .env.local
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
config({
	path: join(__dirname, "..", ".env.local"),
});

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
	console.error(
		"❌ MONGODB_URI not found in .env.local",
	);
	process.exit(1);
}

async function testConnection() {
	try {
		await mongoose.connect(MONGODB_URI);
		console.log(
			"✅ MongoDB Connected Successfully!",
		);
		console.log(
			"Time:",
			new Date().toLocaleString(),
		);
		await mongoose.disconnect();
		process.exit(0);
	} catch (error) {
		console.error("❌ MongoDB Connection Failed");
		console.error(
			"Time:",
			new Date().toLocaleString(),
		);
		console.error("Error:", error.message);
		process.exit(1);
	}
}

testConnection();
