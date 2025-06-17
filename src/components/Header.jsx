import React, { useContext } from 'react'
import DarkModeToggle from './DarkModeToggle';
import { User2 } from 'lucide-react'
import { UserContext } from '../context/UserContext';

const Header = () => {
  const { userName } = useContext(UserContext);
  return (
    <header className='w-full h-10 pl-2 pr-2 flex items-center justify-between bg-gray-300 dark:bg-gray-400'>
      <div className='flex items-center justify-items-start'>
        <User2 size={36} alt="User image"></User2>
        <span>{userName}</span>

      </div>

      <DarkModeToggle></DarkModeToggle>
    </header>
  )
}

export default Header