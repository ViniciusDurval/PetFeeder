import { useEffect, useState } from 'react';
import { Moon, Sun } from "lucide-react"

export default function DarkModeToggle({isHide = false}) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const userTheme = localStorage.getItem("theme");

    // Priorizando o tema salvo antes pelo usuário
    if (userTheme) {
      setDarkMode(userTheme === "dark");
    }
    // Caso não tenha, pega a preferência do sistema
    else {
      const systemPrefersTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setDarkMode(systemPrefersTheme);
    }
  },[])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem("theme", "dark");
    }
    else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  if (isHide) {
    return <></>;
  }
  
  return (
    <div className="flex items-center space-x-2">
      {darkMode ? <Moon size={30} />: <Sun size={30} />} 
      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`w-12 h-6 flex items-center bg-gray-600 rounded-full p-1 transition duration-300`}
      >
        <div
          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition duration-300 ${
            darkMode ? 'translate-x-6' : 'translate-x-0'
          }`}
        ></div>
      </button>
    </div>
  );
}
