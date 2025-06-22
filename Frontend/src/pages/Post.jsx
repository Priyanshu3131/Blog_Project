import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
// import appwriteService from "../appwrite/config";
//import { getPostById, deletePost } from "../services/post";
import { getPostById, deletePost as deletePostService } from "../services/post";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { postId } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
    // new 
    useEffect(() => {
    console.log("Post:", post);
    console.log("UserData:", userData);
    if (post && userData) {
        console.log("Match?", post.userId === userData._id);
    }
}, [post, userData]);

    //const isAuthor = post && userData ? post.userId === userData._id : false;
    const isAuthor = !!post && !!userData && String(post.userId) === String(userData._id);


    useEffect(() => {
        if (postId) {
            getPostById(postId).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [postId, navigate]);

    // const deletePost = () => {
    //     appwriteService.deletePost(post.$id).then((status) => {
    //         if (status) {
    //             appwriteService.deleteFile(post.featuredImage);
    //             navigate("/");
    //         }
    //     });
    // };

    // const deletePost = async () => {
    //     const status = await deletePost(post._id);
    //     if (status) {
    //         navigate("/");
    //     }
    // };
    const handleDelete = async () => {
    const status = await deletePostService(post._id); // ✅ calls correct function
    if (status) {
        navigate("/");
    }
};

    return post ? (
        <div className="py-8">
            
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        //src={post.featuredImage}
                        src={post.imageUrl}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post._id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={handleDelete}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {/* {parse(post.content)} */}
                    {parse(post.content || "")}
                    </div>
            </Container>
        </div>
    ) : null;
}