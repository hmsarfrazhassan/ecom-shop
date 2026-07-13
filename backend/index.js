import "./config/config.js";
import express from "express";
import cors from "cors";
import connectionDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
connectionDB();
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/v1/product", productRoutes);
app.use("/api/v1/auth", userRoutes);

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "PRODUCTION") {
  app.listen(PORT, () => {
    console.log(`Running on ${PORT}`);
  });
}

export default app;
