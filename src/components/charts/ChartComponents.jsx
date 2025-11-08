import { Line, Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement } from 'chart.js/auto';

ChartJS.register(ArcElement);

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
        maxRotation: 45,
        minRotation: 45,
        autoSkipPadding: 10,
      },
    },
  },
};

export function LineChart({ labels, data }) {
  const chartData = {
    labels,
    datasets: [
      {
        label: 'Downloads by Version',
        data,
        backgroundColor: '#3b82f6',
        borderColor: '#1e40af',
        borderWidth: 2,
        tension: 0.2,
        fill: false,
      },
    ],
  };

  return (
    <Line
      data={chartData}
      options={{
        ...commonChartOptions,
        elements: {
          line: { tension: 0.2 },
          point: { radius: 4, hoverRadius: 6 },
        },
      }}
    />
  );
}

export function BarChart({ labels, data }) {
  const chartData = {
    labels,
    datasets: [
      {
        label: 'Downloads by Version',
        data,
        backgroundColor: '#3b82f6',
        borderColor: '#1e40af',
        borderWidth: 1,
      },
    ],
  };

  return (
    <Bar
      data={chartData}
      options={{
        ...commonChartOptions,
        scales: {
          ...commonChartOptions.scales,
          y: { beginAtZero: true },
        },
      }}
    />
  );
}

export function PieChart({ labels, data }) {
  const chartData = {
    labels,
    datasets: [
      {
        data,
        backgroundColor: [
          '#3b82f6',
          '#60a5fa',
          '#93c5fd',
          '#bfdbfe',
          '#dbeafe',
          '#eff6ff',
          '#1e40af',
          '#2563eb',
          '#1d4ed8',
          '#1e3a8a',
        ],
        borderColor: '#fff',
        borderWidth: 2,
      },
    ],
  };

  return (
    <Pie
      data={chartData}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'right',
            labels: {
              boxWidth: 20,
              font: { size: 12 },
              padding: 10,
            },
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.label || '';
                const value = context.formattedValue || '0';
                return `${label}: ${value} downloads`;
              },
            },
          },
        },
      }}
    />
  );
}
