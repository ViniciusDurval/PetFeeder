import React from 'react'

const Card = ({ children, className = "" }) => {
    return (
        <div className={`bg-white rounded-2xl shadow-md p-4 dark:bg-gray-800 transition-colors duration-500 ease-in-out ${className}`}>{children}</div>
    )
}

export default Card