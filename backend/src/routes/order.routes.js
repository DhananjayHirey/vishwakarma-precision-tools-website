import { Router } from "express";
import { verifyJWT, adminRoute } from "../middlewares/auth.middleware.js";

import {
  placeOrder,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/order.controller.js";


const router = Router();

router.post("/placeOrder", placeOrder);
router.use(verifyJWT,adminRoute)
router.get("/getAllOrders", getAllOrders);
router.patch("/updateOrderStatus", updateOrderStatus);


export default router;
