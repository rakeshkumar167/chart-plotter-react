import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
} from 'chart.js';
import { Bar, Line, Pie, Doughnut, Scatter, Bubble, Radar } from 'react-chartjs-2';
import { ChartData, ChartOptions } from '../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale
);

interface ChartComponentProps {
  data: ChartData;
  options: ChartOptions;
}

export const ChartComponent: React.FC<ChartComponentProps> = ({ data, options }) => {
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: options.showLegend,
        position: 'top' as const,
      },
      title: {
        display: true,
        text: options.title,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: options.xAxisLabel,
        },
        grid: {
          display: options.showGrid,
        },
      },
      y: {
        title: {
          display: true,
          text: options.yAxisLabel,
        },
        grid: {
          display: options.showGrid,
        },
      },
    },
  };

  const renderChart = () => {
    switch (options.type) {
      case 'bar':
        return <Bar data={data} options={chartOptions} />;
      case 'line':
        return <Line data={data} options={chartOptions} />;
      case 'pie':
        return <Pie data={data} options={chartOptions} />;
      case 'doughnut':
        return <Doughnut data={data} options={chartOptions} />;
      case 'scatter':
        return <Scatter data={data} options={chartOptions} />;
      case 'radar':
        return <Radar data={data} options={chartOptions} />;
      default:
        return <Bar data={data} options={chartOptions} />;
    }
  };

  return (
    <div className="w-full h-full min-h-[400px] p-4">
      {renderChart()}
    </div>
  );
};