import { useState } from 'react';
import { BookOpen, Star, Database, Lock, Play, CheckCircle } from 'lucide-react';
import { Case } from '../types/game';

interface HomeScreenProps {
  cases: Case[];
  completedCases: string[];
  onStart: (caseId: string) => void;
  onOpenManual: (type?: string) => void;
}

export function HomeScreen({ cases, completedCases, onStart, onOpenManual }: HomeScreenProps) {
  const [showManuals, setShowManuals] = useState(false);

  const isCaseUnlocked = (index: number) => {
    if (index === 0) return true;
    return completedCases.includes(cases[index - 1].id);
  };

  return (
    <div className="fixed inset-0 bg-[#000080] overflow-y-auto">
      <div className="flex min-h-full items-center justify-center py-8">
        {/* Retro animated background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)`,
          }} />
        </div>

        <div className="relative z-10 w-full max-w-4xl px-8">
          {/* Title */}
          <div className="mb-8 text-center">
            <div className="bg-gradient-to-r from-yellow-400 via-red-500 to-purple-600 text-transparent bg-clip-text">
              <h1 className="text-7xl font-bold mb-2" style={{ 
                textShadow: '3px 3px 0 rgba(0,0,0,0.3)',
                fontFamily: 'Impact, sans-serif',
              }}>
                UAEPD
              </h1>
              <h2 className="text-5xl font-bold" style={{ 
                textShadow: '3px 3px 0 rgba(0,0,0,0.3)',
                fontFamily: 'Impact, sans-serif',
              }}>
                ENVIRO-CRIMES DIVISION
              </h2>
            </div>
            <div className="text-yellow-300 text-xl mt-4 font-bold">
              Solve Crimes Using Python & SQL
            </div>
          </div>

          {/* Main Panel */}
          <div className="bg-[#c0c0c0] border-4 border-[#dfdfdf] border-t-white border-l-white shadow-[4px_4px_0_#000000] p-6">
            <div className="mb-6 text-center">
              <h3 className="text-2xl font-bold mb-1">Select a Case</h3>
              <p className="text-sm text-gray-700">Complete each case to unlock the next one</p>
            </div>

            {/* Case Cards */}
            <div className="space-y-4 mb-6">
              {cases.map((caseData, index) => {
                const isUnlocked = isCaseUnlocked(index);
                const isCompleted = completedCases.includes(caseData.id);

                return (
                  <button
                    key={caseData.id}
                    onClick={() => isUnlocked && onStart(caseData.id)}
                    disabled={!isUnlocked}
                    className={`window-95-button w-full p-6 text-left relative overflow-hidden ${
                      isCompleted ? 'bg-green-200' : isUnlocked ? 'bg-yellow-100' : 'bg-gray-300'
                    } ${!isUnlocked ? 'opacity-60 cursor-not-allowed' : 'hover:bg-[#dfdfdf]'}`}
                  >
                    <div className="flex items-center gap-4">
                      {/* Case Number */}
                      <div className={`w-20 h-20 ${isUnlocked ? 'bg-[#000080]' : 'bg-gray-500'} border-4 border-black flex items-center justify-center flex-shrink-0`}>
                        {isUnlocked ? (
                          <div className="text-center">
                            <div className="text-xs font-bold text-white">CASE</div>
                            <div className="text-3xl font-bold text-white">{index + 1}</div>
                          </div>
                        ) : (
                          <Lock className="w-10 h-10 text-white" />
                        )}
                      </div>

                      {/* Case Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="text-xl font-bold">{caseData.title}</h4>
                          {isCompleted && (
                            <span className="bg-green-600 text-white text-xs px-2 py-1 flex items-center gap-1 font-bold">
                              <CheckCircle className="w-3 h-3" />
                              COMPLETED
                            </span>
                          )}
                        </div>
                        <div className="text-sm mb-1">
                          <span className="font-bold">Location:</span> {caseData.location}
                        </div>
                        <div className="text-sm mb-2">
                          <span className="font-bold">Type:</span> {caseData.type}
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-xs font-bold mr-1">Difficulty:</span>
                          {Array.from({ length: caseData.difficulty }).map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                          ))}
                        </div>
                        {!isUnlocked && (
                          <div className="mt-2 text-xs text-red-600 font-bold flex items-center gap-1">
                            <Lock className="w-3 h-3" />
                            Complete the previous case to unlock
                          </div>
                        )}
                      </div>

                      {/* Action */}
                      {isUnlocked && !isCompleted && (
                        <Play className="w-10 h-10 text-green-600" />
                      )}
                      {isCompleted && (
                        <CheckCircle className="w-10 h-10 text-green-600 fill-green-200" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Manual Access */}
            {!showManuals ? (
              <button
                onClick={() => setShowManuals(true)}
                className="window-95-button w-full p-3 flex items-center justify-center gap-2 bg-blue-100"
              >
                <BookOpen className="w-5 h-5" />
                <span className="font-bold">Need Help? View Python & SQL Manuals</span>
              </button>
            ) : (
              <div className="space-y-2">
                <button
                  onClick={() => setShowManuals(false)}
                  className="window-95-button px-3 py-1 mb-2 text-xs"
                >
                  ← Hide Manuals
                </button>
                <button
                  onClick={() => onOpenManual('python')}
                  className="window-95-button w-full p-3 flex items-center gap-3 hover:bg-[#dfdfdf] bg-yellow-100"
                >
                  <BookOpen className="w-6 h-6" />
                  <div className="text-left flex-1">
                    <div className="font-bold">Decryption for Dummies</div>
                    <div className="text-xs">Learn decryption techniques before you start</div>
                  </div>
                </button>
                <button
                  onClick={() => onOpenManual('sql')}
                  className="window-95-button w-full p-3 flex items-center gap-3 hover:bg-[#dfdfdf] bg-blue-100"
                >
                  <Database className="w-6 h-6" />
                  <div className="text-left flex-1">
                    <div className="font-bold">SQL for Dummies</div>
                    <div className="text-xs">Learn SQL basics before you start</div>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="text-center mt-6 text-white text-sm">
            <p>© 2026 UAE Detective Bureau • All Rights Reserved</p>
            <p className="mt-1 text-yellow-300">Powered by CATCHtech Systems</p>
          </div>
        </div>
      </div>
    </div>
  );
}