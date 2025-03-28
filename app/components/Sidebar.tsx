'use client'
import React from 'react';
import { Home, Users, Settings, HelpCircle, BarChart2, Calendar, FileText, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSidebar } from '../context/SidebarContext';

const Sidebar = () => {
  const { isSidebarOpen } = useSidebar();
  
  const menuItems = [
    { icon: Home, label: 'Dashboard', active: true },
    { icon: Users, label: 'Users', active: false },
    { icon: BarChart2, label: 'Analytics', active: false },
    { icon: Calendar, label: 'Schedule', active: false },
    { icon: FileText, label: 'Documents', active: false },
    { icon: Star, label: 'Favorites', active: false },
    { icon: Settings, label: 'Settings', active: false },
    { icon: HelpCircle, label: 'Help', active: false },
  ];

  return (
    <AnimatePresence>
      <aside 
        className={`fixed left-0 top-24 h-[calc(100vh-6rem)] bg-white shadow-lg border-r border-gray-200 
          lg:block transition-transform duration-300 ease-in-out z-40
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} w-64`}
      >
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="p-4 flex flex-col h-full"
        >
          <div className="space-y-1 flex-1">
            {menuItems.map((item, index) => (
              <button
                key={index}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                  item.active 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'hover:bg-gray-50 text-gray-700 hover:text-gray-900'
                }`}
              >
                <item.icon size={20} className={`transition-transform group-hover:scale-110 ${
                  item.active ? 'text-blue-600' : 'text-gray-500'
                }`} />
                <span className="font-medium">{item.label}</span>
                {item.active && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                )}
              </button>
            ))}
          </div>
          
          <div className="p-4 bg-blue-50 rounded-lg mt-4">
            <p className="text-sm font-medium text-blue-900">Need help?</p>
            <p className="text-xs text-blue-700 mt-1">Check our documentation or contact support</p>
            <button className="mt-3 text-sm font-medium text-blue-600 hover:text-blue-700">
              View Documentation →
            </button>
          </div>
        </motion.div>
      </aside>
    </AnimatePresence>
  );
};

export default Sidebar;