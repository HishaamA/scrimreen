import { useState } from 'react';
import { Building2 } from 'lucide-react';

interface CorporateRecord {
  company_id: string;
  company_name: string;
  ceo_name: string;
}

const CORPORATE_REGISTRY: CorporateRecord[] = [
  { company_id: 'C-101', company_name: 'Gulf Chemicals LLC', ceo_name: 'Simreen Siraj' },
  { company_id: 'C-102', company_name: 'CleanTech Solutions', ceo_name: 'Sarah Al-Mansouri' },
  { company_id: 'C-103', company_name: 'GreenWaste Management', ceo_name: 'Ahmed Khalifa' },
  { company_id: 'C-104', company_name: 'EcoSafe Chemical Co.', ceo_name: 'Fatima Hassan' },
  { company_id: 'C-105', company_name: 'Industrial Solvents LLC', ceo_name: 'Mohammed Al-Zaabi' },
  { company_id: 'C-106', company_name: 'Apex Chemical Trading', ceo_name: 'Jasim Al-Suwaidi' },
  { company_id: 'C-107', company_name: 'SolventPro FZE', ceo_name: 'Vikram Nair' },
  { company_id: 'C-108', company_name: 'Meridian Hazmat Co.', ceo_name: 'Noura Al-Rasheed' },
  { company_id: 'C-109', company_name: 'Gulf Industrial Supplies', ceo_name: 'Tariq Al-Harthi' },
  { company_id: 'C-110', company_name: 'Emirates ChemEx LLC', ceo_name: 'Fiona MacAllister' },
  { company_id: 'C-111', company_name: 'AquaChem Solutions', ceo_name: 'Rashid Al-Tamimi' },
  { company_id: 'C-112', company_name: 'ProChem Industries', ceo_name: 'Lin Wei' },
  { company_id: 'C-113', company_name: 'TechSolv Abu Dhabi', ceo_name: 'Hamad Al-Falasi' },
  { company_id: 'C-114', company_name: 'Arabian Chemical Corp', ceo_name: 'Abdullah Al-Hajri' },
  { company_id: 'C-115', company_name: 'Mussafah Waste Solutions', ceo_name: 'Sanjay Mehta' },
  { company_id: 'C-116', company_name: 'BioWaste Management FZE', ceo_name: 'Mariam Binte Yousuf' },
  { company_id: 'C-117', company_name: 'Green Horizon Chemicals', ceo_name: 'Pierre Fontaine' },
  { company_id: 'C-118', company_name: 'Coastal Chemical Trading', ceo_name: 'Omar Bin Ghaith' },
  { company_id: 'C-119', company_name: 'Delta Petrochemicals LLC', ceo_name: 'Amira Al-Hosani' },
  { company_id: 'C-120', company_name: 'SafeChem UAE', ceo_name: 'Bharat Kumar Singh' },
];

export function ChemicalCompaniesDB() {
  const [sortColumn, setSortColumn] = useState<keyof CorporateRecord>('company_id');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const sortedData = [...CORPORATE_REGISTRY].sort((a, b) => {
    const aVal = a[sortColumn];
    const bVal = b[sortColumn];
    if (sortOrder === 'asc') {
      return aVal > bVal ? 1 : -1;
    } else {
      return aVal < bVal ? 1 : -1;
    }
  });

  const handleSort = (column: keyof CorporateRecord) => {
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
      <div className="window-95-panel p-3 bg-[#800000] text-white border-b-2 border-[#808080]">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <Building2 className="w-5 h-5" />
          Corporate Registry Database
        </h2>
        <p className="text-xs mt-1 opacity-90">
          UAE Ministry of Economy - Registered Chemical Companies
        </p>
      </div>

      {/* Hint Bar */}
      <div className="window-95-panel p-2 border-b-2 border-[#808080] flex items-center gap-2 bg-[#ffffcc]">
        <span className="text-xs font-bold">💡 Tip:</span>
        <span className="text-xs">Use the SQL Terminal to query this database. Try: <code className="bg-white px-1 border">SELECT * FROM corporate_registry</code></span>
        <span className="text-xs text-gray-600 ml-auto font-bold">{CORPORATE_REGISTRY.length} records</span>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto p-2">
        <table className="w-full border-2 border-[#808080] bg-white text-xs">
          <thead className="bg-[#c0c0c0] sticky top-0">
            <tr>
              <th
                className="border-2 border-[#808080] px-2 py-2 font-bold cursor-pointer hover:bg-[#dfdfdf]"
                onClick={() => handleSort('company_id')}
              >
                company_id {sortColumn === 'company_id' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th
                className="border-2 border-[#808080] px-2 py-2 font-bold cursor-pointer hover:bg-[#dfdfdf]"
                onClick={() => handleSort('company_name')}
              >
                company_name {sortColumn === 'company_name' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th
                className="border-2 border-[#808080] px-2 py-2 font-bold cursor-pointer hover:bg-[#dfdfdf]"
                onClick={() => handleSort('ceo_name')}
              >
                ceo_name {sortColumn === 'ceo_name' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((record, index) => (
              <tr
                key={record.company_id}
                className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-yellow-100`}
              >
                <td className="border border-[#808080] px-2 py-1 font-mono font-bold">
                  {record.company_id}
                </td>
                <td className="border border-[#808080] px-2 py-1">
                  {record.company_name}
                </td>
                <td className="border border-[#808080] px-2 py-1">
                  {record.ceo_name}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="window-95-panel px-3 py-1 border-t-2 border-[#808080] text-xs text-gray-600 flex justify-between">
        <span>© 2026 UAE Ministry of Economy</span>
        <span>Last Updated: March 30, 2026</span>
      </div>
    </div>
  );
}
