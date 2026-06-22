import mongoose from "mongoose";

const connectionDB = async () => {
  const conn = await mongoose.connect(process.env.DB_URI);
  console.log(`DB connection is estiblished on hose ${conn.connection.host}`);
};

export default connectionDB;
