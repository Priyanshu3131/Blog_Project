import React, {useId} from 'react' // generate a unique ID for the input field.

const Input = React.forwardRef( function Input({ //React.forwardRef() → Allows this component to accept a ref from a parent.
    label,
    type = "text",
    className = "",
    ...props
}, ref){
    const id = useId() //Generates a unique ID for the input field.
    return (
        <div className='w-full'>
            {label && <label 
            className='inline-block mb-1 pl-1 text-sm font-medium text-gray-700 dark:text-gray-300'
            htmlFor={id}> 
            {/* Connects label to input for accessibility. */}
                {label}
            </label>
            }
            <input
            type={type}
            className={`px-3 py-2 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white outline-none focus:bg-gray-50 dark:focus:bg-gray-700 duration-200 border border-gray-300 dark:border-gray-600 w-full ${className}`} // backtick is used to convert to js
            ref={ref}  // Allows access via ref from a parent.
            {...props}
            id={id}   // Ensures correct association with the label.
            />
        </div>
    )
})

export default Input