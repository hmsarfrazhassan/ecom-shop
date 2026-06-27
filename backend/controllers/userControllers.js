import User from "../models/userModel.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users.length) {
      return res.status(400).json({
        success: false,
        message: "Users not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const addUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username && !email && !password) {
      return res.status(400).json({
        success: false,
        message: "Username, email address and password are required",
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "Use other email address",
      });
    }
    const newUser = await User.create({ username, email, password });
    return res.status(201).json({
      success: true,
      data: newUser,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        errors,
      });
    }
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(404).json({
        success: false,
        message: "User id is required.",
      });
    }
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not exist",
      });
    }
    return res.ststus(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(404).json({
        success: false,
        message: "User id is required.",
      });
    }
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not exist",
      });
    }
    return res.ststus(200).json({
      success: true,
      message: "User successfully deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(404).json({
        success: false,
        message: "User id is required.",
      });
    }
    const user = await User.findByIdAndUpdate(id, req.body, {
      runValidators: true,
      returnDocument: "after",
      context: "query",
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not exist",
      });
    }
    return res.ststus(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
