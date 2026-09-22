import {Router} from "express"
import {registerUser,loginUser,makeAdmin} from "../controllers/auth.controllers.js"
import {createProduct,getProducts} from "../controllers/product.controllers.js"



const router=Router()
router.patch("/make-admin", makeAdmin);
router.post("/register",registerUser)
router.post("/login",loginUser)



export default router;
