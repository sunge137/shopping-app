"use client";

import Link from "next/link";
import HomeIcon from "@mui/icons-material/Home";
import IconButton from "@mui/material/IconButton";
import AppLauncher from "@components/AppLauncher";
import ThemeToggle from "@components/ThemeToggle";

function Header() {

  return (
    <header className="fixed z-[100] w-full bg-gray-800 text-white border-t border-slate-700 p-4">
      <nav className="px-6 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <IconButton
            className="hover:bg-gray-700"
            component={Link}
            href="/"
            size="large"
            edge="start"
            color="inherit"
            aria-label="home"
          >
            <HomeIcon />
          </IconButton>
        </div>
        <div className="flex items-center space-x-2">
          <AppLauncher />
          <ThemeToggle />
          <Link href="/" className="p-2 hover:bg-gray-700 rounded-sm">
            Login
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
