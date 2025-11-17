import { Product } from "../models/product.model.js";
import { User } from "../models/user.model.js";
import { Order } from "../models/orders.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find()
    .populate({
      path: "orderList.productId",
      select: "name price description",
    })
    .populate({
      path: "orderingParty",
      select: "name email",
    });

  res
    .status(200)
    .json(new ApiResponse(200, orders, "Orders fetched successfully"));
});

const placeOrder = asyncHandler(async (req, res) => {
  const orderObject = req.body;
  // {
  //   orderList:[
  //     {
  //       productId:,
  //       quantity:,
  //     }
  //   ],
  //   orderingParty:userID,
  //   expectedDateByClient:,
  //   paymentStatus:,
  //   totalBilling:,
  //   orderStatus:
  // TOTAL BILLING WILL BE CALCULATED FROM THE CLIENT SIDE
  // }
  // }
  (orderObject.eta = null), (orderObject.orderStatus = "pending");
  orderObject.orderDate = Date.now();
  const order = await Order.create(orderObject);
  if (!order) {
    throw new ApiError(400, "Failed to place order");
  }
  res
    .status(200)
    .json(new ApiResponse(201, order, "Order placed successfully!"));
});

const updateOrderStatus = asyncHandler(async (req, res) => {
  const { orderId, statusString } = req.body;
  const order = await Order.findById(orderId);
  if (!order) {
    throw new ApiError(400, "Could not find order");
  }
  order.orderStatus = statusString;
  await order.save();
  res
    .status(200)
    .json(new ApiResponse(200, order, "Order Status updated successfully"));
});

export { getAllOrders, placeOrder, updateOrderStatus };
