import { MapPin, Lock, CheckCircle } from 'lucide-react';
import { Case } from '../types/game';

interface MapViewProps {
  cases: Case[];
  completedCases: string[];
  onSelectCase: (caseId: string) => void;
}

export function MapView({ cases, completedCases, onSelectCase }: MapViewProps) {
  const getCaseColor = (difficulty: 1 | 2 | 3) => {
    if (difficulty === 1) return '#00ff00';
    if (difficulty === 2) return '#ffff00';
    return '#ff0000';
  };

  const getCaseLabel = (difficulty: 1 | 2 | 3) => {
    if (difficulty === 1) return 'LEVEL 1: ROOKIE';
    if (difficulty === 2) return 'LEVEL 2: DETECTIVE';
    return 'LEVEL 3: EXPERT';
  };

  const isLocked = (caseItem: Case) => {
    if (caseItem.difficulty === 1) return false;
    if (caseItem.difficulty === 2) {
      return !completedCases.some(id => cases.find(c => c.id === id && c.difficulty === 1));
    }
    if (caseItem.difficulty === 3) {
      return !completedCases.some(id => cases.find(c => c.id === id && c.difficulty === 2));
    }
    return false;
  };

  return (
    <div className="p-4 bg-[#c0c0c0] h-full overflow-auto">
      <div className="window-95-panel p-4 mb-4 bg-black text-green-400 font-mono">
        <div className="text-lg mb-2">🗺️ UAE DETECTIVE BUREAU - CASE MAP</div>
        <div className="text-sm">
          Progress through three difficulty levels to become a master detective.
          <br />
          Complete easier cases to unlock harder ones.
        </div>
      </div>

      {/* SVG Map with locations */}
      <div className="window-95-panel p-4 bg-white mb-4">
        <svg viewBox="0 0 800 600" className="w-full h-96">
          {/* Background - UAE styled */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <rect width="40" height="40" fill="none" stroke="#e0e0e0" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="800" height="600" fill="url(#grid)" />

          {/* Map decorations */}
          <text x="400" y="30" textAnchor="middle" className="fill-[#000080] text-2xl font-bold">
            UNITED ARAB EMIRATES
          </text>
          <text x="400" y="50" textAnchor="middle" className="fill-[#808080] text-sm">
            Crime Investigation Map
          </text>

          {/* Level 1 Cases - Left side (Dubai area) */}
          {cases
            .filter(c => c.difficulty === 1)
            .map((caseItem, idx) => {
              const x = 200;
              const y = 150 + idx * 150;
              const locked = isLocked(caseItem);
              const completed = completedCases.includes(caseItem.id);

              return (
                <g
                  key={caseItem.id}
                  className={locked ? 'cursor-not-allowed' : 'cursor-pointer hover:opacity-80'}
                  onClick={() => !locked && onSelectCase(caseItem.id)}
                >
                  {/* Location marker */}
                  <circle
                    cx={x}
                    cy={y}
                    r="30"
                    fill={completed ? '#00ff00' : getCaseColor(caseItem.difficulty)}
                    stroke="#000"
                    strokeWidth="3"
                    opacity={locked ? 0.3 : 1}
                  />
                  {locked && (
                    <g>
                      <rect x={x - 15} y={y - 15} width="30" height="30" fill="#808080" />
                      <text x={x} y={y + 5} textAnchor="middle" fontSize="20" fill="#fff">
                        🔒
                      </text>
                    </g>
                  )}
                  {completed && (
                    <text x={x} y={y + 5} textAnchor="middle" fontSize="20">
                      ✓
                    </text>
                  )}
                  {!locked && !completed && (
                    <text x={x} y={y + 5} textAnchor="middle" fontSize="16" fontWeight="bold">
                      1
                    </text>
                  )}

                  {/* Label */}
                  <rect
                    x={x - 80}
                    y={y + 40}
                    width="160"
                    height="60"
                    fill="#c0c0c0"
                    stroke="#000"
                    strokeWidth="2"
                  />
                  <text
                    x={x}
                    y={y + 58}
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight="bold"
                    className="fill-[#000080]"
                  >
                    {caseItem.title.substring(0, 25)}...
                  </text>
                  <text x={x} y={y + 72} textAnchor="middle" fontSize="8" fill="#000">
                    Dubai | Level 1
                  </text>
                  <text
                    x={x}
                    y={y + 88}
                    textAnchor="middle"
                    fontSize="9"
                    fill={completed ? '#00ff00' : locked ? '#ff0000' : '#000'}
                    fontWeight="bold"
                  >
                    {completed ? '✓ SOLVED' : locked ? '🔒 LOCKED' : 'CLICK TO START'}
                  </text>
                </g>
              );
            })}

          {/* Level 2 Cases - Center (Abu Dhabi area) */}
          {cases
            .filter(c => c.difficulty === 2)
            .map((caseItem, idx) => {
              const x = 400;
              const y = 150 + idx * 150;
              const locked = isLocked(caseItem);
              const completed = completedCases.includes(caseItem.id);

              return (
                <g
                  key={caseItem.id}
                  className={locked ? 'cursor-not-allowed' : 'cursor-pointer hover:opacity-80'}
                  onClick={() => !locked && onSelectCase(caseItem.id)}
                >
                  <circle
                    cx={x}
                    cy={y}
                    r="30"
                    fill={completed ? '#00ff00' : getCaseColor(caseItem.difficulty)}
                    stroke="#000"
                    strokeWidth="3"
                    opacity={locked ? 0.3 : 1}
                  />
                  {locked && (
                    <g>
                      <rect x={x - 15} y={y - 15} width="30" height="30" fill="#808080" />
                      <text x={x} y={y + 5} textAnchor="middle" fontSize="20" fill="#fff">
                        🔒
                      </text>
                    </g>
                  )}
                  {completed && (
                    <text x={x} y={y + 5} textAnchor="middle" fontSize="20">
                      ✓
                    </text>
                  )}
                  {!locked && !completed && (
                    <text x={x} y={y + 5} textAnchor="middle" fontSize="16" fontWeight="bold">
                      2
                    </text>
                  )}

                  <rect
                    x={x - 80}
                    y={y + 40}
                    width="160"
                    height="60"
                    fill="#c0c0c0"
                    stroke="#000"
                    strokeWidth="2"
                  />
                  <text
                    x={x}
                    y={y + 58}
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight="bold"
                    className="fill-[#000080]"
                  >
                    {caseItem.title.substring(0, 25)}...
                  </text>
                  <text x={x} y={y + 72} textAnchor="middle" fontSize="8" fill="#000">
                    Abu Dhabi | Level 2
                  </text>
                  <text
                    x={x}
                    y={y + 88}
                    textAnchor="middle"
                    fontSize="9"
                    fill={completed ? '#00ff00' : locked ? '#ff0000' : '#000'}
                    fontWeight="bold"
                  >
                    {completed ? '✓ SOLVED' : locked ? '🔒 LOCKED' : 'CLICK TO START'}
                  </text>
                </g>
              );
            })}

          {/* Level 3 Cases - Right side (Al Ain area) */}
          {cases
            .filter(c => c.difficulty === 3)
            .map((caseItem, idx) => {
              const x = 600;
              const y = 150 + idx * 150;
              const locked = isLocked(caseItem);
              const completed = completedCases.includes(caseItem.id);

              return (
                <g
                  key={caseItem.id}
                  className={locked ? 'cursor-not-allowed' : 'cursor-pointer hover:opacity-80'}
                  onClick={() => !locked && onSelectCase(caseItem.id)}
                >
                  <circle
                    cx={x}
                    cy={y}
                    r="30"
                    fill={completed ? '#00ff00' : getCaseColor(caseItem.difficulty)}
                    stroke="#000"
                    strokeWidth="3"
                    opacity={locked ? 0.3 : 1}
                  />
                  {locked && (
                    <g>
                      <rect x={x - 15} y={y - 15} width="30" height="30" fill="#808080" />
                      <text x={x} y={y + 5} textAnchor="middle" fontSize="20" fill="#fff">
                        🔒
                      </text>
                    </g>
                  )}
                  {completed && (
                    <text x={x} y={y + 5} textAnchor="middle" fontSize="20">
                      ✓
                    </text>
                  )}
                  {!locked && !completed && (
                    <text x={x} y={y + 5} textAnchor="middle" fontSize="16" fontWeight="bold">
                      3
                    </text>
                  )}

                  <rect
                    x={x - 80}
                    y={y + 40}
                    width="160"
                    height="60"
                    fill="#c0c0c0"
                    stroke="#000"
                    strokeWidth="2"
                  />
                  <text
                    x={x}
                    y={y + 58}
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight="bold"
                    className="fill-[#000080]"
                  >
                    {caseItem.title.substring(0, 25)}...
                  </text>
                  <text x={x} y={y + 72} textAnchor="middle" fontSize="8" fill="#000">
                    Al Ain | Level 3
                  </text>
                  <text
                    x={x}
                    y={y + 88}
                    textAnchor="middle"
                    fontSize="9"
                    fill={completed ? '#00ff00' : locked ? '#ff0000' : '#000'}
                    fontWeight="bold"
                  >
                    {completed ? '✓ SOLVED' : locked ? '🔒 LOCKED' : 'CLICK TO START'}
                  </text>
                </g>
              );
            })}

          {/* Connection lines */}
          <line
            x1="230"
            y1="150"
            x2="370"
            y2="150"
            stroke="#808080"
            strokeWidth="2"
            strokeDasharray="5,5"
          />
          <line
            x1="430"
            y1="150"
            x2="570"
            y2="150"
            stroke="#808080"
            strokeWidth="2"
            strokeDasharray="5,5"
          />
        </svg>
      </div>

      {/* Legend */}
      <div className="window-95-panel p-4">
        <div className="font-bold mb-2">LEGEND:</div>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#00ff00] border-2 border-black" />
            <span>Level 1 - Easy</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#ffff00] border-2 border-black" />
            <span>Level 2 - Medium</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#ff0000] border-2 border-black" />
            <span>Level 3 - Hard</span>
          </div>
        </div>
        <div className="mt-2 text-xs text-[#808080]">
          ✓ Complete cases in order to unlock the next difficulty level
        </div>
      </div>
    </div>
  );
}
