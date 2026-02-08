import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
	throw new Error(
		"❌ Please define the MONGODB_URI environment variable",
	);
}

/**
 * Global cache (VERY important for Next.js / Vercel serverless)
 */
interface MongooseCache {
	conn: typeof mongoose | null;
	promise: Promise<typeof mongoose> | null;
}

declare global {
	/** eslint-disable-next-line no-var */
	var mongooseCache: MongooseCache | undefined;
}

// ✅ Initialize cache safely
if (!global.mongooseCache) {
	global.mongooseCache = {
		conn: null,
		promise: null,
	};
}

const cached = global.mongooseCache;

async function connectDB(): Promise<
	typeof mongoose
> {
	// ✅ If already connected, return immediately
	if (cached.conn) {
		return cached.conn;
	}

	// ✅ Create connection promise once
	if (!cached.promise) {
		cached.promise = mongoose.connect(
			MONGODB_URI!,
			{
				bufferCommands: false, // critical for serverless speed
			},
		);
	}

	cached.conn = await cached.promise;

	console.log("✅ MongoDB connected");

	return cached.conn;
}

export default connectDB;
