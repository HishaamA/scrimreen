import { useState, useMemo } from 'react';
import { Play, Trash2, Database, Save } from 'lucide-react';

interface SQLQueryTerminalProps {
  currentCase?: any;
  onQueryExecuted?: (results: any) => void;
}

// Default database used when no case is provided (or for case-001)
const DEFAULT_SUSPECTS = [
  { emirates_id: '784199212345671', name: 'Ahmed Khalfan', age: 34, occupation: 'Construction Worker', location: 'Jebel Ali' },
  { emirates_id: '784198823456782', name: 'Fatima Al-Mazrui', age: 35, occupation: 'Business Owner', location: 'Al Reem Island' },
  { emirates_id: '784197234567893', name: 'Mohammed Hassan', age: 51, occupation: 'Factory Owner', location: 'Mussafah' },
  { emirates_id: '784199745678904', name: 'Sarah Mitchell', age: 29, occupation: 'Environmental Officer', location: 'Dubai Marina' },
  { emirates_id: '784198456789015', name: 'Simreen Siraj', age: 42, occupation: 'Business Owner', location: 'Mussafah Industrial Zone' },
  { emirates_id: '784199567890126', name: 'Layla Ibrahim', age: 28, occupation: 'Shop Manager', location: 'Khalifa City' },
  { emirates_id: '784198178901237', name: 'Khalid Al-Mansoori', age: 45, occupation: 'Delivery Driver', location: 'Al Barsha' },
  { emirates_id: '784198889012348', name: 'Marina Popov', age: 38, occupation: 'Restaurant Owner', location: 'Jumeirah' },
  { emirates_id: '784197890123459', name: 'Hassan Al-Zaabi', age: 45, occupation: 'Bank Manager', location: 'Business Bay' },
  { emirates_id: '784199601234560', name: 'Aisha Mohammed', age: 27, occupation: 'Teacher', location: 'Khalidiya' },
  { emirates_id: '784200111111111', name: 'Ben Dover', age: 24, occupation: 'Lead Detective', location: 'Dubai' },
  { emirates_id: '784200022222222', name: 'Hishaam Abdul Razik', age: 25, occupation: 'Senior Detective', location: 'Abu Dhabi' },
  { emirates_id: '784198033333333', name: 'Omar Al-Rashidi', age: 43, occupation: 'Truck Driver', location: 'Sharjah' },
  { emirates_id: '784199344444444', name: 'Nour Binte Hamdan', age: 30, occupation: 'Lab Technician', location: 'Al Ain' },
  { emirates_id: '784197555555555', name: 'Tariq Bin Salim', age: 48, occupation: 'Warehouse Supervisor', location: 'Jebel Ali' },
  { emirates_id: '784199066666666', name: 'Priya Subramaniam', age: 33, occupation: 'Logistics Coordinator', location: 'Dubai Silicon Oasis' },
  { emirates_id: '784198677777777', name: 'Yusuf Al-Blooshi', age: 37, occupation: 'Civil Engineer', location: 'Abu Dhabi' },
  { emirates_id: '784199888888888', name: 'Reem Al-Nuaimi', age: 25, occupation: 'Environmental Inspector', location: 'Yas Island' },
  { emirates_id: '784197099999999', name: 'Bharat Menon', age: 53, occupation: 'Chemical Plant Manager', location: 'Mussafah' },
  { emirates_id: '784199400000010', name: 'Zineb Chaoui', age: 29, occupation: 'Customs Officer', location: 'Jebel Ali Port' },
];

