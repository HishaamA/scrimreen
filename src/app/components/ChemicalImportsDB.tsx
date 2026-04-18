import { useState } from 'react';
import { Table } from 'lucide-react';

interface ChemicalImport {
  batch_id: string;
  chemical_name: string;
  company_id: string;
}

const CHEMICAL_IMPORTS: ChemicalImport[] = [
  { batch_id: 'SV-XNB', chemical_name: 'Trichloroethylene', company_id: 'C-101' },
  { batch_id: 'SV-XNB', chemical_name: 'Trichloroethylene', company_id: 'C-103' },
  { batch_id: 'SV-XNB', chemical_name: 'Trichloroethylene', company_id: 'C-105' },
  { batch_id: 'KP-DLQ', chemical_name: 'Acetone', company_id: 'C-102' },
  { batch_id: 'BT-WPS', chemical_name: 'Sodium Hydroxide', company_id: 'C-104' },
  { batch_id: 'MG-FKN', chemical_name: 'Methanol', company_id: 'C-101' },
  { batch_id: 'RX-QHD', chemical_name: 'Ethylene Glycol', company_id: 'C-103' },
  { batch_id: 'FL-RPB', chemical_name: 'Hydrochloric Acid', company_id: 'C-105' },
  { batch_id: 'WC-ABV', chemical_name: 'Sulfuric Acid', company_id: 'C-102' },
  { batch_id: 'DN-MFT', chemical_name: 'Ammonia Solution', company_id: 'C-104' },
];

export function ChemicalImportsDB() {
  const [sortColumn, setSortColumn] = useState<keyof ChemicalImport>('batch_id');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const sortedData = [...CHEMICAL_IMPORTS].sort((a, b) => {
    const aVal = a[sortColumn];
    const bVal = b[sortColumn];
    if (sortOrder === 'asc') {
      return aVal > bVal ? 1 : -1;
    } else {
      return aVal < bVal ? 1 : -1;
    }
  });

  const handleSort = (column: keyof ChemicalImport) => {
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
      <div className="window-95-panel p-3 bg-[#008080] text-white border-b-2 border-[#808080]">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <Table className="w-5 h-5" />
          Chemical Imports Database
        </h2>
        <p className="text-xs mt-1 opacity-90">
          UAE Customs - Hazardous Materials Import Registry
        </p>
      </div>

      {/* Hint Bar */}
      <div className="window-95-panel p-2 border-b-2 border-[#808080] flex items-center gap-2 bg-[#ffffcc]">
        <span className="text-xs font-bold">💡 Tip:</span>
        <span className="text-xs">Use the SQL Terminal to query this database. Try: <code className="bg-white px-1 border">SELECT * FROM chemical_imports</code></span>
        <span className="text-xs text-gray-600 ml-auto font-bold">{CHEMICAL_IMPORTS.length} records</span>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto p-2">
        <table className="w-full border-2 border-[#808080] bg-white text-xs">
          <thead className="bg-[#c0c0c0] sticky top-0">
            <tr>
              <th 
                className="border-2 border-[#808080] px-2 py-2 font-bold cursor-pointer hover:bg-[#dfdfdf]"
                onClick={() => handleSort('batch_id')}
              >
                batch_id {sortColumn === 'batch_id' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th 
                className="border-2 border-[#808080] px-2 py-2 font-bold cursor-pointer hover:bg-[#dfdfdf]"
                onClick={() => handleSort('chemical_name')}
              >
                chemical_name {sortColumn === 'chemical_name' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th 
                className="border-2 border-[#808080] px-2 py-2 font-bold cursor-pointer hover:bg-[#dfdfdf]"
                onClick={() => handleSort('company_id')}
              >
                company_id {sortColumn === 'company_id' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((record, index) => (
              <tr 
                key={`${record.batch_id}-${record.company_id}-${index}`}
                className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-yellow-100`}
              >
                <td className="border border-[#808080] px-2 py-1 font-mono font-bold text-red-600">
                  {record.batch_id}
                </td>
                <td className="border border-[#808080] px-2 py-1">
                  {record.chemical_name}
                </td>
                <td className="border border-[#808080] px-2 py-1 font-mono text-center font-bold">
                  {record.company_id}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="window-95-panel px-3 py-1 border-t-2 border-[#808080] text-xs text-gray-600 flex justify-between">
        <span>© 2026 UAE Customs Authority</span>
        <span>Last Updated: March 30, 2026</span>
      </div>
    </div>
  );
}
