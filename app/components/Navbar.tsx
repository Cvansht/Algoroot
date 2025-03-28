"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Menu,
  Search,
  Bell,
  User,
  ChevronDown,
  LogOut,
  Trash2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/Auth";
import { useSidebar } from "../context/SidebarContext";

const Navbar = () => {
  const { user, logout, deleteAccount } = useAuth();
  const { toggleSidebar } = useSidebar();
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [notifications] = useState([
    { id: 1, text: "New user registered", time: "5m ago" },
    { id: 2, text: "System update completed", time: "1h ago" },
  ]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-4 flex items-center justify-between fixed w-full top-0 z-50 shadow-lg h-24">
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleSidebar}
          className="lg:hidden hover:bg-blue-500 p-2 rounded-lg transition-colors"
        >
          <Menu size={24} />
        </button>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-2"
        >
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <span className="text-blue-600 font-bold text-xl">A</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">AlgoRoot</h1>
        </motion.div>
      </div>

      <div
        className={`hidden md:flex items-center rounded-lg px-3 py-2 flex-1 max-w-xl mx-4 transition-all duration-200 ${
          isSearchFocused ? "bg-white shadow-lg" : "bg-white/10"
        }`}
      >
        <Search
          size={20}
          className={isSearchFocused ? "text-blue-600" : "text-white"}
        />
        <input
          type="text"
          placeholder="Search..."
          className={`bg-transparent border-none outline-none ml-2 w-full transition-colors ${
            isSearchFocused
              ? "text-gray-900 placeholder-gray-500"
              : "text-white placeholder-white/70"
          }`}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setIsSearchFocused(false)}
        />
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative group">
          <button className="p-2 hover:bg-white/10 rounded-lg transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-2 hidden group-hover:block text-gray-900">
            {notifications.map((notification) => (
              <div key={notification.id} className="px-4 py-2 hover:bg-gray-50">
                <p className="text-sm font-medium">{notification.text}</p>
                <p className="text-xs text-gray-500">{notification.time}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative" ref={dropdownRef}>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-5 py-3 rounded-lg 
    transition-all duration-200 backdrop-blur-sm border border-white/20"
          >
            <User size={18} />
            {/* Show text only on medium and larger screens */}
            <span className="hidden md:inline font-medium">Your Account</span>
            <ChevronDown
              size={18}
              className={`transition-transform duration-200 ${
                dropdownOpen ? "rotate-180" : ""
              }`}
            />
          </motion.button>

          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl overflow-hidden z-10 
                  border border-gray-100"
              >
                <div className="p-4 border-b border-gray-100 bg-gray-50">
                  <p className="text-sm font-medium text-gray-500">
                    Logged in as
                  </p>
                  <p className="text-base font-medium text-gray-900 break-all mt-0.5">
                    {user}
                  </p>
                </div>

                <div className="p-2">
                  <button
                    onClick={() => {
                      logout();
                      setDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-2 text-left px-3 py-2.5 text-gray-700 
                      hover:bg-gray-100 rounded-lg transition-colors duration-200 font-medium"
                  >
                    <LogOut size={18} />
                    <span>Sign Out</span>
                  </button>

                  <button
                    onClick={() => {
                      deleteAccount();
                      setDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-2 text-left px-3 py-2.5 text-red-600 
                      hover:bg-red-50 rounded-lg transition-colors duration-200 font-medium mt-1"
                  >
                    <Trash2 size={18} />
                    <span>Delete Account</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
