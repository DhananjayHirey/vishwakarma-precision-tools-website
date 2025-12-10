import { Router } from "express";
import {
  addAddress,
  changeCurrentPassword,
  getCurrentUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  updateAccountDetails,
  updateUserAvatar,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router
  .route("/register")
  .post(upload.single("avatar"), registerUser);
router.route("/login").post(loginUser);

router.use(verifyJWT); //routes below this middleware are protected and contain user info in req.user
router.route("/logout").post(logoutUser);
router.route("/profile").get(getCurrentUser);
router.route("/change-password").patch(changeCurrentPassword);
router.route("/update-avatar").patch(upload.single("avatar"), updateUserAvatar);
router.route("/update-account").patch(updateAccountDetails);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/add-address").patch(upload.none(), addAddress);

export default router;
