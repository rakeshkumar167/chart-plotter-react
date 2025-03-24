import React from 'react';
import { ChartType, ChartOptions } from '../types';
import { BarChart, LineChart, PieChart, Donut as Doughnut, ScatterChart, Radar } from 'lucide-react';

interface ChartControlsProps {
  options: ChartOptions;
  onOptionsChange: (options: ChartOptions) => void;
}

export const ChartControls: React.FC<ChartControlsProps> = ({ options, onOptionsChange }) => {
  const chartTypes: { type: ChartType; icon: React.ReactNode; label: string }[] = [
    { type: 'bar', icon: <BarChart className="w-6 h-6" />, label: 'Bar' },
    { type: 'line', icon: <LineChart className="w-6 h-6" />, label: 'Line' },
    { type: 'pie', icon: <PieChart className="w-6 h-6" />, label: 'Pie' },
    { type: 'doughnut', icon: <Doughnut className="w-6 h-6" />, label: 'Doughnut' },
    { type: 'scatter', icon: <ScatterChart className="w-6 h-6" />, label: 'Scatter' },
    { type: 'radar', icon: <Radar className="w-6 h-6" />, label: 'Radar' },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2">
        {chartTypes.map(({ type, icon, label }) => (
          <button
            key={type}
            onClick={() => onOptionsChange({ ...options, type })}
            className={`flex items-center justify-center p-3 rounded-lg ${
              options.type === type
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {icon}
            <span className="ml-2">{label}</span>
          </button>
        ))}
      </div>

      <div className="space-y-2">
        <input
          type="text"
          value={options.title}
          onChange={(e) => onOptionsChange({ ...options, title: e.target.value })}
          placeholder="Chart Title"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          value={options.xAxisLabel}
          onChange={(e) => onOptionsChange({ ...options, xAxisLabel: e.target.value })}
          placeholder="X-Axis Label"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          value={options.yAxisLabel}
          onChange={(e) => onOptionsChange({ ...options, yAxisLabel: e.target.value })}
          placeholder="Y-Axis Label"
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="flex space-x-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={options.showLegend}
            onChange={(e) => onOptionsChange({ ...options, showLegend: e.target.checked })}
            className="mr-2"
          />
          Show Legend
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={options.showGrid}
            onChange={(e) => onOptionsChange({ ...options, showGrid: e.target.checked })}
            className="mr-2"
          />
          Show Grid
        </label>
      </div>
    </div>
  );
};