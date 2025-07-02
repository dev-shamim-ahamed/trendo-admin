import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiX, 
  FiUser, 
  FiMail, 
  FiCalendar, 
  FiClock, 
  FiVideo, 
  FiUsers, 
  FiCheckCircle, 
  FiAlertCircle,
  FiActivity // Added the missing import
} from 'react-icons/fi';

const UserDetailModal = ({ user, onClose, isCreator }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70"
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="relative bg-gray-900 rounded-xl border border-gray-800 shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
          >
            <FiX className="h-5 w-5" />
          </button>

          <div className="p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="flex-shrink-0 h-24 w-24 rounded-full bg-gray-800 flex items-center justify-center border-2 border-gray-700">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.username} className="h-full w-full rounded-full" />
                ) : (
                  <FiUser className="h-12 w-12 text-gray-400" />
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <h2 className="text-2xl font-bold text-white truncate">{user.username}</h2>
                <p className="text-gray-400">{user.email}</p>
                
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    isCreator 
                      ? user.isVerified 
                        ? 'bg-green-900/50 text-green-400' 
                        : 'bg-yellow-900/50 text-yellow-400'
                      : user.status === 'active' 
                        ? 'bg-blue-900/50 text-blue-400' 
                        : 'bg-red-900/50 text-red-400'
                  }`}>
                    {isCreator 
                      ? user.isVerified 
                        ? 'Verified Creator' 
                        : 'Pending Verification'
                      : user.status === 'active' 
                        ? 'Active User' 
                        : 'Suspended User'}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-gray-800 text-gray-300 text-xs font-medium">
                    Joined {new Date(user.joinedDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <FiUser className="mr-2 text-blue-400" />
                  Basic Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500">User ID</p>
                    <p className="text-white font-mono">#{user.id}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="text-white">{user.email}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Account Type</p>
                    <p className="text-white">{isCreator ? 'Content Creator' : 'Regular User'}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <FiActivity className="mr-2 text-purple-400" />
                  Activity Stats
                </h3>
                <div className="space-y-3">
                  {isCreator ? (
                    <>
                      <div>
                        <p className="text-xs text-gray-500">Videos Uploaded</p>
                        <p className="text-white">{user.videoCount || 0}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Followers</p>
                        <p className="text-white">{user.followerCount?.toLocaleString() || 0}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Verification Status</p>
                        <div className="flex items-center">
                          {user.isVerified ? (
                            <FiCheckCircle className="text-green-400 mr-1" />
                          ) : (
                            <FiAlertCircle className="text-yellow-400 mr-1" />
                          )}
                          <span className="text-white">
                            {user.isVerified ? 'Verified' : 'Pending Verification'}
                          </span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <p className="text-xs text-gray-500">Last Active</p>
                        <p className="text-white">
                          {user.lastActive || 'Unknown'}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Account Status</p>
                        <div className="flex items-center">
                          {user.status === 'active' ? (
                            <FiCheckCircle className="text-green-400 mr-1" />
                          ) : (
                            <FiAlertCircle className="text-red-400 mr-1" />
                          )}
                          <span className="text-white">
                            {user.status === 'active' ? 'Active' : 'Suspended'}
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {isCreator && (
                <div className="bg-gray-800/50 p-4 rounded-lg md:col-span-2">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <FiVideo className="mr-2 text-emerald-400" />
                    Creator Details
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Total Earnings</p>
                      <p className="text-white">${user.totalEarnings?.toFixed(2) || '0.00'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Commission Rate</p>
                      <p className="text-white">{user.commissionRate || '15'}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Content Rating</p>
                      <p className="text-white">{user.contentRating || '4.2'}/5.0</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-white transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => console.log('Take action on', user.id)}
                className={`px-4 py-2 rounded-lg text-white transition-colors ${
                  isCreator
                    ? user.isVerified
                      ? 'bg-red-600 hover:bg-red-700'
                      : 'bg-green-600 hover:bg-green-700'
                    : user.status === 'active'
                      ? 'bg-red-600 hover:bg-red-700'
                      : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                {isCreator
                  ? user.isVerified
                    ? 'Revoke Verification'
                    : 'Verify Creator'
                  : user.status === 'active'
                    ? 'Suspend User'
                    : 'Activate User'}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default UserDetailModal;