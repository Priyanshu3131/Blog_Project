import React from 'react'
import { useDispatch } from 'react-redux'
// import authService from '../../appwrite/auth'
import axios from '../../lib/axios'; 
import { logout } from '../../store/authSlice'

function LogoutBtn() {

    const dispatch = useDispatch() // Get the dispatch function from Redux
    // const logoutHandler = () => {
    //     authService.logout().then(() => {
    //         dispatch(logout())
    //     })
    // }
    const logoutHandler = async () => {
        try {
            // Hit backend logout endpoint
            await axios.post('/users/logout', {}, { withCredentials: true });

            // Update Redux state
            dispatch(logout());
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };
    // Calls authService.logout(), which logs the user out from Appwrite.
    // After successful logout, it dispatches logout(), updating Redux state to reflect that the user is no longer authenticated.
  return (
    <button
    className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
    onClick={logoutHandler}
    >Logout</button> 
  )

}

export default LogoutBtn
