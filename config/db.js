import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "variables.env" });

const conectaDB = async () => {
  try {
    await mongoose.connect(process.env.DB_MONGO);
    console.log("Database conectada correctamente");
  } catch (error) {
    console.log(error);
    process.exit(1); // detiene app de seguir ejecutandose
  }
};
export default conectaDB;
