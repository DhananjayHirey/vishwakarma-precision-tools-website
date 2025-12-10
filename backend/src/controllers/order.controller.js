import path from "path";
import { Order } from "../models/orders.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { APP_NAME } from "../constants.js";
import {
  getSignedUrlFromCloudinary,
  uploadToCloudinary,
} from "../utils/cloudinary.js";
import { Product } from "../models/product.model.js";
const getUserOrders = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const orders = await Order.find({ orderingParty: userId }).populate(
    "orderList.product"
  );

  for (const order of orders) {
    for (const item of order.orderList) {
      if (item.product?.image) {
        const signedUrl = await getSignedUrlFromCloudinary(
          item.product.image,
          "image",
          "authenticated"
        );

        item.product = {
          ...item.product.toObject(),
          signedImageUrl: signedUrl,
        };
      }
    }
    if (order.isCustomOrder && order.customOrderAttachment?.trim() !== "") {
      const signedCustomUrl = await getSignedUrlFromCloudinary(
        order.customOrderAttachment,
        "image",
        "authenticated"
      );

      order.customOrderAttachmentSignedUrl = signedCustomUrl;
    }
  }

  return res.status(200).json({
    success: true,
    orders,
  });
});

const getAllOrders = asyncHandler(async (req, res) => {
  const isAdmin = req.user.role === "admin";

  const orders = await Order.find(
    isAdmin ? {} : { orderingParty: req.user._id, isCustomOrder: false }
  )
    .populate({
      path: "orderList.product",
      select: "name price description image",
    })
    .populate({
      path: "orderingParty",
      select: "name email",
    })
    .sort({ orderDate: -1 })
    .lean(); // ensures populated objects are plain JSON

  const signedOrders = await Promise.all(
    orders.map(async (order) => {
      const updatedOrderList = await Promise.all(
        order.orderList.map(async (item) => {
          const product = item.product; // already populated + clean JSON

          let signedImageUrl = null;
          if (product?.image) {
            
            signedImageUrl = await getSignedUrlFromCloudinary(
              product.image,
              "image",
              "authenticated"
            );
            
          }

          return {
            quantity: item.quantity,
            product: {
              ...item.product,
              signedImageUrl: signedImageUrl,
            },
          };
        })
      );

      return {
        ...order,
        orderList: updatedOrderList,
      };
    })
  );

  return res
    .status(200)
    .json(new ApiResponse(200, signedOrders, "Orders fetched successfully"));
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
        as: "user",
      },
    },
    { $unwind: "$user" },
    {
      $project: {
        _id: 1,
        customOrderDetails: 1,
        customOrderAttachment: 1,
        customOrderReviewStatus: 1,
        expectedDateByClient: 1,
        orderDate: 1,
        orderingParty: {
          name: "$user.name",
          email: "$user.email",
          _id: "$user._id",
        },
      },
    },
    { $sort: { orderDate: -1 } },
  ]);

  const signedOrders = await Promise.all(
    orders.map(async (order) => {
      let signedAttachmentUrl = null;
      if (
        order.customOrderAttachment &&
        order.customOrderAttachment.trim() !== ""
      ) {
        const signedUrlResult = await getSignedUrlFromCloudinary(
          order.customOrderAttachment,
          "image",
          "authenticated"
        );
        signedAttachmentUrl = signedUrlResult;
      }
      return {
        ...order,
        signedAttachmentUrl,
      };
    })
  );

  res
    .status(200)
    .json(
      new ApiResponse(200, signedOrders, "Custom Orders fetched successfully")
    );
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
  const { customOrderDetails, expectedDateByClient } = req.body;

  if (!customOrderDetails || !expectedDateByClient) {
    throw new ApiError(400, "Missing required fields");
  }

  const attachmentPath = req.file?.path;
  let uploadedAttachment = null;

  if (attachmentPath) {
    uploadedAttachment = await uploadToCloudinary(
      attachmentPath,
      `${APP_NAME}/custom_orders/${req.user._id}-${Date.now()}`,
      path.basename(attachmentPath),
      "auto",
      "authenticated"
    );
  }

  const order = await Order.create({
    orderingParty: req.user._id,
    customOrderDetails,
    expectedDateByClient: expectedDateByClient
      ? new Date(expectedDateByClient)
      : null,
    isCustomOrder: true,
    orderStatus: "pending",
    paymentStatus: false,
    totalBilling: null,
    customOrderAttachment: uploadedAttachment?.public_id || null,
    orderDate: new Date(),
  });

  return res
    .status(201)
    .json(new ApiResponse(201, order, "Request submitted."));
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
  const { orderId, totalBilling, eta, customOrderReviewStatus } = req.body;
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
    .json(
      new ApiResponse(200, order, "Custom Order Status updated successfully")
    );
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

export {
  getAllOrders,
  placeOrder,
  placeCustomOrder,
  updateOrderStatus,
  updateCustomOrderStatus,
  updatePaymentStatus,
  getAllCustomOrders,
  getUserOrders,
};
