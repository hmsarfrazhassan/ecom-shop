import "./config/config.js";
import express from "express";
import connectionDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
connectionDB();
const app = express();

app.use(express.json());

app.use("/api/v1/product", productRoutes);
app.use("/api/v1/user", userRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("app is running on the port", PORT);
});
