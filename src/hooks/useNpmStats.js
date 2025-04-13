import { useState, useEffect } from 'react';
import axios from 'axios';

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
        // Use search API to get package count - more reliable than replicate API
        const searchResponse = await axios.get('https://registry.npmjs.org/-/v1/search?text=keywords:javascript&size=1');
        const totalPackages = searchResponse.data.total;

        // Get downloads for last day
        const downloadsResponse = await axios.get('https://api.npmjs.org/downloads/point/last-day');
        const dailyDownloads = downloadsResponse.data.downloads;

        // Calculate active users and data points
        const activeUsers = Math.round(totalPackages * 0.05); // ~5% of packages have active maintainers
        const estimatedDataPoints = totalPackages * 5 * 365; // avg 5 versions per package × 365 days

        setStats({
          packages: formatNumber(totalPackages),
          downloads: formatNumber(dailyDownloads),
          users: formatNumber(activeUsers),
          dataPoints: formatNumber(estimatedDataPoints),
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