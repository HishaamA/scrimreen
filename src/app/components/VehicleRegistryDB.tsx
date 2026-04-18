import { useState } from 'react';

interface VehicleRecord {
  vehicle_plate_id: string;
  emirates_id: string;
  registration_year: number;
  colour_of_car: string;
  time_passed_under_toll: string;
}

const VEHICLE_REGISTRY: VehicleRecord[] = [
  { vehicle_plate_id: 'B58912', emirates_id: '784-1992-1234567-1', registration_year: 2021, colour_of_car: 'White', time_passed_under_toll: '2026-03-29 18:34:00' },
  { vehicle_plate_id: 'A12345', emirates_id: '784-1988-2345678-2', registration_year: 2022, colour_of_car: 'Black', time_passed_under_toll: '2026-03-29 18:12:00' },
  { vehicle_plate_id: 'C98765', emirates_id: '784-1972-3456789-3', registration_year: 2020, colour_of_car: 'Silver', time_passed_under_toll: '2026-03-29 18:45:00' },
  { vehicle_plate_id: 'D54321', emirates_id: '784-1997-4567890-4', registration_year: 2023, colour_of_car: 'Blue', time_passed_under_toll: '2026-03-29 17:58:00' },
  { vehicle_plate_id: 'E11223', emirates_id: '784-1984-5678901-5', registration_year: 2019, colour_of_car: 'Red', time_passed_under_toll: '2026-03-29 19:02:00' },
  { vehicle_plate_id: 'F67890', emirates_id: '784-1995-6789012-6', registration_year: 2021, colour_of_car: 'White', time_passed_under_toll: '2026-03-29 18:23:00' },
  { vehicle_plate_id: 'G24680', emirates_id: '784-1981-7890123-7', registration_year: 2022, colour_of_car: 'Gray', time_passed_under_toll: '2026-03-29 18:56:00' },
  { vehicle_plate_id: 'H13579', emirates_id: '784-1988-8901234-8', registration_year: 2020, colour_of_car: 'Green', time_passed_under_toll: '2026-03-29 17:41:00' },
  { vehicle_plate_id: 'I97531', emirates_id: '784-1978-9012345-9', registration_year: 2023, colour_of_car: 'Black', time_passed_under_toll: '2026-03-29 19:15:00' },
  { vehicle_plate_id: 'J86420', emirates_id: '784-1996-0123456-0', registration_year: 2021, colour_of_car: 'White', time_passed_under_toll: '2026-03-29 18:07:00' },
  { vehicle_plate_id: 'S11111', emirates_id: '784-2001-1111111-1', registration_year: 2024, colour_of_car: 'Gold', time_passed_under_toll: '2026-03-29 08:00:00' },
  { vehicle_plate_id: 'H22222', emirates_id: '784-2000-2222222-2', registration_year: 2024, colour_of_car: 'Silver', time_passed_under_toll: '2026-03-29 08:15:00' },
  { vehicle_plate_id: 'K75319', emirates_id: '784-1987-1122334-1', registration_year: 2022, colour_of_car: 'Silver', time_passed_under_toll: '2026-03-29 18:39:00' },
  { vehicle_plate_id: 'L64208', emirates_id: '784-1993-2233445-2', registration_year: 2019, colour_of_car: 'Blue', time_passed_under_toll: '2026-03-29 17:52:00' },
  { vehicle_plate_id: 'M53197', emirates_id: '784-1984-3344556-3', registration_year: 2023, colour_of_car: 'Black', time_passed_under_toll: '2026-03-29 19:08:00' },
  { vehicle_plate_id: 'N42086', emirates_id: '784-1991-4455667-4', registration_year: 2020, colour_of_car: 'Red', time_passed_under_toll: '2026-03-29 18:28:00' },
  { vehicle_plate_id: 'O31975', emirates_id: '784-1979-5566778-5', registration_year: 2021, colour_of_car: 'White', time_passed_under_toll: '2026-03-29 18:51:00' },
  { vehicle_plate_id: 'P20864', emirates_id: '784-1997-6677889-6', registration_year: 2022, colour_of_car: 'Gray', time_passed_under_toll: '2026-03-29 17:46:00' },
  { vehicle_plate_id: 'Q19753', emirates_id: '784-1986-7788990-7', registration_year: 2023, colour_of_car: 'Silver', time_passed_under_toll: '2026-03-29 19:21:00' },
  { vehicle_plate_id: 'R08642', emirates_id: '784-1989-8899001-8', registration_year: 2019, colour_of_car: 'Blue', time_passed_under_toll: '2026-03-29 18:14:00' },
  { vehicle_plate_id: 'S97531', emirates_id: '784-1994-9900112-9', registration_year: 2021, colour_of_car: 'White', time_passed_under_toll: '2026-03-29 18:42:00' },
  { vehicle_plate_id: 'T86420', emirates_id: '784-1982-0011223-0', registration_year: 2020, colour_of_car: 'Black', time_passed_under_toll: '2026-03-29 17:59:00' },
  { vehicle_plate_id: 'U75309', emirates_id: '784-1995-1122334-1', registration_year: 2022, colour_of_car: 'Red', time_passed_under_toll: '2026-03-29 19:03:00' },
  { vehicle_plate_id: 'V64298', emirates_id: '784-1988-2233445-2', registration_year: 2023, colour_of_car: 'Silver', time_passed_under_toll: '2026-03-29 18:26:00' },
  { vehicle_plate_id: 'W53187', emirates_id: '784-1983-3344556-3', registration_year: 2021, colour_of_car: 'Gray', time_passed_under_toll: '2026-03-29 18:57:00' },
  { vehicle_plate_id: 'X42076', emirates_id: '784-1996-4455667-4', registration_year: 2019, colour_of_car: 'White', time_passed_under_toll: '2026-03-29 17:43:00' },
  { vehicle_plate_id: 'Y31965', emirates_id: '784-1990-5566778-5', registration_year: 2020, colour_of_car: 'Black', time_passed_under_toll: '2026-03-29 19:18:00' },
  { vehicle_plate_id: 'Z20854', emirates_id: '784-1985-6677889-6', registration_year: 2022, colour_of_car: 'Blue', time_passed_under_toll: '2026-03-29 18:09:00' },
  { vehicle_plate_id: 'A19743', emirates_id: '784-1992-7788990-7', registration_year: 2023, colour_of_car: 'Red', time_passed_under_toll: '2026-03-29 18:35:00' },
  { vehicle_plate_id: 'B08632', emirates_id: '784-1987-8899001-8', registration_year: 2021, colour_of_car: 'White', time_passed_under_toll: '2026-03-29 18:48:00' },
  { vehicle_plate_id: 'C97521', emirates_id: '784-1981-9900112-9', registration_year: 2019, colour_of_car: 'Silver', time_passed_under_toll: '2026-03-29 17:54:00' },
  { vehicle_plate_id: 'D86410', emirates_id: '784-1993-0011223-0', registration_year: 2022, colour_of_car: 'Gray', time_passed_under_toll: '2026-03-29 19:11:00' },
  { vehicle_plate_id: 'E75399', emirates_id: '784-1989-1122334-1', registration_year: 2020, colour_of_car: 'Black', time_passed_under_toll: '2026-03-29 18:22:00' },
  { vehicle_plate_id: 'F64288', emirates_id: '784-1984-2233445-2', registration_year: 2023, colour_of_car: 'White', time_passed_under_toll: '2026-03-29 18:53:00' },
  { vehicle_plate_id: 'G53177', emirates_id: '784-1991-3344556-3', registration_year: 2021, colour_of_car: 'Blue', time_passed_under_toll: '2026-03-29 17:47:00' },
  { vehicle_plate_id: 'H42066', emirates_id: '784-1986-4455667-4', registration_year: 2019, colour_of_car: 'Red', time_passed_under_toll: '2026-03-29 19:24:00' },
];

