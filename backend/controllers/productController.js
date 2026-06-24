import Product from "../models/productModel.js";

export const getProducts = async (req, res) => {
  try {
    const allProducts = await Product.find();
    if (!allProducts.length) {
      return res.status(400).json({
        success: false,
        message: "Products not found",
      });
    }
    return res.status(200).json({
      success: true,
      count: allProducts.length,
      data: allProducts,
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
    if (!name && !price && !description && !category && !seller && !stock) {
      return res.status(400).json({
        success: false,
        message:
          "name, price, description, category, seller and stock fields are required",
      });
    }
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
    return res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

export const updateProduct = async (req, res) => {
  const indexes = await Product.collection.indexes();
  console.log(indexes);
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
