import Product from "../models/productModel.js";
import ApiFeatures from "../utils/apiFeatures.js";

export const getProducts = async (req, res) => {
  try {
    const resultPerPage = Number(req.query.limit) || 10;
    const apiFeatures = new ApiFeatures(Product.find(), req.query)
      .search()
      .filter()
      .pagination(resultPerPage);

    const products = await apiFeatures.query;
    return res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

export const getProduct = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Product id is required",
      });
    }
    const product = await Product.findById(id);
    if (!product) {
      return res.status(400).json({
        success: false,
        data: "Product not found",
      });
    }
    return res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

export const addProduct = async (req, res) => {
  try {
    const { name, price, description, category, seller, stock } = req.body;
    const product = await Product.findOne({ name });
    if (product) {
      return res.status(400).json({
        success: false,
        data: "product already exist with this name",
      });
    }
    const newProduct = await Product.create(req.body);

    return res.status(200).json({
      success: true,
      data: newProduct,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        errors,
      });
    }
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Product id is required",
      });
    }
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      returnDocument: "after",
      runValidators: true,
      context: "query",
    });
    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "No product found on this id",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Product name already exists",
      });
    }
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Product id is required",
      });
    }
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Product successfully deleted",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
