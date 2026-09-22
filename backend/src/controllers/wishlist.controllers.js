import mongoose from "mongoose";
import { Wishlist } from "../models/wishlist.models.js";
import { Product } from "../models/product.models.js";

export const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product Id",
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(400).json({
        success: false,
        message: "Product not found",
      });
    }

    let wishlist = await Wishlist.findOne({
      user: req.user.id,
    });

    // First wishlist for this user
    if (!wishlist) {
      wishlist = await Wishlist.create({
        user: req.user.id,
        products: [productId],
      });

      return res.status(201).json({
        success: true,
        message: "Product added to wishlist",
        data: wishlist,
      });
    }

    // Check duplicate
    const alreadyExists = wishlist.products.some(
      (product) => product.toString() === productId,
    );

    if (alreadyExists) {
      return res.status(400).json({
        success: false,
        message: "Product is already in wishlist",
      });
    }

    wishlist.products.push(productId);

    await wishlist.save();

    return res.status(200).json({
      success: true,
      message: "Product added to wishlist",
      data: wishlist,
    });
  } catch (error) {
    console.error("❌ Add to wishlist error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while adding product to wishlist",
    });
  }
};
export const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const wishlist = await Wishlist.findOne({
      user: req.user.id,
    });

    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: "Wishlist not found",
      });
    }

    const productExists = wishlist.products.some(
      (product) => product.toString() === productId,
    );

    if (!productExists) {
      return res.status(404).json({
        success: false,
        message: "Product not found in wishlist",
      });
    }

    wishlist.products = wishlist.products.filter(
      (product) => product.toString() !== productId,
    );

    await wishlist.save();

    return res.status(200).json({
      success: true,
      message: "Product removed from wishlist",
      data: wishlist,
    });
  } catch (error) {
    console.error("❌ Remove from wishlist error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while removing product from wishlist",
    });
  }
};
export const getWishlist = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);

    const wishlist = await Wishlist.aggregate([
      {
        $match: {
          user: userId,
        },
      },

      {
        $unwind: {
          path: "$products",
          preserveNullAndEmptyArrays: true,
        },
      },

      {
        $lookup: {
          from: "products",
          localField: "products",
          foreignField: "_id",
          as: "productDetails",
        },
      },

      {
        $unwind: {
          path: "$productDetails",
          preserveNullAndEmptyArrays: true,
        },
      },

      {
        $group: {
          _id: "$_id",
          user: {
            $first: "$user",
          },
          products: {
            $push: "$productDetails",
          },
          createdAt: {
            $first: "$createdAt",
          },
          updatedAt: {
            $first: "$updatedAt",
          },
        },
      },
    ]);

    if (wishlist.length === 0) {
      return res.status(200).json({
        success: true,
        message: "Wishlist is empty",
        data: {
          products: [],
        },
      });
    }

    return res.status(200).json({
      success: true,
      message: "Wishlist fetched successfully",
      data: wishlist[0],
    });
  } catch (error) {
    console.error("❌ Get wishlist error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while fetching wishlist",
    });
  }
};
