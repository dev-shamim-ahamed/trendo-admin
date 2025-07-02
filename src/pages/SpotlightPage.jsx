import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiStar, FiSettings, FiUsers, FiThumbsUp, FiShare2, FiMessageSquare, FiShoppingBag } from 'react-icons/fi';

const SpotlightPage = () => {
  const [spotlightSettings, setSpotlightSettings] = useState({
    autoFeature: true,
    weeklyCount: 5,
    rankingWeight: {
      likes: 40,
      shares: 30,
      comments: 20,
      sales: 10
    },
    trendingTags: ['fashion', 'beauty', 'tech', 'lifestyle']
  });

  const [activeTab, setActiveTab] = useState('current');
  const [newTag, setNewTag] = useState('');

  // Mock top creators with more detailed data
  const topCreators = Array(10).fill().map((_, i) => ({
    id: `TC${7000 + i}`,
    username: `creator_${i + 1}`,
    name: ['Alex Morgan', 'Jamie Chen', 'Taylor Swift', 'Jordan Lee', 'Casey Neistat', 'Emma Chamberlain', 'David Dobrik', 'Liza Koshy', 'MrBeast', 'PewDiePie'][i],
    avatar: `https://i.pravatar.cc/150?img=${i + 10}`,
    engagement: Math.floor(Math.random() * 10000),
    featured: i < 3,
    stats: {
      likes: Math.floor(Math.random() * 5000),
      shares: Math.floor(Math.random() * 2000),
      comments: Math.floor(Math.random() * 1000),
      sales: Math.floor(Math.random() * 500)
    },
    tags: [['fashion', 'beauty'], ['tech', 'gadgets'], ['music'], ['comedy'], ['vlog'], ['lifestyle'], ['gaming'], ['education'], ['cooking'], ['travel']][i]
  }));

  const handleSettingChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSpotlightSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? parseInt(value) : value
    }));
  };

  const handleWeightChange = (e) => {
    const { name, value } = e.target;
    setSpotlightSettings(prev => ({
      ...prev,
      rankingWeight: {
        ...prev.rankingWeight,
        [name]: parseInt(value)
      }
    }));
  };

  const toggleFeatureCreator = (id) => {
    // In a real app, this would update the backend
    const updatedCreators = topCreators.map(creator => 
      creator.id === id ? { ...creator, featured: !creator.featured } : creator
    );
    // Normally you would set state here, but we're using mock data
  };

  const addTrendingTag = (e) => {
    e.preventDefault();
    if (newTag.trim() && !spotlightSettings.trendingTags.includes(newTag.trim().toLowerCase())) {
      setSpotlightSettings(prev => ({
        ...prev,
        trendingTags: [...prev.trendingTags, newTag.trim().toLowerCase()]
      }));
      setNewTag('');
    }
  };

  const removeTrendingTag = (tagToRemove) => {
    setSpotlightSettings(prev => ({
      ...prev,
      trendingTags: prev.trendingTags.filter(tag => tag !== tagToRemove)
    }));
  };

  const saveSettings = () => {
    // In a real app, this would save to the backend
    console.log('Settings saved:', spotlightSettings);
    // Show success message/notification
  };

  return (
    <div className="space-y-6 px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center"
      >
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Creator Spotlight</h1>
          <p className="text-sm text-gray-400 mt-1">
            Feature top creators and manage trending content
          </p>
        </div>
        <button
          onClick={saveSettings}
          className="mt-3 sm:mt-0 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center"
        >
          <FiSettings className="mr-2" />
          Save Settings
        </button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Settings Panel */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="lg:col-span-1 bg-gradient-to-br from-gray-900 to-gray-800 p-5 sm:p-6 rounded-xl border border-gray-800 shadow-lg"
        >
          <div className="flex items-center space-x-2 mb-5">
            <FiSettings className="text-blue-400" />
            <h2 className="text-lg sm:text-xl font-semibold text-white">Spotlight Settings</h2>
          </div>
          
          <div className="space-y-5">
            <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
              <div>
                <label htmlFor="autoFeature" className="block text-sm font-medium text-gray-300 mb-1">
                  Auto-feature creators
                </label>
                <p className="text-xs text-gray-500">
                  Automatically select top creators each week
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  id="autoFeature"
                  name="autoFeature"
                  checked={spotlightSettings.autoFeature}
                  onChange={handleSettingChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            
            <div className="p-3 bg-gray-800/50 rounded-lg">
              <label htmlFor="weeklyCount" className="block text-sm font-medium text-gray-300 mb-2">
                Creators to feature weekly
              </label>
              <div className="flex items-center space-x-3">
                <input
                  type="range"
                  id="weeklyCount"
                  name="weeklyCount"
                  min="1"
                  max="10"
                  value={spotlightSettings.weeklyCount}
                  onChange={handleSettingChange}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-sm font-medium text-white w-8 text-center">
                  {spotlightSettings.weeklyCount}
                </span>
              </div>
            </div>
            
            <div className="p-3 bg-gray-800/50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-300 mb-3 flex items-center">
                <FiStar className="mr-1 text-yellow-400" />
                Ranking Algorithm Weights
              </h3>
              
              <div className="space-y-3">
                {Object.entries(spotlightSettings.rankingWeight).map(([metric, weight]) => (
                  <div key={metric} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <label htmlFor={metric} className="text-xs font-medium text-gray-400 capitalize flex items-center">
                        {metric === 'likes' && <FiThumbsUp className="mr-1" />}
                        {metric === 'shares' && <FiShare2 className="mr-1" />}
                        {metric === 'comments' && <FiMessageSquare className="mr-1" />}
                        {metric === 'sales' && <FiShoppingBag className="mr-1" />}
                        {metric}
                      </label>
                      <span className="text-xs font-medium text-white">{weight}%</span>
                    </div>
                    <input
                      type="range"
                      id={metric}
                      name={metric}
                      min="0"
                      max="100"
                      value={weight}
                      onChange={handleWeightChange}
                      className="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-800">
                <h3 className="text-sm font-medium text-gray-300 mb-2 flex items-center">
                  <FiUsers className="mr-1 text-purple-400" />
                  Trending Tags
                </h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  {spotlightSettings.trendingTags.map(tag => (
                    <motion.div
                      key={tag}
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center bg-gray-700 px-2 py-1 rounded-full text-xs"
                    >
                      #{tag}
                      <button 
                        onClick={() => removeTrendingTag(tag)}
                        className="ml-1 text-gray-400 hover:text-white"
                      >
                        &times;
                      </button>
                    </motion.div>
                  ))}
                </div>
                <form onSubmit={addTrendingTag} className="flex">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add new tag"
                    className="flex-1 bg-gray-800 text-white text-xs px-3 py-2 rounded-l-lg border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-2 rounded-r-lg"
                  >
                    Add
                  </button>
                </form>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Creators List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="lg:col-span-2 bg-gradient-to-br from-gray-900 to-gray-800 p-5 sm:p-6 rounded-xl border border-gray-800 shadow-lg"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5">
            <div className="flex items-center space-x-3">
              <h2 className="text-lg sm:text-xl font-semibold text-white">Top Creators</h2>
              <div className="flex bg-gray-800 rounded-lg p-1">
                <button
                  className={`px-3 py-1 text-xs rounded-md ${activeTab === 'current' ? 'bg-blue-600' : ''}`}
                  onClick={() => setActiveTab('current')}
                >
                  Current
                </button>
                <button
                  className={`px-3 py-1 text-xs rounded-md ${activeTab === 'featured' ? 'bg-blue-600' : ''}`}
                  onClick={() => setActiveTab('featured')}
                >
                  Featured
                </button>
                <button
                  className={`px-3 py-1 text-xs rounded-md ${activeTab === 'all' ? 'bg-blue-600' : ''}`}
                  onClick={() => setActiveTab('all')}
                >
                  All
                </button>
              </div>
            </div>
            <input
              type="text"
              placeholder="Search creators..."
              className="mt-2 sm:mt-0 bg-gray-800 text-white text-sm px-3 py-2 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-3">
            <AnimatePresence>
              {topCreators
                .filter(creator => {
                  if (activeTab === 'featured') return creator.featured;
                  if (activeTab === 'all') return true;
                  return true; // 'current' shows all but we might filter differently
                })
                .map((creator) => (
                  <motion.div
                    key={creator.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`p-4 rounded-lg border ${
                      creator.featured ? 'border-yellow-500/30 bg-yellow-500/5' : 'border-gray-800 bg-gray-800/30'
                    } hover:bg-gray-800/50 transition-colors`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-3 sm:space-y-0">
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <img 
                            src={creator.avatar} 
                            alt={creator.username} 
                            className="w-12 h-12 rounded-full object-cover border-2 border-gray-700"
                          />
                          {creator.featured && (
                            <div className="absolute -top-1 -right-1 bg-yellow-500 text-white p-1 rounded-full">
                              <FiStar className="w-3 h-3" />
                            </div>
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium text-white">{creator.name}</h3>
                          <p className="text-xs text-gray-400">@{creator.username}</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {creator.tags.map(tag => (
                              <span key={tag} className="text-xs bg-gray-700 px-1.5 py-0.5 rounded">
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                        <div className="grid grid-cols-4 gap-2 text-center">
                          <div className="flex flex-col items-center">
                            <FiThumbsUp className="w-4 h-4 text-blue-400" />
                            <span className="text-xs mt-1">{creator.stats.likes}</span>
                          </div>
                          <div className="flex flex-col items-center">
                            <FiShare2 className="w-4 h-4 text-purple-400" />
                            <span className="text-xs mt-1">{creator.stats.shares}</span>
                          </div>
                          <div className="flex flex-col items-center">
                            <FiMessageSquare className="w-4 h-4 text-green-400" />
                            <span className="text-xs mt-1">{creator.stats.comments}</span>
                          </div>
                          <div className="flex flex-col items-center">
                            <FiShoppingBag className="w-4 h-4 text-amber-400" />
                            <span className="text-xs mt-1">{creator.stats.sales}</span>
                          </div>
                        </div>
                        
                        <button
                          onClick={() => toggleFeatureCreator(creator.id)}
                          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                            creator.featured 
                              ? 'bg-yellow-600 hover:bg-yellow-700 text-white' 
                              : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                          }`}
                        >
                          {creator.featured ? 'Featured ★' : 'Feature'}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>
          
          <div className="mt-4 flex justify-between items-center text-sm text-gray-400">
            <div>
              Showing {topCreators.length} of {topCreators.length} creators
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 bg-gray-800 rounded-lg hover:bg-gray-700">
                Previous
              </button>
              <button className="px-3 py-1 bg-gray-800 rounded-lg hover:bg-gray-700">
                Next
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SpotlightPage;