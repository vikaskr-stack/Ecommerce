import {Router} from "express"
import {
  registerUser,
  loginUser,
  makeAdmin,forgotPassword,
  resetPassword
 
} from "../controllers/auth.controllers.js";
import {createProduct,getProducts} from "../controllers/product.controllers.js"



const router=Router()
router.post("/register",registerUser)
router.post("/login",loginUser)
router.patch("/make-admin", makeAdmin);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);




export default router;
