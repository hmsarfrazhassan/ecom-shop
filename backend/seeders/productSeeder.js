import mongoose from "mongoose";
import "../config/config.js";
import products from "./productData.js";
import Product from "../models/productModel.js";
import slugify from "slugify";

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);

    await Product.deleteMany();
    console.log("Product successfully deleted.");

    const productsWithSlug = products.map((product) => ({
      ...product,
      slug: slugify(product.name, { lower: true, strict: true }),
    }));

    await Product.insertMany(productsWithSlug);
    console.log("Product successfully Added.");
    process.exit();
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit();
  }
};

seedProducts();
