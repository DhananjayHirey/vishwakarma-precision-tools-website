import { APP_NAME } from "../constants.js";
import { Product } from "../models/product.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import path from "path";
import cloudinary, {
  deleteFileFromCloudinary,
  getSignedUrlFromCloudinary,
  getUrlFromCloudinaryPublicId,
  uploadToCloudinary,
} from "../utils/cloudinary.js";
import { User } from "../models/user.model.js";
const createProduct = asyncHandler(async (req, res) => {
  const { name, description, price, stock, category, etp } = req.body;

  if (!name || !description || !price || !stock || !category || !etp) {
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
  const productImageResult = await uploadToCloudinary(
    productImageLocalPath,
    productImageFolder,
    productImageFileName,
    "image",
    "authenticated"
  );

  if (!productImageResult || !productImageResult.public_id) {
    throw new ApiError(400, "Failed to upload product image");
  }
  const product = await Product.create({
    name,
    description,
    price,
    category,
    stock,
    etp: Number(etp),
    image: productImageResult.public_id,
  });

  if (!product) {
    throw new ApiError(500, "Failed to create product");
  }

  res
    .status(201)
    .json(new ApiResponse(201, product, "Product created successfully"));
});

const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  const signedImageUrl = await getSignedUrlFromCloudinary(
    product.image,
    "image",
    "authenticated"
  );

  const productWithSignedUrl = {
    ...product.toObject(),
    signedImageUrl,
  };
  res
    .status(200)
    .json(
      new ApiResponse(200, productWithSignedUrl, "Product fetched successfully")
    );
});

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
        signedImageUrl,
      };
    })
  );

  res
    .status(200)
    .json(
      new ApiResponse(200, signedProducts, "Products fetched successfully")
    );
});

const updateStock = asyncHandler(async (productId, quantity) => {
  const product = await Product.findById(productId);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  product.stock = product.stock + quantity;
  await product.save();

  res
    .status(200)
    .json(new ApiResponse(200, product, "Product stock updated successfully"));
});

const updateProductDetails = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, description, price, stock } = req.body;

  const product = await Product.findById(id);
  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  product.name = name || product.name;
  product.description = description || product.description;
  product.price = price || product.price;
  product.stock = stock !== undefined ? stock : product.stock;

  const productImageLocalPath = req.file?.path;

  if (productImageLocalPath) {
    const now = Date.now();
    const productImageFolder = `${APP_NAME}/products/${product.name}-${now}`;
    const productImageFileName = path.basename(productImageLocalPath);
    
    const oldImagePublicId = product.image;
    if (oldImagePublicId) {
      const url = await getUrlFromCloudinaryPublicId(oldImagePublicId, "image");
      console.log(`Deleting old image from Cloudinary: ${url}`);
      await deleteFileFromCloudinary(url, "image");
    }

    const productImageResult = await uploadToCloudinary(
      productImageLocalPath,
      productImageFolder,
      productImageFileName,
      "image",
      "authenticated"
    );
    if (!productImageResult || !productImageResult.public_id) {
      throw new ApiError(400, "Failed to upload product image");
    }
    product.image = productImageResult.public_id;
  }
  await product.save();

  res
    .status(200)
    .json(new ApiResponse(200, product, "Product updated successfully"));
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) {
    throw new ApiError(404, "Product not found");
  }
  
  const imagePublicId = product.image;
  if (imagePublicId) {
    const url = await getUrlFromCloudinaryPublicId(imagePublicId, "image");
    console.log(`Deleting product image from Cloudinary: ${url}`);
    await deleteFileFromCloudinary(imagePublicId, "image");
  }
  await Product.findByIdAndDelete(id);
  res
    .status(200)
    .json(new ApiResponse(200, null, "Product deleted successfully"));
});

const addToCart = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const product = req.body.product;
    const quantity = req.body.quantity;
    const user = await User.findByIdAndUpdate(
      userId,
      { $push: { cartItems: { product: product, quantity: quantity } } },
      { new: true }
    );
    if (!user)
      return res
        .status(404)
        .json(new ApiResponse(404, null, "User not found!"));
    return res
      .status(200)
      .json(new ApiResponse(200, null, "Item added to cart successfully!"));
  } catch (e) {
    return res
      .status(500)
      .json(
        new ApiResponse(
          500,
          null,
          "Some error occured while adding product to cart"
        )
      );
  }
});

const removeFromCart = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const cartItemId = req.body.cartItemId;
    const user = await User.findByIdAndUpdate(userId, {
      $pull: {
        cartItems: { _id: cartItemId },
      },
    });
    if (!user)
      return res
        .status(404)
        .json(new ApiResponse(404, null, "User not found!"));
    return res
      .status(200)
      .json(new ApiResponse(200, null, "Item removed from cart successfully!"));
  } catch (e) {
    return res
      .status(500)
      .json(
        new ApiResponse(
          500,
          null,
          "Some error occured while adding product to cart"
        )
      );
  }
});

const getCart = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    console.log(user);
    if (!user) {
      return res
        .status(404)
        .json(
          new ApiResponse(
            404,
            null,
            "Could not find User! Please try again after some time or login again!"
          )
        );
    }

    const products = [];
    let totalAmount = 0;
    let totalDays = 0;
    for (let i = 0; i < user.cartItems.length; i += 1) {
      const p = await Product.findById(user.cartItems[i].product);
      totalAmount += user.cartItems[i].quantity * p.price;
      totalDays += p.etp;
      const signedImageUrl = await getSignedUrlFromCloudinary(
        p.image,
        "image",
        "authenticated"
      );
      products.push({
        product: p,
        quantity: user.cartItems[i].quantity,
        _id: user.cartItems[i]._id,
        signedImageUrl: signedImageUrl,
      });
    }

    const date = new Date();
    date.setDate(date.getDate() + totalDays + 2);

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          totalAmount: totalAmount,
          products: products,
          eta: date,
        },
        "Cart Items fetched successfully"
      )
    );
  } catch (e) {
    console.log(e);
    
    return res
      .status(500)
      .json(
        new ApiResponse(
          500,
          null,
          "Some error occured while fetching cart! Please try again after some time"
        )
      );
  }
});

export {
  createProduct,
  getProductById,
  getAllProducts,
  updateStock,
  deleteProduct,
  updateProductDetails,
  addToCart,
  removeFromCart,
  getCart,
};
