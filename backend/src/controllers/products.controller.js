import { APP_NAME } from "../constants.js";
import { Product } from "../models/product.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import path from "path";
import { getSignedUrlFromCloudinary, uploadToCloudinary } from "../utils/cloudinary.js";
const createProduct = asyncHandler(async (req, res) => {
    const { name, description, price, stock, category } = req.body;

    if (!name || !description || !price || !stock || !category) {
        throw new ApiError(400, "Please fill all the fields");
    }
    console.log(req.files);

    const productImageLocalPath = req.file?.path;

    if (!productImageLocalPath) {
        throw new ApiError(400, "Product image is required");
    }

    const now = Date.now();
    const productImageFolder = `${APP_NAME}/products/${name}-${now}`;
    const productImageFileName = path.basename(productImageLocalPath);
    const productImageResult = await uploadToCloudinary(productImageLocalPath, productImageFolder, productImageFileName, 'image', 'authenticated');



    if (!productImageResult || !productImageResult.public_id) {
        throw new ApiError(400, "Failed to upload product image");
    }
    const product = await Product.create({
        name,
        description,
        price,
        category,
        stock,
        image: productImageResult.public_id,
    });

    if (!product) {
        throw new ApiError(500, "Failed to create product");
    }

    res
        .status(201)
        .json(new ApiResponse(201, product, "Product created successfully"));
})


const getProductById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    const signedImageUrl = await getSignedUrlFromCloudinary(product.image, 'image', 'authenticated');

    const productWithSignedUrl = {
        ...product.toObject(),
        signedImageUrl
    }
    res
        .status(200)
        .json(new ApiResponse(200, productWithSignedUrl, "Product fetched successfully"));
})

const getAllProducts = asyncHandler(async (req, res) => {
    const products = await Product.find().sort({ createdAt: -1 });

    const signedProducts = await Promise.all(
        products.map(async (product) => {
            const signedImageUrl = await getSignedUrlFromCloudinary(
                product.image,
                "image",
                "authenticated"
            );

            return {
                ...product.toObject(),
                signedImageUrl
            };
        })
    );



    res
        .status(200)
        .json(new ApiResponse(200, signedProducts, "Products fetched successfully"));
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
export { createProduct, getProductById,getAllProducts, updateStock, deleteProduct, updateProductDetails };