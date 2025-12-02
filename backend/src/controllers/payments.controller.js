import { createRazorpayInstance } from "../config/razorpay.config.js";
import crypto from "crypto";
import { Product } from "../models/product.model.js";
import { calculatePrice } from "../utils/calculatePrice.js";
const razorpayInstance = createRazorpayInstance();

// order format -->
// [
//     {
//         productId:string,
//         quantity:number
//     }
// ]

export const createOrder = async (req, res) => {
  // console.log(res);
  // return;

  const { orderObject } = req.body;
  // console.log(orderObject);
  // calculate amount
  const amount = await calculatePrice(orderObject);
  if (amount === NaN) {
    return res.status(500).json({
      success: false,
      message: "Some error occured while placing the order please try again",
    });
  }

  const options = {
    amount: amount * 100,
    currency: "INR",
    receipt: "receipt_order_1",
  };
  try {
    razorpayInstance.orders.create(options, (err, order) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Something went wrong",
        });
      }
      return res.status(200).json(order);
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const verifyPayment = async (req, res) => {
  const { order_id, payment_id, signature } = req.body;
  const secret = process.env.RZP_TEST_KEY_SECRET;
  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(order_id + "|" + payment_id);
  const generatedSignature = hmac.digest("hex");

  if (generatedSignature === signature) {
    // db operations on payment successful
    return res.status(200).json({
      success: true,
      message: "Payment verified",
    });
  } else {
    return res.status(400).json({
      success: false,
      message: "Payment not verified",
    });
  }
};
