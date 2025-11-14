import { Router } from "express";
import { verifyJWT, adminRoute } from "../middlewares/auth.middleware.js";

import {
  placeOrder,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/order.controller.js";

const router = Router();

router.get("/getAllOrders", verifyJWT, adminRoute, getAllOrders);
router.post("/placeOrder", placeOrder);
router.patch("/updateOrderStatus", verifyJWT, adminRoute, updateOrderStatus);

export default router;
