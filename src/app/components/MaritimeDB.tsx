import { useState } from 'react';
import { Play, Trash2, Database, Waves } from 'lucide-react';

interface MaritimeDBProps {
  currentCase?: any;
  onQueryExecuted?: (results: any) => void;
}

// Database for Case 011: The Midnight Brine
const MARITIME_DATABASE = {
  water_quality_sensors: [
    { log_id: 1044, timestamp: '2026-04-07 01:00:00', sensor_id: 'M-03', location: 'Sector 3', salinity_ppt: 41.2, ph_level: 8.1 },
    { log_id: 1045, timestamp: '2026-04-07 01:00:00', sensor_id: 'M-04', location: 'Sector 4', salinity_ppt: 42.0, ph_level: 8.0 },
    { log_id: 1046, timestamp: '2026-04-07 01:30:00', sensor_id: 'M-04', location: 'Sector 4', salinity_ppt: 42.1, ph_level: 8.0 },
    { log_id: 1047, timestamp: '2026-04-07 02:00:00', sensor_id: 'M-04', location: 'Sector 4', salinity_ppt: 88.5, ph_level: 6.2 },
    { log_id: 1048, timestamp: '2026-04-07 02:30:00', sensor_id: 'M-04', location: 'Sector 4', salinity_ppt: 75.0, ph_level: 6.8 },
    { log_id: 1049, timestamp: '2026-04-07 03:00:00', sensor_id: 'M-04', location: 'Sector 4', salinity_ppt: 55.2, ph_level: 7.5 },
  ],
  maritime_ais_logs: [
    { log_id: 508, timestamp: '2026-04-07 01:15:00', vessel_id: 'V-112', sector: 'Sector 3', status: 'Moving', speed_knots: 12.0 },
    { log_id: 509, timestamp: '2026-04-07 01:20:00', vessel_id: 'V-889', sector: 'Sector 3', status: 'Moving', speed_knots: 8.5 },
    { log_id: 510, timestamp: '2026-04-07 01:35:00', vessel_id: 'V-889', sector: 'Sector 4', status: 'Anchored', speed_knots: 0.0 },
    { log_id: 511, timestamp: '2026-04-07 01:45:00', vessel_id: 'V-889', sector: 'UNKNOWN', status: 'OFFLINE', speed_knots: null },
    { log_id: 512, timestamp: '2026-04-07 02:05:00', vessel_id: 'V-112', sector: 'Sector 5', status: 'Moving', speed_knots: 14.0 },
    { log_id: 513, timestamp: '2026-04-07 02:45:00', vessel_id: 'V-889', sector: 'Sector 4', status: 'Moving', speed_knots: 9.0 },
  ],
  vessel_registry: [
    { vessel_id: 'V-112', vessel_name: 'Desert Rose', vessel_type: 'Luxury Yacht', company_id: 'C-09' },
    { vessel_id: 'V-889', vessel_name: 'Liquidator VII', vessel_type: 'Liquid Waste Barge', company_id: 'C-42' },
    { vessel_id: 'V-901', vessel_name: 'Gulf Sweeper', vessel_type: 'Dredger', company_id: 'C-18' },
  ],
  company_profiles: [
    { company_id: 'C-09', company_name: 'Al Bateen Leisure', industry: 'Tourism', monthly_production_tons: null },
    { company_id: 'C-18', company_name: 'Oryx Marine Construction', industry: 'Land Reclamation', monthly_production_tons: null },
    { company_id: 'C-42', company_name: 'Oasis Pure Desalination', industry: 'Water Utilities', monthly_production_tons: 50000 },
    { company_id: 'C-77', company_name: 'Najm Petrochemicals', industry: 'Manufacturing', monthly_production_tons: 12000 },
  ],
  official_disposal_manifests: [
    { manifest_id: 8812, month: 'March', company_id: 'C-77', waste_type: 'Chemical', tons_disposed: 11500 },
    { manifest_id: 8813, month: 'March', company_id: 'C-42', waste_type: 'Brine', tons_disposed: 48000 },
    { manifest_id: 8814, month: 'April', company_id: 'C-77', waste_type: 'Chemical', tons_disposed: 12100 },
    { manifest_id: 8815, month: 'April', company_id: 'C-42', waste_type: 'Brine', tons_disposed: 8000 },
  ],
};

