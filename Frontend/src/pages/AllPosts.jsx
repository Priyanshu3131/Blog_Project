// import React, {useState, useEffect} from 'react'
// import { Container, PostCard } from '../components'
// //import appwriteService from "../appwrite/config";
// import { getPosts } from "../services/post";

// function AllPosts() {
//     const [posts, setPosts] = useState([])
//     useEffect(() => {
//     getPosts().then((res) => {
//       if (Array.isArray(res)) {
//         setPosts(res)
//       } else if (res?.documents && Array.isArray(res.documents)) {
//         setPosts(res.documents)
//       } else {
//         console.error("Unexpected response format:", res)
//         setPosts([])
//       }
//     }).catch((err) => {
//       console.error("Error fetching posts:", err)
//       setPosts([])
//     })
//   }, [])
//     // useEffect(() => {
//     //     getPosts().then((posts) => {
//     //     if (posts?.length > 0) {
//     //         setPosts(posts.documents)
//     //     }
//     // })
//     // }, [])
    
//     // appwriteService.getPosts([]).then((posts) => {
//     //     if (posts) {
//     //         setPosts(posts.documents)
//     //     }
//     // })
//     // useEffect(() => {
//     //     appwriteService.getPosts([]).then((posts) => {
//     //       if (posts) {
//     //         setPosts(posts.documents);
//     //       }
//     //     });
//     //   }, []); // Runs only once when the component mounts      
//   return (
//     <div className='w-full py-8'>
//         <Container>
//             <div className='flex flex-wrap'>
//                 {posts.map((post) => (
//                     <div key={post._id} className='p-2 w-1/4'>
//                         <PostCard {...post} />
//                     </div>
//                 ))}
//             </div>
//             </Container>
//     </div>
//   )
// }

// export default AllPosts


// import React, {useState, useEffect} from 'react'
// import { Container, PostCard } from '../components'
// import { getUserPosts } from "../services/post"; // Import the new function

// function AllPosts() {
//     const [posts, setPosts] = useState([])
    
//     useEffect(() => {
//         getUserPosts().then((res) => { // Use getUserPosts instead of getPosts
//             if (Array.isArray(res)) {
//                 setPosts(res)
//             } else if (res?.documents && Array.isArray(res.documents)) {
//                 setPosts(res.documents)
//             } else {
//                 console.error("Unexpected response format:", res)
//                 setPosts([])
//             }
//         }).catch((err) => {
//             console.error("Error fetching user posts:", err)
//             setPosts([])
//         })
//     }, [])
    
//     return (
//         <div className='w-full py-8'>
//             <Container>
//                 <div className='flex flex-wrap'>
//                     {posts.length > 0 ? (
//                         posts.map((post) => (
//                             <div key={post._id} className='p-2 w-1/4 '>
//                                 <PostCard {...post} username={post.userId?.username} hideAuthor/>
//                             </div>
//                         ))
//                     ) : (
//                         <div className='w-full text-center py-8'>
//                             <p className='text-gray-600  dark:text-gray-400'>You haven't created any posts yet.</p>
//                         </div>
//                     )}
//                 </div>
//                 {/* <div className="w-full py-8 px-4">
//                     {posts.length > 0 ? (
//                         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//                         {posts.map((post) => (
//                             <PostCard key={post._id} {...post} />
//                         ))}
//                         </div>
//                     ) : (
//                         <div className="w-full text-center py-8">
//                         <p className="text-gray-600 dark:text-gray-400">You haven't created any posts yet.</p>
//                         </div>
//                     )}
//                 </div> */}
//             </Container>
//         </div>
//     )
// }

// export default AllPosts

import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import { getUserPosts } from "../services/post";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getUserPosts()
      .then((res) => {
        const fetched = Array.isArray(res)
          ? res
          : res?.documents || [];

        setPosts(fetched);
        setFilteredPosts(fetched);
      })
      .catch((err) => {
        console.error("Error fetching user posts:", err);
        setPosts([]);
        setFilteredPosts([]);
      });
  }, []);

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const filtered = posts.filter((post) =>
      post.title.toLowerCase().includes(term)
    );
    setFilteredPosts(filtered);
  }, [searchTerm, posts]);

  return (
    <div className="w-full py-8">
      <Container>
        {/* 🔍 Search Bar */}
        <div className="w-full px-4 mb-6">
          <input
            type="text"
            placeholder="Search your posts by title..."
            className="w-full p-3 border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* 🧱 Post Cards */}
        <div className="flex flex-wrap">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <div key={post._id} className="p-2 w-1/4">
                <PostCard {...post} />
              </div>
            ))
          ) : (
            <div className="w-full text-center py-8">
              <p className="text-gray-600 dark:text-gray-400">
                Oops! No matching posts found.
              </p>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
