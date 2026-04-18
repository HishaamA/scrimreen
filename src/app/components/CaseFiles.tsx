import { FileText } from 'lucide-react';
import { Case } from '../types/game';

interface CaseFilesProps {
  cases: Case[];
  onSelectCase: (caseId: string) => void;
  selectedCaseId?: string | null;
  caseStarted?: boolean;
}

export function CaseFiles({ cases, onSelectCase, selectedCaseId, caseStarted }: CaseFilesProps) {
  return (
    <div className="p-4 bg-[#c0c0c0] h-full">
      <div className="window-95-panel p-3 mb-4 bg-black text-green-400 font-mono">
        <div className="text-sm">UAE DETECTIVE BUREAU - CASE FILES SYSTEM v2.0</div>
        <div className="text-xs opacity-80">
          {caseStarted ? 'Case in progress - Selection locked' : 'Select a case to begin investigation'}
        </div>
      </div>

      {caseStarted && (
        <div className="window-95-panel mb-4 p-3 bg-red-100 border-2 border-red-500">
          <div className="text-sm font-bold text-red-700">⚠️ CASE IN PROGRESS</div>
          <div className="text-xs text-red-600 mt-1">
            You cannot select a new case while an investigation is active. Complete or exit your current case first.
          </div>
        </div>
      )}

      <div className="space-y-2">
        {cases.map((caseItem) => (
          <div
            key={caseItem.id}
            onClick={() => !caseStarted && onSelectCase(caseItem.id)}
            className={`window-95-panel p-3 bg-white border-2 border-[#808080] group transition-colors ${
              caseStarted 
                ? 'opacity-50 cursor-not-allowed' 
                : selectedCaseId === caseItem.id
                ? 'bg-[#000080] text-white'
                : 'hover:bg-[#000080] hover:text-white cursor-pointer'
            }`}
          >
            <div className="flex items-start gap-3">
              <FileText className={`w-8 h-8 flex-shrink-0 ${
                selectedCaseId === caseItem.id ? 'text-white' : 'text-[#000080] group-hover:text-white'
              }`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-sm">{caseItem.title}</h3>
                  <span className="text-xs bg-yellow-200 text-black px-2 py-0.5 group-hover:bg-yellow-300">
                    LEVEL {caseItem.difficulty}
                  </span>
                </div>
                <p className="text-xs mb-2 line-clamp-2">{caseItem.description}</p>
                <div className="flex gap-4 text-xs opacity-70">
                  <span>📁 {caseItem.suspects.length} suspects</span>
                  <span>🔍 {caseItem.evidence.length} evidence items</span>
                  <span>📍 {caseItem.locations.length} locations</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="window-95-panel mt-4 p-2 text-xs">
        <strong>TIP:</strong> Start with Level 1 cases to learn the investigation system.
        Advanced cases require expert Python skills and pattern recognition.
      </div>
    </div>
  );
}