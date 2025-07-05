// import React, {useEffect, useState} from 'react'
// //import appwriteService from "../appwrite/config";
// import { getPosts } from "../services/post";
// import {Container, PostCard} from '../components'

// function Home() {
//     const [posts, setPosts] = useState([])

//     useEffect(() => {
//         getPosts().then((posts) => {
//             if (posts) {
//                 // setPosts(posts.documents)\
//                 setPosts(posts)
//             }
//         })
//     }, [])
  
//     if (posts.length === 0) {
//         return (
//             <div className="w-full py-8 mt-4 text-center">
//                 <Container>
//                     <div className="flex flex-wrap">
//                         <div className="p-2 w-full">
//                             <h1 className="text-2xl font-bold hover:text-gray-500">
//                                 Login to read posts
//                             </h1>
//                         </div>
//                     </div>
//                 </Container>
//             </div>
//         )
//     }
//     return (
//         <div className='w-full py-8'>
//             <Container >
//                 <div className='flex flex-wrap'>
//                     {posts.map((post) => (
//                         <div key={post._id} className='p-2 w-1/4'>
//                             <PostCard {...post} />
//                         </div>
//                     ))}
//                 </div>
//             </Container>
//         </div>
//     )
// }

// export default Home


// import React, { useEffect, useState } from 'react';
// import { getPosts } from "../services/post";
// import { Container, PostCard } from '../components';

// function Home() {
//     const [posts, setPosts] = useState([]);

//     useEffect(() => {
//         getPosts().then((posts) => {
//             if (posts) setPosts(posts);
//         });
//     }, []);

//     if (posts.length === 0) {
//         return (
//             <div className="w-full min-h-screen bg-gray-100 dark:bg-gray-950 text-center flex items-center justify-center">
//                 <h1 className="text-3xl font-semibold text-gray-700 dark:text-gray-300">
//                     Please login to read posts
//                 </h1>
//             </div>
//         );
//     }

//     return (
//         <div className='w-full min-h-screen bg-gray-100 dark:bg-gray-950 py-10 text-gray-900 dark:text-gray-100'>
//             <Container fullWidth={true}>
//                 <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4'>
//                     {posts.map((post) => (
//                         <PostCard key={post._id} {...post} username={post.userId?.username}/>
//                     ))}
//                 </div>
//             </Container>
//         </div>
//     );
// }

// export default Home;

import React, { useEffect, useState } from 'react';
import { getPosts } from "../services/post";
import { Container, PostCard } from '../components';

function Home() {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        getPosts().then((posts) => {
            if (Array.isArray(posts)) {
                setPosts(posts);
                setFilteredPosts(posts);
            }
        });
    }, []);

    useEffect(() => {
        const lowerTerm = searchTerm.toLowerCase();
        const filtered = posts.filter((post) =>
            post.title.toLowerCase().includes(lowerTerm) ||
            post.userId?.username?.toLowerCase().includes(lowerTerm)
        );
        setFilteredPosts(filtered);
    }, [searchTerm, posts]);

    if (posts.length === 0) {
        return (
            <div className="w-full min-h-screen bg-gray-100 dark:bg-gray-950 text-center flex items-center justify-center">
                <h1 className="text-3xl font-semibold text-gray-700 dark:text-gray-300">
                    Please login to read posts
                </h1>
            </div>
        );
    }

    return (
        <div className='w-full min-h-screen bg-gray-100 dark:bg-gray-950 py-10 text-gray-900 dark:text-gray-100'>
            <Container fullWidth={true}>
                {/* 🔍 Search Bar */}
                <div className="w-full px-4 mb-8">
                    <input
                        type="text"
                        placeholder="Search posts by title or author..."
                        className="w-full p-3 border rounded-md bg-gray-800 dark:bg-gray-800 dark:border-gray-600 dark:text-white text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4'>
                    {filteredPosts.length > 0 ? (
                        filteredPosts.map((post) => (
                            <PostCard
                                key={post._id}
                                {...post}
                                username={post.userId?.username}
                            />
                        ))
                    ) : (
                        <p className="text-center col-span-full text-gray-600 dark:text-gray-400">
                           Oops! No posts match your search.
                        </p>
                    )}
                </div>
            </Container>
        </div>
    );
}

export default Home;
