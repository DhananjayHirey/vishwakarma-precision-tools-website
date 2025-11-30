import express from "express";
const router = express.Router();
// import {
//   createOrder,
//   verifyPayment,
// } from "../controllers/payments.controller.js";

import {
  createOrder,
  verifyPayment,
} from "../controllers/payments.controller.js";

router.post("/createOrder", createOrder);
router.post("/verifyPayment", verifyPayment);

export default router;
