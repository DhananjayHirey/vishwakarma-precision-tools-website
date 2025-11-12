import { Router } from "express";
import { adminRoute, verifyJWT } from "../middlewares/auth.middleware.js";
import { createProduct, deleteProduct, getAllProducts, updateProductDetails, updateStock } from "../controllers/products.controller.js";

const router = Router();


router.use(verifyJWT, adminRoute);

router.route("/").get(getAllProducts).post(createProduct);

router.route("/:id").patch(updateProductDetails).delete(deleteProduct);
router.route("/:id/stock").patch(updateStock);

export default router;