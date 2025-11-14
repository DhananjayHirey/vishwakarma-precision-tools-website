import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  orderList: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: Number,
    },
  ],
  orderingParty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  orderDate: Date,
  expectedDateByClient: Date,
  eta: Date || null,
  paymentStatus: Boolean,
  totalBilling: Number,
  orderStatus: String,
  // order Status can be Pending to be accepted, Manufacturing, Out for Delivery, Delivered,rejected
});

export const Order = mongoose.model("Order", orderSchema);