const DEFAULT_VEHICLE_REGISTRY = [
  { vehicle_plate_id: 'B58912', emirates_id: '784199212345671', registration_year: 2021, colour_of_car: 'White', date: '2026-03-29', time: '1834' },
  { vehicle_plate_id: 'A12345', emirates_id: '784198823456782', registration_year: 2022, colour_of_car: 'Black', date: '2026-03-29', time: '1812' },
  { vehicle_plate_id: 'C98765', emirates_id: '784197234567893', registration_year: 2020, colour_of_car: 'Silver', date: '2026-03-29', time: '1845' },
  { vehicle_plate_id: 'D54321', emirates_id: '784199745678904', registration_year: 2023, colour_of_car: 'Blue', date: '2026-03-29', time: '1758' },
  { vehicle_plate_id: 'E11223', emirates_id: '784198456789015', registration_year: 2019, colour_of_car: 'Red', date: '2026-03-29', time: '1902' },
  { vehicle_plate_id: 'F67890', emirates_id: '784199567890126', registration_year: 2021, colour_of_car: 'White', date: '2026-03-29', time: '1823' },
  { vehicle_plate_id: 'G24680', emirates_id: '784198178901237', registration_year: 2022, colour_of_car: 'Gray', date: '2026-03-29', time: '1856' },
  { vehicle_plate_id: 'H13579', emirates_id: '784198889012348', registration_year: 2020, colour_of_car: 'Green', date: '2026-03-29', time: '1741' },
  { vehicle_plate_id: 'I97531', emirates_id: '784197890123459', registration_year: 2023, colour_of_car: 'Black', date: '2026-03-29', time: '1915' },
  { vehicle_plate_id: 'J86420', emirates_id: '784199601234560', registration_year: 2021, colour_of_car: 'White', date: '2026-03-29', time: '1807' },
  { vehicle_plate_id: 'S11111', emirates_id: '784200111111111', registration_year: 2024, colour_of_car: 'Gold', date: '2026-03-29', time: '0800' },
  { vehicle_plate_id: 'H22222', emirates_id: '784200022222222', registration_year: 2024, colour_of_car: 'Silver', date: '2026-03-29', time: '0815' },
  { vehicle_plate_id: 'K75319', emirates_id: '784198711223341', registration_year: 2022, colour_of_car: 'Silver', date: '2026-03-29', time: '1839' },
  { vehicle_plate_id: 'L64208', emirates_id: '784199322334452', registration_year: 2019, colour_of_car: 'Blue', date: '2026-03-29', time: '1752' },
  { vehicle_plate_id: 'M53197', emirates_id: '784198433445563', registration_year: 2023, colour_of_car: 'Black', date: '2026-03-29', time: '1908' },
  { vehicle_plate_id: 'N42086', emirates_id: '784199144556674', registration_year: 2020, colour_of_car: 'Red', date: '2026-03-29', time: '1828' },
  { vehicle_plate_id: 'O31975', emirates_id: '784197955667785', registration_year: 2021, colour_of_car: 'White', date: '2026-03-29', time: '1851' },
  { vehicle_plate_id: 'P20864', emirates_id: '784199766778896', registration_year: 2022, colour_of_car: 'Gray', date: '2026-03-29', time: '1746' },
  { vehicle_plate_id: 'Q19753', emirates_id: '784198677889907', registration_year: 2023, colour_of_car: 'Silver', date: '2026-03-29', time: '1921' },
  { vehicle_plate_id: 'R08642', emirates_id: '784198988990018', registration_year: 2019, colour_of_car: 'Blue', date: '2026-03-29', time: '1814' },
];

// Case-002 specific tables
const CHEMICAL_IMPORTS = [
  { batch_id: 'SV-XNB', chemical_name: 'Trichloroethylene', company_id: 'C-101' },
  { batch_id: 'SV-XNB', chemical_name: 'Trichloroethylene', company_id: 'C-103' },
  { batch_id: 'SV-XNB', chemical_name: 'Trichloroethylene', company_id: 'C-105' },
  { batch_id: 'SV-XNB', chemical_name: 'Trichloroethylene', company_id: 'C-106' },
  { batch_id: 'KP-DLQ', chemical_name: 'Acetone', company_id: 'C-102' },
  { batch_id: 'BT-WPS', chemical_name: 'Sodium Hydroxide', company_id: 'C-104' },
  { batch_id: 'MG-FKN', chemical_name: 'Methanol', company_id: 'C-101' },
  { batch_id: 'RX-QHD', chemical_name: 'Ethylene Glycol', company_id: 'C-103' },
  { batch_id: 'FL-RPB', chemical_name: 'Hydrochloric Acid', company_id: 'C-105' },
  { batch_id: 'WC-ABV', chemical_name: 'Sulfuric Acid', company_id: 'C-102' },
  { batch_id: 'DN-MFT', chemical_name: 'Ammonia Solution', company_id: 'C-104' },
  { batch_id: 'AL-KWP', chemical_name: 'Isopropanol', company_id: 'C-106' },
  { batch_id: 'CR-NXV', chemical_name: 'Toluene', company_id: 'C-107' },
  { batch_id: 'DX-QMS', chemical_name: 'Benzene', company_id: 'C-108' },
  { batch_id: 'EF-TBR', chemical_name: 'Xylene', company_id: 'C-109' },
  { batch_id: 'GH-ZWC', chemical_name: 'Acetonitrile', company_id: 'C-110' },
  { batch_id: 'IJ-VNP', chemical_name: 'Chloroform', company_id: 'C-107' },
  { batch_id: 'KL-MCT', chemical_name: 'Diethyl Ether', company_id: 'C-108' },
  { batch_id: 'NP-SQX', chemical_name: 'Formaldehyde', company_id: 'C-109' },
  { batch_id: 'QR-FHD', chemical_name: 'Nitric Acid', company_id: 'C-110' },
  { batch_id: 'ST-LBV', chemical_name: 'Phosphoric Acid', company_id: 'C-111' },
  { batch_id: 'UV-GKW', chemical_name: 'Sodium Cyanide', company_id: 'C-102' },
];

