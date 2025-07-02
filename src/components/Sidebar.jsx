import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiHome, FiUsers, FiShoppingBag, FiFilm, 
  FiPackage, FiActivity, FiAward,
  FiSettings, FiHelpCircle, FiLogOut,
  FiChevronLeft, FiChevronRight, FiMenu, FiX
} from 'react-icons/fi';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const menuButtonRef = useRef(null);
  const sidebarRef = useRef(null);

  // Detect mobile viewport
  const isMobile = () => window.innerWidth <= 768;

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileOpen && 
          !sidebarRef.current?.contains(event.target) && 
          !menuButtonRef.current?.contains(event.target)) {
        setMobileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mobileOpen]);

  const navItems = [
    { name: 'Dashboard', path: '/', icon: <FiHome className="w-5 h-5" /> },
    { name: 'User Management', path: '/users', icon: <FiUsers className="w-5 h-5" /> },
    { name: 'Product Management', path: '/products', icon: <FiShoppingBag className="w-5 h-5" /> },
    { name: 'Content Moderation', path: '/content', icon: <FiFilm className="w-5 h-5" /> },
    { name: 'Order Management', path: '/orders', icon: <FiPackage className="w-5 h-5" /> },
    { name: 'Live Analytics', path: '/live', icon: <FiActivity className="w-5 h-5" /> },
    { name: 'Creator Spotlight', path: '/spotlight', icon: <FiAward className="w-5 h-5" /> },
  ];

  const secondaryItems = [
    { name: 'Settings', path: '/settings', icon: <FiSettings className="w-5 h-5" /> },
    { name: 'Help Center', path: '/help', icon: <FiHelpCircle className="w-5 h-5" /> }
  ];

  const toggleSidebar = () => {
    if (isMobile()) {
      setMobileOpen(prev => !prev);
    } else {
      setIsExpanded(prev => !prev);
    }
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo/Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        {(!isMobile() || mobileOpen) && isExpanded && (
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-md bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mr-2">
              <FiActivity className="text-white w-4 h-4" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Trendo
            </h1>
          </div>
        )}
        {!isMobile() && (
          <button
            onClick={toggleSidebar}
            className="p-1 rounded-md hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
          >
            {isExpanded ? (
              <FiChevronLeft className="w-5 h-5" />
            ) : (
              <FiChevronRight className="w-5 h-5" />
            )}
          </button>
        )}
      </div>

      {/* Navigation Content */}
      <div className="flex-1 overflow-y-auto">
        <nav className="py-4 px-2">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => 
                    `flex items-center rounded-lg p-3 transition-colors ${
                      isActive 
                        ? 'bg-gradient-to-r from-blue-500/20 to-blue-600/20 text-blue-400 border-l-4 border-blue-500' 
                        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                    }`
                  }
                >
                  <span className={`${(!isMobile() || mobileOpen) && isExpanded ? 'mr-3' : 'mx-auto'}`}>
                    {item.icon}
                  </span>
                  {(!isMobile() || mobileOpen) && isExpanded && (
                    <span className="whitespace-nowrap">{item.name}</span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-gray-800 pt-2 pb-4 px-2">
          <ul className="space-y-1">
            {secondaryItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => 
                    `flex items-center rounded-lg p-3 transition-colors ${
                      isActive 
                        ? 'bg-gray-800 text-white' 
                        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                    }`
                  }
                >
                  <span className={`${(!isMobile() || mobileOpen) && isExpanded ? 'mr-3' : 'mx-auto'}`}>
                    {item.icon}
                  </span>
                  {(!isMobile() || mobileOpen) && isExpanded && (
                    <span className="whitespace-nowrap">{item.name}</span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* User Profile */}
      <div className="border-t border-gray-800 p-4">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white">
            AU
          </div>
          {(!isMobile() || mobileOpen) && isExpanded && (
            <div className="ml-3 overflow-hidden">
              <p className="font-medium text-white truncate">Admin User</p>
              <p className="text-xs text-gray-400 truncate">admin@trendo.com</p>
            </div>
          )}
        </div>
        {(!isMobile() || mobileOpen) && isExpanded && (
          <button
            className="flex items-center mt-4 text-sm text-gray-400 hover:text-white transition-colors"
            onClick={() => console.log('Sign out clicked')}
          >
            <FiLogOut className="mr-2" />
            Sign Out
          </button>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        ref={menuButtonRef}
        onClick={toggleSidebar}
        className={`fixed z-50 top-4 left-4 p-2 rounded-md bg-gray-900 text-white md:hidden ${
          mobileOpen ? 'left-[17rem]' : 'left-4'
        } transition-all duration-300 shadow-lg`}
        aria-label="Toggle menu"
      >
        {mobileOpen ? (
          <FiX className="w-6 h-6" />
        ) : (
          <FiMenu className="w-6 h-6" />
        )}
      </button>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobile() && mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setMobileOpen(false)}
            />
            
            <motion.div
              ref={sidebarRef}
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 left-0 z-40 w-64 bg-gray-900 border-r border-gray-800 flex flex-col shadow-xl"
            >
              {sidebarContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      {!isMobile() && (
        <motion.div
          initial={{ width: '16rem' }}
          animate={{ width: isExpanded ? '16rem' : '5rem' }}
          className="hidden md:flex flex-col h-full bg-gray-900 border-r border-gray-800 overflow-hidden"
        >
          {sidebarContent}
        </motion.div>
      )}
    </>
  );
};

export default Sidebar;