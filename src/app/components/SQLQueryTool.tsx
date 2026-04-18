import { useState, useRef, useEffect } from 'react';
import { Play, Database, Trash2, RotateCcw } from 'lucide-react';
import { Case } from '../types/game';

interface SQLQueryToolProps {
  currentCase: Case;
  onQueryExecuted: (result: any) => void;
}

export function SQLQueryTool({ currentCase, onQueryExecuted }: SQLQueryToolProps) {
  const [query, setQuery] = useState('-- SQL Query Tool for UAEPD Database\n-- Available tables: suspects, evidence, locations, vehicle_registry\n-- Example: SELECT * FROM suspects WHERE age > 40\n\nSELECT * FROM suspects;');
  const [output, setOutput] = useState<string[]>([
    '📊 UAEPD SQL Database Query Tool',
    'Connected to: CATCHtech Crime Database',
    'Tables: suspects, evidence, locations, vehicle_registry',
    '-'.repeat(70),
    ''
  ]);
  const [history, setHistory] = useState<string[]>([]);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  const filterData = (data: any[], whereClause: string): any[] => {
    return data.filter(item => {
      // Simple WHERE clause parsing
      const conditions = whereClause.split(/\s+AND\s+/i);
      
      return conditions.every(condition => {
        // Handle LIKE
        const likeMatch = condition.match(/(\w+)\s+LIKE\s+['"]%?(.+?)%?['"]/i);
        if (likeMatch) {
          const [, field, value] = likeMatch;
          return String(item[field] || '').toLowerCase().includes(value.toLowerCase());
        }

        // Handle IS NULL / IS NOT NULL
        if (condition.match(/(\w+)\s+IS\s+NOT\s+NULL/i)) {
          const field = condition.match(/(\w+)\s+IS\s+NOT\s+NULL/i)?.[1];
          return field && item[field] != null && item[field] !== '';
        }
        if (condition.match(/(\w+)\s+IS\s+NULL/i)) {
          const field = condition.match(/(\w+)\s+IS\s+NULL/i)?.[1];
          return field && (item[field] == null || item[field] === '');
        }

        // Handle BETWEEN
        const betweenMatch = condition.match(/(\w+)\s+BETWEEN\s+(\d+)\s+AND\s+(\d+)/i);
        if (betweenMatch) {
          const [, field, min, max] = betweenMatch;
          return item[field] >= parseInt(min) && item[field] <= parseInt(max);
        }

        // Handle comparison operators
        const compMatch = condition.match(/(\w+)\s*([><=!]+)\s*(.+)/);
        if (compMatch) {
          const [, field, op, value] = compMatch;
          const itemValue = item[field];
          let compareValue: any = value.trim().replace(/['"]/g, '');
          
          // Try to parse as number
          if (!isNaN(Number(compareValue))) {
            compareValue = Number(compareValue);
          }

          switch (op) {
            case '>': return itemValue > compareValue;
            case '<': return itemValue < compareValue;
            case '>=': return itemValue >= compareValue;
            case '<=': return itemValue <= compareValue;
            case '=': return itemValue == compareValue;
            case '!=': return itemValue != compareValue;
            default: return true;
          }
        }

        return true;
      });
    });
  };

  const executeQuery = () => {
    const timestamp = new Date().toLocaleTimeString();
    const newOutput = [`>>> [${timestamp}] Executing SQL query...`, ''];

    try {
      // Parse SELECT query
      const sqlMatch = query.match(/SELECT\s+(.+?)\s+FROM\s+([\w_]+)(?:\s+WHERE\s+(.+?))?(?:\s+ORDER\s+BY\s+(.+?))?(?:\s+LIMIT\s+(\d+))?(?:;|$)/is);
      
      if (sqlMatch) {
        const [, columns, table, whereClause, orderBy, limit] = sqlMatch;
        const tableName = table.trim().toLowerCase();
        
        let data: any[] = [];
        
        // Get data from appropriate table
        if (tableName === 'suspects') {
          data = JSON.parse(JSON.stringify(currentCase.suspects));
        } else if (tableName === 'evidence') {
          data = JSON.parse(JSON.stringify(currentCase.evidence));
        } else if (tableName === 'locations') {
          data = JSON.parse(JSON.stringify(currentCase.locations));
        } else if (tableName === 'vehicle_registry') {
          // Import vehicle registry data
          data = [
            { vehicle_plate_id: 'B58912', name_of_owner: 'Ahmed Khalfan', registration_year: 2021, colour_of_car: 'White', time_passed_under_toll: '2026-03-29 18:34:00' },
            { vehicle_plate_id: 'A12345', name_of_owner: 'Fatima Al-Mazrui', registration_year: 2022, colour_of_car: 'Black', time_passed_under_toll: '2026-03-29 18:12:00' },
            { vehicle_plate_id: 'C98765', name_of_owner: 'Mohammed Hassan', registration_year: 2020, colour_of_car: 'Silver', time_passed_under_toll: '2026-03-29 18:45:00' },
          ];
        } else {
          newOutput.push(`❌ Error: Table '${tableName}' not found`);
          newOutput.push('');
          newOutput.push('Available tables:');
          newOutput.push('  • suspects - Suspect information');
          newOutput.push('  • evidence - Case evidence');
          newOutput.push('  • locations - Location data');
          newOutput.push('  • vehicle_registry - Dubai vehicle records');
          setOutput([...output, ...newOutput]);
          return;
        }

        // Apply WHERE clause
        if (whereClause) {
          const beforeFilter = data.length;
          data = filterData(data, whereClause);
          newOutput.push(`Filter applied: ${beforeFilter} rows → ${data.length} rows`);
        }

        // Apply ORDER BY
        if (orderBy) {
          const [orderField, orderDir] = orderBy.trim().split(/\s+/);
          data.sort((a, b) => {
            const aVal = a[orderField];
            const bVal = b[orderField];
            const comparison = aVal > bVal ? 1 : -1;
            return orderDir?.toUpperCase() === 'DESC' ? -comparison : comparison;
          });
          newOutput.push(`Sorted by: ${orderField} ${orderDir || 'ASC'}`);
        }

        // Apply LIMIT
        if (limit) {
          data = data.slice(0, parseInt(limit));
          newOutput.push(`Limited to: ${limit} rows`);
        }

        // Apply column selection
        if (columns.trim() !== '*') {
          const selectedCols = columns.split(',').map(c => c.trim());
          data = data.map(item => {
            const filtered: any = {};
            selectedCols.forEach(col => {
              if (col in item) filtered[col] = item[col];
            });
            return filtered;
          });
        }

        // Send results to DataTable
        onQueryExecuted({ table: tableName, data });

        // Format output
        newOutput.push('');
        newOutput.push(`✅ Query executed successfully!`);
        newOutput.push(`📊 Returned ${data.length} row(s) from '${tableName}' table`);
        newOutput.push('');
        
        if (data.length > 0) {
          newOutput.push('Preview (first 3 rows):');
          newOutput.push('='.repeat(70));
          data.slice(0, 3).forEach((item, idx) => {
            newOutput.push(`Row ${idx + 1}:`);
            Object.entries(item).forEach(([key, value]) => {
              newOutput.push(`  ${key}: ${JSON.stringify(value)}`);
            });
            newOutput.push('');
          });
          if (data.length > 3) {
            newOutput.push(`... and ${data.length - 3} more row(s)`);
          }
          newOutput.push('');
          newOutput.push('💡 Check the "Query Results" window to see the full table');
        } else {
          newOutput.push('⚠️  No results found for your query.');
          newOutput.push('');
          newOutput.push('Try adjusting your WHERE clause or check table data.');
        }

      } else if (query.trim().toUpperCase().startsWith('SHOW TABLES')) {
        newOutput.push('Available tables in CATCHtech Database:');
        newOutput.push('');
        newOutput.push('1. suspects - Suspect information and profiles');
        newOutput.push('2. evidence - Physical and digital evidence');
        newOutput.push('3. locations - Crime scene and location data');
        newOutput.push('4. vehicle_registry - Dubai vehicle registration records');
        newOutput.push('');
        newOutput.push('Use: DESCRIBE <table_name> to see column details');

      } else if (query.trim().toUpperCase().startsWith('DESCRIBE')) {
        const tableMatch = query.match(/DESCRIBE\s+(\w+)/i);
        if (tableMatch) {
          const table = tableMatch[1].toLowerCase();
          newOutput.push(`Table structure: ${table}`);
          newOutput.push('');
          
          if (table === 'suspects' && currentCase.suspects[0]) {
            Object.keys(currentCase.suspects[0]).forEach(col => {
              newOutput.push(`  • ${col}`);
            });
          } else if (table === 'evidence' && currentCase.evidence[0]) {
            Object.keys(currentCase.evidence[0]).forEach(col => {
              newOutput.push(`  • ${col}`);
            });
          } else if (table === 'vehicle_registry') {
            newOutput.push('  • vehicle_plate_id');
            newOutput.push('  • name_of_owner');
            newOutput.push('  • registration_year');
            newOutput.push('  • colour_of_car');
            newOutput.push('  • time_passed_under_toll');
          }
        }

      } else {
        newOutput.push('⚠️  Invalid SQL syntax');
        newOutput.push('');
        newOutput.push('Supported commands:');
        newOutput.push('  • SELECT columns FROM table [WHERE condition]');
        newOutput.push('  • SHOW TABLES');
        newOutput.push('  • DESCRIBE table_name');
      }

    } catch (error) {
      newOutput.push(`❌ Error: ${error}`);
      newOutput.push('');
      newOutput.push('Check your SQL syntax and try again.');
    }

    newOutput.push('');
    newOutput.push('-'.repeat(70));
    newOutput.push('');

    setOutput([...output, ...newOutput]);
    setHistory([...history, query]);
  };

  const clearOutput = () => {
    setOutput([
      '📊 UAEPD SQL Database Query Tool',
      'Connected to: CATCHtech Crime Database',
      'Tables: suspects, evidence, locations, vehicle_registry',
      '-'.repeat(70),
      ''
    ]);
  };

  const clearQuery = () => {
    setQuery('-- SQL Query Tool\n\n');
  };

  const loadExample = () => {
    setQuery(`-- Example SQL Queries for Investigation

-- View all suspects
SELECT * FROM suspects;

-- Find suspects with a motive
SELECT name, age, motive FROM suspects 
WHERE motive IS NOT NULL;

-- Search for specific evidence
SELECT * FROM evidence 
WHERE type LIKE '%Plastic%';

-- Filter by age range
SELECT * FROM suspects 
WHERE age BETWEEN 30 AND 50;

-- Check vehicle registry
SELECT * FROM vehicle_registry
WHERE colour_of_car = 'White'
ORDER BY time_passed_under_toll DESC;
`);
  };

  return (
    <div className="flex flex-col h-full bg-[#c0c0c0]">
      {/* Toolbar */}
      <div className="window-95-panel p-2 flex items-center justify-between border-b-2 border-[#808080]">
        <div className="flex items-center gap-2">
          <Database className="w-4 h-4 text-blue-600" />
          <span className="text-xs font-bold">SQL Query Tool</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={loadExample}
            className="window-95-button px-2 py-1 text-xs flex items-center gap-1"
          >
            📚 Examples
          </button>
          <button
            onClick={clearQuery}
            className="window-95-button px-2 py-1 text-xs flex items-center gap-1"
          >
            <Trash2 className="w-3 h-3" />
            Clear
          </button>
          <button
            onClick={executeQuery}
            className="window-95-button px-3 py-1 text-xs flex items-center gap-1 bg-blue-100 font-bold"
          >
            <Play className="w-3 h-3" />
            Execute Query
          </button>
        </div>
      </div>

      {/* Split View */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Query Editor */}
        <div className="flex-1 flex flex-col border-b-2 border-[#808080]">
          <div className="bg-[#000080] text-white px-2 py-1 text-xs font-bold">
            SQL Query Editor
          </div>
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 p-3 font-mono text-sm bg-[#001a33] text-cyan-300 focus:outline-none resize-none"
            spellCheck={false}
            style={{ 
              lineHeight: '1.5',
              tabSize: 4,
            }}
          />
        </div>

        {/* Output Console */}
        <div className="flex-1 flex flex-col">
          <div className="bg-[#000080] text-white px-2 py-1 text-xs font-bold flex justify-between items-center">
            <span>Query Results Console</span>
            <button
              onClick={clearOutput}
              className="text-white hover:text-yellow-400 flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              Clear
            </button>
          </div>
          <div
            ref={outputRef}
            className="flex-1 p-3 font-mono text-xs bg-black text-cyan-400 overflow-auto"
            style={{ lineHeight: '1.6' }}
          >
            {output.map((line, idx) => (
              <div key={idx} className="whitespace-pre-wrap">
                {line}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="window-95-panel px-3 py-1 border-t-2 border-[#808080] text-xs text-gray-600 flex justify-between">
        <span>MySQL 8.0 | CATCHtech Database</span>
        <span>Connected</span>
      </div>
    </div>
  );
}
