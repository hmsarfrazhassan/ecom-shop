import User from "../models/userModel.js";
import bcrypt from "bcrypt";

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
    const hashPassword = await bcrypt.hash(10, password);
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "Use other email address",
      });
    }
    const newUser = await User.create({ username, email, hashPassword });
    return res.status(201).json({
      success: true,
      data: newUser,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getUser = async (req, res) => {};

export const deleteUser = async (req, res) => {};

export const updateUser = async (req, res) => {};
