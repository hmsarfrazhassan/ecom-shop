import User from "../models/userModel.js";
import getJwtToken from "../models/userModel.js";
import nodemailer from "nodemailer";
import { resetPasswordTemplate } from "../utils/resetPasswordTemplate.js";

// import fs from "fs";
// import path from "path";

// const htmlPath = path.resolve("./backend/utils/resetPasswordTemplate.html");
// console.log("html path", htmlPath);
// const htmlContent = fs.readFileSync(htmlPath, "utf-8");

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

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "Use other email address",
      });
    }
    const newUser = await User.create({ username, email, password });
    const token = newUser.getJwtToken();
    return res.status(201).json({
      success: true,
      token,
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

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    const token = user.getJwtToken();
    return res.status(200).json({
      success: true,
      token,
    });
  } catch (error) {
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

export const updateProfile = async (req, res) => {
  try {
    const { username } = req.body;
    const { id } = req.user;
    if (!username) {
      return res.status(400).json({
        success: false,
        message: "Username is required",
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
    const token = user.getJwtToken();
    return res.status(200).json({
      success: true,
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const { id } = req.user;
    const user = await User.findById(id).select("+password");
    const isPasswordCorrect = await user.comparePassword(oldPassword);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password",
      });
    }
    user.password = newPassword;
    await user.save();
    return res.status(201).json({
      success: true,
      message: "Password successfully updated.",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAILPASSWORD,
  },
});

export const resetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(200).json({
        success: true,
        youfrom: "!existing",
        message:
          "If an account with that email exists, we've sent password reset instructions.",
      });
    }

    const resetToken = existingUser.getResetPasswordToken();
    resetPasswordTemplate(resetToken);

    const resetLink = `http://localhost:5555/api/v1/auth/reset-password/${resetToken}`;
    await existingUser.save({ validateBeforeSave: false });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Reset password",
      html: resetPasswordTemplate(resetLink),
    });

    return res.status(200).json({
      success: true,
      youfrom: "existing",
      message:
        "If an account with that email exists, we've sent password reset instructions.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateResetPassword = async (req, res) => {
  try {
  } catch (error) {}
};
