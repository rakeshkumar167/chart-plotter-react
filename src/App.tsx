import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { ChartComponent } from './components/ChartComponent';
import { DataInput } from './components/DataInput';
import { ChartControls } from './components/ChartControls';
import { ChartOptions, ChartData } from './types';

const defaultCSV = `Month,Sales 2023,Sales 2024
January,65,70
February,59,63
March,80,85
April,81,88
May,56,60`;

const defaultOptions: ChartOptions = {
  type: 'bar',
  title: 'Sales Comparison',
  xAxisLabel: 'Month',
  yAxisLabel: 'Value',
  showLegend: true,
  showGrid: true,
};

function parseCSVToChartData(csvString: string): ChartData {
  const { data } = Papa.parse(csvString.trim(), { header: true });
  
  if (data.length === 0) return { labels: [], datasets: [] };

  const headers = Object.keys(data[0]);
  const labelColumn = headers[0];
  const dataColumns = headers.slice(1);

  const labels = data.map(row => row[labelColumn]);
  
  const datasets = dataColumns.map((column, index) => ({
    label: column,
    data: data.map(row => parseFloat(row[column]) || 0),
    backgroundColor: `hsla(${index * (360 / dataColumns.length)}, 70%, 60%, 0.5)`,
    borderColor: `hsla(${index * (360 / dataColumns.length)}, 70%, 60%, 1)`,
    borderWidth: 1,
  }));

  return { labels, datasets };
}

function App() {
  const [csvData, setCsvData] = useState<string>(defaultCSV);
  const [chartData, setChartData] = useState<ChartData>(parseCSVToChartData(defaultCSV));
  const [options, setOptions] = useState<ChartOptions>(defaultOptions);

  const handleDataChange = (value: string) => {
    setCsvData(value);
    try {
      const newChartData = parseCSVToChartData(value);
      setChartData(newChartData);
    } catch (error) {
      console.error('Error parsing CSV data:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Chart Creator</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Chart Options</h2>
            <ChartControls options={options} onOptionsChange={setOptions} />
            
            <h2 className="text-xl font-semibold mt-8 mb-4">Data Input (CSV)</h2>
            <DataInput value={csvData} onChange={handleDataChange} />
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Preview</h2>
            <ChartComponent data={chartData} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;