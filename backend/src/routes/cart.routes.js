import { Router } from "express";
import { adminRoute, verifyJWT } from "../middlewares/auth.middleware.js";

import { upload } from "../middlewares/multer.middleware.js";
import { getCart } from "../controllers/products.controller.js";
const router = Router();

// router.use(verifyJWT, adminRoute);

router.route("/details").get(verifyJWT, getCart);

export default router;
