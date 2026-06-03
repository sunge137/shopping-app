"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import IconButton from "@mui/material/IconButton";

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && (!theme || theme === "system")) {
      const systemTheme =
        (resolvedTheme === "dark" || window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light");
      setTheme(systemTheme);
    }
  }, [mounted, theme, resolvedTheme, setTheme]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="p-2">
      <IconButton
        className="hover:bg-gray-700"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        size="large"
        edge="start"
        color="inherit"
        aria-label="theme-toggle"
      >
        {theme === "dark"
          ? <LightModeIcon className="text-white" />
          : <DarkModeIcon className="text-white" />
        }
      </IconButton>
    </div>
  );
}

export default ThemeToggle;
