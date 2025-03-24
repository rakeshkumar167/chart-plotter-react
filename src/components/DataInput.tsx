import React from 'react';
import { Editor } from '@monaco-editor/react';

interface DataInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const DataInput: React.FC<DataInputProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-4">
      <div className="w-full h-[300px] border rounded-lg overflow-hidden">
        <Editor
          height="100%"
          defaultLanguage="csv"
          value={value}
          onChange={(value) => onChange(value || '')}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            wordWrap: 'on',
          }}
        />
      </div>
      <div className="text-sm text-gray-600">
        <p className="font-semibold mb-1">CSV Format:</p>
        <p>First row: Column headers (first column for labels, others for datasets)</p>
        <p>Following rows: Data values</p>
        <p className="mt-2 font-mono bg-gray-100 p-2 rounded">
          Month,Sales 2023,Sales 2024<br/>
          January,65,70<br/>
          February,59,63<br/>
          March,80,85
        </p>
      </div>
    </div>
  );
};