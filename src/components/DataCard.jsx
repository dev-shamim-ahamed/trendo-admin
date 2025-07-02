import React from 'react';
import { motion } from 'framer-motion';

const DataCard = ({ title, value, change, icon, color = 'from-blue-500 to-blue-600' }) => {
  const isPositive = typeof change === 'number' ? change >= 0 : change.startsWith('+');
  
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className={`bg-gradient-to-br ${color} p-5 rounded-xl shadow-lg border border-gray-800/50 h-full flex flex-col`}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs sm:text-sm font-medium text-white/80">{title}</p>
          <p className="text-2xl sm:text-3xl font-bold text-white mt-1">{value}</p>
        </div>
        <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
          {icon}
        </div>
      </div>
      
      {change !== undefined && (
        <div className="mt-4 pt-4 border-t border-white/10 flex items-center">
          <span className={`inline-flex items-center text-xs sm:text-sm font-medium ${
            isPositive ? 'text-green-400' : 'text-red-400'
          }`}>
            {typeof change === 'number' ? (
              <>
                {isPositive ? (
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
                  </svg>
                ) : (
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                )}
                {Math.abs(change)}%
              </>
            ) : (
              change
            )}
          </span>
          <span className="text-xs text-white/60 ml-2">
            {typeof change === 'number' ? 'from last week' : ''}
          </span>
        </div>
      )}
    </motion.div>
  );
};

export default DataCard;