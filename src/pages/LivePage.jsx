import React, { useState } from 'react';
import { FiUsers, FiShoppingBag, FiClock, FiTrendingUp, FiAward, FiBarChart2, FiZap } from 'react-icons/fi';
import { motion } from 'framer-motion';

const LivePage = () => {
  // Mock live session data
  const [activeTab, setActiveTab] = useState('live');
  const [timeRange, setTimeRange] = useState('today');
  
  const liveSessions = Array(5).fill().map((_, i) => ({
    id: `LIVE${6000 + i}`,
    creator: `creator_${i + 1}`,
    avatar: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${i+10}.jpg`,
    viewers: Math.floor(Math.random() * 5000) + 500,
    duration: `${Math.floor(Math.random() * 3)}h ${Math.floor(Math.random() * 60)}m`,
    products: Math.floor(Math.random() * 10),
    sales: Math.floor(Math.random() * 500),
    revenue: Math.floor(Math.random() * 10000) + 1000,
    status: ['live', 'ended'][Math.floor(Math.random() * 2)],
    category: ['Fashion', 'Beauty', 'Tech', 'Fitness', 'Cooking'][i % 5]
  }));

  // Top creators data
  const topCreators = Array(8).fill().map((_, i) => ({
    id: `CR${7000 + i}`,
    name: `creator_${i + 1}`,
    avatar: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${i+20}.jpg`,
    engagement: Math.floor(Math.random() * 10000) + 5000,
    videos: Math.floor(Math.random() * 50) + 10,
    followers: Math.floor(Math.random() * 100000) + 10000,
    trendScore: Math.floor(Math.random() * 100),
    category: ['Fashion', 'Beauty', 'Tech', 'Fitness', 'Cooking'][i % 5]
  })).sort((a, b) => b.engagement - a.engagement);

  // Trending content
  const trendingContent = Array(5).fill().map((_, i) => ({
    id: `TR${8000 + i}`,
    title: `Trending ${['Challenge', 'Dance', 'Tutorial', 'Review', 'Vlog'][i % 5]}`,
    creator: `creator_${i + 1}`,
    views: Math.floor(Math.random() * 1000000) + 500000,
    likes: Math.floor(Math.random() * 50000) + 10000,
    shares: Math.floor(Math.random() * 10000) + 1000,
    hashtags: [`#trend${i}`, `#viral`, `#${['fashion', 'beauty', 'tech', 'fitness', 'food'][i % 5]}`]
  })).sort((a, b) => b.views - a.views);

  // Animation variants
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

  // Calculate conversion rate safely
  const calculateConversionRate = () => {
    const totalViewers = liveSessions.reduce((sum, s) => sum + s.viewers, 0);
    const totalSales = liveSessions.reduce((sum, s) => sum + s.sales, 0);
    return totalViewers > 0 ? Math.floor((totalSales / totalViewers) * 100) : 0;
  };

  return (
    <div className="space-y-6 px-4 sm:px-6 pb-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Live Analytics Dashboard</h1>
        <div className="flex items-center space-x-2 mt-3 sm:mt-0">
          <div className="flex bg-gray-800 rounded-lg p-1">
            <button
              className={`px-3 sm:px-4 py-1 rounded-md text-sm ${activeTab === 'live' ? 'bg-blue-600' : ''}`}
              onClick={() => setActiveTab('live')}
            >
              Live Sessions
            </button>
            <button
              className={`px-3 sm:px-4 py-1 rounded-md text-sm ${activeTab === 'creators' ? 'bg-blue-600' : ''}`}
              onClick={() => setActiveTab('creators')}
            >
              Creator Spotlight
            </button>
            <button
              className={`px-3 sm:px-4 py-1 rounded-md text-sm ${activeTab === 'trending' ? 'bg-blue-600' : ''}`}
              onClick={() => setActiveTab('trending')}
            >
              Trendo Up
            </button>
          </div>
        </div>
      </motion.div>

      {activeTab === 'live' && (
        <>
          <motion.div
            variants={cardVariants}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          >
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-5 rounded-xl border border-gray-800 shadow-lg">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-400">Active Live Now</p>
                  <p className="text-2xl font-bold mt-1">
                    {liveSessions.filter(s => s.status === 'live').length}
                  </p>
                </div>
                <div className="p-2 bg-red-500/10 rounded-lg text-red-400">
                  <FiZap className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-800">
                <p className="text-xs text-green-400 flex items-center">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
                  </svg>
                  +12% from yesterday
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-5 rounded-xl border border-gray-800 shadow-lg">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-400">Total Viewers</p>
                  <p className="text-2xl font-bold mt-1">
                    {liveSessions.reduce((sum, s) => sum + s.viewers, 0).toLocaleString()}
                  </p>
                </div>
                <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                  <FiUsers className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-800">
                <p className="text-xs text-green-400 flex items-center">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
                  </svg>
                  +8% from yesterday
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-5 rounded-xl border border-gray-800 shadow-lg">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-400">Products Shown</p>
                  <p className="text-2xl font-bold mt-1">
                    {liveSessions.reduce((sum, s) => sum + s.products, 0)}
                  </p>
                </div>
                <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
                  <FiShoppingBag className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-800">
                <p className="text-xs text-green-400 flex items-center">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
                  </svg>
                  +15% from yesterday
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-5 rounded-xl border border-gray-800 shadow-lg">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-400">Total Revenue</p>
                  <p className="text-2xl font-bold mt-1">
                    ${liveSessions.reduce((sum, s) => sum + s.revenue, 0).toLocaleString()}
                  </p>
                </div>
                <div className="p-2 bg-amber-500/10 rounded-lg text-amber-400">
                  <FiTrendingUp className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-800">
                <p className="text-xs text-green-400 flex items-center">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
                  </svg>
                  +22% from yesterday
                </p>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-2 bg-gradient-to-br from-gray-900 to-gray-800 p-5 sm:p-6 rounded-xl border border-gray-800 shadow-lg"
            >
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-lg sm:text-xl font-semibold text-white flex items-center">
                  <FiZap className="mr-2 text-red-400" />
                  Active Live Sessions
                </h2>
                <select 
                  className="bg-gray-800 border border-gray-700 text-gray-300 text-xs sm:text-sm rounded-lg px-3 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                >
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                </select>
              </div>

              <div className="space-y-4">
                {liveSessions.filter(s => s.status === 'live').length > 0 ? (
                  liveSessions.filter(s => s.status === 'live').map((session, index) => (
                    <motion.div
                      key={session.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + (index * 0.1) }}
                      className="bg-gray-800/50 hover:bg-gray-800 p-4 rounded-lg transition-colors"
                    >
                      <div className="flex items-start space-x-4">
                        <img 
                          src={session.avatar} 
                          alt={session.creator} 
                          className="w-12 h-12 rounded-full object-cover border-2 border-red-500"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium text-white">{session.creator}</h3>
                              <p className="text-xs text-gray-400">{session.category}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                              </span>
                              <span className="text-xs text-red-500">LIVE</span>
                            </div>
                          </div>

                          <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                            <div className="bg-gray-900/50 p-2 rounded">
                              <p className="text-xs text-gray-400 flex items-center justify-center">
                                <FiUsers className="mr-1" /> Viewers
                              </p>
                              <p className="text-sm font-medium mt-1">{session.viewers.toLocaleString()}</p>
                            </div>
                            <div className="bg-gray-900/50 p-2 rounded">
                              <p className="text-xs text-gray-400 flex items-center justify-center">
                                <FiShoppingBag className="mr-1" /> Products
                              </p>
                              <p className="text-sm font-medium mt-1">{session.products}</p>
                            </div>
                            <div className="bg-gray-900/50 p-2 rounded">
                              <p className="text-xs text-gray-400 flex items-center justify-center">
                                <FiClock className="mr-1" /> Duration
                              </p>
                              <p className="text-sm font-medium mt-1">{session.duration}</p>
                            </div>
                          </div>

                          <div className="mt-3 grid grid-cols-2 gap-2">
                            <div className="bg-blue-900/20 p-2 rounded text-center">
                              <p className="text-xs text-blue-400">Sales</p>
                              <p className="text-sm font-medium">{session.sales}</p>
                            </div>
                            <div className="bg-green-900/20 p-2 rounded text-center">
                              <p className="text-xs text-green-400">Revenue</p>
                              <p className="text-sm font-medium">${session.revenue.toLocaleString()}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No active live sessions at the moment</p>
                  </div>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gradient-to-br from-gray-900 to-gray-800 p-5 sm:p-6 rounded-xl border border-gray-800 shadow-lg"
            >
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-lg sm:text-xl font-semibold text-white flex items-center">
                  <FiBarChart2 className="mr-2 text-blue-400" />
                  Live Performance
                </h2>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-300">Avg. Viewers per Session</h3>
                  <p className="text-2xl font-bold mt-2">
                    {Math.floor(
                      liveSessions.reduce((sum, s) => sum + s.viewers, 0) / 
                      Math.max(liveSessions.length, 1)
                    ).toLocaleString()}
                  </p>
                  <p className="text-xs text-green-400 mt-1 flex items-center">
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
                    </svg>
                    +5.3% from last week
                  </p>
                </div>

                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-300">Conversion Rate</h3>
                  <p className="text-2xl font-bold mt-2">
                    {calculateConversionRate()}%
                  </p>
                  <p className="text-xs text-green-400 mt-1 flex items-center">
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
                    </svg>
                    +1.2% from last week
                  </p>
                </div>

                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-300">Avg. Revenue per Session</h3>
                  <p className="text-2xl font-bold mt-2">
                    ${Math.floor(
                      liveSessions.reduce((sum, s) => sum + s.revenue, 0) / 
                      Math.max(liveSessions.length, 1)
                    ).toLocaleString()}
                  </p>
                  <p className="text-xs text-green-400 mt-1 flex items-center">
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
                    </svg>
                    +8.7% from last week
                  </p>
                </div>

                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-300">Technical Issues</h3>
                  <p className="text-2xl font-bold mt-2">2</p>
                  <p className="text-xs text-red-400 mt-1 flex items-center">
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                    +1 from yesterday
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}

      {activeTab === 'creators' && (
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-gray-900 to-gray-800 p-5 sm:p-6 rounded-xl border border-gray-800 shadow-lg"
          >
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-lg sm:text-xl font-semibold text-white flex items-center">
                <FiAward className="mr-2 text-amber-400" />
                Weekly Top Creators
              </h2>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-400">Auto-ranked by engagement</span>
                <button className="text-xs bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded">
                  Adjust Ranking
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {topCreators.slice(0, 4).map((creator, index) => (
                <motion.div
                  key={creator.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className={`bg-gray-800/50 hover:bg-gray-800 p-4 rounded-lg transition-colors ${
                    index === 0 ? 'border-2 border-amber-400' : ''
                  }`}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="relative">
                      <img 
                        src={creator.avatar} 
                        alt={creator.name} 
                        className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
                      />
                      {index === 0 && (
                        <div className="absolute -top-2 -right-2 bg-amber-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                          #1
                        </div>
                      )}
                    </div>
                    <h3 className="font-medium mt-3">{creator.name}</h3>
                    <p className="text-xs text-gray-400">{creator.category}</p>
                    <div className="mt-3 grid grid-cols-3 gap-2 w-full">
                      <div className="text-center">
                        <p className="text-xs text-gray-400">Engagement</p>
                        <p className="text-sm font-medium">{creator.engagement.toLocaleString()}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-400">Videos</p>
                        <p className="text-sm font-medium">{creator.videos}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-400">Followers</p>
                        <p className="text-sm font-medium">{(creator.followers / 1000).toFixed(1)}K</p>
                      </div>
                    </div>
                    <button className="mt-3 w-full py-1 bg-blue-600 hover:bg-blue-700 text-xs rounded">
                      {index === 0 ? 'Featured' : 'Feature'}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6">
              <h3 className="text-md font-medium mb-3">All Creators Ranking</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-800">
                  <thead className="bg-gray-800/50">
                    <tr>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Rank</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Creator</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Engagement</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Videos</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Followers</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Trend Score</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-900/20 divide-y divide-gray-800">
                    {topCreators.map((creator, index) => (
                      <tr key={creator.id} className="hover:bg-gray-800/50">
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-300">
                          #{index + 1}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center">
                            <img 
                              src={creator.avatar} 
                              alt={creator.name} 
                              className="w-8 h-8 rounded-full object-cover mr-2"
                            />
                            <span>{creator.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                          {creator.engagement.toLocaleString()}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                          {creator.videos}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                          {(creator.followers / 1000).toFixed(1)}K
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                          <div className="flex items-center">
                            <div className="w-full bg-gray-700 rounded-full h-2">
                              <div 
                                className="bg-blue-500 h-2 rounded-full" 
                                style={{ width: `${creator.trendScore}%` }}
                              ></div>
                            </div>
                            <span className="ml-2">{creator.trendScore}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                          <button className="text-blue-400 hover:text-blue-300 text-xs">
                            Feature
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {activeTab === 'trending' && (
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-gray-900 to-gray-800 p-5 sm:p-6 rounded-xl border border-gray-800 shadow-lg"
          >
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-lg sm:text-xl font-semibold text-white flex items-center">
                <FiTrendingUp className="mr-2 text-green-400" />
                Trendo Up Weekly Engagement
              </h2>
              <button className="text-xs bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded">
                Modify Trending Algorithm
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-300">Current Trending Algorithm</h3>
                <div className="mt-3 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Engagement Weight</span>
                    <span className="font-medium">45%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full w-[45%]"></div>
                  </div>

                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Recency Weight</span>
                    <span className="font-medium">30%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full w-[30%]"></div>
                  </div>

                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Diversity Weight</span>
                    <span className="font-medium">15%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full w-[15%]"></div>
                  </div>

                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Creator Level</span>
                    <span className="font-medium">10%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-amber-500 h-2 rounded-full w-[10%]"></div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-300">Trending Controls</h3>
                <div className="mt-3 space-y-4">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Max Trending Creators</label>
                    <select className="bg-gray-800 border border-gray-700 text-gray-300 text-xs rounded-lg px-3 py-1 w-full">
                      <option>5</option>
                      <option selected>10</option>
                      <option>15</option>
                      <option>20</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Content Diversity</label>
                    <select className="bg-gray-800 border border-gray-700 text-gray-300 text-xs rounded-lg px-3 py-1 w-full">
                      <option>Low (more of the same)</option>
                      <option selected>Medium (balanced)</option>
                      <option>High (more variety)</option>
                    </select>
                  </div>

                  <div>
                    <label className="flex items-center space-x-2 text-xs text-gray-400">
                      <input type="checkbox" className="rounded bg-gray-700 border-gray-600" checked />
                      <span>Auto-update trending every hour</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gradient-to-br from-gray-900 to-gray-800 p-5 sm:p-6 rounded-xl border border-gray-800 shadow-lg"
          >
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-lg sm:text-xl font-semibold text-white flex items-center">
                <FiTrendingUp className="mr-2 text-purple-400" />
                Currently Trending in #TrendNow
              </h2>
              <button className="text-xs bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded">
                Refresh List
              </button>
            </div>

            <div className="space-y-4">
              {trendingContent.map((content, index) => (
                <motion.div
                  key={content.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + (index * 0.1) }}
                  className="bg-gray-800/50 hover:bg-gray-800 p-4 rounded-lg transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-white">{content.title}</h3>
                      <p className="text-xs text-gray-400 mt-1">by {content.creator}</p>
                    </div>
                    <span className="px-2 py-1 bg-purple-500/10 text-purple-400 text-xs rounded-full">
                      #{index + 1} Trending
                    </span>
                  </div>

                  <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                    <div className="bg-gray-900/20 p-2 rounded">
                      <p className="text-xs text-gray-400">Views</p>
                      <p className="text-sm font-medium">{(content.views / 1000).toFixed(1)}K</p>
                    </div>
                    <div className="bg-gray-900/20 p-2 rounded">
                      <p className="text-xs text-gray-400">Likes</p>
                      <p className="text-sm font-medium">{(content.likes / 1000).toFixed(1)}K</p>
                    </div>
                    <div className="bg-gray-900/20 p-2 rounded">
                      <p className="text-xs text-gray-400">Shares</p>
                      <p className="text-sm font-medium">{content.shares.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {content.hashtags.map((tag, i) => (
                      <span key={i} className="text-xs bg-blue-900/30 text-blue-400 px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-3 flex justify-end space-x-2">
                    <button className="text-xs bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded">
                      Demote
                    </button>
                    <button className="text-xs bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded">
                      Feature
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default LivePage;