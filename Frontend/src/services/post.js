import axios from "../lib/axios";

// Create post
export const createPost = async (formData) => {
  const res = await axios.post("/posts/createPost", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// Fetch all posts
// export const getPosts = async () => {
//   const res = await axios.get("/posts/getPosts");
//   return res.data;
// };
export const getPosts = async () => {
  const res = await axios.get("/posts/getPosts");

  // Check if res.data.data is an array (common Express format)
  if (Array.isArray(res.data?.data)) return res.data.data;

  // If you directly return the array from backend
  if (Array.isArray(res.data)) return res.data;

  // Default fallback
  return [];
};
//**************************************************************************************************** */
export const getUserPosts = async () => {
  const res = await axios.get("/posts/getUserPosts"); // You'll need this backend endpoint
  
  // Same response handling as getPosts
  if (Array.isArray(res.data?.data)) return res.data.data;
  if (Array.isArray(res.data)) return res.data;
  return [];
};

// Fetch post by ID
export const getPostById = async (id) => {
  const res = await axios.get(`/posts/getPost?id=${id}`);
  //return res.data;
  return res.data?.data;
};

// Update post
// export const updatePost = async (formData) => {
//   const res = await axios.put(`/posts/updatePost?id=${id}`, formData, {
//     headers: { "Content-Type": "multipart/form-data" },
//   });
//   return res.data;
// };

export const updatePost = async (formData, id) => {
  const res = await axios.put(`/posts/updatePost?id=${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// Delete post
// export const deletePost = async (id) => {
//   const res = await axios.delete("/posts/deletePost", { data: { id } });
//   return res.data;
// };

export const deletePost = async (id) => {
  const res = await axios.delete(`/posts/deletePost?id=${id}`);
  return res.data;
};