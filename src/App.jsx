import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : 
      window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-10 bg-white/80 dark:bg-surface-900/80 backdrop-blur-md border-b border-surface-200 dark:border-surface-800">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <motion.div
              initial={{ rotate: -10 }}
              animate={{ rotate: 0 }}
              className="text-primary font-bold text-2xl"
            >
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                TaskTide
              </span>
            </motion.div>
          </div>
          
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <Sun size={20} className="text-yellow-400" />
            ) : (
              <Moon size={20} className="text-surface-600" />
            )}
          </motion.button>
        </div>
      </header>

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <footer className="py-4 px-4 border-t border-surface-200 dark:border-surface-800 text-center text-sm text-surface-500">
        <div className="container mx-auto">
          <p>© {new Date().getFullYear()} TaskTide. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;