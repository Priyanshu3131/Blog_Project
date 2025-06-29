import React from 'react'
import {Container,Logo,LogoutBtn} from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux' //Retrieves authentication status from Redux.
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom';

import DarkModeToggle from '../DarkModeToggle'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const location = useLocation();
  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: "My Posts",
      slug: "/all-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },
  ]

  return (
    <header className="py-4 shadow bg-white dark:bg-gray-900 transition-colors duration-300">
      <Container>
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            {/* <Link to="/">
              <Logo width="24px" />
            </Link> */}
            <span className="text-xl font-bold text-gray-800 dark:text-white">🖋️Blogly</span>
          </div>

          {/* Navigation Links */}
          <ul className="flex gap-2 sm:gap-4 flex-wrap items-center text-gray-700 dark:text-gray-300">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    {/* <button
                      onClick={() => navigate(item.slug)}
                      className="px-4 py-2 rounded-full hover:bg-blue-100 dark:hover:bg-gray-700 transition"
                    >
                      {item.name}
                    </button> */}
                    <button
                      onClick={() => navigate(item.slug)}
                      className={`px-4 py-2 rounded-full transition
                        ${location.pathname === item.slug
                          ? 'bg-blue-600 text-white dark:bg-blue-500'
                          : 'hover:bg-blue-100 dark:hover:bg-gray-700'
                        }`}
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}

            {/* Logout Button */}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}

            {/* Dark Mode Toggle */}
            <li>
              <DarkModeToggle />
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;

//   return (
//     <header className='py-3 shadow bg-gray-500'>
//       <Container>
//         <nav className='flex'>
//           <div className='mr-4'>
//             <Link to='/'>
//               <Logo width='20px'  />
//               </Link>
//           </div>
//           <ul className='flex ml-auto'>
//             {navItems.map((item) => 
//             item.active ? (
//               <li key={item.name}>
//                 <button
//                 onClick={() => navigate(item.slug)}
//                 className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
//                 >{item.name}</button>
//               </li>
//             ) : null
//             )}
//             {/* map() loops over navItems and renders only the active items.
//             navigate(item.slug) redirects users when a button is clicked. */}
//             {authStatus && (  // is authStatus is true then proceed
//               <li>
//                 <LogoutBtn />
//               </li>
//             )}
//           </ul>
//         </nav>
//         </Container>
//     </header>
//   )
// }

// export default Header

