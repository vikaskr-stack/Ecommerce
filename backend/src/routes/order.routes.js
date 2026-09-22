import { Router } from "express";

import {
 verifyJWT
} from "../middlewares/auth.middlewares.js";
import { createOrder,getMyOrders,getOrderById,cancelOrder} from "../controllers/order.controllers.js";

const router = Router();

router.post("/", verifyJWT,createOrder);
router.get("/", verifyJWT,getMyOrders);
router.get("/:orderId", verifyJWT,getOrderById);
router.delete("/:orderId", verifyJWT, cancelOrder);




export default router;