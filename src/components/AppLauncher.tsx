"use client";

import { useState } from "react";
import NextLink from "next/link";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AppsIcon from "@mui/icons-material/Apps";
import ArticleIcon from "@mui/icons-material/Article";
import DownloadIcon from "@mui/icons-material/Download";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";

const AppLauncher = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const apps = [
    { name: "Resume", icon: <ArticleIcon />, href: "/resume" },
    { name: "Counter", icon: <AddCircleIcon />, href: "/counter" },
    { name: "Download", icon: <DownloadIcon />, href: "/download" },
    { name: "Shopping", icon: <ShoppingCartIcon />, href: "/shopping" }
  ];

  return (
    <div className="p-2">
      <IconButton
        className="hover:bg-gray-700"
        onClick={handleClick}
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
      >
        <AppsIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <div className="grid grid-cols-3 w-72">
          {apps.map((app, index) => (
            <NextLink key={index} href={app.href || "#"} className="m-3">
              <div className="flex flex-col items-center justify-center p-3 rounded-lg hover:bg-blue-50 cursor-pointer transition-all group">
                <div className="text-gray-800 group-hover:text-blue-800 mb-1">
                  {app.icon}
                </div>
                <span className="text-xs text-gray-800 text-center font-medium">
                  {app.name}
                </span>
              </div>
            </NextLink>
          ))}
        </div>
      </Menu>
    </div>
  );
};

export default AppLauncher;
