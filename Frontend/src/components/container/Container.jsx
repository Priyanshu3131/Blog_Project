import React from 'react'

// function Container({children}) {
//     return <div className='w-full max-w-7xl mx-auto px-4'>{children}</div>;
// }

// export default Container

function Container({ children }) {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  );
}

// function Container({ children, fullWidth = false }) { // do this if u want the cards to be expanded to entire screen
//   return (
//     <div className={`mx-auto ${fullWidth ? 'w-full' : 'max-w-7xl'} px-4 sm:px-6 lg:px-8`}>
//       {children}
//     </div>
//   );
// }
export default Container


