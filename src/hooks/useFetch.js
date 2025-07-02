// hooks/useFetch.js
import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real app, this would be an actual API call
        // For demo purposes, we'll simulate a delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data based on the URL
        let mockData = {};
        
        if (url === '/api/dashboard') {
          mockData = {
            totalUsers: 12453,
            userChange: 12,
            totalCreators: 3421,
            creatorChange: 8,
            totalVideos: 56789,
            videoChange: 23,
            totalRevenue: 125430,
            revenueChange: 5,
            dailyLikes: 12543,
            dailyShares: 4321,
            dailyComments: 3214,
            recentActivity: [
              'New creator "MusicStar" joined',
              'Product "Summer Collection" approved',
              'User "john_doe" reported a video',
              'Live session started by "FashionGuru"'
            ]
          };
        } else if (url === '/api/users') {
          mockData = {
            users: Array(10).fill().map((_, i) => ({
              id: `U${1000 + i}`,
              username: `user_${i + 1}`,
              email: `user${i + 1}@example.com`,
              joinedDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
              status: Math.random() > 0.2 ? 'active' : 'suspended'
            })),
            creators: Array(10).fill().map((_, i) => ({
              id: `C${2000 + i}`,
              username: `creator_${i + 1}`,
              email: `creator${i + 1}@example.com`,
              videoCount: Math.floor(Math.random() * 100),
              followerCount: Math.floor(Math.random() * 10000),
              isVerified: Math.random() > 0.3
            }))
          };
        }
        
        setData(mockData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;