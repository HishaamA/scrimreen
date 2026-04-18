import { useMemo } from 'react';
import { User } from 'lucide-react';

interface SuspectRecord {
  emirates_id: string;
  name: string;
  age: number;
  occupation: string;
  location: string;
}

const SUSPECTS_DATA: SuspectRecord[] = [
  { emirates_id: '784-1992-1234567-1', name: 'Ahmed Khalfan', age: 34, occupation: 'Construction Worker', location: 'Jebel Ali' },
  { emirates_id: '784-1988-2345678-2', name: 'Fatima Al-Mazrui', age: 35, occupation: 'Business Owner', location: 'Al Reem Island' },
  { emirates_id: '784-1972-3456789-3', name: 'Mohammed Hassan', age: 51, occupation: 'Factory Owner', location: 'Mussafah' },
  { emirates_id: '784-1997-4567890-4', name: 'Sarah Mitchell', age: 29, occupation: 'Environmental Officer', location: 'Dubai Marina' },
  { emirates_id: '784-1984-5678901-5', name: 'Simreen Siraj', age: 42, occupation: 'Business Owner', location: 'Mussafah Industrial Zone' },
  { emirates_id: '784-1995-6789012-6', name: 'Layla Ibrahim', age: 28, occupation: 'Shop Manager', location: 'Khalifa City' },
  { emirates_id: '784-1981-7890123-7', name: 'Khalid Al-Mansoori', age: 45, occupation: 'Delivery Driver', location: 'Al Barsha' },
  { emirates_id: '784-1988-8901234-8', name: 'Marina Popov', age: 38, occupation: 'Restaurant Owner', location: 'Jumeirah' },
  { emirates_id: '784-1978-9012345-9', name: 'Hassan Al-Zaabi', age: 45, occupation: 'Bank Manager', location: 'Business Bay' },
  { emirates_id: '784-1996-0123456-0', name: 'Aisha Mohammed', age: 27, occupation: 'Teacher', location: 'Khalidiya' },
  { emirates_id: '784-2001-1111111-1', name: 'Ben Dover', age: 24, occupation: 'Lead Detective', location: 'Dubai' },
  { emirates_id: '784-2000-2222222-2', name: 'Hishaam Abdul Razik', age: 25, occupation: 'Senior Detective', location: 'Abu Dhabi' },
  { emirates_id: '784-1980-3333333-3', name: 'Omar Al-Rashidi', age: 43, occupation: 'Truck Driver', location: 'Sharjah' },
  { emirates_id: '784-1993-4444444-4', name: 'Nour Binte Hamdan', age: 30, occupation: 'Lab Technician', location: 'Al Ain' },
  { emirates_id: '784-1975-5555555-5', name: 'Tariq Bin Salim', age: 48, occupation: 'Warehouse Supervisor', location: 'Jebel Ali' },
  { emirates_id: '784-1990-6666666-6', name: 'Priya Subramaniam', age: 33, occupation: 'Logistics Coordinator', location: 'Dubai Silicon Oasis' },
  { emirates_id: '784-1986-7777777-7', name: 'Yusuf Al-Blooshi', age: 37, occupation: 'Civil Engineer', location: 'Abu Dhabi' },
  { emirates_id: '784-1998-8888888-8', name: 'Reem Al-Nuaimi', age: 25, occupation: 'Environmental Inspector', location: 'Yas Island' },
  { emirates_id: '784-1970-9999999-9', name: 'Bharat Menon', age: 53, occupation: 'Chemical Plant Manager', location: 'Mussafah' },
  { emirates_id: '784-1994-0000001-0', name: 'Zineb Chaoui', age: 29, occupation: 'Customs Officer', location: 'Jebel Ali Port' },
];

export function SuspectsDB() {
  const displayData = useMemo(() => {
    const arr = [...SUSPECTS_DATA];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, []);

  return (
    <div className="flex flex-col h-full bg-[#c0c0c0]">
      {/* Header */}
      <div className="window-95-panel p-3 bg-[#800000] text-white border-b-2 border-[#808080]">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <User className="w-5 h-5" />
          Suspects Database
        </h2>
        <p className="text-xs mt-1 opacity-90">
          UAEPD Criminal Investigation Division - Confidential Records
        </p>
      </div>

      {/* Hint Bar */}
      <div className="window-95-panel p-2 border-b-2 border-[#808080] flex items-center gap-2 bg-[#ffffcc]">
        <span className="text-xs font-bold">💡 Tip:</span>
        <span className="text-xs">Use the SQL Terminal to query this database. Try: <code className="bg-white px-1 border">SELECT * FROM suspects WHERE age &gt; 30</code></span>
        <span className="text-xs text-gray-600 ml-auto font-bold">{SUSPECTS_DATA.length} records</span>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto p-2">
        <table className="w-full border-2 border-[#808080] bg-white text-xs">
          <thead className="bg-[#c0c0c0] sticky top-0">
            <tr>
              <th className="border-2 border-[#808080] px-2 py-2 font-bold">emirates_id</th>
              <th className="border-2 border-[#808080] px-2 py-2 font-bold">name</th>
              <th className="border-2 border-[#808080] px-2 py-2 font-bold">age</th>
              <th className="border-2 border-[#808080] px-2 py-2 font-bold">occupation</th>
              <th className="border-2 border-[#808080] px-2 py-2 font-bold">location</th>
            </tr>
          </thead>
          <tbody>
            {displayData.map((record, index) => (
              <tr 
                key={record.emirates_id} 
                className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-yellow-100`}
              >
                <td className="border border-[#808080] px-2 py-1 font-mono text-[10px]">
                  {record.emirates_id}
                </td>
                <td className="border border-[#808080] px-2 py-1 font-bold">
                  {record.name}
                </td>
                <td className="border border-[#808080] px-2 py-1 text-center">
                  {record.age}
                </td>
                <td className="border border-[#808080] px-2 py-1">
                  {record.occupation}
                </td>
                <td className="border border-[#808080] px-2 py-1">
                  {record.location}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="window-95-panel px-3 py-1 border-t-2 border-[#808080] text-xs text-gray-600 flex justify-between">
        <span>© 2026 UAEPD - Confidential</span>
        <span>Last Updated: March 29, 2026</span>
      </div>
    </div>
  );
}