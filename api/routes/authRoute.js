import express from "express"
import { google, signin, signup } from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);

//signupcontroller
router.post("/signin", signin);

//googleController
router.post("/google", google);

//protected userRoute
router.get("/user-auth", requireSignIn,(req,res) =>{
    res.status(200).send({ok:true})
})
//protected adminRoute
router.get("/admin-auth", requireSignIn, isAdmin, (req, res)=>{
    res.status(200).send({ok:true});
})

export default router