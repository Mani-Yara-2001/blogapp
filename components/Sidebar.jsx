"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaTimes, FaChevronDown, FaFacebookF, FaTwitter, FaInstagram, FaPinterest, FaTiktok, FaYoutube } from "react-icons/fa";

const Sidebar = ({ isOpen, onClose }) => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  return (
    <>
      
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose} />}

      {/* Sidebar Panel ----------------------------------------------------------------------------------*/}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? "0%" : "100%" }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed top-0 flext justify-between flex-col right-0 h-full w-4/5 sm:w-1/3 lg:w-1/4 bg-white shadow-lg z-50 p-6"
      >
        {/* Close Button ------------===--------------------------------------------------*/}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-600">
          <FaTimes size={22} />
        </button>

        {/* Logo=-------------------------------------------------------------------------------------------------------------- */}
        <h1 className="text-2xl font-bold text-blue-900 mb-8">
          MM-Blog<span className="text-pink-500">.</span>
        </h1>

        
        <ul className="space-y-4 mt-20 text-gray-700 text-lg font-medium">
          {/* Home with Dropdown----------------------------------------------------------------=---------------------------- */}
          <li className="flex items-center justify-between cursor-pointer hover:text-pink-600 ">
            Home
            <button onClick={() => toggleDropdown("home")} className="p-2">
              <FaChevronDown size={14} />
            </button>
          </li>
          {openDropdown === "home" && (
            <motion.ul
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="pl-4 space-y-2 text-gray-500 text-sm"
            >
              <li className="hover:text-pink-600 cursor-pointer">Magazine</li>
              <li className="hover:text-pink-600 cursor-pointer">Personal</li>
              <li className="hover:text-pink-600 cursor-pointer">Classic</li>
              <li className="hover:text-pink-600 cursor-pointer">Minimal</li>
              <li className="hover:text-pink-600 cursor-pointer">Catalog</li>
            </motion.ul>
          )}

          <li className="cursor-pointer hover:text-pink-600">Lifestyle</li>
          <li className="cursor-pointer hover:text-pink-600">Culture</li>

          {/* Features with Dropdown -----------------------------------------------------------------------------------------------------------*/}
          <li className="flex items-center justify-between cursor-pointer">
            Features
            <button onClick={() => toggleDropdown("features")} className="p-2">
              <FaChevronDown size={14} />
            </button>
          </li>
          {openDropdown === "features" && (
            <motion.ul
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="pl-4 space-y-2 text-gray-500 text-sm"
            >
              <li className="hover:text-pink-500 cursor-pointer">Post Layouts</li>
              <li className="hover:text-pink-500 cursor-pointer">Post Formats</li>
              <li className="hover:text-pink-500 cursor-pointer">Archive</li>
              <li className="hover:text-pink-500 cursor-pointer">Author Page</li>
            </motion.ul>
          )}

          <li className="cursor-pointer hover:text-pink-500">Contact</li>
        </ul>

        
        <div className="mt-20 flex gap-4 text-gray-700">
          <FaFacebookF className="cursor-pointer hover:text-pink-500" size={20} />
          <FaTwitter className="cursor-pointer hover:text-pink-500" size={20} />
          <FaInstagram className="cursor-pointer hover:text-pink-500" size={20} />
          <FaPinterest className="cursor-pointer hover:text-pink-500" size={20} />
          <FaTiktok className="cursor-pointer hover:text-pink-500" size={20} />
          <FaYoutube className="cursor-pointer hover:text-pink-500" size={20} />
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
