import { useState, useEffect, useCallback } from 'react';
import npmService from '../services/npmService';

/**
 * Custom hook for fetching package data
 */
export function usePackageData() {
  const [packageData, setPackageData] = useState(null);
  const [statsData, setStatsData] = useState(null);
  const [bundleSize, setBundleSize] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPackageData = useCallback(async (packageName) => {
    if (!packageName || packageName.trim() === '') {
      setError('Please enter a package name');
      return;
    }

    setLoading(true);
    setError(null);
    setPackageData(null);
    setStatsData(null);
    setBundleSize(null);

    try {
      // Fetch critical data first (package info and stats)
      const [packageInfo, downloadStats] = await Promise.all([
        npmService.getPackageInfo(packageName),
        npmService.getDownloadStats(packageName),
      ]);

      // Process version statistics
      const processedStats = npmService.processVersionStats(
        packageInfo,
        downloadStats
      );

      setPackageData({
        ...packageInfo,
        downloads: downloadStats.total || 0,
      });
      setStatsData(processedStats);

      // Set bundle size to unavailable message
      // (External APIs have CORS restrictions)
      setBundleSize({
        error: 'Bundle size analysis requires a backend server',
        isError: true,
      });
    } catch (err) {
      console.error('Error fetching package data:', err);
      setError(err.message || 'Failed to fetch package data');
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setPackageData(null);
    setStatsData(null);
    setBundleSize(null);
    setError(null);
  }, []);

  return {
    packageData,
    statsData,
    bundleSize,
    loading,
    error,
    fetchPackageData,
    reset,
  };
}

/**
 * Custom hook for package search/autocomplete
 */
export function usePackageSearch() {
  const [suggestions, setSuggestions] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const searchPackages = useCallback(async (query) => {
    if (!query || query.length < 2) {
      setSuggestions([]);
      return;
    }

    setSearchLoading(true);
    try {
      const results = await npmService.searchPackages(query, 5);
      setSuggestions(results);
    } catch (error) {
      console.error('Search error:', error);
      setSuggestions([]);
    } finally {
      setSearchLoading(false);
    }
  }, []);

  const clearSuggestions = useCallback(() => {
    setSuggestions([]);
  }, []);

  return {
    suggestions,
    searchLoading,
    searchPackages,
    clearSuggestions,
  };
}
