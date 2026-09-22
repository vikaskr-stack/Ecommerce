import { Router } from "express";

import {
 verifyJWT
} from "../middlewares/auth.middlewares.js";
import { addToCart,getCart ,updateCartItem,removeFromCart} from "../controllers/cart.controlllers.js";

const router = Router();

router.post("/", verifyJWT,addToCart);
router.get("/", verifyJWT,getCart);
router.put("/", verifyJWT,updateCartItem);
router.delete("/:productId", verifyJWT, removeFromCart);



export default router;