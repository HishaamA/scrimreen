import { Suspect, Evidence, Location } from '../types/game';

interface DataTableProps {
  data: Suspect[] | Evidence[] | Location[];
  type: 'suspects' | 'evidence' | 'locations';
}

export function DataTable({ data, type }: DataTableProps) {
  if (data.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        No data to display. Run a query in the Python editor to see results.
      </div>
    );
  }

  const renderSuspectsTable = (suspects: Suspect[]) => (
    <table className="w-full border-collapse text-xs">
      <thead>
        <tr className="bg-[#000080] text-white">
          <th className="border border-white p-1 text-left">ID</th>
          <th className="border border-white p-1 text-left">Name</th>
          <th className="border border-white p-1 text-left">Age</th>
          <th className="border border-white p-1 text-left">Occupation</th>
          <th className="border border-white p-1 text-left">Location</th>
          <th className="border border-white p-1 text-left">Eye Color</th>
          <th className="border border-white p-1 text-left">Height</th>
          <th className="border border-white p-1 text-left">Weight</th>
          <th className="border border-white p-1 text-left">Motive</th>
        </tr>
      </thead>
      <tbody>
        {suspects.map((suspect, idx) => (
          <tr key={suspect.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#c0c0c0]'}>
            <td className="border border-[#808080] p-1">{suspect.id}</td>
            <td className="border border-[#808080] p-1 font-bold">{suspect.name}</td>
            <td className="border border-[#808080] p-1">{suspect.age}</td>
            <td className="border border-[#808080] p-1">{suspect.occupation}</td>
            <td className="border border-[#808080] p-1">{suspect.location}</td>
            <td className="border border-[#808080] p-1">{suspect.eyeColor || 'N/A'}</td>
            <td className="border border-[#808080] p-1">{suspect.height || 'N/A'}</td>
            <td className="border border-[#808080] p-1">{suspect.weight || 'N/A'}</td>
            <td className="border border-[#808080] p-1">
              {suspect.motive ? (
                <span className="bg-red-200 px-1 font-bold">YES</span>
              ) : (
                'None'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderEvidenceTable = (evidence: Evidence[]) => (
    <table className="w-full border-collapse text-xs">
      <thead>
        <tr className="bg-[#000080] text-white">
          <th className="border border-white p-1 text-left">ID</th>
          <th className="border border-white p-1 text-left">Type</th>
          <th className="border border-white p-1 text-left">Description</th>
          <th className="border border-white p-1 text-left">Location</th>
          <th className="border border-white p-1 text-left">Timestamp</th>
          <th className="border border-white p-1 text-left">Related To</th>
        </tr>
      </thead>
      <tbody>
        {evidence.map((item, idx) => (
          <tr key={item.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#c0c0c0]'}>
            <td className="border border-[#808080] p-1">{item.id}</td>
            <td className="border border-[#808080] p-1 font-bold">{item.type}</td>
            <td className="border border-[#808080] p-1">{item.description}</td>
            <td className="border border-[#808080] p-1">{item.location}</td>
            <td className="border border-[#808080] p-1">{item.timestamp}</td>
            <td className="border border-[#808080] p-1">{item.relatedTo.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderLocationsTable = (locations: Location[]) => (
    <table className="w-full border-collapse text-xs">
      <thead>
        <tr className="bg-[#000080] text-white">
          <th className="border border-white p-1 text-left">ID</th>
          <th className="border border-white p-1 text-left">Name</th>
          <th className="border border-white p-1 text-left">Type</th>
          <th className="border border-white p-1 text-left">Address</th>
          <th className="border border-white p-1 text-left">Last Activity</th>
        </tr>
      </thead>
      <tbody>
        {locations.map((location, idx) => (
          <tr key={location.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#c0c0c0]'}>
            <td className="border border-[#808080] p-1">{location.id}</td>
            <td className="border border-[#808080] p-1 font-bold">{location.name}</td>
            <td className="border border-[#808080] p-1">{location.type}</td>
            <td className="border border-[#808080] p-1">{location.address}</td>
            <td className="border border-[#808080] p-1">{location.lastActivity}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="p-2 overflow-auto">
      <div className="mb-2 bg-[#c0c0c0] p-2 border-2 border-[#808080]">
        <span className="font-bold">{type.toUpperCase()} TABLE</span>
        <span className="ml-2 text-sm">({data.length} records)</span>
      </div>
      {type === 'suspects' && renderSuspectsTable(data as Suspect[])}
      {type === 'evidence' && renderEvidenceTable(data as Evidence[])}
      {type === 'locations' && renderLocationsTable(data as Location[])}
    </div>
  );
}
