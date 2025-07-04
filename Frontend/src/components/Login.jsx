import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import {Button, Input, Logo} from "./index"
import {useDispatch} from "react-redux"  // To update Redux state
// import authService from "../appwrite/auth"
import { loginUser, getCurrentUser } from "../services/auth";
import {useForm} from "react-hook-form" // Manages form state & validation

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState("")

    const login = async(data) => { //The data comes from React Hook Form when the form is submitted.
        setError("")
        try {
            const session = await loginUser(data)
            if (session) {
                const userData = await getCurrentUser()
                if(userData) dispatch(authLogin(userData)); // Store user data in Redux
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
            // setError(error?.response?.data?.message || "Login failed");
        }
    }

    return (
    <div className="flex items-center justify-center w-full bg-gray-100 dark:bg-gray-950 min-h-screen">
      <div className="mx-auto w-full max-w-lg bg-white dark:bg-gray-900 rounded-xl p-10 border border-black/10 dark:border-gray-700 shadow-md transition-colors">
        {/* Logo */}
        <div className="mb-4 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-center text-2xl font-bold leading-tight text-gray-800 dark:text-white">
          Sign in to your account
        </h2>

        {/* Subtext */}
        <p className="mt-2 text-center text-base text-gray-600 dark:text-gray-400">
          Don&apos;t have an account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
          >
            Sign Up
          </Link>
        </p>

        {/* Error */}
        {error && (
          <p className="text-red-600 dark:text-red-400 mt-6 text-center">{error}</p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Email:"
              placeholder="Enter your email"
              type="email"
              {...register('email', {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    'Email address must be a valid address',
                },
              })}
            />
            <Input
              label="Password:"
              type="password"
              placeholder="Enter your password"
              {...register('password', {
                required: true,
              })}
            />
            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );

//   return (
//     <div
//     className='flex items-center justify-center w-full'
//     >
//         <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
//         <div className="mb-2 flex justify-center">
//                     <span className="inline-block w-full max-w-[100px]">
//                         <Logo width="100%" />
//                     </span>
//         </div>
//         <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
//         <p className="mt-2 text-center text-base text-black/60">
//                     Don&apos;t have any account?&nbsp;
//                     <Link
//                         to="/signup"
//                         className="font-medium text-primary transition-all duration-200 hover:underline"
//                     >
//                         Sign Up
//                     </Link>
//         </p>
//         {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
//         <form onSubmit={handleSubmit(login)} className='mt-8'>  
//         {/* Validates and submits form data */}
//             <div className='space-y-5'>   
//                 <Input
//                 label="Email: "
//                 placeholder="Enter your email"
//                 type="email"
//                 {...register("email", { //Registers input fields for validation & tracking
//                     required: true, //Ensures the field is not empty
//                     validate: {
//                         matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
//                         "Email address must be a valid address",
//                     }
//                 })}
//                 />
//                 <Input
//                 label="Password: "
//                 type="password"
//                 placeholder="Enter your password"
//                 {...register("password", {
//                     required: true,
//                 })}
//                 />
//                 <Button
//                 type="submit"
//                 className="w-full"
//                 >Sign in</Button>
//             </div>
//         </form>
//         </div>
//     </div>
//   )
}

export default Login