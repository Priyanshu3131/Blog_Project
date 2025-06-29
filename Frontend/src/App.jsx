import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
//import authService from "./appwrite/auth"
import { getCurrentUser } from "./services/auth"
import {login, logout} from "./store/authSlice"
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'

function App() {
  //console.log(process.env.REACT_APP_APPWRITE_URL)
  //for Vite
  //console.log(import.meta.env.VITE_APPWRITE_URL)

  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    getCurrentUser()
    .then((userData) => {
      if (userData) { 
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [])

  // return !loading ? (
  //   <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
  //     <Header />
  //     <main className="flex-grow w-full px-4 py-6">
  //       <Outlet />
  //     </main>
  //     <Footer />
  //   </div>
  // ) : null;

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-white dark:bg-gray-950'>
      <div className='w-full block'>
        <Header />
        <main>
        <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App

