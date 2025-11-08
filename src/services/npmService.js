import apiClient from './api';

/**
 * NPM Service - Handles all NPM registry and stats API calls
 */
const npmService = {
  /**
   * Search for packages by name
   */
  searchPackages: async (query, size = 5) => {
    try {
      const response = await apiClient.get('https://registry.npmjs.org/-/v1/search', {
        params: { text: query, size },
      });
      return response.data.objects.map(obj => ({
        name: obj.package.name,
        description: obj.package.description || 'No description available',
        version: obj.package.version,
      }));
    } catch (error) {
      console.error('Search packages error:', error);
      throw error;
    }
  },

  /**
   * Get package metadata from NPM registry
   */
  getPackageInfo: async (packageName) => {
    try {
      const response = await apiClient.get(`/api/npm/${packageName}`);
      const data = response.data;
      
      const latestVersion = data['dist-tags']?.latest;
      const latestVersionData = data.versions[latestVersion] || {};

      // Calculate some useful metadata
      const totalVersions = Object.keys(data.versions).length;
      const createdDate = data.time?.created ? new Date(data.time.created) : null;
      const modifiedDate = data.time?.modified ? new Date(data.time.modified) : null;
      const maintainers = data.maintainers || [];
      
      // Get all available npm tags
      const distTags = data['dist-tags'] || {};

      return {
        name: data.name,
        description: data.description || 'No description available',
        version: latestVersion,
        author: data.author?.name || maintainers[0]?.name || 'Unknown',
        license: data.license || 'Unknown',
        repository: data.repository?.url || null,
        homepage: data.homepage || null,
        keywords: data.keywords || [],
        dependencies: latestVersionData.dependencies || {},
        devDependencies: latestVersionData.devDependencies || {},
        peerDependencies: latestVersionData.peerDependencies || {},
        time: data.time,
        versions: Object.keys(data.versions),
        // Additional metadata
        totalVersions,
        createdDate,
        modifiedDate,
        maintainers: maintainers.map(m => m.name),
        distTags,
        readme: data.readme || null,
        bugs: data.bugs?.url || null,
      };
    } catch (error) {
      console.error('Get package info error:', error);
      if (error.status === 404) {
        throw { message: 'Package not found', status: 404 };
      }
      throw error;
    }
  },

  /**
   * Get download statistics from jsDelivr
   */
  getDownloadStats: async (packageName) => {
    try {
      const response = await apiClient.get(
        `https://data.jsdelivr.com/v1/package/npm/${packageName}/stats`
      );
      return response.data;
    } catch (error) {
      console.error('Get download stats error:', error);
      // Return mock data if jsdelivr fails
      return { total: 0, versions: {} };
    }
  },

  /**
   * Get bundle size information
   * Note: External bundle size APIs have CORS restrictions
   * This is a placeholder that returns unavailable status
   */
  getBundleSize: async (packageName) => {
    // Bundle size APIs (bundlephobia, packagephobia) have CORS restrictions
    // when called from browser. They need to be called from server-side.
    // For now, we'll return a placeholder message.
    
    return {
      error: 'Bundle size analysis requires a backend server. Feature coming soon!',
      isError: true,
    };
  },

  /**
   * Get NPM registry stats
   */
  getRegistryStats: async () => {
    try {
      // Get total packages count
      const searchResponse = await apiClient.get(
        'https://registry.npmjs.org/-/v1/search',
        { params: { text: 'keywords:javascript', size: 1 } }
      );
      const totalPackages = searchResponse.data.total;

      // Get download stats
      const downloadsResponse = await apiClient.get(
        'https://api.npmjs.org/downloads/point/last-day'
      );
      const dailyDownloads = downloadsResponse.data.downloads;

      return {
        totalPackages,
        dailyDownloads,
        activeUsers: Math.round(totalPackages * 0.05),
        dataPoints: totalPackages * 5 * 365,
      };
    } catch (error) {
      console.error('Get registry stats error:', error);
      // Return fallback values
      return {
        totalPackages: 2000000,
        dailyDownloads: 4000000000,
        activeUsers: 200000,
        dataPoints: 3650000000,
      };
    }
  },

  /**
   * Process version data for charts
   */
  processVersionStats: (packageData, statsData) => {
    // Filter out pre-release versions and sort by semver
    const versionEntries = Object.entries(packageData.time || {})
      .filter(([key]) => !['created', 'modified'].includes(key))
      .filter(([version]) => !version.includes('-') && !version.includes('alpha') && !version.includes('beta'))
      .sort((a, b) => {
        const vA = a[0].split('.').map(n => parseInt(n, 10) || 0);
        const vB = b[0].split('.').map(n => parseInt(n, 10) || 0);
        for (let i = 0; i < 3; i++) {
          if (vA[i] !== vB[i]) return vB[i] - vA[i];
        }
        return 0;
      });

    // Get latest 10 stable versions
    const latestVersions = versionEntries.slice(0, 10).map(([v]) => v);

    // Filter stats to only include latest versions
    const filteredStats = latestVersions
      .filter(v => statsData.versions?.[v])
      .reduce((acc, version) => {
        acc[version] = statsData.versions[version];
        return acc;
      }, {});

    return {
      labels: Object.keys(filteredStats),
      data: Object.values(filteredStats).map(v => v.total || 0),
      versions: filteredStats,
    };
  },
};

export default npmService;
