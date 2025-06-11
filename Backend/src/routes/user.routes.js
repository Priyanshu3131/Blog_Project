import {Router} from "express";
import {registerUser} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { loginUser } from "../controllers/user.controller.js";
import { logoutUser,refreshAccessToken } from "../controllers/user.controller.js";
const router = Router()

router.route("/register").post(
    upload.fields([ // many arrays 
        {
            name: "avatar",
            maxCount: 1
        }, 
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser
    )

router.route("/login").post(loginUser)
//secured routes
router.route("/logout").post(verifyJWT,  logoutUser) // verifyJWT(middleware)
router.route("/refresh-token").post(refreshAccessToken) // No need of verifyJWT here

export default router;