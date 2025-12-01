import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import { APP_NAME } from "../constants.js";
import {
  deleteFileFromCloudinary,
  uploadToCloudinary,
} from "../utils/cloudinary.js";
import path from "path";

const accessTokenOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "None",
  path: "/",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};
const refreshTokenOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "None",
  path: "/",
  maxAge: 15 * 24 * 60 * 60 * 1000,
};
const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.log(error);

    throw new ApiError(
      500,
      "Something went wrong while generating access and refresh tokens"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  // console.log(req);
  const { name, username, email, password, address } = req.body;
  const addressObj = JSON.parse(address);
  if (!name || !username || !email || !password || !addressObj) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (existedUser) {
    throw new ApiError(409, "User with given username or email already exists");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar is required");
  }
  const now = Date.now();
  const avatarFolder = `${APP_NAME}/avatars/${username}-${now}`;
  const avatarFileName = path.basename(avatarLocalPath);
  const avatarResult = await uploadToCloudinary(
    avatarLocalPath,
    avatarFolder,
    avatarFileName,
    "image",
    "public"
  );

  if (!avatarResult || !avatarResult.secure_url) {
    throw new ApiError(400, "Avatar upload failed");
  }

  const user = await User.create({
    name,
    avatar: avatarResult.secure_url,
    username: username.toLowerCase(),
    email,
    password,
    cartItems: [],
    addresses: [addressObj],
    role: "customer",
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  console.log(createdUser);

  if (!createdUser) {
    throw new ApiError(500, "User not created");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, createdUser, "User created successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  if (!email && !username) {
    throw new ApiError(400, "Email or Username is required");
  }

  const user = await User.findOne({ $or: [{ email }, { username }] });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid password");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  res
    .cookie("accessToken", accessToken, accessTokenOptions)
    .cookie("refreshToken", refreshToken, refreshTokenOptions);

  return res
    .status(200)

    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
        },
        "User logged in successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );

  return res
    .status(200)
    .clearCookie("accessToken", {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    })
    .clearCookie("refreshToken", {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    })
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  console.log("refresh access token called");

  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized request");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(401, "Invalid Refresh Token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh Token is expired or used up");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      user._id
    );

    res
      .cookie("accessToken", accessToken, accessTokenOptions)
      .cookie("refreshToken", refreshToken, refreshTokenOptions);

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Access token refreshed :)"));
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (oldPassword === newPassword) {
    throw new ApiError(400, "New password can't be same as previous one");
  }

  const user = await User.findById(req.user?._id);
  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid old password");
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password Updated Successfully"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  // console.log(req.user);

  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "current user fetched successfully"));
});

const updateAccountDetails = asyncHandler(async (req, res) => {
  const { name, email, username } = req.body;

  const toUpdate = {};

  if (name) toUpdate.name = name;
  if (email) toUpdate.email = email;
  if (username) toUpdate.username = username;

  if (Object.keys(toUpdate).length === 0) {
    throw new ApiError(400, "At least one field is required to update");
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        ...toUpdate,
      },
    },
    { new: true }
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Account details successfully updated"));
});

const updateUserAvatar = asyncHandler(async (req, res) => {
  const avatarLocalPath = req.file?.path;
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is missing");
  }
  const now = Date.now();

  const existingUser = await User.findById(req.user?._id);

  const oldAvatar = existingUser.avatar;

  const avatarFolder = `${APP_NAME}/avatars/${existingUser.username}-${now}`;
  const avatarFileName = path.basename(avatarLocalPath);
  const avatarResult = await uploadToCloudinary(
    avatarLocalPath,
    avatarFolder,
    avatarFileName,
    "image",
    "public"
  );

  if (!avatarResult || !avatarResult.secure_url) {
    throw new ApiError(400, "Error while uploading Avatar");
  }

  //delete existing file
  if (oldAvatar) {
    await deleteFileFromCloudinary(oldAvatar, "image");
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        avatar: avatarResult.secure_url,
      },
    },
    { new: true }
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Avatar Updated Successfully"));
});

const addAddress = asyncHandler(async (req, res) => {
  // console.log(req);

  let { address } = req.body;

  if (!address) {
    throw new ApiError(400, "Address is required");
  }

  address = JSON.parse(address);

  const user = await User.findById(req.user?._id);

  if (user.addresses.length >= 5) {
    throw new ApiError(400, "Maximum address limit reached");
  }

  const hasAlreadyPrimaryAddress = user.addresses.some(
    (addr) => addr.isPrimary
  );

  if (address.isPrimary && hasAlreadyPrimaryAddress) {
    throw new ApiError(400, "Primary address already exists");
  }

  user.addresses.push(address);
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, user.addresses, "Address added successfully"));
});

export {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  refreshAccessToken,
  changeCurrentPassword,
  updateAccountDetails,
  updateUserAvatar,
  addAddress,
};
