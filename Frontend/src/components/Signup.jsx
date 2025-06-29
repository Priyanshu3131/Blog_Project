import React, {useState} from 'react'
// import authService from '../appwrite/auth'
import { registerUser, getCurrentUser,loginUser } from '../services/auth'

import {Link ,useNavigate} from 'react-router-dom'
import {login} from '../store/authSlice'
import {Button, Input, Logo} from './index.js'
import {useDispatch} from 'react-redux'
import {useForm} from 'react-hook-form'

function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()

    
    const [loading, setLoading] = useState(false)

    const create = async (data) => {
      setError("")
      setLoading(true)
      try {
        const result = await registerUser(data);
        if (result?.success) {
          await loginUser({ email: data.email, password: data.password });
          const userData = await getCurrentUser();
          if (userData) {
            dispatch(login(userData));
            navigate("/");
          }
        }
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }

    }
    

    // const create = async(data) => {
    // setError("")   
    // try {
    //     // Step 1: Register the user
    //     const result = await registerUser(data);
        
    //     if (result?.success) {
    //         // Step 2: Login the user (this sets the token/cookie)
    //         const loginData = {
    //             email: data.email,
    //             password: data.password
    //         };
    //         await loginUser(loginData);
            
    //         // Step 3: Now get current user (this will work because user is logged in)
    //         const userData = await getCurrentUser();
    //         if (userData) {
    //             dispatch(login(userData));
    //             navigate("/");
    //         }
    //     }
    // } catch (error) {
    //     setError(error.message)
    // }
// }

  return (
    <div className="flex items-center justify-center w-screen min-h-screen bg-white dark:bg-gray-950">
         <div className="mx-auto w-full max-w-lg bg-white dark:bg-gray-900 rounded-xl p-10 border border-black/10 dark:border-gray-700 shadow-md transition-colors">
      {/* <div className="mx-auto w-full max-w-lg bg-white dark:bg-gray-900 rounded-xl p-10 border border-black/10 dark:border-gray-700 shadow-md transition-colors"> */}
        {/* Logo */}
        <div className="mb-4 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-center text-2xl font-bold leading-tight text-gray-800 dark:text-white">
          Sign up to create account
        </h2>

        {/* Subtext */}
        <p className="mt-2 text-center text-base text-gray-600 dark:text-gray-400">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
          >
            Sign In
          </Link>
        </p>

        {/* Error */}
        {error && (
          <p className="text-red-600 dark:text-red-400 mt-6 text-center">{error}</p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(create)} className="mt-6">
          <div className="space-y-5">
            <Input
              autoFocus
              label="Username:"
              placeholder="Choose a unique username"
              {...register('username', { required: true })}
            />
            <Input
              label="Full Name:"
              placeholder="Enter your full name"
              {...register('fullName', { required: true })}
            />
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
              {...register('password', { required: true })}
            />
            <Button type="submit" className="w-full">
              {/* Create Account */}
              {loading ? "Creating..." : "Create Account"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );

//   return (
//     <div className="flex items-center justify-center">
//             <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
//             <div className="mb-2 flex justify-center">
//                     <span className="inline-block w-full max-w-[100px]">
//                         <Logo width="100%" />
//                     </span>
//                 </div>
//                 <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
//                 <p className="mt-2 text-center text-base text-black/60">
//                     Already have an account?&nbsp;
//                     <Link
//                         to="/login"
//                         className="font-medium text-primary transition-all duration-200 hover:underline"
//                     >
//                         Sign In
//                     </Link>
//                 </p>
//                 {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

//                 <form onSubmit={handleSubmit(create)}>
//                     <div className='space-y-5'>
//                         <Input
//                             label="Username: "
//                             placeholder="Choose a unique username"
//                             {...register("username", {
//                                 required: true,
//                             })}
//                         />
//                         <Input 
//                         label="Full Name: "
//                         placeholder="Enter your full name"
//                         {...register("fullName", {
//                             required: true,  //Ensures the field is not empty
//                         })}
//                         />
                        
//                         <Input
//                         label="Email: "
//                         placeholder="Enter your email"
//                         type="email"
//                         {...register("email", {
//                             required: true,
//                             validate: {
//                                 matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
//                                 "Email address must be a valid address",
//                             }
//                         })}
//                         />
//                         <Input
//                         label="Password: "
//                         type="password"
//                         placeholder="Enter your password"
//                         {...register("password", {
//                             required: true,})}
//                         />
//                         <Button type="submit" className="w-full">
//                             Create Account
//                         </Button>
//                     </div>
//                 </form>
//             </div>

//     </div>
//   )
}

export default Signup