import React, { useState } from 'react';
import { Bell, Search, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import NotificationsPanel from './NotificationsPanel';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (showUserMenu) setShowUserMenu(false);
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
    if (showNotifications) setShowNotifications(false);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-4">
          <button 
            onClick={toggleSidebar}
            className="text-gray-500 hover:text-primary-600 focus:outline-none md:hidden"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Search..."
              className="bg-gray-100 text-gray-800 rounded-lg pl-10 pr-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button 
              onClick={toggleNotifications}
              className="p-2 rounded-full hover:bg-gray-100 focus:outline-none"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5 text-gray-600" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-accent-500"></span>
            </button>
            
            {showNotifications && (
              <NotificationsPanel />
            )}
          </div>
          
          <div className="relative">
            <button
              onClick={toggleUserMenu}
              className="flex items-center space-x-1 focus:outline-none"
              aria-label="User menu"
            >
              <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                <User className="h-5 w-5 text-primary-700" />
              </div>
              <span className="hidden md:inline text-sm font-medium">{user?.name}</span>
            </button>
            
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Profile Settings
                </button>
                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Security
                </button>
                <div className="border-t border-gray-200 my-1"></div>
                <button 
                  onClick={logout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;