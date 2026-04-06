import mongoose from "mongoose";

const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error("❌ MONGO_URI is not set in .env — please check your .env file.");
    process.exit(1);
  }

  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    console.log("✅ MongoDB Connected:", uri.split("@").pop() || uri);
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    console.error("   → Is MongoDB running? Check README.md for setup instructions.");
    process.exit(1);
  }
};

export default connectDB;