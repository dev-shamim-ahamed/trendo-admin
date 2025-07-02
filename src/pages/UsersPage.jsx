// pages/UsersPage.jsx
import React from 'react';
import UserManagement from '../components/UserManagement';
import useFetch from '../hooks/useFetch';

const UsersPage = () => {
  const { data, loading, error } = useFetch('/api/users');

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-400">Error: {error}</div>;

  return <UserManagement users={data.users} creators={data.creators} />;
};

export default UsersPage;