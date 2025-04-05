// import mongoose from "mongoose"



// const connectDB = async () => {

//   mongoose.connection.on('connected', () => console.log('mongose connected'))
//   mongoose.connect(`${process.env.MONGODB_URL}/prescripto`)


// }

// export default connectDB;

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    mongoose.connection.on('connected', () => console.log('MongoDB connected successfully'));
    await mongoose.connect(process.env.MONGODB_URL);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;
