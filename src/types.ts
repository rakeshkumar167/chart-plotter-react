export type ChartType = 
  | 'bar' 
  | 'line' 
  | 'pie' 
  | 'doughnut' 
  | 'scatter' 
  | 'bubble' 
  | 'radar' 
  | 'polarArea' 
  | 'heatmap';

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    borderWidth?: number;
  }[];
}

export interface ChartOptions {
  type: ChartType;
  title: string;
  xAxisLabel: string;
  yAxisLabel: string;
  showLegend: boolean;
  showGrid: boolean;
}