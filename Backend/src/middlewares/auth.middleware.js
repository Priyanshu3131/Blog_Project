// // middleware/auth.js

// import { ApiError } from "../utils/ApiError.js";
// import { asyncHandler } from "../utils/asyncHandler.js";
// import jwt from "jsonwebtoken";
// import { User } from "../models/user.model.js";

// export const verifyJWT = asyncHandler(async (req, _, next) => {
//   // const token =
//   //   req.cookies?.accessToken ||
//   //   req.header("Authorization")?.replace("Bearer ", "");

//   // if (!token) {
//   //   throw new ApiError(401, "Unauthorized request");
//   // }

//   // const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET); // or ACCESS_TOKEN_SECRET

//   // const user = await User.findById(decodedToken?.id || decodedToken?._id).select(
//   //   "-password -refreshToken"
//   // );

//   // if (!user) {
//   //   throw new ApiError(401, "Invalid access token");
//   // }

//   // req.user = user;
//   // next();
//   console.log("🔴 AUTH MIDDLEWARE CALLED for:", req.method, req.path);
//   console.log("🔴 This should NOT happen for /register");
//   try {
//     const token =
//       req.cookies?.accessToken ||
//       req.header("Authorization")?.replace("Bearer ", "");

//     if (!token) {
//       console.log("🔴 No token found");
//       throw new ApiError(401, "Unauthorized request - No token");
//     }

//     const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

//     const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

//     if (!user) {
//       throw new ApiError(401, "Unauthorized request - User not found");
//     }

//     req.user = user;
//     next();
//   } catch (error) {
//     console.log("🔴 Auth middleware error:", error.message);
//     throw new ApiError(401, "Unauthorized request - " + (error?.message || "Token error"));
//   }
// });

// middleware/auth.js
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  console.log("🔴 AUTH MIDDLEWARE CALLED for:", req.method, req.path);
  
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      console.log("🔴 No token found");
      return res.status(401).json({
        success: false,
        message: "Unauthorized request - No token",
        data: null
      });
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized request - User not found",
        data: null
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("🔴 Auth middleware error:", error.message);
    return res.status(401).json({
      success: false,
      message: "Unauthorized request - " + (error?.message || "Token error"),
      data: null
    });
  }
});
