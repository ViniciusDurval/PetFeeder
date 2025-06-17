import React, { useContext } from 'react'
import petImg from "../miles.jpg" // foto do seu pet
import DarkModeToggle from './DarkModeToggle';
import { UserContext } from '../context/UserContext';

const Header = () => {
  const { userName } = useContext(UserContext);
  return (
    <header className='w-full px-6 py-1 bg-white dark:bg-gray-800 shadow-md top-0 left-0 z-50 flex justify-between items-center'>
      <div className='flex items-center justify-items-start gap-1.5'>
        {/* Little Miles ;)*/}
        <img className='h-10 rounded-full' src={petImg} />
        <span className='text-black dark:text-white'>{userName}</span>

      </div>

      <DarkModeToggle></DarkModeToggle>
    </header>
  )
}

export default Header