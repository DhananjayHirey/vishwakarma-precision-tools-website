import { Product } from "../models/product.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createProduct = asyncHandler(async (req, res) => {
    const { name, description, price, image, stock, category } = req.body;

    if (!name || !description || !price || !image || stock === undefined || !category) {
        throw new ApiError(400, "Please fill all the fields");
    }

    const product = await Product.create({
        name,
        description,
        price,
        category,
        stock,
        image,
    });

    if (!product) {
        throw new ApiError(500, "Failed to create product");
    }

    res
        .status(201)
        .json(new ApiResponse(201, product, "Product created successfully"));
})



const getAllProducts = asyncHandler(async (req, res) => {
    const products = await Product.find().sort({ createdAt: -1 });
    res
        .status(200)
        .json(new ApiResponse(200, products, "Products fetched successfully"));
})


const updateStock = asyncHandler(async (productId, quantity) => {

    const product = await Product.findById(productId);

    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    product.stock = product.stock + quantity;
    await product.save();

    res.status(200).json(new ApiResponse(200, product, "Product stock updated successfully"));

})

const updateProductDetails = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, description, price, image, stock } = req.body;

    const product = await Product.findById(id);
    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    if (image) {
        const oldImage = product.image;
        product.image = image;
        // delete old image logic
    }
    product.stock = stock !== undefined ? stock : product.stock;
    await product.save();

    res.status(200).json(new ApiResponse(200, product, "Product updated successfully"));

});


const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
        throw new ApiError(404, "Product not found");
    }


    res.status(200).json(new ApiResponse(200, null, "Product deleted successfully"));
})
export { createProduct, getAllProducts, updateStock, deleteProduct, updateProductDetails };