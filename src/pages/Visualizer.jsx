import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ArrowPathIcon, ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { useToast } from "../ToastContext";
import { usePackageData, usePackageSearch } from "../hooks/usePackageData";
import { SearchBar } from "../components/package/SearchBar";
import { PackageInfo, BundleInfo, DependenciesInfo } from "../components/package/PackageInfo";
import { LineChart, BarChart, PieChart } from "../components/charts/ChartComponents";

export default function Visualizer() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(() => {
    // Initialize from URL or default to "line"
    return searchParams.get('chart') || 'line';
  });
  const { showToast } = useToast();
  
  // Use custom hooks for data management
  const {
    packageData,
    statsData,
    bundleSize,
    loading,
    error,
    fetchPackageData,
  } = usePackageData();

  const {
    suggestions,
    searchLoading,
    searchPackages,
    clearSuggestions,
  } = usePackageSearch();

  // Load package from URL on mount
  useEffect(() => {
    const packageFromUrl = searchParams.get('package');
    if (packageFromUrl) {
      fetchPackageData(packageFromUrl);
    }
  }, []); // Only run on mount

  // Show error toast when error changes
  useEffect(() => {
    if (error && !loading) {
      showToast(error, 'error');
    }
  }, [error, loading, showToast]);

  const handleSearch = (packageName) => {
    if (!packageName || packageName.trim() === '') {
      showToast('Please enter a package name', 'error');
      return;
    }

    const trimmedPackage = packageName.trim();
    // Update URL with package name, preserve chart
    const params = { package: trimmedPackage };
    if (activeTab !== 'line') params.chart = activeTab;
    setSearchParams(params);
    fetchPackageData(trimmedPackage);
  };

  const handleInputChange = (value) => {
    if (value.length >= 2) {
      searchPackages(value);
    } else {
      clearSuggestions();
    }
  };

  const handleSuggestionSelect = (packageName) => {
    clearSuggestions();
    // Update URL with package name, preserve chart
    const params = { package: packageName };
    if (activeTab !== 'line') params.chart = activeTab;
    setSearchParams(params);
    fetchPackageData(packageName);
  };

  const handleChartChange = (chartId) => {
    setActiveTab(chartId);
    // Update URL with new chart, preserve package
    const params = {};
    const pkg = searchParams.get('package');
    if (pkg) params.package = pkg;
    if (chartId !== 'line') params.chart = chartId; // Only add if not default
    setSearchParams(params);
  };

  const chartTabs = [
    { id: "line", label: "Line Chart", component: LineChart },
    { id: "bar", label: "Bar Chart", component: BarChart },
    { id: "pie", label: "Pie Chart", component: PieChart },
  ];

  const ActiveChartComponent = chartTabs.find(tab => tab.id === activeTab)?.component;

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          NPM Package Visualizer
        </h1>

        <div className="mb-8">
          <SearchBar
            onSearch={handleSearch}
            onInputChange={handleInputChange}
            onSuggestionSelect={handleSuggestionSelect}
            suggestions={suggestions}
            loading={loading}
            initialValue={searchParams.get('package') || ''}
          />
        </div>

        {error && !loading && (
          <div className="p-4 mb-4 bg-red-100 text-red-700 rounded-lg flex items-center gap-2">
            <ExclamationTriangleIcon className="w-5 h-5" />
            {error}
          </div>
        )}

        {loading && (
          <div className="text-center py-16">
            <ArrowPathIcon className="w-12 h-12 mx-auto text-blue-500 animate-spin" />
            <p className="mt-4 text-gray-600">Loading package data...</p>
          </div>
        )}

        {!loading && packageData && statsData && (
          <div className="space-y-8 animate-fade-in">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <PackageInfo packageData={packageData} />
                <BundleInfo bundleSize={bundleSize} />
              </div>

              <DependenciesInfo dependencies={packageData} />

              {statsData.labels.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4">
                    Download Statistics by Version
                  </h3>
                  
                  <div className="flex gap-2 mb-6">
                    {chartTabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => handleChartChange(tab.id)}
                        className={`px-4 py-2 rounded-md transition-all text-sm font-medium ${
                          activeTab === tab.id
                            ? "bg-blue-500 text-white ring-2 ring-blue-200 shadow-sm"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  <div className="h-96 bg-gray-50 p-4 rounded-lg">
                    {ActiveChartComponent && (
                      <ActiveChartComponent
                        labels={statsData.labels}
                        data={statsData.data}
                      />
                    )}
                  </div>

                  <div className="mt-4 text-sm text-gray-600 text-center">
                    Showing download statistics for the latest {statsData.labels.length} stable versions
                  </div>
                </div>
              )}

              {statsData.labels.length === 0 && (
                <div className="mt-8 p-6 bg-yellow-50 rounded-lg text-center">
                  <ExclamationTriangleIcon className="w-8 h-8 mx-auto text-yellow-600 mb-2" />
                  <p className="text-yellow-800">
                    No download statistics available for this package
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {!loading && !packageData && !error && (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <svg
                className="w-24 h-24 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-600 mb-2">
              Search for an NPM Package
            </h2>
            <p className="text-gray-500">
              Enter a package name above to view detailed analytics and statistics
            </p>
          </div>
        )}
      </div>
    </div>
  );
}