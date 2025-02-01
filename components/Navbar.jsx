"use client";

import React, { useState, useRef, useEffect } from "react";
import { FaSearch, FaBars, FaChevronDown } from "react-icons/fa";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const router = useRouter();
  const [dropdown, setDropdown] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const timeoutRef = useRef(null);
  const [hoveredItem, setHoveredItem] = useState("Home");
  const [bgPosition, setBgPosition] = useState(0);
  const menuRefs = useRef({}); // Store menu item refss--------------------------------------------------

  const menuItems = ["Home", "Lifestyle", "Culture", "Future","About Us", "Contact"];
  const dropdownItems = {
    Home: ["Magazine", "Personal", "Classic", "Minimal", "Catalog"],
    Future: ["Post Layouts", "Post Formates", "Archive", "Author Page"],
  };

  // Adjust background position dynamically-----------------------------------------------------------------------------
  useEffect(() => {
    if (menuRefs.current[hoveredItem]) {
      const item = menuRefs.current[hoveredItem];
      setBgPosition(item.offsetLeft);
    }
  }, [hoveredItem]);

  return (
    <>
      <nav className="py-10 px-4 md:px-20 bg-white relative">
        <div className="flex justify-between items-center">
          {/* Left Section - Logo & Menu */}
          <div className="flex items-center gap-10">
            <h1 className="text-2xl font-bold text-blue-900">
              MM-BLOG<span className="text-pink-500">.</span>
            </h1>

            {/* Menu Items --------------------------------------------------------------------------- */}
            <div className="relative hidden lg:flex items-center gap-4 text-gray-600">
              {/* Moving Background -------------------------------------------------------------------------------------------------- */}
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 h-10 w-24 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-orange-400 text-white transition-all duration-300"
                animate={{ left: bgPosition }}
              />

              {menuItems.map((item) => (
                <div
                  key={item}
                  ref={(el) => (menuRefs.current[item] = el)}
                  onMouseEnter={() => {
                    setHoveredItem(item);
                    if (dropdownItems[item]) {
                      setDropdown(item);
                    }
                  }}
                  onMouseLeave={() => {
                    setDropdown(null);
                  }}
                  className="relative z-10 cursor-pointer px-4 py-2 transition-all duration-300"
                >
                  {item}
                  {dropdownItems[item] && (
                    <FaChevronDown className="inline ml-1" />
                  )}
                  {dropdown === item && (
                    <motion.div
                      className="absolute left-0 mt-2 w-40 bg-white shadow-lg rounded-md z-20"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      {dropdownItems[item].map((subItem) => (
                        <div
                          key={subItem}
                          className="px-4 py-2 cursor-pointer transition-transform duration-500 transform hover:translate-x-2 hover:rotate-1  hover:text-pink-600"
                          onClick={() => {
                            
                            console.log(`Clicked on ${subItem}`);
                          }}
                        >
                          {subItem}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Section - Icons ------------------------------------------------------------------------- */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => router.push("/search")}
              className="h-10 w-10 flex items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-orange-400 text-white transition-all duration-300 hover:from-orange-600 hover:to-pink-500"
            >
              <FaSearch size={18} />
            </button>
            <button
              onClick={() => setSidebarOpen(true)}
              className="h-10 w-10 flex items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-orange-400 text-white transition-all hover:from-orange-600 hover:to-pink-500 duration-300"
            >
              <FaBars size={18} />
            </button>
          </div>
        </div>
      </nav>

      {/* Sidebar Component------------------------------------------------------------------------------------------------------ */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
};
