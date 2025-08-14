import mongoose from "mongoose";

const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) return;

    try {
        await mongoose.connect(process.env.MONGODB_URI!, {
            dbName: process.env.MONGODB_DB,
        });
        console.log("✅ MongoDB connected");
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.log("❌ MongoDB connection failed:", err.message);
        } else {
            console.log("❌ Unknown MongoDB error:", err);
        }
    }
};

export default connectDB;
