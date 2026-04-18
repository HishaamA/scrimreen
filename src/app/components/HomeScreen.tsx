import { useState } from 'react';
import { BookOpen, Award, Star, Database, Lock, Trophy, Play, AlertCircle, CheckCircle } from 'lucide-react';
import { Case } from '../types/game';

interface HomeScreenProps {
  cases: Case[];
  completedCases: string[];
  onStart: (caseId: string | null, difficulty: 'easy' | 'medium' | 'hard') => void;
  onOpenManual: (type?: string) => void;
}

export function HomeScreen({ cases, completedCases, onStart, onOpenManual }: HomeScreenProps) {
  const [selectedDifficulty, setSelectedDifficulty] = useState<'easy' | 'medium' | 'hard' | null>(null);
  const [showManuals, setShowManuals] = useState(false);

  // Group cases by difficulty
  const getCasesForDifficulty = (difficulty: 'easy' | 'medium' | 'hard') => {
    const difficultyMap = { easy: 1, medium: 2, hard: 3 };
    return cases.filter(c => c.difficulty === difficultyMap[difficulty]);
  };

  // Check if a level is unlocked
  const isLevelUnlocked = (levelIndex: number, difficultyCases: Case[]) => {
    if (levelIndex === 0) return true; // First level always unlocked
    
    // Check if previous level is completed
    const previousCase = difficultyCases[levelIndex - 1];
    return previousCase && completedCases.includes(previousCase.id);
  };

  const handleLevelClick = (caseData: Case, isUnlocked: boolean) => {
    if (!isUnlocked || !selectedDifficulty) return;
    onStart(caseData.id, selectedDifficulty);
  };

  const difficultySettings = {
    easy: {
      label: 'Easy Mode',
      description: 'Unlimited queries, helpful hints, perfect for beginners',
      color: 'bg-green-500',
      bgColor: 'bg-green-100',
      borderColor: 'border-green-600',
    },
    medium: {
      label: 'Medium Mode',
      description: 'Standard investigation, balanced difficulty',
      color: 'bg-yellow-500',
      bgColor: 'bg-yellow-100',
      borderColor: 'border-yellow-600',
    },
    hard: {
      label: 'Hard Mode',
      description: 'Limited queries, minimal hints, for expert detectives',
      color: 'bg-red-500',
      bgColor: 'bg-red-100',
      borderColor: 'border-red-600',
    },
  };

  // Main difficulty selection screen
  if (!selectedDifficulty) {
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
              <h3 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
                <Award className="w-8 h-8" />
                Select Your Difficulty
              </h3>
              <p className="text-sm text-gray-700">Each difficulty has 5 levels. Complete levels to unlock the next!</p>
            </div>

            {/* Difficulty Selection Cards */}
            <div className="space-y-4 mb-6">
              {(Object.keys(difficultySettings) as Array<keyof typeof difficultySettings>).map((diff) => {
                const difficultyCases = getCasesForDifficulty(diff);
                const completedCount = difficultyCases.filter(c => completedCases.includes(c.id)).length;
                const totalLevels = difficultyCases.length;
                
                return (
                  <button
                    key={diff}
                    onClick={() => setSelectedDifficulty(diff)}
                    className={`window-95-button w-full p-6 text-left hover:bg-[#dfdfdf] ${difficultySettings[diff].bgColor}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 ${difficultySettings[diff].color} border-2 border-black flex-shrink-0`} />
                      <div className="flex-1">
                        <h4 className="text-xl font-bold mb-1">{difficultySettings[diff].label}</h4>
                        <p className="text-sm mb-2">{difficultySettings[diff].description}</p>
                        <div className="flex items-center gap-2 text-xs">
                          <Trophy className="w-4 h-4" />
                          <span className="font-bold">Progress: {completedCount}/{totalLevels} Levels Completed</span>
                        </div>
                      </div>
                      <Play className="w-8 h-8 text-gray-600" />
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
                    <div className="font-bold">Python for Dummies</div>
                    <div className="text-xs">Learn Python basics before you start</div>
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

  // Level selection screen for chosen difficulty
  const difficultyCases = getCasesForDifficulty(selectedDifficulty);
  const settings = difficultySettings[selectedDifficulty];

  return (
    <div className="fixed inset-0 bg-[#000080] overflow-y-auto">
      <div className="flex min-h-full items-center justify-center py-8">
      {/* Retro animated background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)`,
        }} />
      </div>

      <div className="relative z-10 w-full max-w-5xl px-8">
        {/* Title */}
        <div className="mb-6 text-center">
          <div className="text-white">
            <h1 className="text-4xl font-bold mb-2">UAEPD Enviro-crimes Division</h1>
            <h2 className="text-2xl font-bold text-yellow-300 flex items-center justify-center gap-2">
              {settings.label}
            </h2>
          </div>
        </div>

        {/* Level Selection Panel */}
        <div className="bg-[#c0c0c0] border-4 border-[#dfdfdf] border-t-white border-l-white shadow-[4px_4px_0_#000000] p-6">
          <div className="mb-4">
            <button
              onClick={() => setSelectedDifficulty(null)}
              className="window-95-button px-4 py-2 mb-4"
            >
              ← Back to Difficulty Selection
            </button>
            
            <div className={`${settings.bgColor} border-2 ${settings.borderColor} p-3 mb-4`}>
              <div className="font-bold text-sm mb-1 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                {settings.label} - Level Progression
              </div>
              <div className="text-xs">Complete each level to unlock the next one. Only the first level is available!</div>
            </div>
          </div>

          {/* Levels Grid */}
          <div className="grid grid-cols-1 gap-4">
            {difficultyCases.map((caseData, index) => {
              const isUnlocked = isLevelUnlocked(index, difficultyCases);
              const isCompleted = completedCases.includes(caseData.id);
              
              return (
                <button
                  key={caseData.id}
                  onClick={() => handleLevelClick(caseData, isUnlocked)}
                  disabled={!isUnlocked}
                  className={`window-95-button p-6 text-left relative overflow-hidden ${
                    isCompleted ? 'bg-green-200' : isUnlocked ? settings.bgColor : 'bg-gray-300'
                  } ${!isUnlocked ? 'opacity-60 cursor-not-allowed' : 'hover:bg-[#dfdfdf]'}`}
                >
                  <div className="flex items-center gap-4">
                    {/* Level Number Badge */}
                    <div className={`w-20 h-20 ${settings.color} border-4 border-black flex items-center justify-center flex-shrink-0`}>
                      {isUnlocked ? (
                        <div className="text-center">
                          <div className="text-xs font-bold text-white">LEVEL</div>
                          <div className="text-3xl font-bold text-white">{index + 1}</div>
                        </div>
                      ) : (
                        <Lock className="w-10 h-10 text-white" />
                      )}
                    </div>

                    {/* Case Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-bold">{caseData.title}</h3>
                        {isCompleted && (
                          <span className="bg-green-600 text-white text-xs px-2 py-1 flex items-center gap-1 font-bold">
                            <CheckCircle className="w-3 h-3" />
                            COMPLETED
                          </span>
                        )}
                      </div>
                      <div className="text-sm mb-1 flex items-center gap-2">
                        <span className="font-bold">Location:</span> {caseData.location}
                      </div>
                      <div className="text-sm mb-2 flex items-center gap-2">
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
                          Complete Level {index} to unlock this level
                        </div>
                      )}
                    </div>

                    {/* Action Arrow */}
                    {isUnlocked && !isCompleted && (
                      <div className="text-4xl font-bold text-green-600 animate-pulse">
                        →
                      </div>
                    )}
                    {isCompleted && (
                      <CheckCircle className="w-12 h-12 text-green-600 fill-green-200" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-white text-sm">
          <p>© 2026 UAE Detective Bureau • CATCHtech Systems</p>
        </div>
      </div>
      </div>
    </div>
  );
}