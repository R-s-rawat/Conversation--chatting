import mongoose, { mongo } from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("Already connected to database");
    return;
  }
  // if database is not connected, then connect to database (as nextJS is edge time, UNCONTINUOUS)
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || '', {})
    connection.isConnected = db.connections[0].readyState

    console.log("DB connected successfully")
  } catch (error) {
    console.log("DB connection failed", error)
    process.exit(1)
  }
}

export default dbConnect;