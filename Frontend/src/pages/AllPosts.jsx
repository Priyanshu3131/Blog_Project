import React, {useState, useEffect} from 'react'
import { Container, PostCard } from '../components'
//import appwriteService from "../appwrite/config";
import { getPosts } from "../services/post";

function AllPosts() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
    getPosts().then((res) => {
      if (Array.isArray(res)) {
        setPosts(res)
      } else if (res?.documents && Array.isArray(res.documents)) {
        setPosts(res.documents)
      } else {
        console.error("Unexpected response format:", res)
        setPosts([])
      }
    }).catch((err) => {
      console.error("Error fetching posts:", err)
      setPosts([])
    })
  }, [])
    // useEffect(() => {
    //     getPosts().then((posts) => {
    //     if (posts?.length > 0) {
    //         setPosts(posts.documents)
    //     }
    // })
    // }, [])
    
    // appwriteService.getPosts([]).then((posts) => {
    //     if (posts) {
    //         setPosts(posts.documents)
    //     }
    // })
    // useEffect(() => {
    //     appwriteService.getPosts([]).then((posts) => {
    //       if (posts) {
    //         setPosts(posts.documents);
    //       }
    //     });
    //   }, []); // Runs only once when the component mounts      
  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {posts.map((post) => (
                    <div key={post._id} className='p-2 w-1/4'>
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
            </Container>
    </div>
  )
}

export default AllPosts