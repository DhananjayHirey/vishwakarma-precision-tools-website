import path from 'path'
import { Order } from "../models/orders.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { APP_NAME } from "../constants.js";
import { getSignedUrlFromCloudinary, uploadToCloudinary } from "../utils/cloudinary.js";

const getAllOrders = asyncHandler(async (req, res) => {
  const isAdmin = req.user.role === "admin";
  const orders = await Order.find(isAdmin ? {} : { orderingParty: req.user._id,isCustomOrder:false })
    .populate({
      path: "orderList.product",
      select: "name price description",
    })
    .populate({
      path: "orderingParty",
      select: "name email",
    }).sort({ orderDate: -1 });

  res
    .status(200)
    .json(new ApiResponse(200, orders, "Orders fetched successfully"));
});

const getAllCustomOrders = asyncHandler(async (req, res) => {
  const isAdmin = req.user.role === "admin";

  const filter = { isCustomOrder: true };
  if (!isAdmin) filter.orderingParty = req.user._id;

  const orders = await Order.aggregate([
    { $match: filter },
    {
      $lookup: {
        from: "users",
        localField: "orderingParty",
        foreignField: "_id",
        as: "user"
      }
    },
    { $unwind: "$user" },
    {
      $project: {
        _id: 1,
        customOrderDetails: 1,
        customOrderAttachment: 1,
        customOrderReviewStatus: 1,
        orderDate: 1,
        orderingParty: {
          name: "$user.name",
          email: "$user.email",
          _id: "$user._id"
        }
      }
    },
    { $sort: { orderDate: -1 } }
  ]);

  const signedOrders = await Promise.all(orders.map(async (order) => {
    let signedAttachmentUrl = null;
    if (order.customOrderAttachment && order.customOrderAttachment.trim() !== "") {
      const signedUrlResult = await getSignedUrlFromCloudinary(
        order.customOrderAttachment,
        "auto",
        "authenticated")
      signedAttachmentUrl = signedUrlResult;
    }
    return {
      ...order,
      signedAttachmentUrl,
    };
  }));

  res.status(200).json(new ApiResponse(200, signedOrders, "Custom Orders fetched successfully"));
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

const placeCustomOrder = asyncHandler(async (req, res) => {
  const { orderingParty, customOrderDetails, expectedDateByClient } = req.body;

  if (!orderingParty || !customOrderDetails) {
    throw new ApiError(400, "Missing required fields");
  }

  const attachmentPath = req.file?.path;
  let uploadedAttachment = null;

  if (attachmentPath) {
    uploadedAttachment = await uploadToCloudinary(
      attachmentPath,
      `${APP_NAME}/custom_orders/${orderingParty}-${Date.now()}`,
      path.basename(attachmentPath),
      "auto",
      "authenticated"
    );
  }

  const order = await Order.create({
    orderingParty,
    customOrderDetails,
    expectedDateByClient: expectedDateByClient ? new Date(expectedDateByClient) : null,
    isCustomOrder: true,
    customOrderStatus: "pending-review",
    orderStatus: null, // not a real order yet
    paymentStatus: false,
    totalBilling: null,
    customOrderAttachment: uploadedAttachment?.public_id || null,
    orderDate: new Date(),
  });

  return res.status(201).json(new ApiResponse(201, order, "Request submitted."));
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

const updateCustomOrderStatus = asyncHandler(async (req, res) => {
  const { orderId, totalBilling,eta, customOrderReviewStatus } = req.body;
  const order = await Order.findById(orderId);
  if (!order) {
    throw new ApiError(400, "Could not find order");
  }
  order.customOrderReviewStatus = customOrderReviewStatus;
  order.totalBilling = totalBilling || order.totalBilling;
  order.eta = eta || order.eta;
  await order.save();
  res
    .status(200)
    .json(new ApiResponse(200, order, "Custom Order Status updated successfully"));
});
const updatePaymentStatus = asyncHandler(async (req, res) => {
  const { orderId, paymentStatus } = req.body;
  const order = await Order.findById(orderId);
  if (!order) {
    throw new ApiError(400, "Could not find order");
  }
  order.paymentStatus = paymentStatus;
  await order.save();
  res
    .status(200)
    .json(new ApiResponse(200, order, "Payment Status updated successfully"));
});

export { getAllOrders, placeOrder, placeCustomOrder, updateOrderStatus, updateCustomOrderStatus, updatePaymentStatus, getAllCustomOrders };
