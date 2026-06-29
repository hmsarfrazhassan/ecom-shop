import express from "express";
import { getUsers, login, register } from "../controllers/userControllers.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";

const router = express.Router();

router.route("/").get(getUsers);
router.route("/register").post(register);
router.route("/login").post(login);
router.get("/me", isAuthenticated, (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
});

export default router;
