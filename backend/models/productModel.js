import mongoose from "mongoose";
import generateSlug from "../utils/generateSlug.js";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product title is required"],
      maxlength: [200, "Product name can not exceed 200 chracters."],
      unique: true,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      maxlength: [5, "Product price can not exceed 5 digits"],
    },
    description: {
      type: String,
      required: [true, "Production description is required"],
    },
    slug: {
      type: String,
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    ratings: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      required: [true, "Product category is required"],
      enum: {
        values: [
          "Laptops",
          "Mobiles",
          "Electronics",
          "Sports",
          "Outdoor",
          "Indoor",
          "Headphones",
          "Accessories",
          "Cameras",
          "Food",
        ],
        message: "Select a correct category.",
      },
    },
    seller: {
      type: String,
      required: [true, "Seller is required"],
    },
    stock: {
      type: Number,
      required: [true, "Stockpile amount is required"],
      default: 0,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        // user: {
        //   type: mongoose.Schema.Types.ObjectId,
        //   ref: "User",
        //   required: [true],
        // },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   required: [true, "User is required"],
    // },
  },
  { timestamps: true },
);

productSchema.pre("save", function () {
  this.slug = generateSlug(this.name);
});

productSchema.pre("findOneAndUpdate", function () {
  const update = this.getUpdate();

  if (update.name) {
    update.slug = generateSlug(update.name);
  }
});

export default mongoose.model("Product", productSchema);
