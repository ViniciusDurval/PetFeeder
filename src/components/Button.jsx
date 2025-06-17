import React from 'react'

const Button = ({ children, className, onClick, variant = "default", disable = false }) => {
    const baseStyle = "px-4 py-2 rounded-lg font-semibold transition";
    const variants = {
        default: "bg-blue-500 text-white hover:bg-blue-600",
        outline: "border border-blue-500 text-blue-500 hover:bg-blue-100 dark:hover:bg-gray-700",
        ghost: "text-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500",
      };

    return (
        <button className={`${baseStyle} ${variants[variant]} ${className} ${disable ? "cursor-not-allowed opacity-50" :""}`} disabled={disable} onClick={onClick}>
            {children}
        </button>
    )
}

export default Button