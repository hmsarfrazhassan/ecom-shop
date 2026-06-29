import express from "express";
import {
  getProducts,
  getProduct,
  addProduct,
  deleteProduct,
  updateProduct,
} from "../controllers/productController.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";
const router = express.Router();

router.route("/").get(getProducts);
router.route("/:id").get(getProduct);
router.route("/").post(authorizeRoles("admin"), addProduct);
router.route("/:id").put(authorizeRoles("admin"), updateProduct);
router.route("/:id").delete(authorizeRoles("admin"), deleteProduct);

export default router;
