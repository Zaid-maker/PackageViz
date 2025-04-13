import { useState } from "react";
import axios from "axios";
import { Line, Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement } from "chart.js/auto";
import {
  ArrowPathIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/solid";
import { useToast } from "../ToastContext";

ChartJS.register(ArcElement);

export default function Visualizer() {
  const [packageName, setPackageName] = useState("");
  const [packageData, setPackageData] = useState(null);
  const [statsData, setStatsData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("line");

  const { showToast } = useToast();

  const handleSearch = async () => {
    if (!packageName) return;

    setLoading(true);
    setError("");

    try {
      const [npmResponse, jsdelivrResponse] = await Promise.all([
        axios.get(`https://registry.npmjs.org/${packageName}`),
        axios.get(
          `https://data.jsdelivr.com/v1/package/npm/${packageName}/stats`
        ),
      ]);

      const npmData = npmResponse.data;
      const stats = jsdelivrResponse.data;

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
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          NPM Package Visualizer
        </h1>

        <div className="flex gap-4 mb-8">
          <input
            type="text"
            value={packageName}
            onChange={(e) => setPackageName(e.target.value)}
            placeholder="Enter npm package name"
            className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            disabled={loading}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 transition-colors"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>

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

              <div className="mt-6">
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

                <div className="w-full h-96">
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
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}