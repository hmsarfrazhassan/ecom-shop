import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"],
      minlength: [3, "User name minimum 3 chracter long"],
      maxlength: [20, "Username meximum length is 20 chracters"],
      match: [/^[a-zA-Z ]+$/, "Alphabets are allowed chracters"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please enter a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password minimum 6 chracter long"],
      maxlength: [20, "Password meximum length is 20 chracters"],
      match: [/^[a-zA-Z0-9]+$/, "Only letters and numbers are allowed"],
      trim: true,
      select: false,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.pre("findOneAndUpdate", async function () {
  const update = this.getUpdate();

  if (!update.password) return;

  update.password = await bcrypt.hash(update.password, 10);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};
export default mongoose.model("User", userSchema);
