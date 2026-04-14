import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
	throw new Error(
		"❌ Please define the MONGODB_URI environment variable",
	);
}

interface MongooseCache {
	conn: typeof mongoose | null;
	promise: Promise<typeof mongoose> | null;
}

// ✅ Correct global augmentation for TypeScript
declare global {
	var mongooseCache: MongooseCache | undefined;
}

// ✅ Initialize the global cache
let cached = global.mongooseCache;

if (!cached) {
	cached = global.mongooseCache = {
		conn: null,
		promise: null,
	};
}

async function connectDB(): Promise<
	typeof mongoose
> {
	if (cached!.conn) {
		return cached!.conn;
	}

	if (!cached!.promise) {
		console.log(
			"📡 Initializing MongoDB connection...",
		);
		cached!.promise = mongoose
			.connect(MONGODB_URI!, {
				bufferCommands: true,
			})
			.then((m) => m); // Ensure promise resolves to mongoose instance
	}

	try {
		const conn = await cached!.promise;
		cached!.conn = conn;

		const { host, name } = conn.connection;
		console.log(
			"-----------------------------------------",
		);
		console.log(`✅ DATABASE CONNECTED`);
		console.log(`🏠 Host: ${host}`);
		console.log(`📂 Database: ${name}`);
		console.log(
			"-----------------------------------------",
		);

		return cached!.conn; // 👈 CRITICAL: You must return the connection!
	} catch (error: unknown) {
		cached!.promise = null;
		const errorMessage =
			error instanceof Error
				? error.message
				: "Unknown error";
		console.error(
			"❌ MONGODB CONNECTION ERROR:",
			errorMessage,
		);
		throw error;
	}
}

export default connectDB;
