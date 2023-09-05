import mongoose from "mongoose";

export async function connectDb() {
  try {
    mongoose.connect(process.env.MONGO_URL!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log(`mongodb connected successfully`);
    });
    connection.on("error", (error) => {
      console.log(`mongodb connection is in error the error is ${error}`);
      process.exit();
    });
  } catch (error) {
    console.log(error);
  }
}
