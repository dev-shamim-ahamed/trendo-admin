import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiUser, FiUsers, FiCheckCircle, FiAlertCircle, FiEye, FiToggleLeft, FiToggleRight, FiMoreVertical, FiEdit2, FiTrash2, FiMail, FiClock } from 'react-icons/fi';
import DataTable from './DataTable';
import UserDetailModal from './UserDetailModal';
import BulkActionsDropdown from './BulkActionsDropdown';
import StatusBadge from './StatusBadge';
import Pagination from './Pagination';

const UserManagement = ({ users, creators }) => {
  const [activeTab, setActiveTab] = useState('users');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  // Filter data based on search term
  const filteredData = activeTab === 'users' 
    ? users.filter(user => 
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.id.toLowerCase().includes(searchTerm.toLowerCase()))
    : creators.filter(creator => 
        creator.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        creator.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        creator.id.toLowerCase().includes(searchTerm.toLowerCase()));

  // Sort data
  const sortedData = [...filteredData].sort((a, b) => {
    if (sortConfig.key) {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
    }
    return 0;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const toggleRowSelection = (id) => {
    setSelectedRows(prev => 
      prev.includes(id) 
        ? prev.filter(rowId => rowId !== id) 
        : [...prev, id]
    );
  };

  const toggleAllRows = () => {
    if (selectedRows.length === currentItems.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(currentItems.map(item => item.id));
    }
  };

  const openUserDetail = (user) => {
    setSelectedUser(user);
    setIsDetailModalOpen(true);
  };

  const userColumns = [
    { 
      header: (
        <div className="flex items-center">
          <input 
            type="checkbox" 
            checked={selectedRows.length === currentItems.length && currentItems.length > 0}
            onChange={toggleAllRows}
            className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
          />
        </div>
      ),
      accessor: 'checkbox',
      cell: (row) => (
        <input 
          type="checkbox" 
          checked={selectedRows.includes(row.id)}
          onChange={() => toggleRowSelection(row.id)}
          className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
        />
      ),
      sortable: false
    },
    { 
      header: 'ID', 
      accessor: 'id',
      cell: (row) => <span className="font-mono text-sm text-gray-300">#{row.id}</span>,
      sortable: true
    },
    { 
      header: 'User', 
      accessor: 'user',
      cell: (row) => (
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center">
            {row.avatar ? (
              <img src={row.avatar} alt={row.username} className="h-full w-full rounded-full" />
            ) : (
              <FiUser className="h-5 w-5 text-gray-400" />
            )}
          </div>
          <div>
            <p className="text-white font-medium">{row.username}</p>
            <p className="text-gray-400 text-sm">{row.email}</p>
          </div>
        </div>
      ),
      sortable: false
    },
    { 
      header: 'Joined', 
      accessor: 'joinedDate',
      cell: (row) => (
        <div className="flex items-center text-gray-300">
          <FiClock className="mr-1.5 h-4 w-4 text-gray-500" />
          <span>{new Date(row.joinedDate).toLocaleDateString()}</span>
        </div>
      ),
      sortable: true
    },
    { 
      header: 'Status', 
      accessor: 'status',
      cell: (row) => (
        <StatusBadge 
          status={row.status} 
          text={row.status === 'active' ? 'Active' : 'Suspended'} 
          color={row.status === 'active' ? 'green' : 'red'} 
        />
      ),
      sortable: true
    },
    { 
      header: 'Actions', 
      accessor: 'actions',
      cell: (row) => (
        <div className="flex space-x-2">
          <button 
            onClick={() => openUserDetail(row)}
            className="p-1.5 rounded-md bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white transition-colors"
            title="View details"
          >
            <FiEye className="h-4 w-4" />
          </button>
          <button 
            onClick={() => console.log('Edit', row.id)}
            className="p-1.5 rounded-md bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 hover:text-blue-300 transition-colors"
            title="Edit user"
          >
            <FiEdit2 className="h-4 w-4" />
          </button>
          <button 
            onClick={() => console.log('Toggle status', row.id)}
            className="p-1.5 rounded-md bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white transition-colors"
            title={row.status === 'active' ? 'Suspend user' : 'Activate user'}
          >
            {row.status === 'active' ? (
              <FiToggleRight className="h-4 w-4 text-green-400" />
            ) : (
              <FiToggleLeft className="h-4 w-4 text-red-400" />
            )}
          </button>
        </div>
      ),
      sortable: false
    }
  ];

  const creatorColumns = [
    { 
      header: (
        <div className="flex items-center">
          <input 
            type="checkbox" 
            checked={selectedRows.length === currentItems.length && currentItems.length > 0}
            onChange={toggleAllRows}
            className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
          />
        </div>
      ),
      accessor: 'checkbox',
      cell: (row) => (
        <input 
          type="checkbox" 
          checked={selectedRows.includes(row.id)}
          onChange={() => toggleRowSelection(row.id)}
          className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
        />
      ),
      sortable: false
    },
    { 
      header: 'ID', 
      accessor: 'id',
      cell: (row) => <span className="font-mono text-sm text-gray-300">#{row.id}</span>,
      sortable: true
    },
    { 
      header: 'Creator', 
      accessor: 'creator',
      cell: (row) => (
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center">
            {row.avatar ? (
              <img src={row.avatar} alt={row.username} className="h-full w-full rounded-full" />
            ) : (
              <FiUser className="h-5 w-5 text-gray-400" />
            )}
          </div>
          <div>
            <p className="text-white font-medium">{row.username}</p>
            <p className="text-gray-400 text-sm">{row.email}</p>
          </div>
        </div>
      ),
      sortable: false
    },
    { 
      header: 'Content', 
      accessor: 'content',
      cell: (row) => (
        <div className="flex space-x-4">
          <div>
            <p className="text-white font-medium">{row.videoCount}</p>
            <p className="text-gray-400 text-xs">Videos</p>
          </div>
          <div>
            <p className="text-white font-medium">{row.followerCount.toLocaleString()}</p>
            <p className="text-gray-400 text-xs">Followers</p>
          </div>
        </div>
      ),
      sortable: false
    },
    { 
      header: 'Status', 
      accessor: 'status',
      cell: (row) => (
        <StatusBadge 
          status={row.isVerified ? 'verified' : 'pending'} 
          text={row.isVerified ? 'Verified' : 'Pending'} 
          color={row.isVerified ? 'green' : 'yellow'} 
          icon={row.isVerified ? <FiCheckCircle /> : <FiAlertCircle />}
        />
      ),
      sortable: true
    },
    { 
      header: 'Actions', 
      accessor: 'actions',
      cell: (row) => (
        <div className="flex space-x-2">
          <button 
            onClick={() => openUserDetail(row)}
            className="p-1.5 rounded-md bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white transition-colors"
            title="View details"
          >
            <FiEye className="h-4 w-4" />
          </button>
          <button 
            onClick={() => console.log('Verify', row.id)}
            className={`p-1.5 rounded-md transition-colors ${
              row.isVerified 
                ? 'bg-red-600/20 hover:bg-red-600/30 text-red-400 hover:text-red-300'
                : 'bg-green-600/20 hover:bg-green-600/30 text-green-400 hover:text-green-300'
            }`}
            title={row.isVerified ? 'Unverify creator' : 'Verify creator'}
          >
            {row.isVerified ? (
              <FiAlertCircle className="h-4 w-4" />
            ) : (
              <FiCheckCircle className="h-4 w-4" />
            )}
          </button>
          <button 
            onClick={() => console.log('Contact', row.id)}
            className="p-1.5 rounded-md bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 hover:text-blue-300 transition-colors"
            title="Send message"
          >
            <FiMail className="h-4 w-4" />
          </button>
        </div>
      ),
      sortable: false
    }
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0"
      >
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white flex items-center">
            {activeTab === 'users' ? (
              <>
                <FiUsers className="mr-3 text-blue-400" />
                User Management
              </>
            ) : (
              <>
                <FiUser className="mr-3 text-purple-400" />
                Creator Management
              </>
            )}
          </h1>
          <p className="text-gray-400 mt-1">
            {activeTab === 'users' 
              ? `Manage ${users.length} platform users` 
              : `Manage ${creators.length} content creators`}
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 w-full md:w-auto">
          <div className="relative flex-1 sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          
          <div className="flex space-x-2">
            <div className="inline-flex rounded-md shadow-sm">
              <button
                onClick={() => setActiveTab('users')}
                className={`px-4 py-2 text-sm font-medium rounded-l-lg border border-gray-700 ${
                  activeTab === 'users' 
                    ? 'bg-blue-600 text-white border-blue-600' 
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                Users
              </button>
              <button
                onClick={() => setActiveTab('creators')}
                className={`px-4 py-2 text-sm font-medium rounded-r-lg border border-gray-700 ${
                  activeTab === 'creators' 
                    ? 'bg-purple-600 text-white border-purple-600' 
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                Creators
              </button>
            </div>
            
            {selectedRows.length > 0 && (
              <BulkActionsDropdown 
                selectedCount={selectedRows.length}
                onBulkAction={(action) => console.log(action, selectedRows)}
                options={activeTab === 'users' 
                  ? ['activate', 'suspend', 'export', 'delete']
                  : ['verify', 'unverify', 'contact', 'export']}
              />
            )}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <DataTable 
          columns={activeTab === 'users' ? userColumns : creatorColumns} 
          data={currentItems} 
          onSort={requestSort}
          sortConfig={sortConfig}
          emptyMessage={`No ${activeTab} found matching your search criteria`}
        />
      </motion.div>

      {filteredData.length > itemsPerPage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-gray-800"
        >
          <div className="text-sm text-gray-400 mb-4 sm:mb-0">
            Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
            <span className="font-medium">
              {Math.min(indexOfLastItem, filteredData.length)}
            </span>{' '}
            of <span className="font-medium">{filteredData.length}</span> results
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </motion.div>
      )}

      <AnimatePresence>
        {isDetailModalOpen && (
          <UserDetailModal
            user={selectedUser}
            onClose={() => setIsDetailModalOpen(false)}
            isCreator={activeTab === 'creators'}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserManagement;