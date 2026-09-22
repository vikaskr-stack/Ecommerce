import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import jwt from "jsonwebtoken";
import { verifyJWT } from "./middlewares/auth.middlewares.js";
import productRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import wishlistRoutes from "./routes/wishlist.roues.js";
import orderRoutes from "./routes/order.routes.js";
const app = express();

const allowedOrigins = [
  process.env.CORS_ORIGIN,
  "http://localhost:5173",
  "http://127.0.0.1:5173",
];

app.use(
  cors({
    origin: (origin, callback) => {
      console.log("🌐 Request Origin:", origin);

      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("❌ Blocked Origin:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/wishlist", wishlistRoutes);
app.use("/api/v1/orders", orderRoutes);

app.get("/api/v1/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "E-commerce Api is running",
  });
});

app.get("/api/v1/auth/test", verifyJWT, (req, res) => {
  res.status(200).json({
    success: true,
    message: "JWT authentication is running",
    user: req.user,
  });
});

export { app };
