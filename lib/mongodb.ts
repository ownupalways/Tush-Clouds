import mongoose from "mongoose"; // This is used for the actual .connect call below

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error("❌ Please define the MONGODB_URI environment variable");
}

// 1. Explicitly use 'typeof mongoose' in the interface
interface MongooseCache {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
}

// 2. Augment the global scope
declare global {
    var mongooseCache: MongooseCache | undefined;
}

// 3. Initialize the cache
let cached = global.mongooseCache;

if (!cached) {
    cached = global.mongooseCache = {
        conn: null,
        promise: null,
    };
}

async function connectDB(): Promise<typeof mongoose> {
    if (cached!.conn) {
        return cached!.conn;
    }

    if (!cached!.promise) {
        console.log("📡 Initializing MongoDB connection...");
        
        // Logic: Directly using the 'mongoose' import here clears the "unused" warning
        cached!.promise = mongoose
            .connect(MONGODB_URI!, {
                bufferCommands: true,
            })
            .then((m) => m);
    }

    try {
        const conn = await cached!.promise;
        cached!.conn = conn;

        const { host, name } = conn.connection;
        console.log("-----------------------------------------");
        console.log(`✅ DATABASE CONNECTED`);
        console.log(`🏠 Host: ${host}`);
        console.log(`📂 Database: ${name}`);
        console.log("-----------------------------------------");

        return cached!.conn;
    } catch (error: unknown) {
        cached!.promise = null;
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        console.error("❌ MONGODB CONNECTION ERROR:", errorMessage);
        throw error;
    }
}

export default connectDB;
