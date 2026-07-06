"use client";

import { useState, TouchEvent, ReactNode, useEffect, useRef } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

interface SwipeableListItemProps {
  children: ReactNode;
  onDelete: () => void;
  isGlobalEdit?: boolean;
}

function SwipeableListItem({
  children,
  onDelete,
  isGlobalEdit = false
}: Readonly<SwipeableListItemProps>) {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isSlidOpen, setIsSlidOpen] = useState(false);
  const isSlidOpenRef = useRef(isSlidOpen);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  useEffect(() => {
    setIsSlidOpen(isGlobalEdit);
  }, [isGlobalEdit]);

  useEffect(() => {
    isSlidOpenRef.current = isSlidOpen;
  }, [isSlidOpen]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (isSlidOpenRef.current && ref.current != null && !ref.current.contains(event.target as Node)) {
        setIsSlidOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;
    const handleNativeTouchMove = (e: globalThis.TouchEvent) => {
      if (isGlobalEdit) return;
      if (e.targetTouches.length > 0) {
        if (e.cancelable) {
          e.preventDefault();
        }
        setTouchEnd(e.targetTouches[0].clientX);
      }
    };

    element.addEventListener("touchmove", handleNativeTouchMove, { passive: false });
    return () => {
      element.removeEventListener("touchmove", handleNativeTouchMove);
    };
  }, [isGlobalEdit]);

  const minSwipeDistance = 50;

  const handleTouchStart = (e: TouchEvent) => {
    if (isGlobalEdit) return;
    setTouchEnd(null);
    if (e.targetTouches.length > 0) {
      setTouchStart(e.targetTouches[0].clientX);
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (isGlobalEdit) return;
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (isGlobalEdit || !touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      setIsSlidOpen(true);
    } else if (isRightSwipe) {
      setIsSlidOpen(false);
    }
  };

  const handleDeleteClick = () => {
    if (!isGlobalEdit) {
      setIsSlidOpen(false);
    }
    onDelete();
  };

  const getContainerStyle = () => {
    if (isGlobalEdit) {
      // In global edit mode: Squeeze the content container so text/checkbox fits safely on screen
      return {
        width: "calc(100% - 56px)",
        transform: "translateX(0px)"
      };
    }
    return {
      width: "100%",
      transform: isSlidOpen ? "translateX(-72px)" : "translateX(0px)"
    };
  };

  return (
    <div ref={ref} className="relative overflow-hidden my-1 rounded-md w-full">
      <div className="absolute inset-0 flex justify-end items-center bg-red-600 rounded-md z-0 pr-4">
        <IconButton
          onClick={handleDeleteClick}
          className="text-white"
          aria-label="delete"
        >
          <DeleteIcon />
        </IconButton>
      </div>
      <div
        ref={containerRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={getContainerStyle()}
        className="w-full bg-white dark:bg-zinc-900 transition-transform duration-300 ease-out z-10 flex items-center relative"
      >
        {isSlidOpen && !isGlobalEdit && (
          <div
            className="absolute inset-0 z-20 cursor-pointer"
            onClick={() => setIsSlidOpen(false)}
          />
        )}
        <div className="w-full z-10">
          {children}
        </div>
      </div>
    </div>
  );
}

export default SwipeableListItem;
