import { Product } from "../models/product.models.js";

export const createProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      thumbnail,
      images,
      category,
      brand,
      stock,
      rating,
    } = req.body;

    if (
      !title ||
      !description ||
      price === undefined ||
      !thumbnail ||
      !category
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Title, description, price, thumbnail and category are required",
      });
    }

  const product = await Product.create({
    title,
    description,
    price,
    thumbnail,
    images,
    category,
    brand,
    stock,
    rating,
    seller: req.user.id,
  });

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while creating product",
    });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    return res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: products,
    });
  } catch (error) {
    console.error("❌ Get products error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while fetching products",
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      data: product,
    });
  } catch (error) {
    console.error("❌ Get product error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while fetching product",
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      description,
      price,
      thumbnail,
      images,
      category,
      brand,
      stock,
      rating,
    } = req.body;

    const updateData = {
      title,
      description,
      price,
      thumbnail,
      images,
      category,
      brand,
      stock,
      rating,
    };

    // Remove undefined values
    Object.keys(updateData).forEach((key) => {
      if (updateData[key] === undefined) {
        delete updateData[key];
      }
    });

    let product;

    if (req.user.role === "admin") {
      product = await Product.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      });
    } else {
      product = await Product.findOneAndUpdate(
        {
          _id: id,
          seller: req.user.id,
        },
        updateData,
        {
          new: true,
          runValidators: true,
        },
      );
    }

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found or you do not have permission to update it",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    console.error("❌ Update product error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while updating product",
    });
  }
};
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    let product;

    // Admin can delete any product
    if (req.user.role === "admin") {
      product = await Product.findByIdAndDelete(id);
    } else {
      // Seller can delete only their own product
      product = await Product.findOneAndDelete({
        _id: id,
        seller: req.user.id,
      });
    }

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found or you do not have permission to delete it",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: product,
    });
  } catch (error) {
    console.error("❌ Delete product error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while deleting product",
    });
  }
};
export const getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({
      seller: req.user.id,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Seller products fetched successfully",
      data: products,
    });
  } catch (error) {
    console.error("❌ Get seller products error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while fetching seller products",
    });
  }
};
