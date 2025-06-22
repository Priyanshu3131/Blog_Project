// src/services/auth.js
import axios from "../lib/axios";

// POST /users/login
export const loginUser = async (data) => {
  const res = await axios.post("/users/login", data, {
    withCredentials: true, // Ensures cookie is saved in browser
  });
  return res.data;
};

// GET /users/me
// export const getCurrentUser = async () => {
//   const res = await axios.get("/users/me", {
//     withCredentials: true,
//   }); 
//   //return res.data;
//   return res.data?.data;  // ✅ Return only the `data` field that contains the actual user
// };
export const getCurrentUser = async () => {
  try {
    const res = await axios.get("/users/me", {
      withCredentials: true,
    }); 
    return res.data?.data;
  } catch (error) {
    // Don't throw error if user is not authenticated
    if (error.response?.status === 401) {
      console.log("User not authenticated");
      return null;
    }
    throw error; // Re-throw other errors
  }
};

export const registerUser = async (data) => {
  const res = await axios.post("/users/register", data, {
    withCredentials: true,
  });
  return res.data;
};

// POST /users/logout
export const logoutUser = async () => {
  const res = await axios.post("/users/logout", null, {
    withCredentials: true,
  });
  return res.data;
};
