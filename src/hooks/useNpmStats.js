import { useState, useEffect } from 'react';
import npmService from '../services/npmService';

export function useNpmStats() {
  const [stats, setStats] = useState({
    packages: '...',
    downloads: '...',
    users: '...',
    dataPoints: '...',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await npmService.getRegistryStats();

        setStats({
          packages: formatNumber(data.totalPackages),
          downloads: formatNumber(data.dailyDownloads),
          users: formatNumber(data.activeUsers),
          dataPoints: formatNumber(data.dataPoints),
        });
      } catch (error) {
        console.error('Error fetching NPM stats:', error);
        
        // Set fallback values if API calls fail
        setStats({
          packages: '2M+',
          downloads: '4B+',
          users: '200K+',
          dataPoints: '3.6B+',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();

    // Set a timeout to prevent infinite loading state
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  const formatNumber = (num) => {
    if (!num) return '0+';
    if (num >= 1e12) return Math.round(num / 1e11) / 10 + 'T+';
    if (num >= 1e9) return Math.round(num / 1e8) / 10 + 'B+';
    if (num >= 1e6) return Math.round(num / 1e5) / 10 + 'M+';
    if (num >= 1e3) return Math.round(num / 1e2) / 10 + 'K+';
    return num.toLocaleString() + '+';
  };

  return { stats, loading };
}