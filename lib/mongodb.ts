import mongoose from "mongoose";

const MONGODB_URI = process.env.NODE_ENV === "production" 
  ? process.env.MONGO_PROD 
  : process.env.MONGO_DEV;

if (!MONGODB_URI) {
  throw new Error("⚠️ Please define the MONGO_DEV and MONGO_PROD environment variables");
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache;
}

let cached = global.mongoose || { conn: null, promise: null };

export async function connectDB() {
  if (cached.conn) {
    console.log("✅ Using existing MongoDB connection");
    return cached.conn;
  }

  if (!cached.promise) {
    console.log(`🔗 Connecting to MongoDB: ${MONGODB_URI}`);
    const opts = { bufferCommands: false };

    if (!MONGODB_URI) {
      throw new Error("⚠️ MongoDB URI is undefined");
    }
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log("✅ MongoDB Connected Successfully");
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    console.error("❌ MongoDB Connection Error:", error);
    throw error;
  }

  return cached.conn;
}
