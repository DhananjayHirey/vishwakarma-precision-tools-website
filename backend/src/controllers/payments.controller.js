import { createRazorpayInstance } from "../config/razorpay.config";
import crypto from "crypto";
import { Product } from "../models/product.model";
const razorpayInstance = createRazorpayInstance();

// order format -->
// [
//     {
//         productId:string,
//         quantity:number
//     }
// ]

export const createOrder = async (req, res) => {
  const { orderObject } = req.body;
  // calculate amount
  let amount = 0.0;
  try {
    for (let i = 0; i < orderObject.length; i += 1) {
      let prodPrice = await Product.findById(orderObject[i]?.productId);
      prodPrice *= orderObject[i].quantity;
      amount += prodPrice;
    }
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "Some error occured in placing the order...",
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
