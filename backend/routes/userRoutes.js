import express from "express";
import {
  getUsers,
  login,
  register,
  resetPassword,
  updatePassword,
  updateProfile,
  updateResetPassword,
} from "../controllers/userControllers.js";
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
router.route("/me/update/profile").post(isAuthenticated, updateProfile);
router.route("/me/update/password").post(isAuthenticated, updatePassword);
router.route("/reset-password").post(resetPassword);
router.route("/reset-password/:token").put(updateResetPassword);

export default router;
