import { Router } from "express";
import { adminRoute, verifyJWT } from "../middlewares/auth.middleware.js";
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProductDetails, updateStock } from "../controllers/products.controller.js";
import { upload } from '../middlewares/multer.middleware.js'
const router = Router();


router.use(verifyJWT, adminRoute);

router.route("/").get(getAllProducts).post(upload.single('productImage'), createProduct);

router.route("/:id").patch(updateProductDetails).delete(deleteProduct).get(getProductById);
router.route("/:id/stock").patch(updateStock);

export default router;