export function VehicleRegistryDB() {
  const [sortColumn, setSortColumn] = useState<keyof VehicleRecord>('time_passed_under_toll');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const sortedData = [...VEHICLE_REGISTRY].sort((a, b) => {
    const aVal = a[sortColumn];
    const bVal = b[sortColumn];
    if (sortOrder === 'asc') {
      return aVal > bVal ? 1 : -1;
    } else {
      return aVal < bVal ? 1 : -1;
    }
  });

  const handleSort = (column: keyof VehicleRecord) => {
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
      <div className="window-95-panel p-3 bg-[#000080] text-white border-b-2 border-[#808080]">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <span>ðŸš—</span> Dubai Vehicle Registry Database
        </h2>
        <p className="text-xs mt-1 opacity-90">
          Official UAEPD Traffic Department - Vehicle Registration Records
        </p>
      </div>

      {/* Hint Bar */}
      <div className="window-95-panel p-2 border-b-2 border-[#808080] flex items-center gap-2 bg-[#ffffcc]">
        <span className="text-xs font-bold">ðŸ’¡ Tip:</span>
        <span className="text-xs">Use the SQL Terminal to query this database. Try: <code className="bg-white px-1 border">SELECT * FROM vehicle_registry</code></span>
        <span className="text-xs text-gray-600 ml-auto font-bold">{VEHICLE_REGISTRY.length} records</span>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto p-2">
        <table className="w-full border-2 border-[#808080] bg-white text-xs">
          <thead className="bg-[#c0c0c0] sticky top-0">
            <tr>
              <th 
                className="border-2 border-[#808080] px-2 py-2 font-bold cursor-pointer hover:bg-[#dfdfdf]"
                onClick={() => handleSort('vehicle_plate_id')}
              >
                vehicle_plate_id {sortColumn === 'vehicle_plate_id' && (sortOrder === 'asc' ? 'â†‘' : 'â†“')}
              </th>
              <th 
                className="border-2 border-[#808080] px-2 py-2 font-bold cursor-pointer hover:bg-[#dfdfdf]"
                onClick={() => handleSort('emirates_id')}
              >
                emirates_id {sortColumn === 'emirates_id' && (sortOrder === 'asc' ? 'â†‘' : 'â†“')}
              </th>
              <th 
                className="border-2 border-[#808080] px-2 py-2 font-bold cursor-pointer hover:bg-[#dfdfdf]"
                onClick={() => handleSort('registration_year')}
              >
                registration_year {sortColumn === 'registration_year' && (sortOrder === 'asc' ? 'â†‘' : 'â†“')}
              </th>
              <th 
                className="border-2 border-[#808080] px-2 py-2 font-bold cursor-pointer hover:bg-[#dfdfdf]"
                onClick={() => handleSort('colour_of_car')}
              >
                colour_of_car {sortColumn === 'colour_of_car' && (sortOrder === 'asc' ? 'â†‘' : 'â†“')}
              </th>
              <th 
                className="border-2 border-[#808080] px-2 py-2 font-bold cursor-pointer hover:bg-[#dfdfdf]"
                onClick={() => handleSort('time_passed_under_toll')}
              >
                time_passed_under_toll {sortColumn === 'time_passed_under_toll' && (sortOrder === 'asc' ? 'â†‘' : 'â†“')}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((record, index) => (
              <tr 
                key={record.vehicle_plate_id} 
                className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-yellow-100`}
              >
                <td className="border border-[#808080] px-2 py-1 font-mono font-bold">
                  {record.vehicle_plate_id}
                </td>
                <td className="border border-[#808080] px-2 py-1 font-mono text-[10px]">
                  {record.emirates_id}
                </td>
                <td className="border border-[#808080] px-2 py-1 text-center">
                  {record.registration_year}
                </td>
                <td className="border border-[#808080] px-2 py-1">
                  <span 
                    className="inline-block px-2 py-0.5 rounded font-bold text-white"
                    style={{ 
                      backgroundColor: 
                        record.colour_of_car === 'White' ? '#ddd' :
                        record.colour_of_car === 'Black' ? '#000' :
                        record.colour_of_car === 'Silver' ? '#c0c0c0' :
                        record.colour_of_car === 'Gray' ? '#808080' :
                        record.colour_of_car === 'Blue' ? '#0066cc' :
                        record.colour_of_car === 'Red' ? '#cc0000' :
                        record.colour_of_car === 'Green' ? '#00cc00' :
                        record.colour_of_car === 'Gold' ? '#FFD700' :
                        '#666',
                      color: record.colour_of_car === 'White' || record.colour_of_car === 'Silver' || record.colour_of_car === 'Gold' ? '#000' : '#fff'
                    }}
                  >
                    {record.colour_of_car}
                  </span>
                </td>
                <td className="border border-[#808080] px-2 py-1 font-mono text-center">
                  {record.time_passed_under_toll}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="window-95-panel px-3 py-1 border-t-2 border-[#808080] text-xs text-gray-600 flex justify-between">
        <span>Â© 2026 Dubai Traffic Department</span>
        <span>Last Updated: March 29, 2026</span>
      </div>
    </div>
  );
}