export function MaritimeDB({ currentCase, onQueryExecuted }: MaritimeDBProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState('');
  const [history, setHistory] = useState<string[]>([]);

  const executeQuery = () => {
    if (!query.trim()) return;

    setError('');
    const normalizedQuery = query.trim().toLowerCase();

    try {
      setHistory([...history, query]);

      if (normalizedQuery.startsWith('select')) {
        handleSelectQuery(normalizedQuery);
      } else if (normalizedQuery.startsWith('show tables')) {
        setResults({
          type: 'tables',
          data: Object.keys(MARITIME_DATABASE)
        });
      } else if (normalizedQuery.startsWith('describe')) {
        handleDescribeQuery(normalizedQuery);
      } else {
        setError('❌ SQL Syntax Error: Only SELECT, SHOW TABLES, and DESCRIBE queries are supported.\n\nExamples:\n- SELECT * FROM water_quality_sensors\n- SELECT * FROM maritime_ais_logs WHERE vessel_id = \'V-889\'\n- SHOW TABLES\n- DESCRIBE vessel_registry');
      }
    } catch (err) {
      setError(`SQL Error: ${err}`);
    }
  };

  const handleSelectQuery = (query: string) => {
    const fromMatch = query.match(/from\s+(\w+)/);
    if (!fromMatch) {
      setError('Invalid SELECT query. Use: SELECT * FROM table_name');
      return;
    }

    const tableName = fromMatch[1];
    const table = MARITIME_DATABASE[tableName as keyof typeof MARITIME_DATABASE];

    if (!table) {
      setError(`Table '${tableName}' does not exist. Use SHOW TABLES to see available tables.`);
      return;
    }

    let filteredData = Array.isArray(table) ? [...table] : [];

    // Handle WHERE clause
    const whereMatch = query.match(/where\s+(.+?)(?:\s+order\s+by|\s+limit|$)/);
    if (whereMatch) {
      const whereClause = whereMatch[1];
      filteredData = filteredData.filter(row => evaluateWhere(row, whereClause));
    }

    // Handle ORDER BY
    const orderMatch = query.match(/order\s+by\s+(\w+)(?:\s+(asc|desc))?/);
    if (orderMatch) {
      const column = orderMatch[1];
      const direction = orderMatch[2] || 'asc';
      filteredData.sort((a: any, b: any) => {
        const valA = a[column];
        const valB = b[column];
        if (valA == null) return direction === 'asc' ? 1 : -1;
        if (valB == null) return direction === 'asc' ? -1 : 1;
        if (valA < valB) return direction === 'asc' ? -1 : 1;
        if (valA > valB) return direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    // Handle LIMIT
    const limitMatch = query.match(/limit\s+(\d+)/);
    if (limitMatch) {
      filteredData = filteredData.slice(0, parseInt(limitMatch[1]));
    }

    setResults({
      type: 'select',
      data: filteredData,
      columns: filteredData.length > 0 ? Object.keys(filteredData[0]) : []
    });

    if (onQueryExecuted) {
      onQueryExecuted({ data: filteredData, query });
    }
  };

  const evaluateWhere = (row: any, whereClause: string): boolean => {
    // Handle AND conditions
    if (whereClause.includes(' and ')) {
      const conditions = whereClause.split(' and ');
      return conditions.every(cond => evaluateSingleCondition(row, cond.trim()));
    }

    // Handle OR conditions
    if (whereClause.includes(' or ')) {
      const conditions = whereClause.split(' or ');
      return conditions.some(cond => evaluateSingleCondition(row, cond.trim()));
    }

    return evaluateSingleCondition(row, whereClause);
  };

  const evaluateSingleCondition = (row: any, condition: string): boolean => {
    // Handle different operators
    if (condition.includes('>=')) {
      const [col, val] = condition.split('>=').map(s => s.trim());
      return row[col] >= parseFloat(val);
    }
    if (condition.includes('<=')) {
      const [col, val] = condition.split('<=').map(s => s.trim());
      return row[col] <= parseFloat(val);
    }
    if (condition.includes('!=') || condition.includes('<>')) {
      const [col, val] = condition.split(/!=|<>/).map(s => s.trim());
      const cleanVal = val.replace(/['"]/g, '');
      return row[col] != cleanVal;
    }
    if (condition.includes('>')) {
      const [col, val] = condition.split('>').map(s => s.trim());
      return row[col] > parseFloat(val);
    }
    if (condition.includes('<')) {
      const [col, val] = condition.split('<').map(s => s.trim());
      return row[col] < parseFloat(val);
    }
    if (condition.includes('=')) {
      const [col, val] = condition.split('=').map(s => s.trim());
      const cleanVal = val.replace(/['"]/g, '');
      return String(row[col]).toLowerCase() === cleanVal.toLowerCase();
    }
    if (condition.includes(' like ')) {
      const [col, val] = condition.split(' like ').map(s => s.trim());
      const pattern = val.replace(/['"]/g, '').replace(/%/g, '.*');
      const regex = new RegExp(pattern, 'i');
      return regex.test(String(row[col]));
    }

    return false;
  };

  const handleDescribeQuery = (query: string) => {
    const tableMatch = query.match(/describe\s+(\w+)/);
    if (!tableMatch) {
      setError('Invalid DESCRIBE query. Use: DESCRIBE table_name');
      return;
    }

    const tableName = tableMatch[1];
    const table = MARITIME_DATABASE[tableName as keyof typeof MARITIME_DATABASE];

    if (!table || !Array.isArray(table) || table.length === 0) {
      setError(`Table '${tableName}' does not exist or is empty.`);
      return;
    }

    const columns = Object.keys(table[0]).map(col => ({
      Field: col,
      Type: typeof table[0][col as keyof typeof table[0]]
    }));

    setResults({
      type: 'describe',
      data: columns,
      columns: ['Field', 'Type']
    });
  };

  return (
    <div className="h-full flex flex-col bg-[#000000] text-[#00ff00] font-mono p-2">
      {/* Header */}
      <div className="border-2 border-[#00ff00] p-2 mb-2">
        <div className="flex items-center gap-2 mb-1">
          <Waves className="w-5 h-5 text-[#00ff00]" />
          <span className="font-bold">MARITIME & ENVIRONMENTAL DATABASE v2.1</span>
        </div>
        <div className="text-xs text-[#00aa00]">
          Eastern Mangrove National Park - IoT Sensor Network & AIS Tracking System
        </div>
      </div>

      {/* Query Input */}
      <div className="mb-2">
        <div className="text-xs mb-1 text-[#00aa00]">SQL Query:</div>
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && e.ctrlKey) {
              executeQuery();
            }
          }}
          className="w-full h-24 bg-[#000000] text-[#00ff00] border-2 border-[#00ff00] p-2 font-mono text-sm resize-none"
          placeholder="SELECT * FROM water_quality_sensors WHERE location = 'Sector 4'&#10;&#10;Available tables: water_quality_sensors, maritime_ais_logs, vessel_registry, company_profiles, official_disposal_manifests&#10;&#10;Tip: Use SHOW TABLES to see all tables, DESCRIBE table_name to see columns"
        />
      </div>

      {/* Controls */}
      <div className="flex gap-2 mb-2">
        <button
          onClick={executeQuery}
          className="flex items-center gap-1 px-3 py-1 bg-[#00ff00] text-[#000000] font-bold hover:bg-[#00aa00]"
        >
          <Play className="w-4 h-4" /> EXECUTE (Ctrl+Enter)
        </button>
        <button
          onClick={() => {
            setQuery('');
            setResults(null);
            setError('');
          }}
          className="flex items-center gap-1 px-3 py-1 border-2 border-[#00ff00] text-[#00ff00] hover:bg-[#00ff00] hover:text-[#000000]"
        >
          <Trash2 className="w-4 h-4" /> CLEAR
        </button>
        <button
          onClick={() => setQuery('SHOW TABLES')}
          className="flex items-center gap-1 px-3 py-1 border-2 border-[#00ff00] text-[#00ff00] hover:bg-[#00ff00] hover:text-[#000000]"
        >
          <Database className="w-4 h-4" /> SHOW TABLES
        </button>
      </div>

      {/* Results Area */}
      <div className="flex-1 overflow-auto border-2 border-[#00ff00] p-2 mb-2">
        {error && (
          <div className="text-[#ff0000] whitespace-pre-wrap text-xs">
            {error}
          </div>
        )}

        {results && results.type === 'tables' && (
          <div>
            <div className="text-xs mb-2 text-[#00aa00]">Available Tables:</div>
            {results.data.map((table: string, idx: number) => (
              <div key={idx} className="text-sm mb-1">
                &gt; {table}
              </div>
            ))}
          </div>
        )}

        {results && (results.type === 'select' || results.type === 'describe') && (
          <div className="overflow-x-auto">
            <div className="text-xs mb-2 text-[#00aa00]">
              {results.data.length} row{results.data.length !== 1 ? 's' : ''} returned
            </div>
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="border-b-2 border-[#00ff00]">
                  {results.columns.map((col: string, idx: number) => (
                    <th key={idx} className="px-2 py-1 text-left font-bold">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {results.data.map((row: any, rowIdx: number) => (
                  <tr key={rowIdx} className="border-b border-[#00aa00] hover:bg-[#001100]">
                    {results.columns.map((col: string, colIdx: number) => (
                      <td 
                        key={colIdx} 
                        className={`px-2 py-1 ${
                          // Highlight anomalies
                          (col === 'salinity_ppt' && row[col] > 80) ? 'text-[#ff0000] font-bold' :
                          (col === 'ph_level' && row[col] < 7.0) ? 'text-[#ff0000] font-bold' :
                          (col === 'status' && row[col] === 'OFFLINE') ? 'text-[#ff0000] font-bold' :
                          (col === 'tons_disposed' && row[col] < 10000) ? 'text-[#ffff00] font-bold' :
                          ''
                        }`}
                      >
                        {row[col] === null ? 'NULL' : String(row[col])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!results && !error && (
          <div className="text-[#00aa00] text-xs">
            <p className="mb-2">Ready to execute SQL queries...</p>
            <p className="mb-2">💡 Investigation Tips:</p>
            <p className="ml-4 mb-1">• Start with SHOW TABLES to see available data</p>
            <p className="ml-4 mb-1">• Check water_quality_sensors for pollution spikes</p>
            <p className="ml-4 mb-1">• Cross-reference maritime_ais_logs with vessel_registry</p>
            <p className="ml-4 mb-1">• Compare official_disposal_manifests with production data</p>
            <p className="ml-4 mb-1">• JOIN tables using company_id or vessel_id</p>
          </div>
        )}
      </div>

      {/* Query History */}
      {history.length > 0 && (
        <div className="border-t-2 border-[#00ff00] pt-2">
          <div className="text-xs text-[#00aa00] mb-1">Recent Queries:</div>
          <div className="text-xs space-y-1 max-h-20 overflow-auto">
            {history.slice(-3).map((q, idx) => (
              <div key={idx} className="truncate cursor-pointer hover:text-white" onClick={() => setQuery(q)}>
                &gt; {q}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
