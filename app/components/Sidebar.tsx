import React from 'react';
import { Home, Users, Settings, HelpCircle, BarChart2, Calendar, FileText, Star } from 'lucide-react';

const Sidebar = () => {
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
    <aside className="fixed left-0 top-24 h-[calc(100vh-6rem)] w-64 bg-white shadow-lg hidden lg:block border-r border-gray-200">
      <div className="p-4 flex flex-col h-full">
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
      </div>
    </aside>
  );
};

export default Sidebar;