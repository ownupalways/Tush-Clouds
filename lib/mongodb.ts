import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
	throw new Error(
		"Please define the MONGODB_URI environment variable",
	);
}

interface MongooseCache {
	conn: typeof mongoose | null;
	promise: Promise<typeof mongoose> | null;
}

declare global {
	var mongoose: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongoose || {
	conn: null,
	promise: null,
};

if (!global.mongoose) {
	global.mongoose = cached;
}

async function connectDB() {
    if (cached.conn) return cached.conn;
    
    if (!cached.promise) {
        cached.promise = mongoose.connect(
            MONGODB_URI,
            {
                bufferCommands: false,
                maxPoolSize: 10,
                // Add these TLS options
                tls: true,
                tlsAllowInvalidCertificates: true, // For testing only
                serverSelectionTimeoutMS: 5000,
                socketTimeoutMS: 45000,
            },
        );
    }
    
    try {
        cached.conn = await cached.promise;
        console.log("✅ MongoDB connected");
        return cached.conn;
    } catch (error) {
        cached.promise = null; // Reset on error
        console.error("❌ MongoDB connection error:", error);
        throw error;
    }
}

export default connectDB;
