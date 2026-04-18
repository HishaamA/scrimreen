import { useState } from 'react';
import { Truck } from 'lucide-react';

interface FleetLog {
  vehicle_id: string;
  company_id: string;
  date: string;
  time: string;
}

const FLEET_LOGS: FleetLog[] = [
  { vehicle_id: 'TK-4401', company_id: 'C-101', date: '2026-03-29', time: '2330' },
  { vehicle_id: 'TK-4401', company_id: 'C-101', date: '2026-03-30', time: '0244' },
  { vehicle_id: 'TK-6677', company_id: 'C-101', date: '2026-03-30', time: '0900' },
  { vehicle_id: 'TK-2209', company_id: 'C-103', date: '2026-03-30', time: '0120' },
  { vehicle_id: 'TK-2209', company_id: 'C-103', date: '2026-03-30', time: '0315' },
  { vehicle_id: 'TK-8834', company_id: 'C-103', date: '2026-03-29', time: '2200' },
  { vehicle_id: 'TK-7712', company_id: 'C-105', date: '2026-03-30', time: '0230' },
  { vehicle_id: 'TK-7712', company_id: 'C-105', date: '2026-03-30', time: '0410' },
  { vehicle_id: 'TK-3308', company_id: 'C-102', date: '2026-03-30', time: '0800' },
  { vehicle_id: 'TK-5519', company_id: 'C-104', date: '2026-03-30', time: '0645' },
];

export function FleetLogsDB() {
  const [sortColumn, setSortColumn] = useState<keyof FleetLog>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const sortedData = [...FLEET_LOGS].sort((a, b) => {
    const aVal = a[sortColumn];
    const bVal = b[sortColumn];
    if (sortOrder === 'asc') {
      return aVal > bVal ? 1 : -1;
    } else {
      return aVal < bVal ? 1 : -1;
    }
  });

  const handleSort = (column: keyof FleetLog) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#c0c0c0]">
      {/* Header */}
      <div className="window-95-panel p-3 bg-[#004080] text-white border-b-2 border-[#808080]">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <Truck className="w-5 h-5" />
          Fleet GPS Tracking Logs
        </h2>
        <p className="text-xs mt-1 opacity-90">
          UAE Transportation Authority - Commercial Vehicle Tracking System
        </p>
      </div>

      {/* Hint Bar */}
      <div className="window-95-panel p-2 border-b-2 border-[#808080] flex items-center gap-2 bg-[#ffffcc]">
        <span className="text-xs font-bold">💡 Tip:</span>
        <span className="text-xs">Use the SQL Terminal to query this database. Try: <code className="bg-white px-1 border">SELECT * FROM fleet_logs</code></span>
        <span className="text-xs text-gray-600 ml-auto font-bold">{FLEET_LOGS.length} records</span>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto p-2">
        <table className="w-full border-2 border-[#808080] bg-white text-xs">
          <thead className="bg-[#c0c0c0] sticky top-0">
            <tr>
              <th 
                className="border-2 border-[#808080] px-2 py-2 font-bold cursor-pointer hover:bg-[#dfdfdf]"
                onClick={() => handleSort('vehicle_id')}
              >
                vehicle_id {sortColumn === 'vehicle_id' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th 
                className="border-2 border-[#808080] px-2 py-2 font-bold cursor-pointer hover:bg-[#dfdfdf]"
                onClick={() => handleSort('company_id')}
              >
                company_id {sortColumn === 'company_id' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th 
                className="border-2 border-[#808080] px-2 py-2 font-bold cursor-pointer hover:bg-[#dfdfdf]"
                onClick={() => handleSort('date')}
              >
                date {sortColumn === 'date' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th 
                className="border-2 border-[#808080] px-2 py-2 font-bold cursor-pointer hover:bg-[#dfdfdf]"
                onClick={() => handleSort('time')}
              >
                time {sortColumn === 'time' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((record, index) => (
              <tr 
                key={`${record.vehicle_id}-${record.date}-${record.time}`}
                className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-yellow-100`}
              >
                <td className="border border-[#808080] px-2 py-1 font-mono font-bold">
                  {record.vehicle_id}
                </td>
                <td className="border border-[#808080] px-2 py-1 font-mono text-center">
                  {record.company_id}
                </td>
                <td className="border border-[#808080] px-2 py-1 font-mono text-center">
                  {record.date}
                </td>
                <td className="border border-[#808080] px-2 py-1 font-mono text-center">
                  {record.time}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="window-95-panel px-3 py-1 border-t-2 border-[#808080] text-xs text-gray-600 flex justify-between">
        <span>© 2026 UAE Transportation Authority</span>
        <span>Last Updated: March 30, 2026</span>
      </div>
    </div>
  );
}
