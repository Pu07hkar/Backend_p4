import { Router } from "express";
import {registerUser} from "../controllers/user.controller.js"
import upload from "../middlewares/multer.middleware.js"

const router = Router();

const files = upload.fields([{name: "avatar", maxCount:1},{name:"coverImage",maxCount:1}])

router.route("/register").post(files,registerUser);


export default router;