import { Router } from "express";
import { adminRoute, verifyJWT } from "../middlewares/auth.middleware.js";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProductDetails,
  updateStock,
  addToCart,
  removeFromCart,
  getCart,
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

router.route("/addToCart").post(verifyJWT, addToCart);
router.route("/removeFromCart").post(verifyJWT, removeFromCart);
router.route("/cart/details").get(verifyJWT, getCart);

export default router;
