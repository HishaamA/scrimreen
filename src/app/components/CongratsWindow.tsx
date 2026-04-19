import { Trophy, Star } from 'lucide-react';

interface CongratsWindowProps {
  suspectName: string;
  caseTitle: string;
  onContinue: () => void;
}

export function CongratsWindow({ suspectName, caseTitle, onContinue }: CongratsWindowProps) {
  return (
    <div className="fixed inset-0 z-[10001] flex items-center justify-center bg-black/80">
      <div className="window-95 bg-[#c0c0c0] border-2 border-[#dfdfdf] border-t-white border-l-white shadow-[4px_4px_0_#000000] w-[600px]">
        {/* Title Bar */}
        <div className="window-95-titlebar bg-gradient-to-r from-[#000080] to-[#1084d0] text-white px-3 py-2 flex items-center justify-between">
          <span className="font-bold flex items-center gap-2">
            <Trophy className="w-5 h-5" />
            🎉 CASE SOLVED!
          </span>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="text-center space-y-4">
            {/* Success Icon */}
            <div className="flex justify-center">
              <Trophy className="w-20 h-20 text-yellow-600" />
            </div>

            {/* Main Message */}
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-[#000080]">
                CONGRATULATIONS!
              </h1>
              <div className="flex items-center justify-center gap-2">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              </div>
            </div>

            {/* Case Details */}
            <div className="window-95-panel bg-white p-4 text-left space-y-2">
              <div className="text-center mb-3">
                <h2 className="text-lg font-bold text-[#000080]">Case Closed Successfully</h2>
              </div>

              <div className="space-y-1 text-sm">
                <div className="flex justify-between items-center py-2 border-b-2 border-[#808080]">
                  <span className="font-bold text-gray-600">Case:</span>
                  <span className="text-right text-gray-800">{caseTitle}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b-2 border-[#808080]">
                  <span className="font-bold text-gray-600">Arrested:</span>
                  <span className="text-right font-bold text-[#000080]">{suspectName}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-bold text-gray-600">Status:</span>
                  <span className="text-right">
                    <span className="bg-[#008000] text-white px-3 py-1 text-xs font-bold border border-[#004000]">
                      ✓ CONVICTED
                    </span>
                  </span>
                </div>
              </div>
            </div>

            {/* Achievement Banner */}
            <div className="window-95-panel bg-[#ffffcc] p-3 border-2 border-[#808080]">
              <div className="flex items-center justify-center gap-3">
                <div className="text-3xl">🏆</div>
                <div className="text-left">
                  <div className="font-bold text-[#000080]">Outstanding Detective Work!</div>
                  <div className="text-sm text-gray-700">Next case unlocked</div>
                </div>
              </div>
            </div>

            {/* Message */}
            <p className="text-gray-700 italic text-sm">
              "Excellent work, Detective. The environment is safer thanks to you."
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="p-4 flex justify-center border-t-2 border-[#808080]">
          <button
            onClick={onContinue}
            className="window-95-button px-12 py-3 text-lg font-bold"
          >
            CONTINUE →
          </button>
        </div>
      </div>
    </div>
  );
}
