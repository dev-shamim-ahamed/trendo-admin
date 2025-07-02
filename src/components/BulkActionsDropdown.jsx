import React, { useState } from 'react';
import { FiChevronDown, FiCheck, FiUserCheck, FiUserX, FiDownload, FiTrash2, FiMail } from 'react-icons/fi';

const BulkActionsDropdown = ({ selectedCount, onBulkAction, options }) => {
  const [isOpen, setIsOpen] = useState(false);

  const actionIcons = {
    activate: <FiUserCheck className="mr-2 h-4 w-4" />,
    suspend: <FiUserX className="mr-2 h-4 w-4" />,
    verify: <FiCheck className="mr-2 h-4 w-4" />,
    unverify: <FiUserX className="mr-2 h-4 w-4" />,
    export: <FiDownload className="mr-2 h-4 w-4" />,
    delete: <FiTrash2 className="mr-2 h-4 w-4" />,
    contact: <FiMail className="mr-2 h-4 w-4" />
  };

  const actionLabels = {
    activate: 'Activate Selected',
    suspend: 'Suspend Selected',
    verify: 'Verify Selected',
    unverify: 'Unverify Selected',
    export: 'Export Selected',
    delete: 'Delete Selected',
    contact: 'Contact Selected'
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
      >
        <span className="mr-2">Bulk Actions ({selectedCount})</span>
        <FiChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-lg bg-gray-800 border border-gray-700 shadow-lg focus:outline-none">
            <div className="py-1">
              {options.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    onBulkAction(option);
                    setIsOpen(false);
                  }}
                  className={`flex items-center w-full px-4 py-2 text-sm ${
                    option === 'delete' || option === 'suspend' || option === 'unverify'
                      ? 'text-red-400 hover:bg-red-900/30'
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {actionIcons[option]}
                  {actionLabels[option]}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BulkActionsDropdown;