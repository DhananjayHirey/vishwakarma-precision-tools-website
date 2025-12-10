import { Order } from '../models/orders.model.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { getSignedUrlFromCloudinary } from '../utils/cloudinary.js';

export const getSalesMetrics = asyncHandler(async (req, res, next) => {

    if (req.user.role !== "admin") {
        return next(new ApiError(403, "Admins only"));
    }

    // ---------------- TOTAL ORDERS ----------------
    const totalOrders = await Order.countDocuments();

    // ---------------- TOTAL SALES ----------------
    const totalSalesResult = await Order.aggregate([
        { $match: { orderStatus: "delivered" } },
        { $group: { _id: null, total: { $sum: "$totalBilling" } } }
    ]);
    const totalSales = totalSalesResult[0]?.total || 0;

    // ---------------- TOTAL ITEMS SHIPPED ----------------
    const shippedItemsResult = await Order.aggregate([
        { $match: { orderStatus: "delivered" } },
        { $unwind: "$orderList" },
        { $group: { _id: null, total: { $sum: "$orderList.quantity" } } }
    ]);
    const shippedItems = shippedItemsResult[0]?.total || 0;

    // ---------------- TOP SELLING PRODUCTS ----------------
    const topProducts = await Order.aggregate([
        { $match: { orderStatus: "delivered" } },

        { $unwind: "$orderList" },

        {
            $group: {
                _id: "$orderList.product",
                sold: { $sum: "$orderList.quantity" }
            }
        },
        {
            $lookup: {
                from: "products",
                localField: "_id",
                foreignField: "_id",
                as: "product"
            }
        },
        { $unwind: "$product" },

        {
            $project: {
                _id: 0,
                productId: "$product._id",
                name: "$product.name",
                price: "$product.price",
                image: "$product.image",
                sold: 1
            }
        },

        { $sort: { sold: -1 } },
        { $limit: 5 }
    ]);

    const topSellingProductsWithUrls =  await Promise.all(
        topProducts.map(async (product) => {
            const signedImageUrl = await getSignedUrlFromCloudinary(product.image, "image", "authenticated");

            return {
                ...product,
                signedImageUrl,
            };
        })
    );

    // ---------------- PENDING ORDERS ----------------
    const pendingOrders = await Order.countDocuments({ orderStatus: "pending" });

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                metrics: {
                    totalSales,
                    totalOrders,
                    shippedItems,
                    topProducts: topSellingProductsWithUrls,
                    pendingOrders
                }
            },
            "Sales metrics retrieved successfully"
        )
    );
});
