import "./config/config.js";
import express from "express";
import connectionDB from "./config/db.js";

connectionDB();
const app = express();

console.log("port", process.env.PORT);
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("app is running on the port", PORT);
});
