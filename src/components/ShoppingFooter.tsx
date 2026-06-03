"use client";

import { useRouter } from "next/navigation";
import ChecklistIcon from "@mui/icons-material/Checklist";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import IconButton from "@mui/material/IconButton";
import ShoppingAddDialog from "@components/ShoppingAddDialog";

function ShoppingFooter() {
  const router = useRouter();

  // Define navigation routes
  const navItems = [
    { icon: <ChecklistIcon />, path: "/shopping/list" },
    { icon: <ImageSearchIcon />, path: "/shopping/search" },
  ];

  return (
    <footer className="fixed bottom-0 left-0 w-full bg-gray-800 text-white shadow-lg border-t border-slate-700 py-3 z-50">
      <div className="grid grid-cols-3 max-w-lg mx-auto px-6">
        {navItems.map((item, index) => (
          <div key={index} className="flex justify-center">
            <IconButton
              onClick={() => router.push(item.path)}
              className="text-white hover:bg-slate-800 transition-colors duration-200"
            >
              {item.icon}
            </IconButton>
          </div>
        ))}
        <div className="flex justify-center">
          <ShoppingAddDialog />
        </div>
      </div>
    </footer>
  );
}

export default ShoppingFooter;
