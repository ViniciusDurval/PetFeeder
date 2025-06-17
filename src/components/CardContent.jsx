import React from 'react'

const CardContent = ({ children, className="" }) => {
  return (
    <div className={`text-black dark:text-white p-2 transition-colors duration-500 ease-in-out ${className}`}>{children}</div>
  )
}

export default CardContent