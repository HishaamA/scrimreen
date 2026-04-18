import { Trophy, CheckCircle, XCircle, ArrowLeft } from 'lucide-react';

interface SolutionScreenProps {
  isCorrect: boolean;
  selectedSuspect: string;
  actualCulprit: string;
  solution: {
    who: string;
    why: string;
    how: string;
  };
  queriesUsed: number;
  maxQueries: number;
  onPlayAgain: () => void;
}

export function SolutionScreen({
  isCorrect,
  selectedSuspect,
  actualCulprit,
  solution,
  queriesUsed,
  maxQueries,
  onPlayAgain
}: SolutionScreenProps) {
  return (
    <div className="size-full bg-[#008080] flex items-center justify-center p-8">
      <div className="window-95 w-full max-w-3xl">
        {/* Title Bar */}
        <div className="window-95-titlebar">
          <span className="text-sm">Case Result</span>
        </div>

        {/* Content */}
        <div className="bg-[#c0c0c0] p-6">
          <div className="text-center mb-6">
            {isCorrect ? (
              <div>
                <div className="text-6xl mb-4">✓</div>
                <h2 className="text-3xl font-bold text-[#000080] mb-2">CASE SOLVED!</h2>
                <p className="text-lg">Outstanding detective work!</p>
              </div>
            ) : (
              <div>
                <div className="text-6xl mb-4">✗</div>
                <h2 className="text-3xl font-bold text-red-600 mb-2">CASE UNSOLVED</h2>
                <p className="text-lg text-red-700">Wrong suspect accused</p>
              </div>
            )}
          </div>

          <div className="window-95-panel p-4 mb-4 bg-white">
            <h3 className="text-lg font-bold mb-3 text-[#000080]">CASE BREAKDOWN</h3>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between border-b border-[#808080] pb-2">
                <span className="font-bold">Your Accusation:</span>
                <span>{selectedSuspect}</span>
              </div>

              <div className="flex justify-between border-b border-[#808080] pb-2">
                <span className="font-bold">Actual Culprit:</span>
                <span className={`font-bold ${isCorrect ? 'text-green-600' : 'text-gray-500'}`}>
                  {isCorrect ? actualCulprit : 'UNKNOWN'}
                </span>
              </div>

              {isCorrect && (
                <div className="pt-2">
                  <p className="font-bold mb-2 text-[#000080]">THE TRUTH:</p>
                  
                  <div className="space-y-2 window-95-panel p-3">
                    <div>
                      <p className="font-bold text-xs mb-1">WHO:</p>
                      <p className="text-sm">{solution.who}</p>
                    </div>
                    
                    <div>
                      <p className="font-bold text-xs mb-1">WHY:</p>
                      <p className="text-sm">{solution.why}</p>
                    </div>
                    
                    <div>
                      <p className="font-bold text-xs mb-1">HOW:</p>
                      <p className="text-sm">{solution.how}</p>
                    </div>
                  </div>
                </div>
              )}

              {!isCorrect && (
                <div className="pt-2">
                  <div className="window-95-panel p-3 bg-red-50 border-2 border-red-400">
                    <p className="font-bold text-sm text-red-700 mb-2">❌ INCORRECT ACCUSATION</p>
                    <p className="text-xs text-red-600">
                      The suspect you accused was not the perpetrator. Review the evidence more carefully and try again.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="window-95-panel p-4 mb-4 bg-yellow-50">
            <p className="text-sm text-center">
              {isCorrect 
                ? "🌟 Excellent work! You've proven your detective skills."
                : "💡 Review the evidence more carefully next time. The clues were all there."}
            </p>
          </div>

          <button
            onClick={onPlayAgain}
            className="window-95-button w-full py-3 text-base font-bold"
          >
            ← RETURN TO MAIN MENU
          </button>
        </div>
      </div>
    </div>
  );
}