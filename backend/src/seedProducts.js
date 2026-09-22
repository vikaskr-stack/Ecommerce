import "dotenv/config";
import mongoose from "mongoose";
import dns from "dns";

import connectDB from "./db/connectDB.js";
import {Product} from "./models/product.models.js";
import {User} from "./models/user.models.js";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const seedProducts = async () => {
  try {
    await connectDB();

    // Find an existing admin/seller user
    const seller = await User.findOne({
      role: { $in: ["admin", "user"] },
    });

    if (!seller) {
      console.log("❌ No user found. Please register/login first.");
      process.exit(1);
    }

    console.log("Using seller:", seller.fullName || seller.username);

    // Remove existing products
    await Product.deleteMany({});

    const products = [
      {
        title: "iPhone 15",
        description:
          "Powerful smartphone with a 6.1-inch Super Retina display, advanced camera system, and USB-C connectivity.",
        price: 69999,
        thumbnail:
          "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800",
        images: [
          "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800",
          "https://images.unsplash.com/photo-1592286927505-6c7a6f0c6b8f?w=800",
        ],
        category: "smartphones",
        brand: "Apple",
        stock: 25,
        rating: 4.8,
        seller: seller._id,
      },

      {
        title: "Sony WH-1000XM5",
        description:
          "Premium wireless headphones with industry-leading noise cancellation and immersive sound.",
        price: 29990,
        thumbnail:
          "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800",
        images: [
          "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800",
          "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800",
        ],
        category: "audio",
        brand: "Sony",
        stock: 18,
        rating: 4.7,
        seller: seller._id,
      },

      {
        title: "MacBook Air M3",
        description:
          "Thin and powerful laptop with Apple M3 chip, long battery life, and a stunning Retina display.",
        price: 99999,
        thumbnail:
          "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800",
        images: [
          "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800",
          "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800",
        ],
        category: "laptops",
        brand: "Apple",
        stock: 12,
        rating: 4.9,
        seller: seller._id,
      },

      {
        title: "Samsung Galaxy Buds3 Pro",
        description:
          "Premium wireless earbuds with intelligent noise cancellation, rich audio, and a compact charging case.",
        price: 17999,
        thumbnail:
          "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=800",
        images: [
          "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=800",
          "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800",
        ],
        category: "audio",
        brand: "Samsung",
        stock: 30,
        rating: 4.5,
        seller: seller._id,
      },

      {
        title: "Apple Watch Series 9",
        description:
          "Smartwatch with health tracking, fitness features, notifications, and a bright always-on display.",
        price: 39999,
        thumbnail:
          "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800",
        images: [
          "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800",
          "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=800",
        ],
        category: "wearables",
        brand: "Apple",
        stock: 20,
        rating: 4.7,
        seller: seller._id,
      },

      {
        title: "Logitech MX Master 3S",
        description:
          "Advanced wireless productivity mouse with precise tracking, customizable buttons, and quiet clicks.",
        price: 7495,
        thumbnail:
          "https://images.unsplash.com/photo-1527814050087-3793815479db?w=800",
        images: [
          "https://images.unsplash.com/photo-1527814050087-3793815479db?w=800",
          "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800",
        ],
        category: "desk-setup",
        brand: "Logitech",
        stock: 35,
        rating: 4.6,
        seller: seller._id,
      },

      {
        title: "Mechanical RGB Keyboard",
        description:
          "Compact mechanical keyboard with RGB lighting, tactile switches, and a durable aluminum-style frame.",
        price: 4999,
        thumbnail:
          "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800",
        images: [
          "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800",
          "https://images.unsplash.com/photo-1595225476474-87563907a212?w=800",
        ],
        category: "desk-setup",
        brand: "Keychron",
        stock: 28,
        rating: 4.5,
        seller: seller._id,
      },

      {
        title: "Dell 27-inch 4K Monitor",
        description:
          "27-inch 4K monitor designed for productivity, content creation, and immersive entertainment.",
        price: 22999,
        thumbnail:
          "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800",
        images: [
          "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800",
          "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=800",
        ],
        category: "desk-setup",
        brand: "Dell",
        stock: 15,
        rating: 4.4,
        seller: seller._id,
      },

      {
        title: "iPad Air",
        description:
          "Lightweight tablet with a powerful processor, vivid display, and support for productivity and creative work.",
        price: 59999,
        thumbnail:
          "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800",
        images: [
          "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800",
          "https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?w=800",
        ],
        category: "tablets",
        brand: "Apple",
        stock: 17,
        rating: 4.8,
        seller: seller._id,
      },

      {
        title: "Anker Power Bank 20,000mAh",
        description:
          "High-capacity portable power bank with fast charging support and multiple charging ports.",
        price: 3499,
        thumbnail:
          "https://images.unsplash.com/photo-1609592424958-7f4e1e8e0d4a?w=800",
        images: [
          "https://images.unsplash.com/photo-1609592424958-7f4e1e8e0d4a?w=800",
          "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=800",
        ],
        category: "accessories",
        brand: "Anker",
        stock: 40,
        rating: 4.5,
        seller: seller._id,
      },
    ];

    await Product.insertMany(products);

    console.log("✅ 10 demo products added successfully!");
    console.log(`👤 Seller: ${seller.fullName || seller.username}`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding products:", error);
    process.exit(1);
  }
};

seedProducts();
