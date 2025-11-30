import express from "express";
const router = express.Router();
import { createOrder, verifyPayment } from "../controllers/payments.controller";

router.post("/createOrder", createOrder);
router.post("/verifyPayment", verifyPayment);

export default router;
