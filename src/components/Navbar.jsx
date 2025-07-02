import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiMenu, 
  FiBell, 
  FiSearch, 
  FiSettings, 
  FiHelpCircle, 
  FiLogOut,
  FiChevronDown,
  FiDollarSign,
  FiCalendar,
  FiTrendingUp,
  FiCreditCard
} from 'react-icons/fi';

const Navbar = ({ toggleSidebar }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTransactionTab, setActiveTransactionTab] = useState('daily');

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest('.dropdown-container')) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDropdownOpen]);

  // Mock transaction data
  const transactions = {
    daily: [
      { id: 1, amount: 125.50, type: 'sale', product: 'Summer Collection', time: '10:30 AM', status: 'completed' },
      { id: 2, amount: 89.99, type: 'sale', product: 'Wireless Earbuds', time: '12:45 PM', status: 'completed' },
      { id: 3, amount: 42.00, type: 'refund', product: 'T-Shirt', time: '2:15 PM', status: 'processed' },
      { id: 4, amount: 199.99, type: 'sale', product: 'Smart Watch', time: '4:30 PM', status: 'completed' },
    ],
    monthly: [
      { id: 1, amount: 3421.75, type: 'total', date: 'Week 1', status: 'summary' },
      { id: 2, amount: 2895.30, type: 'total', date: 'Week 2', status: 'summary' },
      { id: 3, amount: 4123.60, type: 'total', date: 'Week 3', status: 'summary' },
      { id: 4, amount: 3765.45, type: 'total', date: 'Week 4', status: 'summary' },
    ]
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-400';
      case 'processed':
        return 'text-yellow-400';
      case 'failed':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'sale':
        return <FiTrendingUp className="text-green-500" />;
      case 'refund':
        return <FiCreditCard className="text-yellow-500" />;
      case 'total':
        return <FiDollarSign className="text-blue-500" />;
      default:
        return <FiDollarSign className="text-gray-500" />;
    }
  };

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="sticky top-0 z-40 bg-gray-900/80 backdrop-blur-md border-b border-gray-800 shadow-sm"
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left section - Mobile menu button and search */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleSidebar}
              className="text-gray-400 hover:text-white focus:outline-none lg:hidden"
              aria-label="Open sidebar"
            >
              <FiMenu className="w-6 h-6" />
            </button>

            <div className="relative hidden md:block">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                className="block w-full pl-10 pr-3 py-2 border border-transparent rounded-md leading-5 bg-gray-800 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Right section - Navigation items */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            <div className="relative">
              <button
                className="text-gray-400 hover:text-white p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 relative"
                aria-label="Notifications"
              >
                <FiBell className="w-5 h-5" />
                {hasUnreadNotifications && (
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-gray-900"></span>
                )}
              </button>
            </div>

            {/* Profile dropdown */}
            <div className="relative dropdown-container">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 text-gray-300 hover:text-white focus:outline-none group"
                aria-label="User menu"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium">
                  AU
                </div>
                <span className="hidden lg:inline-block text-sm font-medium">Admin User</span>
                <FiChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${isDropdownOpen ? 'transform rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-gray-800 border border-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none z-50 overflow-hidden"
                  >
                    <div className="py-1 max-h-96 overflow-y-auto">
                      {/* Transaction History Section */}
                      <div className="px-4 py-3 border-b border-gray-700">
                        <div className="flex justify-between items-center">
                          <h3 className="text-sm font-medium text-white">Transaction History</h3>
                          <div className="flex bg-gray-700 rounded-md p-1 text-xs">
                            <button
                              onClick={() => setActiveTransactionTab('daily')}
                              className={`px-2 py-1 rounded ${activeTransactionTab === 'daily' ? 'bg-gray-600 text-white' : 'text-gray-300'}`}
                            >
                              Daily
                            </button>
                            <button
                              onClick={() => setActiveTransactionTab('monthly')}
                              className={`px-2 py-1 rounded ${activeTransactionTab === 'monthly' ? 'bg-gray-600 text-white' : 'text-gray-300'}`}
                            >
                              Monthly
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="px-4 py-2 space-y-3">
                        {transactions[activeTransactionTab].map((transaction) => (
                          <div key={transaction.id} className="flex items-start space-x-3">
                            <div className="mt-1 flex-shrink-0">
                              {getTypeIcon(transaction.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-white truncate">
                                {transaction.product || transaction.date}
                              </p>
                              <p className="text-xs text-gray-400">
                                {transaction.time || `${transaction.type} ${activeTransactionTab === 'daily' ? 'sale' : 'sales'}`}
                              </p>
                            </div>
                            <div className="flex flex-col items-end">
                              <p className={`text-sm font-medium ${transaction.type === 'refund' ? 'text-yellow-400' : 'text-white'}`}>
                                {transaction.type === 'refund' ? '-' : ''}${transaction.amount.toFixed(2)}
                              </p>
                              {transaction.status && (
                                <span className={`text-xs ${getStatusColor(transaction.status)}`}>
                                  {transaction.status}
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Summary for Monthly view */}
                      {activeTransactionTab === 'monthly' && (
                        <div className="px-4 py-3 bg-gray-700/50 border-t border-gray-700">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-300">Monthly Total</span>
                            <span className="text-sm font-bold text-green-400">
                              ${transactions.monthly.reduce((sum, t) => sum + t.amount, 0).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* User Menu Section */}
                      <div className="px-4 py-3 border-t border-gray-700">
                        <p className="text-sm text-white">Signed in as</p>
                        <p className="text-sm font-medium text-gray-200 truncate">admin@trendo.com</p>
                      </div>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white flex items-center"
                      >
                        <FiSettings className="mr-3 h-5 w-5 text-gray-400" />
                        Settings
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white flex items-center"
                      >
                        <FiHelpCircle className="mr-3 h-5 w-5 text-gray-400" />
                        Support
                      </a>
                      <div className="border-t border-gray-700"></div>
                      <button
                        onClick={() => {
                          // Handle logout
                          setIsDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white flex items-center"
                      >
                        <FiLogOut className="mr-3 h-5 w-5 text-gray-400" />
                        Sign out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile search - hidden on larger screens */}
      <div className="md:hidden px-4 pb-3">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="h-5 w-5 text-gray-500" />
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="block w-full pl-10 pr-3 py-2 border border-transparent rounded-md leading-5 bg-gray-800 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;