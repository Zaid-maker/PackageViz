import { useState } from "react";
import axios from "axios";
import { Line, Bar, Pie, Radar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement } from "chart.js/auto";
import {
  ArrowPathIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  CubeTransparentIcon,
  ScaleIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";
import { useToast } from "../ToastContext";

ChartJS.register(ArcElement);

export default function Visualizer() {
  const [packageName, setPackageName] = useState("");
  const [packageData, setPackageData] = useState(null);
  const [statsData, setStatsData] = useState(null);
  const [bundleSize, setBundleSize] = useState(null);
  const [dependencies, setDependencies] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("line");
  const [compareMode, setCompareMode] = useState(false);
  const [comparePackage, setComparePackage] = useState("");
  const [compareData, setCompareData] = useState(null);

  const { showToast } = useToast();

  // Add autocomplete search
  const handleSearchInput = async (value) => {
    setPackageName(value);
    if (value.length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await axios.get(
        `https://registry.npmjs.org/-/v1/search?text=${value}&size=5`
      );
      setSuggestions(response.data.objects.map(obj => ({
        name: obj.package.name,
        description: obj.package.description
      })));
    } catch (err) {
      console.error("Error fetching suggestions:", err);
    }
  };

  const fetchBundleSize = async (pkg) => {
    try {
      // Handle @next scope packages differently
      const isNextPackage = pkg.startsWith('@next/') || pkg === 'next';
      if (isNextPackage) {
        // For Next.js packages, we'll try to get the latest stable version
        const npmResponse = await axios.get(`https://registry.npmjs.org/${pkg}`);
        const latestVersion = npmResponse.data['dist-tags']?.latest;
        const response = await axios.get(
          `https://bundlephobia.com/api/size?package=${pkg}@${latestVersion}`
        );
        return {
          size: response.data.size,
          gzip: response.data.gzip,
          dependencyCount: response.data.dependencyCount,
          version: latestVersion
        };
      }

      const response = await axios.get(
        `https://bundlephobia.com/api/size?package=${pkg}`
      );
      return {
        size: response.data.size,
        gzip: response.data.gzip,
        dependencyCount: response.data.dependencyCount
      };
    } catch (err) {
      console.error("Error fetching bundle size:", err);
      if (err.response?.status === 404) {
        // Package not found in bundlephobia
        return {
          error: "Bundle size information not available",
          isError: true
        };
      }
      return null;
    }
  };

  const handleSearch = async () => {
    if (!packageName) return;

    setLoading(true);
    setError("");

    try {
      const [npmResponse, jsdelivrResponse, bundleData] = await Promise.all([
        axios.get(`https://registry.npmjs.org/${packageName}`),
        axios.get(`https://data.jsdelivr.com/v1/package/npm/${packageName}/stats`),
        fetchBundleSize(packageName)
      ]);

      const npmData = npmResponse.data;
      const stats = jsdelivrResponse.data;

      // Get dependencies
      const deps = {
        dependencies: Object.keys(npmData.versions[npmData['dist-tags'].latest].dependencies || {}),
        devDependencies: Object.keys(npmData.versions[npmData['dist-tags'].latest].devDependencies || {}),
        peerDependencies: Object.keys(npmData.versions[npmData['dist-tags'].latest].peerDependencies || {})
      };

      setDependencies(deps);
      setBundleSize(bundleData);

      // Filter out pre-release versions and sort by semver
      const versionEntries = Object.entries(npmData.time)
        .filter(([key]) => !["created", "modified"].includes(key))
        .filter(([version]) => !version.includes("-"))
        .sort((a, b) => {
          const vA = a[0].split(".").map((n) => parseInt(n, 10));
          const vB = b[0].split(".").map((n) => parseInt(n, 10));
          for (let i = 0; i < 3; i++) {
            if (vA[i] !== vB[i]) return vB[i] - vA[i];
          }
          return 0;
        });

      // Get latest 5 stable versions
      const latestVersions = versionEntries.slice(0, 5).map(([v]) => v);

      // Filter stats to only include latest versions
      const filteredStats = latestVersions
        .filter((v) => stats.versions[v])
        .reduce((acc, version) => {
          acc[version] = stats.versions[version];
          return acc;
        }, {});

      setPackageData({
        name: npmData.name,
        description: npmData.description,
        version: npmData["dist-tags"]?.latest,
        author: npmData.author?.name || "Unknown",
        license: npmData.license || "Unknown",
        repository: npmData.repository?.url,
        downloads: stats.total,
      });

      setStatsData({
        labels: Object.keys(filteredStats),
        data: Object.values(filteredStats).map((v) => v.total),
        versions: filteredStats,
      });

      if (compareMode && comparePackage) {
        const compareNpmResponse = await axios.get(`https://registry.npmjs.org/${comparePackage}`);
        const compareJsdelivrResponse = await axios.get(
          `https://data.jsdelivr.com/v1/package/npm/${comparePackage}/stats`
        );
        setCompareData({
          name: compareNpmResponse.data.name,
          stats: compareJsdelivrResponse.data
        });
      }

    } catch (err) {
      setError(
        err.response?.status === 404
          ? "Package not found"
          : "Error fetching package data"
      );
      showToast(
        err.response?.status === 404
          ? "Package not found"
          : "Error fetching package data"
      );
    } finally {
      setLoading(false);
    }
  };

  const chartTabs = [
    { id: "line", label: "Line Chart" },
    { id: "bar", label: "Bar Chart" },
    { id: "pie", label: "Pie Chart" },
  ];

  const commonChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          title: (context) => `Version ${context[0].label}`,
          label: (context) => `${context.formattedValue} downloads`,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          maxRotation: 0,
          autoSkipPadding: 10,
        },
      },
    },
  };

  const getChartData = () => ({
    labels: statsData.labels,
    datasets: [
      {
        label: "Downloads by Version",
        data: statsData.data,
        backgroundColor:
          activeTab === "pie"
            ? ["#3b82f6", "#60a5fa", "#93c5fd", "#bfdbfe", "#dbeafe"]
            : "#3b82f6",
        borderColor: "#1e40af",
        borderWidth: 1,
      },
    ],
  });

  const getPieData = () => {
    const versions = Object.entries(statsData.versions);

    return {
      labels: versions.map(([version]) => version),
      datasets: [
        {
          data: versions.map(([, data]) => data.total),
          backgroundColor: [
            "#3b82f6",
            "#60a5fa",
            "#93c5fd",
            "#bfdbfe",
            "#dbeafe",
          ],
          borderColor: "#fff",
          borderWidth: 2,
        },
      ],
    };
  };

  return (
    <div className="bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          NPM Package Visualizer
        </h1>

        <div className="flex gap-4 mb-8">
          <div className="flex-1 relative">
            <input
              type="text"
              value={packageName}
              onChange={(e) => handleSearchInput(e.target.value)}
              placeholder="Enter npm package name"
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {suggestions.length > 0 && (
              <div className="absolute w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                {suggestions.map((pkg) => (
                  <div
                    key={pkg.name}
                    onClick={() => {
                      setPackageName(pkg.name);
                      setSuggestions([]);
                    }}
                    className="p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                  >
                    <div className="font-medium">{pkg.name}</div>
                    <div className="text-sm text-gray-600 truncate">
                      {pkg.description}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* Compare mode toggle */}
          <button
            onClick={() => setCompareMode(!compareMode)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              compareMode
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Compare
          </button>
          <button
            onClick={handleSearch}
            disabled={loading}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 transition-colors"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>

        {compareMode && (
          <div className="mb-8">
            <input
              type="text"
              value={comparePackage}
              onChange={(e) => setComparePackage(e.target.value)}
              placeholder="Enter package name to compare"
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {error && (
          <div className="p-4 mb-4 bg-red-100 text-red-700 rounded-lg flex items-center gap-2">
            <ExclamationTriangleIcon className="w-5 h-5" />
            {error}
          </div>
        )}

        {loading && (
          <div className="text-center py-8">
            <ArrowPathIcon className="w-12 h-12 mx-auto text-gray-400 animate-spin" />
          </div>
        )}

        {packageData && statsData && (
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-2xl font-bold mb-4">{packageData.name}</h2>
                  <p className="text-gray-600 mb-4">{packageData.description}</p>
                  <div className="space-y-2">
                    <p>
                      <span className="font-semibold">Author:</span>{" "}
                      {packageData.author}
                    </p>
                    <p>
                      <span className="font-semibold">Version:</span>{" "}
                      {packageData.version}
                    </p>
                    <p>
                      <span className="font-semibold">License:</span>{" "}
                      {packageData.license}
                    </p>
                    <p>
                      <span className="font-semibold">Total Downloads:</span>{" "}
                      {packageData.downloads.toLocaleString()}
                    </p>
                  </div>
                </div>

                {bundleSize && !bundleSize.isError && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">Bundle Analysis</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                        <ScaleIcon className="w-6 h-6 mx-auto text-blue-500 mb-2" />
                        <div className="text-sm text-gray-500">Minified</div>
                        <div className="font-semibold">
                          {(bundleSize.size / 1024).toFixed(1)} KB
                        </div>
                      </div>
                      <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                        <CubeTransparentIcon className="w-6 h-6 mx-auto text-blue-500 mb-2" />
                        <div className="text-sm text-gray-500">Gzipped</div>
                        <div className="font-semibold">
                          {(bundleSize.gzip / 1024).toFixed(1)} KB
                        </div>
                      </div>
                    </div>
                    {bundleSize.version && (
                      <div className="mt-2 text-sm text-gray-500 text-center">
                        Size for version {bundleSize.version}
                      </div>
                    )}
                  </div>
                )}
                {bundleSize?.isError && (
                  <div className="bg-yellow-50 p-4 rounded-lg text-yellow-700 text-sm flex items-center gap-2">
                    <ExclamationTriangleIcon className="w-5 h-5" />
                    {bundleSize.error}
                  </div>
                )}
              </div>

              {dependencies && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4">Dependencies</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg text-center">
                      <h4 className="font-medium mb-2">Dependencies</h4>
                      <div className="text-3xl font-semibold text-blue-600">
                        {dependencies.dependencies.length}
                      </div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg text-center">
                      <h4 className="font-medium mb-2">Dev Dependencies</h4>
                      <div className="text-3xl font-semibold text-blue-600">
                        {dependencies.devDependencies.length}
                      </div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg text-center">
                      <h4 className="font-medium mb-2">Peer Dependencies</h4>
                      <div className="text-3xl font-semibold text-blue-600">
                        {dependencies.peerDependencies.length}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-8">
                <div className="flex gap-2 mb-4">
                  {chartTabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-4 py-2 rounded-md transition-colors text-sm font-medium ${
                        activeTab === tab.id
                          ? "bg-blue-500 text-white ring-2 ring-blue-200 shadow-sm"
                          : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="h-96">
                    {activeTab === "line" && (
                      <Line
                        data={getChartData()}
                        options={{
                          ...commonChartOptions,
                          elements: {
                            line: {
                              tension: 0.2,
                            },
                          },
                        }}
                      />
                    )}

                    {activeTab === "bar" && (
                      <Bar
                        data={getChartData()}
                        options={{
                          ...commonChartOptions,
                          scales: {
                            ...commonChartOptions.scales,
                            y: { beginAtZero: true },
                          },
                        }}
                      />
                    )}

                    {activeTab === "pie" && (
                      <Pie
                        data={getPieData()}
                        options={{
                          ...commonChartOptions,
                          plugins: {
                            ...commonChartOptions.plugins,
                            legend: {
                              position: "right",
                              labels: {
                                boxWidth: 20,
                                font: {
                                  size: 12,
                                },
                              },
                            },
                          },
                        }}
                      />
                    )}
                  </div>
                  {compareMode && compareData && (
                    <div className="h-96">
                      {/* Comparison package chart */}
                      {/* Similar chart rendering for comparison */}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}