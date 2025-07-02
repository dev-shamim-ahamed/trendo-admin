// pages/DashboardPage.jsx
import React from 'react';
import Dashboard from '../components/Dashboard';
import useFetch from '../hooks/useFetch';

const DashboardPage = () => {
  const { data, loading, error } = useFetch('/api/dashboard');

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-400">Error: {error}</div>;

  return <Dashboard stats={data} />;
};

export default DashboardPage;