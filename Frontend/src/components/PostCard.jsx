import React from 'react'
// import appwriteService from "../appwrite/config"
import { Link } from 'react-router-dom'

function PostCard({_id,title,imageUrl}) { // id variable ka naam $id in appwrite

   return (
    <Link to={`/post/${_id}`}>
      <div className="w-full bg-white dark:bg-gray-900 rounded-xl p-4 shadow hover:shadow-md transition-colors duration-300">
        {/* Image with zoom + shadow on hover */}
        <div className="w-full mb-4 overflow-hidden rounded-xl">
          <img
            src={imageUrl}
            alt={title}
            className="rounded-xl object-cover max-h-60 w-full transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
          />
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-gray-800 dark:text-white line-clamp-2">
          {title}
        </h2>
      </div>
    </Link>
  );
  
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
}

export default PostCard
