import express from "express";
import {
  getProducts,
  getProduct,
  addProduct,
  deleteProduct,
  updateProduct,
} from "../controllers/productController.js";
const router = express.Router();

router.route("/").get(getProducts);
router.route("/:id").get(getProduct);
router.route("/").post(addProduct);
router.route("/:id").put(updateProduct);
router.route("/:id").delete(deleteProduct);

export default router;
