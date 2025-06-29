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


import React, { useEffect, useState } from 'react';
import { getPosts } from "../services/post";
import { Container, PostCard } from '../components';

function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getPosts().then((posts) => {
            if (posts) setPosts(posts);
        });
    }, []);

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
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4'>
                    {posts.map((post) => (
                        <PostCard key={post._id} {...post} />
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default Home;
