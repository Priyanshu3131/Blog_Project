import React, {useEffect, useState} from 'react'
import {Container, PostForm} from '../components'
// import appwriteService from "../appwrite/config";
import { getPostById } from "../services/post";
import { useNavigate,  useParams } from 'react-router-dom';

function EditPost() {
    const [post, setPosts] = useState(null)
    const {postId} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (postId) {
            getPostById(postId).then((post) => {
                if (post) {
                    setPosts(post)
                }
            })
        } else {
            navigate('/')
        }
    }, [postId, navigate])
  return post ? (
    <div className='py-8'>
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
  ) : null
}

export default EditPost