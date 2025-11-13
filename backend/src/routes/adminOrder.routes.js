import { Router } from "express";
import { verifyJWT, adminRoute } from "../middlewares/auth.middleware.js";

import { getAllOrders } from "../controllers/order.controller.js";

const router = Router();

router.get("/getAllOrders", getAllOrders);

export default router;
