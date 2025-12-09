import express from "express";
const router = express.Router();

import {
  createOrder,
  verifyPayment,
} from "../controllers/payments.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

router.post("/createOrder", verifyJWT, createOrder);
router.post("/verifyPayment", verifyJWT, verifyPayment);

export default router;
