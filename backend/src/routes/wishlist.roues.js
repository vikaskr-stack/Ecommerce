import { Router } from "express";

import {
 verifyJWT
} from "../middlewares/auth.middlewares.js";
import { addToWishlist,removeFromWishlist,getWishlist} from "../controllers/wishlist.controllers.js";

const router = Router();

router.post("/", verifyJWT,addToWishlist);
router.get("/", verifyJWT,getWishlist);

router.delete("/:productId", verifyJWT, removeFromWishlist);




export default router;