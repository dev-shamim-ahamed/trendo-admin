import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiSearch, FiFilter, FiEye, FiFlag, FiTrash2, 
  FiDownload, FiMoreVertical, FiChevronDown, FiX, FiVideo 
} from 'react-icons/fi';
import { 
  FaCheckCircle, FaExclamationTriangle, FaTimesCircle,
  FaRegClock, FaRegEye, FaRegThumbsUp, FaRegFlag
} from 'react-icons/fa';
import { RiVipCrownFill } from 'react-icons/ri';

const ContentPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    dateRange: 'all',
    creatorType: 'all'
  });
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [bulkActions, setBulkActions] = useState([]);

  // Mock data with more realistic content
  const videos = Array(20).fill().map((_, i) => ({
    id: `V${4000 + i}`,
    title: i % 3 === 0 ? `Trending Challenge #${i+1}` : 
           i % 2 === 0 ? `Product Review ${i+1}` : 
           `Daily Vlog ${i+1}`,
    description: i % 3 === 0 ? `Join the latest trending challenge with #${i+1}` : 
                 i % 2 === 0 ? `Honest review of product ${i+1}` : 
                 `A day in my life vlog ${i+1}`,
    creator: i % 5 === 0 ? `@superstar${i}` : 
             i % 3 === 0 ? `@influencer${i}` : 
             `@creator${i}`,
    views: Math.floor(Math.random() * 1000000),
    likes: Math.floor(Math.random() * 50000),
    status: ['active', 'flagged', 'removed'][Math.floor(Math.random() * 3)],
    uploadDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
    thumbnail: `https://source.unsplash.com/random/300x200?sig=${i}`,
    reports: Math.floor(Math.random() * 10),
    duration: `${Math.floor(Math.random() * 15)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
    isVerified: i % 4 === 0,
    isFeatured: i % 6 === 0
  }));

  const filteredVideos = videos.filter(video => {
    const matchesSearch = 
      video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.creator.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      filters.status === 'all' || 
      video.status === filters.status;
    
    const matchesDate = filters.dateRange === 'all' || 
      (filters.dateRange === 'week' && video.uploadDate > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) ||
      (filters.dateRange === 'month' && video.uploadDate > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000));
    
    const matchesCreatorType = 
      filters.creatorType === 'all' ||
      (filters.creatorType === 'verified' && video.isVerified) ||
      (filters.creatorType === 'featured' && video.isFeatured);
    
    return matchesSearch && matchesStatus && matchesDate && matchesCreatorType;
  });

  const statusOptions = [
    { value: 'all', label: 'All Statuses', icon: null },
    { value: 'active', label: 'Active', icon: <FaCheckCircle className="text-green-500" /> },
    { value: 'flagged', label: 'Flagged', icon: <FaExclamationTriangle className="text-yellow-500" /> },
    { value: 'removed', label: 'Removed', icon: <FaTimesCircle className="text-red-500" /> }
  ];

  const dateOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'week', label: 'Last 7 Days' },
    { value: 'month', label: 'Last 30 Days' }
  ];

  const creatorOptions = [
    { value: 'all', label: 'All Creators' },
    { value: 'verified', label: 'Verified Only' },
    { value: 'featured', label: 'Featured Only' }
  ];

  const getStatusBadge = (status) => {
    switch(status) {
      case 'active': 
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900/50 text-green-400 border border-green-800">
            <FaCheckCircle className="mr-1" /> Active
          </span>
        );
      case 'flagged': 
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-900/50 text-yellow-400 border border-yellow-800">
            <FaExclamationTriangle className="mr-1" /> Flagged
          </span>
        );
      case 'removed': 
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-900/50 text-red-400 border border-red-800">
            <FaTimesCircle className="mr-1" /> Removed
          </span>
        );
      default: return null;
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 px-4 sm:px-6 py-6">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Content Moderation</h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage and monitor all platform content with advanced controls
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-all duration-200 flex items-center gap-2 shadow-lg shadow-indigo-500/10 hover:shadow-indigo-500/20">
              <FiDownload className="w-4 h-4" />
              Export Report
            </button>
            <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg transition-all duration-200 flex items-center gap-2 shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20">
              Run AI Scan
            </button>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8"
      >
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-5 rounded-xl border border-gray-800 shadow-lg hover:shadow-gray-800/20 transition-all duration-300">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-400">Total Videos</p>
              <p className="text-2xl font-bold text-white mt-1">{videos.length}</p>
            </div>
            <div className="p-3 bg-blue-500/10 rounded-lg backdrop-blur-sm">
              <FiVideo className="w-5 h-5 text-blue-400" />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-gray-800">
            <p className="text-xs text-gray-500">
              <span className="text-green-400">↑ 12.5%</span> from last week
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-5 rounded-xl border border-gray-800 shadow-lg hover:shadow-gray-800/20 transition-all duration-300">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-400">Flagged Content</p>
              <p className="text-2xl font-bold text-white mt-1">
                {videos.filter(v => v.status === 'flagged').length}
              </p>
            </div>
            <div className="p-3 bg-yellow-500/10 rounded-lg backdrop-blur-sm">
              <FiFlag className="w-5 h-5 text-yellow-400" />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-gray-800">
            <p className="text-xs text-gray-500">
              <span className="text-red-400">↑ 3.2%</span> from last week
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-5 rounded-xl border border-gray-800 shadow-lg hover:shadow-gray-800/20 transition-all duration-300">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-400">Removed Content</p>
              <p className="text-2xl font-bold text-white mt-1">
                {videos.filter(v => v.status === 'removed').length}
              </p>
            </div>
            <div className="p-3 bg-red-500/10 rounded-lg backdrop-blur-sm">
              <FiTrash2 className="w-5 h-5 text-red-400" />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-gray-800">
            <p className="text-xs text-gray-500">
              <span className="text-green-400">↓ 1.8%</span> from last week
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-5 rounded-xl border border-gray-800 shadow-lg hover:shadow-gray-800/20 transition-all duration-300">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-400">Avg. Resolution Time</p>
              <p className="text-2xl font-bold text-white mt-1">4h 22m</p>
            </div>
            <div className="p-3 bg-purple-500/10 rounded-lg backdrop-blur-sm">
              <FaRegClock className="w-5 h-5 text-purple-400" />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-gray-800">
            <p className="text-xs text-gray-500">
              <span className="text-green-400">↓ 18%</span> from last month
            </p>
          </div>
        </div>
      </motion.div>

      {/* Filters Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="mb-6"
      >
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-4 shadow-lg">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-2xl">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-500" />
              </div>
              <input
                type="text"
                placeholder="Search videos, creators, or descriptions..."
                className="block w-full pl-10 pr-3 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-gray-500 transition-all duration-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-3">
              <button 
                className="flex items-center gap-2 px-4 py-2.5 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-sm text-gray-300 transition-all duration-200"
                onClick={() => setShowFilters(!showFilters)}
              >
                <FiFilter className="w-4 h-4" />
                Filters
                <FiChevronDown className={`w-4 h-4 transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`} />
              </button>

              {bulkActions.length > 0 && (
                <div className="relative">
                  <select
                    className="appearance-none pl-4 pr-8 py-2.5 bg-indigo-600 hover:bg-indigo-700 border border-indigo-700 rounded-lg text-sm text-white cursor-pointer transition-all duration-200"
                    onChange={(e) => console.log('Bulk action:', e.target.value)}
                  >
                    <option value="">Bulk Actions ({bulkActions.length})</option>
                    <option value="approve">Approve Selected</option>
                    <option value="flag">Flag Selected</option>
                    <option value="remove">Remove Selected</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <FiChevronDown className="w-4 h-4 text-indigo-200" />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Expanded Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-800">
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-2">Status</label>
                    <div className="flex flex-wrap gap-2">
                      {statusOptions.map(option => (
                        <button
                          key={option.value}
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs border transition-all duration-200 ${
                            filters.status === option.value 
                              ? 'bg-indigo-600/20 border-indigo-500 text-indigo-400' 
                              : 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700'
                          }`}
                          onClick={() => setFilters({...filters, status: option.value})}
                        >
                          {option.icon && React.cloneElement(option.icon, { className: 'w-3 h-3' })}
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-2">Upload Date</label>
                    <div className="flex flex-wrap gap-2">
                      {dateOptions.map(option => (
                        <button
                          key={option.value}
                          className={`px-3 py-1.5 rounded-lg text-xs border transition-all duration-200 ${
                            filters.dateRange === option.value 
                              ? 'bg-indigo-600/20 border-indigo-500 text-indigo-400' 
                              : 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700'
                          }`}
                          onClick={() => setFilters({...filters, dateRange: option.value})}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-2">Creator Type</label>
                    <div className="flex flex-wrap gap-2">
                      {creatorOptions.map(option => (
                        <button
                          key={option.value}
                          className={`px-3 py-1.5 rounded-lg text-xs border transition-all duration-200 ${
                            filters.creatorType === option.value 
                              ? 'bg-indigo-600/20 border-indigo-500 text-indigo-400' 
                              : 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700'
                          }`}
                          onClick={() => setFilters({...filters, creatorType: option.value})}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Content Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden shadow-lg"
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-800">
            <thead className="bg-gray-800">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  <input type="checkbox" className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-indigo-500 focus:ring-indigo-500" />
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Video</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Creator</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Metrics</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Upload Date</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-gray-900/50 divide-y divide-gray-800">
              {filteredVideos.map((video, index) => (
                <motion.tr 
                  key={video.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.03 }}
                  className={`hover:bg-gray-800/50 ${selectedVideo === video.id ? 'bg-gray-800/30' : ''}`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input 
                      type="checkbox" 
                      className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-indigo-500 focus:ring-indigo-500" 
                      checked={bulkActions.includes(video.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setBulkActions([...bulkActions, video.id]);
                        } else {
                          setBulkActions(bulkActions.filter(id => id !== video.id));
                        }
                      }}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-14 w-20 relative group">
                        <img 
                          className="h-14 w-20 rounded-md object-cover group-hover:opacity-80 transition-opacity duration-200" 
                          src={video.thumbnail} 
                          alt={video.title} 
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <FiEye className="text-white w-5 h-5" />
                        </div>
                        <span className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
                          {video.duration}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-white group-hover:text-indigo-300 transition-colors duration-200">
                          {video.title}
                        </div>
                        <div className="text-xs text-gray-400 line-clamp-1 mt-1">
                          {video.description}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        {video.isVerified && (
                          <span className="text-blue-400" title="Verified Creator">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M23 12l-2.44-2.79.34-3.69-3.61-.82-1.89-3.2L12 2.96 8.6 1.5 6.71 4.69 3.1 5.5l.34 3.7L1 12l2.44 2.79-.34 3.7 3.61.82 1.89 3.2L12 21.04l3.4 1.47 1.89-3.2 3.61-.82-.34-3.7L23 12zm-10 5h-2v-2h2v2zm0-4h-2V7h2v6z" />
                            </svg>
                          </span>
                        )}
                        {video.isFeatured && (
                          <span className="text-yellow-400 ml-1" title="Featured Creator">
                            <RiVipCrownFill className="w-4 h-4" />
                          </span>
                        )}
                      </div>
                      <div className="ml-2">
                        <div className="text-sm text-white">{video.creator}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center text-sm text-gray-300">
                        <FaRegEye className="mr-1 text-gray-500" />
                        {formatNumber(video.views)}
                      </div>
                      <div className="flex items-center text-sm text-gray-300">
                        <FaRegThumbsUp className="mr-1 text-gray-500" />
                        {formatNumber(video.likes)}
                      </div>
                      {video.reports > 0 && (
                        <div className="flex items-center text-sm text-red-400">
                          <FaRegFlag className="mr-1" />
                          {video.reports}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(video.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    {formatDate(video.uploadDate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end items-center gap-2">
                      <button 
                        className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-all duration-200"
                        onClick={() => setSelectedVideo(video.id)}
                        title="Preview"
                      >
                        <FiEye className="w-4 h-4" />
                      </button>
                      <button 
                        className="p-2 text-yellow-400 hover:text-yellow-300 hover:bg-yellow-500/10 rounded-lg transition-all duration-200"
                        title="Flag content"
                      >
                        <FiFlag className="w-4 h-4" />
                      </button>
                      <button 
                        className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all duration-200"
                        title="Remove content"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                      <div className="relative">
                        <button 
                          className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-all duration-200"
                          title="More options"
                        >
                          <FiMoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-gray-800 px-6 py-4 flex items-center justify-between border-t border-gray-700">
          <div className="flex-1 flex justify-between sm:hidden">
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-700 text-sm font-medium rounded-md text-gray-300 bg-gray-800 hover:bg-gray-700">
              Previous
            </button>
            <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-700 text-sm font-medium rounded-md text-gray-300 bg-gray-800 hover:bg-gray-700">
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-400">
                Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
                <span className="font-medium">{filteredVideos.length}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-700 bg-gray-800 text-sm font-medium text-gray-400 hover:bg-gray-700">
                  <span className="sr-only">Previous</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                <button aria-current="page" className="z-10 bg-indigo-600 border-indigo-500 text-white relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                  1
                </button>
                <button className="bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                  2
                </button>
                <button className="bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                  3
                </button>
                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-700 bg-gray-800 text-sm font-medium text-gray-400 hover:bg-gray-700">
                  <span className="sr-only">Next</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Video Preview Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25 }}
              className="bg-gray-900 rounded-xl w-full max-w-4xl border border-gray-800 overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <div className="aspect-video bg-black">
                  <img 
                    src={videos.find(v => v.id === selectedVideo)?.thumbnail} 
                    alt="Video preview" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <button 
                  className="absolute top-4 right-4 p-2 bg-gray-900/80 hover:bg-gray-800 rounded-full text-gray-300 hover:text-white transition-colors duration-200"
                  onClick={() => setSelectedVideo(null)}
                >
                  <FiX className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-4 bg-black/80 text-white px-2 py-1 rounded text-sm">
                  {videos.find(v => v.id === selectedVideo)?.duration}
                </div>
              </div>

              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-white">
                      {videos.find(v => v.id === selectedVideo)?.title}
                    </h2>
                    <p className="text-gray-400 mt-2">
                      {videos.find(v => v.id === selectedVideo)?.description}
                    </p>

                    <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700">
                        <p className="text-sm text-gray-400">Creator</p>
                        <p className="text-white font-medium mt-1">
                          {videos.find(v => v.id === selectedVideo)?.creator}
                          {videos.find(v => v.id === selectedVideo)?.isVerified && (
                            <span className="ml-2 text-blue-400" title="Verified Creator">
                              <svg className="w-4 h-4 inline" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M23 12l-2.44-2.79.34-3.69-3.61-.82-1.89-3.2L12 2.96 8.6 1.5 6.71 4.69 3.1 5.5l.34 3.7L1 12l2.44 2.79-.34 3.7 3.61.82 1.89 3.2L12 21.04l3.4 1.47 1.89-3.2 3.61-.82-.34-3.7L23 12zm-10 5h-2v-2h2v2zm0-4h-2V7h2v6z" />
                              </svg>
                            </span>
                          )}
                        </p>
                      </div>
                      <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700">
                        <p className="text-sm text-gray-400">Upload Date</p>
                        <p className="text-white font-medium mt-1">
                          {formatDate(videos.find(v => v.id === selectedVideo)?.uploadDate)}
                        </p>
                      </div>
                      <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700">
                        <p className="text-sm text-gray-400">Status</p>
                        <div className="mt-1">
                          {getStatusBadge(videos.find(v => v.id === selectedVideo)?.status)}
                        </div>
                      </div>
                      <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700">
                        <p className="text-sm text-gray-400">Reports</p>
                        <p className={`font-medium mt-1 ${
                          (videos.find(v => v.id === selectedVideo)?.reports || 0) > 0 ? 'text-red-400' : 'text-white'
                        }`}>
                          {videos.find(v => v.id === selectedVideo)?.reports || 0}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="md:w-48 flex-shrink-0">
                    <div className="space-y-3">
                      <button className="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">
                        <FiEye className="w-4 h-4" />
                        View Details
                      </button>
                      <button className="w-full px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">
                        <FiFlag className="w-4 h-4" />
                        Flag Content
                      </button>
                      <button className="w-full px-4 py-2 bg-red-600/20 hover:bg-red-600/30 border border-red-700 text-red-400 hover:text-red-300 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">
                        <FiTrash2 className="w-4 h-4" />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContentPage;