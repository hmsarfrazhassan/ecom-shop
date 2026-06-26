import express from "express";
import { getUsers, addUser } from "../controllers/userControllers.js";

const router = express.Router();

router.route("/").get(getUsers);
router.route("/").post(addUser);

export default router;
