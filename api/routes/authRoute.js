import express from "express"
import { google, signin, signup } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);

//signupcontroller
router.post("/signin", signin);

//googleController
router.post("/google", google);

export default router