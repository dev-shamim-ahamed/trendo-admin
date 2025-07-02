import React from 'react';

const StatusBadge = ({ status, text, color, icon }) => {
  const colorClasses = {
    green: 'bg-green-900/30 text-green-400',
    yellow: 'bg-yellow-900/30 text-yellow-400',
    red: 'bg-red-900/30 text-red-400',
    blue: 'bg-blue-900/30 text-blue-400',
    gray: 'bg-gray-800 text-gray-300'
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClasses[color]}`}>
      {icon && React.cloneElement(icon, { className: 'mr-1 h-3 w-3' })}
      {text}
    </span>
  );
};

export default StatusBadge;