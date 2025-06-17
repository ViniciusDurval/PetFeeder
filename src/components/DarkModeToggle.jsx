import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion"
import { Moon, Sun } from "lucide-react"

export default function DarkModeToggle({ isHide = false }) {
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
  }, [])

  // Alterando o documento html conforme a variavel darkMode
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
    <div className="w-12 h-9 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-full shadow-inner transition-colors duration-300 overflow-hidden">
      <button className="relative w-full h-full" onClick={() => setDarkMode(!darkMode)}>
        <AnimatePresence mode="wait" initial={false}>
          {darkMode ? (
            <motion.div
              key="moon"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex justify-center items-center"
            >
              <Moon className="text-gray-300" size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex justify-center items-center"
            >
              <Sun className="text-amber-600" size={24} />
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}
