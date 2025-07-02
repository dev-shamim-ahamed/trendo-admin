import React from 'react';
import DataCard from './DataCard';
import { motion } from 'framer-motion';
import { FiActivity, FiUsers, FiVideo, FiDollarSign, FiShare2, FiHeart, FiMessageSquare } from 'react-icons/fi';

const Dashboard = ({ stats }) => {
  const cardVariants = {
    offscreen: { y: 50, opacity: 0 },
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
    <div className="space-y-6 px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Dashboard Overview</h1>
          <div className="flex items-center space-x-2 mt-3 sm:mt-0">
            <span className="text-sm text-gray-400">Last updated:</span>
            <span className="text-sm font-medium text-gray-300">{new Date().toLocaleString()}</span>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <motion.div
          variants={cardVariants}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, margin: "-50px" }}
        >
          <DataCard 
            title="Total Users" 
            value={stats.totalUsers.toLocaleString()} 
            change={stats.userChange} 
            icon={<FiUsers className="w-6 h-6" />}
            color="from-blue-500 to-blue-600"
          />
        </motion.div>
        
        <motion.div
          variants={cardVariants}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.1 }}
        >
          <DataCard 
            title="Total Creators" 
            value={stats.totalCreators.toLocaleString()} 
            change={stats.creatorChange} 
            icon={<FiActivity className="w-6 h-6" />}
            color="from-purple-500 to-purple-600"
          />
        </motion.div>
        
        <motion.div
          variants={cardVariants}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.2 }}
        >
          <DataCard 
            title="Videos Uploaded" 
            value={stats.totalVideos.toLocaleString()} 
            change={stats.videoChange} 
            icon={<FiVideo className="w-6 h-6" />}
            color="from-emerald-500 to-emerald-600"
          />
        </motion.div>
        
        <motion.div
          variants={cardVariants}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.3 }}
        >
          <DataCard 
            title="Total Revenue" 
            value={`$${stats.totalRevenue.toLocaleString()}`} 
            change={stats.revenueChange} 
            icon={<FiDollarSign className="w-6 h-6" />}
            color="from-amber-500 to-amber-600"
          />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mt-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-gradient-to-br from-gray-900 to-gray-800 p-5 sm:p-6 rounded-xl border border-gray-800 shadow-lg"
        >
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-lg sm:text-xl font-semibold text-white flex items-center">
              <FiActivity className="mr-2 text-blue-400" />
              Daily Engagement
            </h2>
            <select className="bg-gray-800 border border-gray-700 text-gray-300 text-xs sm:text-sm rounded-lg px-2 sm:px-3 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
          </div>
          
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            <div className="bg-gray-800/50 rounded-lg p-3 sm:p-4 text-center hover:bg-gray-800 transition-colors">
              <div className="flex justify-center mb-2">
                <div className="p-2 bg-blue-500/10 rounded-full text-blue-400">
                  <FiHeart className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              </div>
              <p className="text-xl sm:text-2xl font-bold text-white">{stats.dailyLikes.toLocaleString()}</p>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">Likes</p>
            </div>
            
            <div className="bg-gray-800/50 rounded-lg p-3 sm:p-4 text-center hover:bg-gray-800 transition-colors">
              <div className="flex justify-center mb-2">
                <div className="p-2 bg-purple-500/10 rounded-full text-purple-400">
                  <FiShare2 className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              </div>
              <p className="text-xl sm:text-2xl font-bold text-white">{stats.dailyShares.toLocaleString()}</p>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">Shares</p>
            </div>
            
            <div className="bg-gray-800/50 rounded-lg p-3 sm:p-4 text-center hover:bg-gray-800 transition-colors">
              <div className="flex justify-center mb-2">
                <div className="p-2 bg-emerald-500/10 rounded-full text-emerald-400">
                  <FiMessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              </div>
              <p className="text-xl sm:text-2xl font-bold text-white">{stats.dailyComments.toLocaleString()}</p>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">Comments</p>
            </div>
          </div>
          
          {/* Mini chart placeholder - would be replaced with actual chart library */}
          <div className="mt-6 h-40 bg-gray-800/30 rounded-lg border border-gray-800 flex items-center justify-center">
            <p className="text-gray-500 text-sm">Engagement chart will appear here</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-gradient-to-br from-gray-900 to-gray-800 p-5 sm:p-6 rounded-xl border border-gray-800 shadow-lg"
        >
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-lg sm:text-xl font-semibold text-white flex items-center">
              <FiActivity className="mr-2 text-amber-400" />
              Recent Activity
            </h2>
            <button className="text-xs sm:text-sm text-blue-400 hover:text-blue-300">
              View All
            </button>
          </div>
          
          <ul className="space-y-3">
            {stats.recentActivity.map((activity, index) => (
              <motion.li 
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + (index * 0.1) }}
                className="flex items-start space-x-3 p-3 hover:bg-gray-800/50 rounded-lg transition-colors"
              >
                <div className={`flex-shrink-0 mt-1 w-2 h-2 rounded-full ${
                  index === 0 ? 'bg-blue-500 animate-pulse' : 
                  index < 3 ? 'bg-blue-500' : 'bg-gray-600'
                }`}></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm sm:text-base text-white truncate">{activity}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(Date.now() - (index * 1000 * 60 * 60)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                {index === 0 && (
                  <span className="px-2 py-1 text-xs font-medium bg-blue-500/10 text-blue-400 rounded-full">
                    New
                  </span>
                )}
              </motion.li>
            ))}
          </ul>
          
          <div className="mt-4 pt-4 border-t border-gray-800">
            <button className="w-full py-2 text-sm font-medium text-center text-gray-400 hover:text-white bg-gray-800/50 hover:bg-gray-800 rounded-lg transition-colors">
              Load More Activities
            </button>
          </div>
        </motion.div>
      </div>
      
      {/* Additional metrics section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-6 bg-gradient-to-br from-gray-900 to-gray-800 p-5 sm:p-6 rounded-xl border border-gray-800 shadow-lg"
      >
        <h2 className="text-lg sm:text-xl font-semibold text-white mb-5">Platform Performance</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-gray-800/50 rounded-lg p-4">
            <p className="text-sm text-gray-400 mb-1">Avg. Session Duration</p>
            <p className="text-xl font-bold text-white">4m 32s</p>
            <p className="text-xs text-green-400 mt-1">↑ 12% from last week</p>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-4">
            <p className="text-sm text-gray-400 mb-1">New Signups</p>
            <p className="text-xl font-bold text-white">1,243</p>
            <p className="text-xs text-green-400 mt-1">↑ 8% from last week</p>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-4">
            <p className="text-sm text-gray-400 mb-1">Conversion Rate</p>
            <p className="text-xl font-bold text-white">3.2%</p>
            <p className="text-xs text-red-400 mt-1">↓ 0.4% from last week</p>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-4">
            <p className="text-sm text-gray-400 mb-1">Active Campaigns</p>
            <p className="text-xl font-bold text-white">12</p>
            <p className="text-xs text-gray-400 mt-1">No change</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;