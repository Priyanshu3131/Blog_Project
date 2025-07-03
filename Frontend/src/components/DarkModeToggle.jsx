// src/components/DarkModeToggle.jsx
import { useEffect, useState } from "react";

const DarkModeToggle = () => {
  // const [darkMode, setDarkMode] = useState(() =>
  //   localStorage.getItem("theme") === "dark"
  // );
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme === "dark";
    // If not saved, check system preference
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <button
      className="text-sm px-3 py-1 rounded-full border dark:border-white border-black dark:text-white"
      onClick={() => setDarkMode(!darkMode)}
    >
      {darkMode ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
};

export default DarkModeToggle;
