import React, { useState } from 'react';
import { FiSettings, FiUser, FiLock, FiBell, FiMail, FiCreditCard, FiGlobe, FiDatabase, FiShield } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: false,
    weeklyReports: true
  });
  const [security, setSecurity] = useState({
    twoFactor: true,
    loginAlerts: true,
    passwordExpiry: false
  });

  const handleNotificationChange = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSecurityChange = (key) => {
    setSecurity(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const tabs = [
    { id: 'general', icon: <FiSettings />, label: 'General' },
    { id: 'profile', icon: <FiUser />, label: 'Profile' },
    { id: 'security', icon: <FiLock />, label: 'Security' },
    { id: 'notifications', icon: <FiBell />, label: 'Notifications' },
    { id: 'billing', icon: <FiCreditCard />, label: 'Billing' },
    { id: 'regional', icon: <FiGlobe />, label: 'Regional' },
    { id: 'data', icon: <FiDatabase />, label: 'Data & Privacy' },
    { id: 'admin', icon: <FiShield />, label: 'Admin Settings' }
  ];

  const cardVariants = {
    offscreen: { y: 20, opacity: 0 },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8
      }
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 sm:p-6">
      {/* Sidebar Navigation */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="lg:w-64 bg-gray-900 rounded-xl border border-gray-800 p-4 h-fit lg:sticky lg:top-6"
      >
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <FiSettings className="text-blue-400" />
          Settings
        </h2>
        <nav className="space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                  : 'text-gray-400 hover:bg-gray-800'
              }`}
            >
              <span className="text-lg">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1">
        {/* General Settings */}
        {activeTab === 'general' && (
          <motion.div
            variants={cardVariants}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, margin: "-50px" }}
            className="space-y-6"
          >
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
              <h3 className="text-lg font-semibold text-white mb-6">General Preferences</h3>
              
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-white">Dark Mode</h4>
                    <p className="text-xs text-gray-400">Switch between light and dark theme</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                  </label>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-white">Sidebar Style</h4>
                    <p className="text-xs text-gray-400">Choose between compact or expanded sidebar</p>
                  </div>
                  <select className="bg-gray-800 border border-gray-700 text-gray-300 text-sm rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-auto">
                    <option>Expanded</option>
                    <option>Compact</option>
                    <option>Hidden</option>
                  </select>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-white">Dashboard Density</h4>
                    <p className="text-xs text-gray-400">Control the spacing of dashboard elements</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 text-xs bg-gray-800 hover:bg-gray-700 rounded-md">Compact</button>
                    <button className="px-3 py-1 text-xs bg-blue-500 hover:bg-blue-600 rounded-md">Normal</button>
                    <button className="px-3 py-1 text-xs bg-gray-800 hover:bg-gray-700 rounded-md">Spacious</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
              <h3 className="text-lg font-semibold text-white mb-6">System Settings</h3>
              
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-white">Auto-refresh Data</h4>
                    <p className="text-xs text-gray-400">Automatically refresh dashboard data</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                  </label>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-white">Refresh Interval</h4>
                    <p className="text-xs text-gray-400">How often to refresh data</p>
                  </div>
                  <select className="bg-gray-800 border border-gray-700 text-gray-300 text-sm rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-auto">
                    <option>Every 30 seconds</option>
                    <option>Every minute</option>
                    <option>Every 5 minutes</option>
                    <option>Every 15 minutes</option>
                  </select>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-white">Default Dashboard</h4>
                    <p className="text-xs text-gray-400">Choose which dashboard to show on login</p>
                  </div>
                  <select className="bg-gray-800 border border-gray-700 text-gray-300 text-sm rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-auto">
                    <option>Overview</option>
                    <option>Analytics</option>
                    <option>Content</option>
                    <option>Users</option>
                  </select>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Notification Settings */}
        {activeTab === 'notifications' && (
          <motion.div
            variants={cardVariants}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, margin: "-50px" }}
            className="space-y-6"
          >
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
              <h3 className="text-lg font-semibold text-white mb-6">Notification Preferences</h3>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-white">Email Notifications</h4>
                    <p className="text-xs text-gray-400">Receive important updates via email</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={notifications.email}
                      onChange={() => handleNotificationChange('email')}
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-white">Push Notifications</h4>
                    <p className="text-xs text-gray-400">Get real-time alerts on your device</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={notifications.push}
                      onChange={() => handleNotificationChange('push')}
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-white">SMS Alerts</h4>
                    <p className="text-xs text-gray-400">Receive critical alerts via text message</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={notifications.sms}
                      onChange={() => handleNotificationChange('sms')}
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-white">Weekly Reports</h4>
                    <p className="text-xs text-gray-400">Get weekly performance summaries</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={notifications.weeklyReports}
                      onChange={() => handleNotificationChange('weeklyReports')}
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                  </label>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
              <h3 className="text-lg font-semibold text-white mb-6">Notification Types</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-white">New User Signups</h4>
                    <p className="text-xs text-gray-400">Notify when new users register</p>
                  </div>
                  <select className="bg-gray-800 border border-gray-700 text-gray-300 text-sm rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option>Immediately</option>
                    <option>Daily Digest</option>
                    <option>Disabled</option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-white">Content Reports</h4>
                    <p className="text-xs text-gray-400">Alert for reported content</p>
                  </div>
                  <select className="bg-gray-800 border border-gray-700 text-gray-300 text-sm rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option>Immediately</option>
                    <option>Hourly Summary</option>
                    <option>Disabled</option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-white">Order Notifications</h4>
                    <p className="text-xs text-gray-400">New purchases and refunds</p>
                  </div>
                  <select className="bg-gray-800 border border-gray-700 text-gray-300 text-sm rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option>Immediately</option>
                    <option>Daily Summary</option>
                    <option>Disabled</option>
                  </select>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Security Settings */}
        {activeTab === 'security' && (
          <motion.div
            variants={cardVariants}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, margin: "-50px" }}
            className="space-y-6"
          >
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
              <h3 className="text-lg font-semibold text-white mb-6">Account Security</h3>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-white">Two-Factor Authentication</h4>
                    <p className="text-xs text-gray-400">Add an extra layer of security to your account</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={security.twoFactor}
                      onChange={() => handleSecurityChange('twoFactor')}
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-white">Login Alerts</h4>
                    <p className="text-xs text-gray-400">Notify me when someone logs in from a new device</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={security.loginAlerts}
                      onChange={() => handleSecurityChange('loginAlerts')}
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-white">Password Expiry</h4>
                    <p className="text-xs text-gray-400">Require password change every 90 days</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={security.passwordExpiry}
                      onChange={() => handleSecurityChange('passwordExpiry')}
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                  </label>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
              <h3 className="text-lg font-semibold text-white mb-6">Session Management</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-white">Active Sessions</h4>
                    <p className="text-xs text-gray-400">Manage your logged-in devices</p>
                  </div>
                  <button className="text-sm text-blue-400 hover:text-blue-300">
                    View All
                  </button>
                </div>

                <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-500/10 p-2 rounded-lg">
                        <FiGlobe className="text-blue-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">Chrome on Windows</p>
                        <p className="text-xs text-gray-400">New York, USA • Just now</p>
                      </div>
                    </div>
                    <button className="text-sm text-red-400 hover:text-red-300">
                      Logout
                    </button>
                  </div>
                </div>

                <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-purple-500/10 p-2 rounded-lg">
                        <FiGlobe className="text-purple-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">Safari on iPhone</p>
                        <p className="text-xs text-gray-400">London, UK • 2 hours ago</p>
                      </div>
                    </div>
                    <button className="text-sm text-red-400 hover:text-red-300">
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
              <h3 className="text-lg font-semibold text-white mb-6">Password</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-1">Current Password</label>
                  <input 
                    type="password" 
                    className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                    placeholder="••••••••"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-1">New Password</label>
                  <input 
                    type="password" 
                    className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                    placeholder="••••••••"
                  />
                  <p className="mt-1 text-xs text-gray-400">Minimum 8 characters with at least one number and symbol</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-1">Confirm New Password</label>
                  <input 
                    type="password" 
                    className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                    placeholder="••••••••"
                  />
                </div>

                <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                  Update Password
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Save Button (shown for all tabs) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 flex justify-end"
        >
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition-colors flex items-center gap-2">
            Save Changes
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;