import { useMemo } from 'react';
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
  { vehicle_id: 'TK-6677', company_id: 'C-101', date: '2026-03-29', time: '1600' },
  { vehicle_id: 'TK-2209', company_id: 'C-103', date: '2026-03-30', time: '0120' },
  { vehicle_id: 'TK-2209', company_id: 'C-103', date: '2026-03-30', time: '0315' },
  { vehicle_id: 'TK-8834', company_id: 'C-103', date: '2026-03-29', time: '2200' },
  { vehicle_id: 'TK-8834', company_id: 'C-103', date: '2026-03-31', time: '0700' },
  { vehicle_id: 'TK-7712', company_id: 'C-105', date: '2026-03-30', time: '0230' },
  { vehicle_id: 'TK-7712', company_id: 'C-105', date: '2026-03-30', time: '0410' },
  { vehicle_id: 'TK-3308', company_id: 'C-102', date: '2026-03-30', time: '0800' },
  { vehicle_id: 'TK-5519', company_id: 'C-104', date: '2026-03-30', time: '0645' },
  { vehicle_id: 'TK-5519', company_id: 'C-104', date: '2026-03-31', time: '0615' },
  { vehicle_id: 'TK-1155', company_id: 'C-106', date: '2026-03-30', time: '0130' },
  { vehicle_id: 'TK-1155', company_id: 'C-106', date: '2026-03-30', time: '0445' },
  { vehicle_id: 'TK-9923', company_id: 'C-107', date: '2026-03-29', time: '2115' },
  { vehicle_id: 'TK-9923', company_id: 'C-107', date: '2026-03-30', time: '0730' },
  { vehicle_id: 'TK-3341', company_id: 'C-108', date: '2026-03-30', time: '0355' },
  { vehicle_id: 'TK-3341', company_id: 'C-108', date: '2026-03-30', time: '1015' },
  { vehicle_id: 'TK-7788', company_id: 'C-109', date: '2026-03-29', time: '1845' },
  { vehicle_id: 'TK-7788', company_id: 'C-109', date: '2026-03-30', time: '0510' },
  { vehicle_id: 'TK-6612', company_id: 'C-110', date: '2026-03-30', time: '0930' },
];

export function FleetLogsDB() {
  const displayData = useMemo(() => {
    const arr = [...FLEET_LOGS];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, []);

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
              <th className="border-2 border-[#808080] px-2 py-2 font-bold">vehicle_id</th>
              <th className="border-2 border-[#808080] px-2 py-2 font-bold">company_id</th>
              <th className="border-2 border-[#808080] px-2 py-2 font-bold">date</th>
              <th className="border-2 border-[#808080] px-2 py-2 font-bold">time</th>
            </tr>
          </thead>
          <tbody>
            {displayData.map((record, index) => (
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