const FLEET_LOGS = [
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

const CORPORATE_REGISTRY = [
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

function buildMockDatabase(currentCase?: any) {
  const base: Record<string, any[]> = {
    suspects: DEFAULT_SUSPECTS,
    vehicle_registry: DEFAULT_VEHICLE_REGISTRY,
  };

  // Case-002 gets chemical investigation tables
  if (currentCase?.id === 'case-002') {
    base.chemical_imports = CHEMICAL_IMPORTS;
    base.fleet_logs = FLEET_LOGS;
    base.corporate_registry = CORPORATE_REGISTRY;
  }

  return base;
}

export function SQLQueryTerminal({ currentCase, onQueryExecuted }: SQLQueryTerminalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState('');
  const [history, setHistory] = useState<string[]>([]);

  const MOCK_DATABASE = useMemo(() => buildMockDatabase(currentCase), [currentCase]);

  const executeQuery = () => {
    if (!query.trim()) return;

    setError('');
    const normalizedQuery = query.trim().replace(/;\s*$/, '').replace(/\s+/g, ' ').toLowerCase();

    try {
      // Add to history
      setHistory([...history, query]);

      // Simple SQL parser
      if (normalizedQuery.startsWith('select')) {
        handleSelectQuery(normalizedQuery);
      } else if (normalizedQuery.startsWith('show tables')) {
        setResults({
          type: 'tables',
          data: Object.keys(MOCK_DATABASE)
        });
      } else if (normalizedQuery.startsWith('describe')) {
        handleDescribeQuery(normalizedQuery);
      } else {
        setError('âŒ SQL Syntax Error: Only SELECT, SHOW TABLES, and DESCRIBE queries are supported.\n\nExamples:\n- SELECT * FROM suspects\n- SELECT name, age FROM suspects WHERE age > 30\n- SHOW TABLES\n- DESCRIBE suspects');
      }
    } catch (err) {
      setError(`SQL Error: ${err}`);
    }
  };

  const handleSelectQuery = (query: string) => {
    // Check for JOIN with ON: SELECT ... FROM t1 JOIN t2 ON t1.col = t2.col
    const joinOnMatch = query.match(/from\s+(\w+)\s+(?:inner\s+)?join\s+(\w+)\s+on\s+([\w.]+)\s*=\s*([\w.]+)/);
    // Also support JOIN without ON (cross join filtered by WHERE)
    const joinNoOnMatch = !joinOnMatch ? query.match(/from\s+(\w+)\s+(?:inner\s+)?join\s+(\w+)/) : null;
    const joinMatch = joinOnMatch || joinNoOnMatch;

    let filteredData: any[];
    let tableName: string;

    if (joinMatch) {
      const table1Name = joinMatch[1];
      const table2Name = joinMatch[2];
      const table1 = MOCK_DATABASE[table1Name as keyof typeof MOCK_DATABASE];
      const table2 = MOCK_DATABASE[table2Name as keyof typeof MOCK_DATABASE];

      if (!table1) { setError(`Table '${table1Name}' does not exist. Use SHOW TABLES to see available tables.`); return; }
      if (!table2) { setError(`Table '${table2Name}' does not exist. Use SHOW TABLES to see available tables.`); return; }

      const mergePrefixed = (row1: any, row2: any) => {
        const merged: any = {};
        for (const key of Object.keys(row1)) {
          merged[`${table1Name}.${key}`] = row1[key];
        }
        for (const key of Object.keys(row2)) {
          merged[`${table2Name}.${key}`] = row2[key];
        }
        return merged;
      };

      if (joinOnMatch) {
        const [, , , onLeft, onRight] = joinOnMatch;
        const resolveJoinCol = (qualified: string, defaultTable: string) => {
          const parts = qualified.split('.');
          return parts.length > 1 ? { table: parts[0], col: parts[1] } : { table: defaultTable, col: parts[0] };
        };

        const left = resolveJoinCol(onLeft, table1Name);
        const right = resolveJoinCol(onRight, table2Name);

        // Perform inner join on ON condition
        filteredData = [];
        (table1 as any[]).forEach(row1 => {
          (table2 as any[]).forEach(row2 => {
            const val1 = left.table === table1Name ? row1[left.col] : row2[left.col];
            const val2 = right.table === table2Name ? row2[right.col] : row1[right.col];
            if (String(val1) === String(val2)) {
              filteredData.push(mergePrefixed(row1, row2));
            }
          });
        });
      } else {
        // Cross join (no ON clause) - WHERE will filter results
        filteredData = [];
        (table1 as any[]).forEach(row1 => {
          (table2 as any[]).forEach(row2 => {
            filteredData.push(mergePrefixed(row1, row2));
          });
        });
      }

      tableName = `${table1Name} JOIN ${table2Name}`;
    } else {
      // Single table query
      const fromMatch = query.match(/from\s+(\w+)/);
      if (!fromMatch) {
        setError('Invalid SELECT query. Use: SELECT * FROM table_name');
        return;
      }

      tableName = fromMatch[1];
      const table = MOCK_DATABASE[tableName as keyof typeof MOCK_DATABASE];

      if (!table) {
        setError(`Table '${tableName}' does not exist. Use SHOW TABLES to see available tables.`);
        return;
      }

      filteredData = Array.isArray(table) ? [...table] : [];
    }

    // Handle WHERE clause
    const whereMatch = query.match(/where\s+(.+?)(?:\s+order\s+by|\s+limit|$)/);
    if (whereMatch) {
      const whereClause = whereMatch[1];
      filteredData = filteredData.filter(row => evaluateWhere(row, whereClause));
    }

    // Handle ORDER BY (supports dotted names for JOIN columns)
    const orderMatch = query.match(/order\s+by\s+([\w.]+)(?:\s+(asc|desc))?/);
    if (orderMatch) {
      const column = orderMatch[1];
      const direction = orderMatch[2] || 'asc';
      filteredData.sort((a, b) => {
        const aVal = getColumnValue(a, column);
        const bVal = getColumnValue(b, column);
        if (direction === 'asc') {
          return aVal > bVal ? 1 : -1;
        } else {
          return aVal < bVal ? 1 : -1;
        }
      });
    }

    // Handle LIMIT
    const limitMatch = query.match(/limit\s+(\d+)/);
    if (limitMatch) {
      const limit = parseInt(limitMatch[1]);
      filteredData = filteredData.slice(0, limit);
    }

    // Handle column selection (SELECT col1, col2 vs SELECT *)
    const selectMatch = query.match(/select\s+(.+?)\s+from/);
    if (selectMatch && selectMatch[1].trim() !== '*') {
      const columns = selectMatch[1].split(',').map(c => c.trim());
      filteredData = filteredData.map(row => {
        const newRow: any = {};
        columns.forEach(col => {
          if (row[col] !== undefined) {
            newRow[col] = row[col];
          } else {
            const matchingKey = Object.keys(row).find(k => k.endsWith('.' + col) || k === col);
            if (matchingKey) {
              newRow[col] = row[matchingKey];
            }
          }
        });
        return newRow;
      });
    }

    setResults({
      type: 'select',
      table: tableName,
      data: filteredData,
      count: filteredData.length
    });

    if (onQueryExecuted) {
      onQueryExecuted({ table: tableName, data: filteredData });
    }
  };

  // Helper to resolve column values (handles dotted names from JOINs)
  const getColumnValue = (row: any, colName: string) => {
    if (row[colName] !== undefined) return row[colName];
    const key = Object.keys(row).find(k => k.endsWith('.' + colName));
    return key ? row[key] : undefined;
  };

  const evaluateWhere = (row: any, whereClause: string): boolean => {
    // Handle AND/OR by splitting into sub-conditions
    const orParts = whereClause.split(/\s+or\s+/);
    if (orParts.length > 1) {
      return orParts.some(part => evaluateWhere(row, part.trim()));
    }
    const andParts = whereClause.split(/\s+and\s+/);
    if (andParts.length > 1) {
      return andParts.every(part => evaluateWhere(row, part.trim()));
    }

    // >= operator
    const gteMatch = whereClause.match(/([\w.]+)\s*>=\s*(\d+)/);
    if (gteMatch) {
      return getColumnValue(row, gteMatch[1]) >= parseInt(gteMatch[2]);
    }

    // <= operator
    const lteMatch = whereClause.match(/([\w.]+)\s*<=\s*(\d+)/);
    if (lteMatch) {
      return getColumnValue(row, lteMatch[1]) <= parseInt(lteMatch[2]);
    }

    // > operator
    const gtMatch = whereClause.match(/([\w.]+)\s*>\s*(\d+)/);
    if (gtMatch) {
      return getColumnValue(row, gtMatch[1]) > parseInt(gtMatch[2]);
    }

    // < operator
    const ltMatch = whereClause.match(/([\w.]+)\s*<\s*(\d+)/);
    if (ltMatch) {
      return getColumnValue(row, ltMatch[1]) < parseInt(ltMatch[2]);
    }

    // != / <> operator
    const neqMatch = whereClause.match(/([\w.]+)\s*(?:!=|<>)\s*['"]?([^'"]+)['"]?/);
    if (neqMatch) {
      const rowVal = getColumnValue(row, neqMatch[1]);
      if (rowVal === undefined || rowVal === null) return true;
      return String(rowVal).toLowerCase() !== neqMatch[2].trim().toLowerCase();
    }

    // = operator (case-insensitive, like MySQL default collation)
    const eqMatch = whereClause.match(/([\w.]+)\s*=\s*['"]?([^'"]+)['"]?/);
    if (eqMatch) {
      const rowVal = getColumnValue(row, eqMatch[1]);
      const compareVal = eqMatch[2].trim();
      // Check if right side is a column reference (e.g., table.column)
      const rightColVal = getColumnValue(row, compareVal);
      if (rightColVal !== undefined) {
        if (rowVal === undefined || rowVal === null) return false;
        return String(rowVal).toLowerCase() === String(rightColVal).toLowerCase();
      }
      if (rowVal === undefined || rowVal === null) return false;
      return String(rowVal).toLowerCase() === compareVal.toLowerCase();
    }

    // LIKE operator
    const likeMatch = whereClause.match(/([\w.]+)\s+like\s+['"]([^'"]+)['"]/);
    if (likeMatch) {
      const value = String(getColumnValue(row, likeMatch[1]) || '').toLowerCase();
      // Escape regex special chars, then convert SQL wildcards
      const escaped = likeMatch[2].replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const pattern = escaped.replace(/%/g, '.*').replace(/_/g, '.').toLowerCase();
      return new RegExp(`^${pattern}$`).test(value);
    }

    return true;
  };

  const handleDescribeQuery = (query: string) => {
    const tableMatch = query.match(/describe\s+(\w+)/);
    if (!tableMatch) {
      setError('Invalid DESCRIBE query. Use: DESCRIBE table_name');
      return;
    }

    const tableName = tableMatch[1];
    const table = MOCK_DATABASE[tableName as keyof typeof MOCK_DATABASE];

    if (!table) {
      setError(`Table '${tableName}' does not exist.`);
      return;
    }

    if (Array.isArray(table) && table.length > 0) {
      const columns = Object.keys(table[0]);
      setResults({
        type: 'describe',
        table: tableName,
        columns: columns
      });
    }
  };

  const clearQuery = () => {
    setQuery('');
    setResults(null);
    setError('');
  };

  const saveTableToNotepad = () => {
    if (!results || results.type !== 'select' || !results.data.length) {
      alert('No table data to save. Please execute a SELECT query first.');
      return;
    }

    // Convert table data to text format
    const columns = Object.keys(results.data[0]);
    let text = `Query Results from ${results.table}\n`;
    text += `Date: ${new Date().toLocaleString()}\n`;
    text += `Total Rows: ${results.count}\n\n`;
    
    // Header
    text += columns.join(' | ') + '\n';
    text += columns.map(() => '---').join(' | ') + '\n';
    
    // Data rows
    results.data.forEach((row: any) => {
      text += columns.map(col => row[col] === null ? 'NULL' : String(row[col])).join(' | ') + '\n';
    });

    // Copy to clipboard
    navigator.clipboard.writeText(text).then(() => {
      alert('Table data saved to clipboard! You can paste it into Notepad.');
    }).catch(() => {
      alert('Failed to copy to clipboard. Please try again.');
    });
  };

  return (
    <div className="flex flex-col h-full bg-[#000000] text-green-400 font-mono text-sm">
      {/* Header */}
      <div className="bg-[#000080] text-white px-3 py-2 flex items-center gap-2 border-b-2 border-green-400">
        <Database className="w-5 h-5" />
        <span className="font-bold">SQL Query Terminal - UAEPD Database v2.1</span>
      </div>

      {/* Query Input */}
      <div className="p-3 border-b-2 border-green-400">
        <div className="mb-2 text-xs">
          <span className="text-yellow-400">Available Tables:</span> {Object.keys(MOCK_DATABASE).join(', ')}
        </div>
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full h-24 bg-black text-green-400 border-2 border-green-400 p-2 font-mono text-sm resize-none focus:outline-none focus:border-green-300"
          placeholder="Enter SQL query... (e.g., SELECT * FROM suspects WHERE age > 40)"
          onKeyDown={(e) => {
            if (e.ctrlKey && e.key === 'Enter') {
              executeQuery();
            }
          }}
        />
        <div className="flex gap-2 mt-2">
          <button
            onClick={executeQuery}
            className="window-95-button px-3 py-1 text-xs bg-green-600 text-white flex items-center gap-1"
          >
            <Play className="w-3 h-3" />
            Execute (Ctrl+Enter)
          </button>
          <button
            onClick={clearQuery}
            className="window-95-button px-3 py-1 text-xs bg-red-600 text-white flex items-center gap-1"
          >
            <Trash2 className="w-3 h-3" />
            Clear
          </button>
          <button
            onClick={saveTableToNotepad}
            className="window-95-button px-3 py-1 text-xs bg-blue-600 text-white flex items-center gap-1"
          >
            <Save className="w-3 h-3" />
            Save to Notepad
          </button>
        </div>
      </div>

      {/* Results Area */}
      <div className="flex-1 overflow-auto p-3">
        {error && (
          <div className="bg-red-900 border-2 border-red-500 text-red-200 p-3 mb-3">
            <strong>ERROR:</strong> {error}
          </div>
        )}

        {results && (
          <div>
            {results.type === 'tables' && (
              <div>
                <div className="text-yellow-400 mb-2">Available Tables:</div>
                {results.data.map((table: string) => (
                  <div key={table} className="ml-4">â€¢ {table}</div>
                ))}
              </div>
            )}

            {results.type === 'describe' && (
              <div>
                <div className="text-yellow-400 mb-2">Columns in {results.table}:</div>
                {results.columns.map((col: string) => (
                  <div key={col} className="ml-4">â€¢ {col}</div>
                ))}
              </div>
            )}

            {results.type === 'select' && (
              <div>
                <div className="text-yellow-400 mb-2">
                  Query returned {results.count} row(s) from {results.table}
                </div>
                <div className="overflow-x-auto">
                  {results.data.length > 0 ? (
                    <table className="w-full border-2 border-green-400">
                      <thead>
                        <tr className="bg-green-900">
                          {Object.keys(results.data[0]).map((key) => (
                            <th key={key} className="border border-green-400 px-2 py-1 text-left">
                              {key}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {results.data.map((row: any, i: number) => (
                          <tr key={i} className="hover:bg-green-950">
                            {Object.values(row).map((val: any, j: number) => (
                              <td key={j} className="border border-green-400 px-2 py-1">
                                {val === null ? <span className="text-gray-500">NULL</span> : String(val)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="text-gray-500">No results found.</div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {!results && !error && (
          <div className="text-gray-600 text-center mt-8">
            <Database className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <div>Enter a SQL query above to begin investigation</div>
            <div className="text-xs mt-2">
              Try: <span className="text-green-400">SHOW TABLES</span> or{' '}
              <span className="text-green-400">SELECT * FROM suspects</span>
            </div>
          </div>
        )}
      </div>

      {/* Query History */}
      {history.length > 0 && (
        <div className="border-t-2 border-green-400 p-2 max-h-32 overflow-auto">
          <div className="text-xs text-gray-500 mb-1">Query History:</div>
          {history.slice(-5).map((q, i) => (
            <div
              key={i}
              className="text-xs text-gray-400 cursor-pointer hover:text-green-400"
              onClick={() => setQuery(q)}
            >
              {i + 1}. {q}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}