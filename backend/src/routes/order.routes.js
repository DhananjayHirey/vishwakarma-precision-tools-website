import { Router } from "express";
import { verifyJWT, adminRoute } from "../middlewares/auth.middleware.js";

import {
  placeOrder,
  getAllOrders,
  updateOrderStatus,
  updatePaymentStatus,
  placeCustomOrder,
  getAllCustomOrders,
  updateCustomOrderStatus,
} from "../controllers/order.controller.js";
import { upload } from "../middlewares/multer.middleware.js";


const router = Router();

router.use(verifyJWT)
router.post("/placeOrder", placeOrder);
router.post('/placeCustomOrder', upload.single('customOrderAttachment'), placeCustomOrder);
router.get("/getAllOrders", getAllOrders);
router.patch("/updateOrderStatus",adminRoute, updateOrderStatus);
router.patch("/updateCustomOrderStatus",adminRoute, updateCustomOrderStatus);
router.patch('/updatePaymentStatus',adminRoute, updatePaymentStatus)
router.get('/getAllCustomOrders', getAllCustomOrders);
export default router;
