import { Router } from "express";
import { adminRoute, verifyJWT } from "../middlewares/auth.middleware.js";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProductDetails,
  updateStock,
} from "../controllers/products.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = Router();

// router.use(verifyJWT, adminRoute);

router
  .route("/")
  .get(verifyJWT, getAllProducts)
  .post(upload.single("productImage"), verifyJWT, adminRoute, createProduct);

router
  .route("/:id")
  .patch(verifyJWT, adminRoute, updateProductDetails)
  .delete(verifyJWT, adminRoute, deleteProduct)
  .get(verifyJWT, getProductById);
router.route("/:id/stock").patch(verifyJWT, adminRoute, updateStock);

export default router;
