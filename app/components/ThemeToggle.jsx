"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { SunMoon,Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-md bg-gray-100 dark:bg-gray-800"
    >
      {theme === "dark" ? <SunMoon /> : <Moon />} 
    </button>
  );
}
