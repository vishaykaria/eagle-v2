import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, CreditCard, BarChart3, LineChart, HelpCircle, Settings, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

  // Close sidebar when route changes on mobile
  React.useEffect(() => {
    if (window.innerWidth < 768 && isOpen) {
      toggleSidebar();
    }
  }, [location.pathname]);

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-900 bg-opacity-50 z-20 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
      
      {/* Sidebar */}
      <motion.aside 
        className={`fixed md:static inset-y-0 left-0 z-30 flex flex-col bg-white border-r border-gray-200 transition-all duration-300 ease-in-out ${isOpen ? 'w-64' : 'w-0 md:w-20'} overflow-hidden`}
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <div className={`flex items-center ${!isOpen && 'md:justify-center'}`}>
            <div className="flex-shrink-0 bg-primary-500 text-white p-2 rounded">
              <BarChart3 className="h-5 w-5" />
            </div>
            {isOpen && (
              <span className="ml-2 text-xl font-semibold text-gray-900">Eagle</span>
            )}
          </div>
          <button
            onClick={toggleSidebar}
            className="text-gray-500 focus:outline-none md:block hidden"
          >
            {isOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
          </button>
        </div>
        
        <nav className="flex-1 pt-4 pb-4 overflow-y-auto">
          <ul className="space-y-1 px-2">
            <li>
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  `flex items-center px-4 py-3 ${isActive ? 'bg-primary-50 text-primary-700' : 'text-gray-700 hover:bg-gray-100'} rounded-lg transition-colors`
                }
              >
                <LayoutDashboard className={`h-5 w-5 ${!isOpen && 'md:mx-auto'}`} />
                {isOpen && <span className="ml-3">Dashboard</span>}
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/current-account" 
                className={({ isActive }) => 
                  `flex items-center px-4 py-3 ${isActive ? 'bg-primary-50 text-primary-700' : 'text-gray-700 hover:bg-gray-100'} rounded-lg transition-colors`
                }
              >
                <CreditCard className={`h-5 w-5 ${!isOpen && 'md:mx-auto'}`} />
                {isOpen && <span className="ml-3">Current Account</span>}
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/isa" 
                className={({ isActive }) => 
                  `flex items-center px-4 py-3 ${isActive ? 'bg-primary-50 text-primary-700' : 'text-gray-700 hover:bg-gray-100'} rounded-lg transition-colors`
                }
              >
                <BarChart3 className={`h-5 w-5 ${!isOpen && 'md:mx-auto'}`} />
                {isOpen && <span className="ml-3">Stocks & Shares ISA</span>}
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/sipp" 
                className={({ isActive }) => 
                  `flex items-center px-4 py-3 ${isActive ? 'bg-primary-50 text-primary-700' : 'text-gray-700 hover:bg-gray-100'} rounded-lg transition-colors`
                }
              >
                <LineChart className={`h-5 w-5 ${!isOpen && 'md:mx-auto'}`} />
                {isOpen && <span className="ml-3">SIPP</span>}
              </NavLink>
            </li>
          </ul>
          
          <div className="mt-10">
            <div className="px-4 pb-2">
              {isOpen && <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Support</h3>}
            </div>
            <ul className="space-y-1 px-2">
              <li>
                <NavLink 
                  to="/help" 
                  className={({ isActive }) => 
                    `flex items-center px-4 py-3 ${isActive ? 'bg-primary-50 text-primary-700' : 'text-gray-700 hover:bg-gray-100'} rounded-lg transition-colors`
                  }
                >
                  <HelpCircle className={`h-5 w-5 ${!isOpen && 'md:mx-auto'}`} />
                  {isOpen && <span className="ml-3">Help Center</span>}
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/settings" 
                  className={({ isActive }) => 
                    `flex items-center px-4 py-3 ${isActive ? 'bg-primary-50 text-primary-700' : 'text-gray-700 hover:bg-gray-100'} rounded-lg transition-colors`
                  }
                >
                  <Settings className={`h-5 w-5 ${!isOpen && 'md:mx-auto'}`} />
                  {isOpen && <span className="ml-3">Settings</span>}
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </motion.aside>
    </>
  );
};

export default Sidebar;