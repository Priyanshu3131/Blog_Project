import React from 'react'
// import appwriteService from "../appwrite/config"
import { Link } from 'react-router-dom'

function PostCard({_id, title, imageUrl, username,hideAuthor = false}) {
    return (
        <Link to={`/post/${_id}`}>
            <div className="w-[250px] h-[280px] bg-white dark:bg-gray-900 rounded-xl p-4 shadow hover:shadow-md transition-colors duration-300 flex flex-col">
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
                    {/* Title - limited height */}
                    <h2 className="text-lg font-bold text-gray-800 dark:text-white break-words leading-tight max-h-12 overflow-hidden">
                        {title.length > 40 ? `${title.substring(0, 40)}...` : title}
                    </h2>
                    
                    {/* Author */}
                    {!hideAuthor && username && (
                      <p className="text-sm mt-2 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded">
                        👤 @{username}
                      </p>
                    )}
                </div>
            </div>
        </Link>
    );
}


//   return (
//     //In to={/post/${$id}}, the first $ is for JavaScript template literals (string interpolation in JavaScript), and the second $ is because the variable name is actually $id, as Appwrite often prefixes IDs with $.
//     <Link to={`/post/${_id}`}> 
//     <div className='w-full bg-gray-100 rounded-xl p-4'>
//         <div className='w-full justify-center mb-4'>
//             {/* <img src={appwriteService.getFilePreview(imageUrl)} alt={title} */}
//             <img
//               // ✅ Use imageUrl directly (it's already a complete URL from Cloudinary)
//               src={imageUrl}
//               alt={title}
//               className='rounded-xl'
//             />
       
//         </div>
//         {/* In Appwrite, files are stored in buckets and each file has a unique file ID.
//         The featuredImage passed to PostCard is the ID of that image file in Appwrite.
//         appwriteService.getFilePreview(featuredImage) fetches the image preview URL from Appwrite. */}
//         <h2
//         className='text-xl font-bold'
//         >{title}</h2>
//     </div>
// </Link>
//   )

export default PostCard
