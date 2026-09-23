import {Router} from "express"
import {
  registerUser,
  loginUser,
  verifyOTP,
} from "../controllers/auth.controllers.js";
import {createProduct,getProducts} from "../controllers/product.controllers.js"



const router=Router()
router.post("/register",registerUser)
router.post("/login",loginUser)
router.post("/verify-otp", verifyOTP);



export default router;
