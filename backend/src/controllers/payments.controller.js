import { createRazorpayInstance } from "../config/razorpay.config.js";
import crypto from "crypto";
import { Product } from "../models/product.model.js";
import { calculatePrice } from "../utils/calculatePrice.js";
import { User } from "../models/user.model.js";
import { Order } from "../models/orders.model.js";
import { sendReceipt } from "../utils/sendReceipt.js";
const razorpayInstance = createRazorpayInstance();

// order format -->
// [
//     {
//         productId:string,
//         quantity:number
//     }
// ]

export const createOrder = async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId);
  const orderObject = user.cartItems;
  const amount = await calculatePrice(orderObject);
  // console.log(amount);
  if (isNaN(amount) || amount <= 0) {
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
    await razorpayInstance.orders.create(options, (err, order) => {
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
  const {
    order_id,
    payment_id,
    signature,
    email,
    shippingAddress,
    orderDate,
    eta,
    totalBilling,
    TIN,
  } = req.body;
  const secret = process.env.RZP_TEST_KEY_SECRET;
  const hmac = crypto.createHmac("sha256", secret);
  const userId = req.user._id;
  const user = await User.findById(userId);
  const orderObject = user.cartItems;
  // console.log(orderObject);
  hmac.update(order_id + "|" + payment_id);
  const generatedSignature = hmac.digest("hex");

  if (generatedSignature === signature) {
    const mailObject = [];

    for (const oo of orderObject) {
      const p = await Product.findByIdAndUpdate(
        oo.product,
        {
          $inc: { sales: oo.quantity },
        },
        { new: true }
      );

      mailObject.push({
        name: p.name,
        quantity: oo.quantity,
        price: p.price,
      });
    }

    const order = await Order.create({
      email,
      shippingAddress,
      orderDate,
      eta,
      totalBilling,
      TIN,
      orderList: orderObject,
      orderingParty: userId,
      paymentStatus: true,
    });

    if (order) {
      user.cartItems = [];
      user.save();
      await sendReceipt(email, order._id, totalBilling, mailObject);
      return res.status(200).json({
        success: true,
        message: "Payment verified",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Payment not verified",
    });
  }
};
