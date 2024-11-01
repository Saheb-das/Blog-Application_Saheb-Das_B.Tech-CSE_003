// external import
import mongoose from "mongoose";

function connectDB(connectionStr: string) {
  return mongoose.connect(connectionStr);
}

export default connectDB;
