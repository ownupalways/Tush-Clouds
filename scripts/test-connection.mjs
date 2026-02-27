import mongoose from "mongoose";

const MONGODB_URI =
	process.env.MONGODB_URI ||
	"mongodb+srv://Godwin_J_Oluwadipe:GoodGodFirst_10%24@cluster0.szhqcm8.mongodb.net/testimonials?retryWrites=true&w=majority";

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
