import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { User } from "../models/user.model.js"; // this User calls mongodb on our behalf
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import {ApiResponse} from "../utils/ApiResponse.js"
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const generateAccessAndRefereshTokens = async(userId) =>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}
const registerUser = asyncHandler( async (req, res) => {
    try {
        // res.status(200).json({
        //     message:"hello"
        // });
    
        // get user details from frontend
        // validation - not empty
        // check if user already exists: username, email
        // check for images, check for avatar
        // upload them to cloudinary, avatar
        // create user object - create entry in db
        // remove password and refresh token field from response
        // check for user creation
        // return res
    
        const {fullName, email, username, password } = req.body //req.body can give form or json data but (no url data)
        //console.log("email: ", email);
    
        // if(fullName===""){
        //     throw new ApiError(404,"fullname is required") // will have to put many if condition
        // }
        // better approach
        if (
            [fullName, email, username, password].some((field) => field?.trim() === "")
        ) {
            throw new ApiError(400, "All fields are required")
        }
    
        const existedUser = await User.findOne({ // gives user having this username or email
            $or: [{ username }, { email }]
        })
    
        if (existedUser) {
            throw new ApiError(409, "User with email or username already exists")
        }
    
        //check for images, check for avatar
        //  const avatarLocalPath = req.files?.avatar[0]?.path; // we get this from multer
        // // const coverImageLocalPath = req.files?.coverImage[0]?.path;
    
        // // let coverImageLocalPath;
        // // if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        // //     coverImageLocalPath = req.files.coverImage[0].path
        // // }
    
        // if (!avatarLocalPath) {
        //     throw new ApiError(400, "Avatar file is required")
        // }
    
        // // upload them to cloudinary, avatar
        //  const avatar = await uploadOnCloudinary(avatarLocalPath)
        // // const coverImage = await uploadOnCloudinary(coverImageLocalPath)
    
        // if (!avatar) {
        //     throw new ApiError(400, "Avatar file is required")
        // }
        const defaultAvatarUrl = "https://res.cloudinary.com/demo/image/upload/v1690000000/default-avatar.png";
        // will work on later

        // create user object - create entry in db
        const user = await User.create({
            fullName,
            //avatar:avatar.url,
            avatar: defaultAvatarUrl, // TEMP: use placeholder
            // coverImage: coverImage?.url || "",
            email, 
            password,
            // username: username.toLowerCase(),
            username: username?.toLowerCase()
        })
        // remove password and refresh token field from response
        const createdUser = await User.findById(user._id).select( // Agar voh user h toh
            "-password -refreshToken" // uski yeh field nhi milegi
        )
        // check for user creation
        if (!createdUser) {
            throw new ApiError(500, "Something went wrong while registering the user")
        }
        return res.status(201).json(
            new ApiResponse(200, createdUser, "User registered Successfully")
        )
    } catch (error) {
        console.error("🔥 Error during user registration:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            error: error?.message
        });
    }
} );

const loginUser = asyncHandler(async (req, res) =>{
    // req body -> data
    // username or email
    //find the user
    //password check
    //access and referesh token
    //send cookie

    const {email, username, password} = req.body
    console.log(email);

    if (!username && !email) {
        throw new ApiError(400, "username or email is required")
    }
    
    // Here is an alternative of above code based on logic discussed in video:
    // if (!(username || email)) {
    //     throw new ApiError(400, "username or email is required")
        
    // }

    const user = await User.findOne({
        $or: [{username}, {email}]
    })

    if (!user) {
        throw new ApiError(404, "User does not exist")
    }

   const isPasswordValid = await user.isPasswordCorrect(password)

   if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials")
    }

   const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = { // cookies can only be modified by server(not fronted)
        httpOnly: true,
        secure: false,
        sameSite: "lax", // <-- ADD THIS
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200, 
            {
                user: loggedInUser, accessToken, refreshToken
            },
            "User logged In Successfully"
        )
    )

})

// logoutUser requires the user to be already authenticated, so it uses the auth middleware to extract the user from the JWT token stored in cookies.

// loginUser happens before the user is authenticated, so there's no token or req.user yet, and thus no need for middleware.

const logoutUser = asyncHandler(async(req, res) => {
    // req.user -- this can be accessed now as we added it using auth.middleware.js
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1 // this removes the field from document
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: false,
        sameSite: "lax", // <-- ADD THIS
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"))
})

// Access Token - Short lived, not stored in db
// Refresh Token - Long lived, stored in db
// When access token expires, the frontend sends the refresh token to the backend to validate user (login), once again.
const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(401, "unauthorized request")
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )
    
        const user = await User.findById(decodedToken?._id)
    
        if (!user) {
            throw new ApiError(401, "Invalid refresh token")
        }
    
        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used")
            
        }
    
        const options = {
            httpOnly: true,
            secure: false,
            sameSite: "lax", // <-- ADD THIS
        }
    
        const {accessToken, newRefreshToken} = await generateAccessAndRefereshTokens(user._id)
    
        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json(
            new ApiResponse(
                200, 
                {accessToken, refreshToken: newRefreshToken},
                "Access token refreshed"
            )
        )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token")
    }

})

const changeCurrentPassword = asyncHandler(async(req, res) => {
    const {oldPassword, newPassword} = req.body

    

    const user = await User.findById(req.user?._id)
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

    if (!isPasswordCorrect) {
        throw new ApiError(400, "Invalid old password")
    }

    user.password = newPassword
    await user.save({validateBeforeSave: false})

    return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"))
})


const getCurrentUser = asyncHandler(async(req, res) => {
    return res
    .status(200)
    .json(new ApiResponse(
        200,
        req.user,
        "User fetched successfully"
    ))
})

const updateAccountDetails = asyncHandler(async(req, res) => {
    const {fullName, email} = req.body

    if (!fullName || !email) {
        throw new ApiError(400, "All fields are required")
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                fullName,
                email: email
            }
        },
        {new: true}
        
    ).select("-password")

    return res
    .status(200)
    .json(new ApiResponse(200, user, "Account details updated successfully"))
});

const updateUserAvatar = asyncHandler(async(req, res) => {
    const avatarLocalPath = req.file?.path

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is missing")
    }

    //TODO: delete old image - assignment

    const avatar = await uploadOnCloudinary(avatarLocalPath)

    if (!avatar.url) {
        throw new ApiError(400, "Error while uploading on avatar")
        
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set:{
                avatar: avatar.url
            }
        },
        {new: true}
    ).select("-password")

    return res
    .status(200)
    .json(
        new ApiResponse(200, user, "Avatar image updated successfully")
    )
})

// const updateUserCoverImage = asyncHandler(async(req, res) => {
//     const coverImageLocalPath = req.file?.path

//     if (!coverImageLocalPath) {
//         throw new ApiError(400, "Cover image file is missing")
//     }

//     //TODO: delete old image - assignment


//     const coverImage = await uploadOnCloudinary(coverImageLocalPath)

//     if (!coverImage.url) {
//         throw new ApiError(400, "Error while uploading on avatar")
        
//     }

//     const user = await User.findByIdAndUpdate(
//         req.user?._id,
//         {
//             $set:{
//                 coverImage: coverImage.url
//             }
//         },
//         {new: true}
//     ).select("-password")

//     return res
//     .status(200)
//     .json(
//         new ApiResponse(200, user, "Cover image updated successfully")
//     )
// })

export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
    updateUserAvatar,
}