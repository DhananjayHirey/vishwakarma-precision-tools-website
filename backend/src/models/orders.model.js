import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  orderList: [
    {
      product: {
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
  shippingAddress: String,
  TIN: String,
  email: String,
  orderDate: Date,
  expectedDateByClient: { type: Date, default: null },
  eta: { type: Date, default: null },
  paymentStatus: Boolean,
  totalBilling: Number,
  orderStatus: {
    type: String,
    enum: [
      "pending",
      "manufacturing",
      "out for delivery",
      "delivered",
      "rejected",
    ],
    default: "pending",
  },
  // order Status can be Pending to be accepted, Manufacturing, Out for Delivery, Delivered,rejected
  isCustomOrder: { type: Boolean, default: false },
  customOrderDetails: {
    type: String,
    default: "",
  },
  customOrderAttachment:{
    type: String,
    default: "",
  },
  customOrderReviewStatus:{
    type: String,
    enum: ["pending","approved","rejected"],
    default:"pending",
  }
});

export const Order = mongoose.model("Order", orderSchema);
