import { Trophy, Star, Sparkles } from 'lucide-react';

interface CongratsWindowProps {
  suspectName: string;
  caseTitle: string;
  onContinue: () => void;
}

export function CongratsWindow({ suspectName, caseTitle, onContinue }: CongratsWindowProps) {
  return (
    <div className="fixed inset-0 z-[10001] flex items-center justify-center bg-black/80">
      <div className="bg-[#c0c0c0] border-4 border-[#dfdfdf] border-t-white border-l-white shadow-[12px_12px_0_#000000] w-[600px]">
        {/* Title Bar */}
        <div className="bg-gradient-to-r from-green-700 to-green-500 text-white px-3 py-2 flex items-center justify-between">
          <span className="font-bold flex items-center gap-2">
            <Trophy className="w-5 h-5" />
            🎉 CASE SOLVED!
          </span>
        </div>

        {/* Content */}
        <div className="p-8 bg-gradient-to-br from-yellow-50 to-green-50 border-4 border-green-500 m-4">
          <div className="text-center space-y-6">
            {/* Success Icon */}
            <div className="flex justify-center">
              <div className="relative">
                <Trophy className="w-24 h-24 text-yellow-600 animate-bounce" />
                <Sparkles className="w-8 h-8 text-yellow-400 absolute -top-2 -right-2 animate-pulse" />
                <Sparkles className="w-6 h-6 text-yellow-400 absolute -bottom-1 -left-1 animate-pulse" style={{ animationDelay: '0.3s' }} />
              </div>
            </div>

            {/* Main Message */}
            <div className="space-y-3">
              <h1 className="text-3xl font-bold text-green-800">
                CONGRATULATIONS!
              </h1>
              <div className="flex items-center justify-center gap-2">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              </div>
            </div>

            {/* Case Details */}
            <div className="bg-white border-4 border-gray-300 p-6 text-left space-y-3">
              <div className="text-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Case Closed Successfully</h2>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center py-2 border-b-2 border-gray-200">
                  <span className="font-bold text-gray-600">Case:</span>
                  <span className="text-right text-gray-800">{caseTitle}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b-2 border-gray-200">
                  <span className="font-bold text-gray-600">Arrested:</span>
                  <span className="text-right font-bold text-green-700">{suspectName}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-bold text-gray-600">Status:</span>
                  <span className="text-right">
                    <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                      ✓ CONVICTED
                    </span>
                  </span>
                </div>
              </div>
            </div>

            {/* Achievement Banner */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-lg shadow-lg">
              <div className="flex items-center justify-center gap-3">
                <div className="text-4xl">🏆</div>
                <div className="text-left">
                  <div className="font-bold text-lg">Outstanding Detective Work!</div>
                  <div className="text-sm opacity-90">Next case unlocked</div>
                </div>
              </div>
            </div>

            {/* Message */}
            <p className="text-gray-700 italic">
              "Excellent work, Detective. The environment is safer thanks to you."
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="p-4 flex justify-center">
          <button
            onClick={onContinue}
            className="window-95-button px-12 py-3 text-lg font-bold bg-gradient-to-r from-green-400 to-green-600 text-white hover:from-green-500 hover:to-green-700"
          >
            CONTINUE →
          </button>
        </div>
      </div>
    </div>
  );
}
