import {Router} from "express"
import {
  registerUser,
  loginUser,
  makeAdmin
 
} from "../controllers/auth.controllers.js";
import {createProduct,getProducts} from "../controllers/product.controllers.js"



const router=Router()
router.post("/register",registerUser)
router.post("/login",loginUser)
router.patch("/make-admin", makeAdmin);





export default router;
