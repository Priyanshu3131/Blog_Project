import React from 'react'
// import appwriteService from "../appwrite/config"
import { Link } from 'react-router-dom'
import { useSelector } from "react-redux";
import { FaHeart, FaRegHeart } from "react-icons/fa"; // filled and outline
import { toggleLike } from "../services/post";
import { useState } from "react";
import { useMemo,useEffect } from 'react';
import { toast } from "react-toastify";

function PostCard({_id, title, imageUrl, username, likes = [], hideAuthor = false}) {
    const userId = useSelector((state) => state.auth.userData?._id);
    const [likeList, setLikeList] = useState(Array.isArray(likes) ? likes : []);

    //const isLiked = userId && likeList.map(String).includes(String(userId));
    //const isLiked = useMemo(() => likeList.includes(userId), [likeList, userId]);
    // const isLiked = userId && likeList.includes(userId);

    // Re-sync likeList when likes prop changes (e.g., on login redirect)
    useEffect(() => {
        setLikeList(Array.isArray(likes) ? likes.map(String) : []);
    }, [likes]);

    // 💡 always re-evaluates when userId or likeList changes
    const isLiked = useMemo(() => {
        return userId && likeList.includes(String(userId));
    }, [userId, likeList]);

    // const handleLike = async (e) => {
    //     e.preventDefault();

    //     if (!userId) {
    //         toast.info("Please log in first to like posts.");
    //         return;
    //     }
    //     try {
    //         const updatedPost = await toggleLike(_id);
    //         setLikeList(Array.isArray(updatedPost.likes) ? updatedPost.likes.map(String) : []);
    //     } catch (error) {
    //         console.error("Error toggling like:", error);
    //         toast.error("Something went wrong.");
    //     }
    // };
    const handleLike = async (e) => {
        e.preventDefault();
        if (!userId) {
            toast.info("Please log in first to like posts.");
            return;
        }
        try {
            const updatedPost = await toggleLike(_id);
            setLikeList(Array.isArray(updatedPost.likes) ? updatedPost.likes.map(String) : []);
        } catch (error) {
            console.error("Error toggling like:", error);
        }
    };

    return (
        <Link to={`/post/${_id}`}>
            <div className="w-[250px] h-[300px] bg-white dark:bg-gray-900 rounded-xl p-4 shadow hover:shadow-md transition-colors duration-300 flex flex-col">
                {/* Image */}
                <div className="w-full h-[180px] overflow-hidden rounded-xl flex-shrink-0">
                    <img
                        src={imageUrl}
                        alt={title}
                        className="h-full rounded-xl object-cover w-full transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
                    />
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-between mt-3">
                    <h2 className="text-lg font-bold text-gray-800 dark:text-white break-words leading-tight max-h-12 overflow-hidden">
                        {title.length > 40 ? `${title.substring(0, 40)}...` : title}
                    </h2>
                <div className="flex items-center justify-between mt-2">
                    {/* Author */}
                    {!hideAuthor && username && (
                        <p className="text-sm mt-2 font-semibold px-2 py-1 rounded-full inline-block w-fit transition-colors duration-200">
                            👤 @{username}
                        </p>
                    )}

                    {/* ❤️ Likes */}
                    <div
                        className="mt-2 flex items-center gap-2 cursor-pointer w-fit"
                        onClick={handleLike}
                    >
                        {isLiked ? (
                            <FaHeart className="text-red-500" />
                        ) : (
                            <FaRegHeart className="text-gray-500" />
                        )}
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                            {likeList.length}
                        </span>
                    </div>
                 </div>
                </div>
            </div>
        </Link>
    );
}


// function PostCard({_id, title, imageUrl, username,hideAuthor = false}) {


//     return (
//         <Link to={`/post/${_id}`}>
//             <div className="w-[250px] h-[280px] bg-white dark:bg-gray-900 rounded-xl p-4 shadow hover:shadow-md transition-colors duration-300 flex flex-col">
//                 {/* Image */}
//                 <div className="w-full h-[180px] overflow-hidden rounded-xl flex-shrink-0">
//                     <img
//                         src={imageUrl}
//                         alt={title}
//                         className="h-full rounded-xl object-cover w-full transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
//                     />
//                 </div>

//                 {/* Content */}
//                 <div className="flex-1 flex flex-col justify-between mt-3">
//                     {/* Title - limited height */}
//                     <h2 className="text-lg font-bold text-gray-800 dark:text-white break-words leading-tight max-h-12 overflow-hidden">
//                         {title.length > 40 ? `${title.substring(0, 40)}...` : title}
//                     </h2>
                    
//                     {/* Author */}
//                     {!hideAuthor && username && (
//                       <p className="text-sm mt-2 font-semibold px-2 py-1 rounded-full inline-block w-fit transition-colors duration-200">
//     👤 @{username}
//   </p>
//                     )}
//                 </div>
//             </div>
//         </Link>
//     );
// }


export default PostCard
