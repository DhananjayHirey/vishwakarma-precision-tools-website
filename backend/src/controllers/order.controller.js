import { Product } from "../models/product.model.js";
import { User } from "../models/user.model.js";
import { Order } from "../models/orders.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

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

export { getAllOrders };
