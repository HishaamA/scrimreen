import { useState } from 'react';
import { X, Lightbulb, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { Case } from '../types/game';

const TUTORIAL_STEPS = [
  {
    title: "Welcome, Detective!",
    message: "I'm Officer Chip, your AI assistant. I'll help you solve environmental crimes in the UAE! Let me show you how to get started.",
  },
  {
    title: "Step 1: Case Briefing",
    message: "After selecting a level, read the case briefing carefully. Pay attention to the crime details, suspects, and evidence. This is crucial for solving the case!",
  },
  {
    title: "Step 2: Use Decryption Software",
    message: "Open the 'Decryption Software' to decrypt encoded messages using functions like caesar_cipher() and base64_decode(). Decode any encrypted data found in evidence!",
  },
  {
    title: "Step 3: Analyze Evidence",
    message: "Open 'Evidence' from the desktop to view all case evidence. Look for connections between suspects, motives, and alibis. Cross-reference with your SQL queries!",
  },
  {
    title: "Step 4: Use the Manuals",
    message: "Need help with Python or SQL? Open 'Python for Dummies' or 'SQL for Dummies' from the desktop. They unlock chapters based on your current case!",
  },
  {
    title: "Step 5: Take Notes",
    message: "Use the Notepad to document your findings! You can create multiple pages, highlight important clues, format text with colors, and organize your investigation.",
  },
  {
    title: "Step 6: Accuse the Suspect",
    message: "When you've identified the culprit, click the 'ACCUSE SUSPECT' button in the taskbar. Enter the suspect's exact name. Be careful - you only get one shot!",
  },
  {
    title: "Bonus Tip",
    message: "Open the Music Player for some detective noir music while you investigate. Good luck, Detective! Click 'Finish' to start solving crimes.",
  },
];

const CASE_HINTS: Record<string, string[]> = {
  'case-001': [
    "🔍 Try running: SELECT * FROM vehicle_registry WHERE time_passed_under_toll LIKE '%18:3%' to find vehicles that passed the toll around the time of the crime.",
    "💡 The evidence mentions plastic bottles with factory codes. Look for connections between the vehicle owner and industrial activities or transport.",
    "🚗 Cross-reference the vehicle plate from the toll records with the suspects table using: SELECT * FROM suspects WHERE vehicle_plate = 'PLATE_ID_HERE'",
  ],
  'case-002': [
    "[Incoming Message: Officer Chip]\n\n\"Hey Detective, Officer Chip here! I saw the Chief storm out towards the parking lot—I'd stay out of his way for a bit. Don't let the complex data manipulation intimidate you. If you're stuck on the logs, ask for hints for a few technical nudges to get you moving:\"",
    "🔓 Hint 1: Use caesar_cipher() function to decrypt the message. Try different shift values (-3 is common for Caesar ciphers). Example: caesar_cipher(\"Wre gxps dqlyq...\", -3)",
    "🚛 Hint 2: Once decrypted, the message mentions vehicle details. Query the vehicle registry and GPS data to find tanker A-14***, then cross-reference with suspects who have access to industrial vehicles.",
  ],
  'default': [
    "🔍 Carefully examine all evidence. Look for timestamps, locations, and connections between different pieces of evidence.",
    "💡 Use SQL queries to cross-reference suspects with evidence. Try: SELECT * FROM suspects WHERE location = 'EVIDENCE_LOCATION'",
    "🚗 Don't forget to check vehicle records, phone data, and witness statements. They often contain the key to solving the case!",
  ],
};

interface PoliceMascotProps {
  onClose?: () => void;
  currentCase?: Case | null;
}

export function PoliceMascot({ onClose, currentCase }: PoliceMascotProps) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [showTutorial, setShowTutorial] = useState(true);
  const [tutorialStep, setTutorialStep] = useState(0);
  const [hintsGiven, setHintsGiven] = useState(0);
  const [showHintLimit, setShowHintLimit] = useState(false);

  // Get hints for current case, fallback to default
  const currentHints = currentCase?.id && CASE_HINTS[currentCase.id] 
    ? CASE_HINTS[currentCase.id] 
    : CASE_HINTS['default'];

  const nextTutorialStep = () => {
    if (tutorialStep < TUTORIAL_STEPS.length - 1) {
      setTutorialStep(tutorialStep + 1);
    } else {
      setShowTutorial(false);
      setTutorialStep(0);
    }
  };

  const previousTutorialStep = () => {
    if (tutorialStep > 0) {
      setTutorialStep(tutorialStep - 1);
    }
  };

  const getHint = () => {
    if (hintsGiven >= 3) {
      setShowHintLimit(true);
      setTimeout(() => setShowHintLimit(false), 3000);
      return;
    }
    setHintsGiven(hintsGiven + 1);
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-14 right-2 z-50 animate-bounce">
        <button
          onClick={() => setIsMinimized(false)}
          className="window-95-button px-3 py-2 flex items-center gap-2 shadow-lg"
        >
          <span className="text-2xl">👮</span>
          <span className="text-sm font-bold">Officer Chip</span>
          <ChevronUp className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-14 right-2 w-96 z-50 animate-slide-in">
      {/* Helper Window */}
      <div className="bg-[#c0c0c0] border-2 border-[#dfdfdf] border-t-white border-l-white shadow-[4px_4px_0_#000000]">
        {/* Title Bar */}
        <div className="bg-gradient-to-r from-[#000080] to-[#1084d0] text-white px-2 py-1 flex items-center justify-between cursor-move">
          <div className="flex items-center gap-2">
            <span className="text-xl">👮</span>
            <span className="font-bold text-sm">Officer Chip - Your AI Assistant</span>
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => setIsMinimized(true)}
              className="w-5 h-5 bg-[#c0c0c0] border border-white text-black flex items-center justify-center text-xs font-bold hover:bg-[#dfdfdf]"
              title="Minimize"
            >
              <ChevronDown className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-3 max-h-[500px] overflow-y-auto">
          {/* Tutorial Section */}
          {showTutorial ? (
            <div className="bg-[#dfdfdf] border-2 border-[#808080] p-3 mb-2">
              {/* Mascot with speech bubble */}
              <div className="flex items-start gap-3 mb-3">
                <div className="text-5xl">👮</div>
                <div className="flex-1 relative">
                  <div className="bg-white border-2 border-[#000080] p-3 rounded-lg shadow-lg relative">
                    {/* Speech bubble tail */}
                    <div className="absolute left-0 top-4 -ml-2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-[#000080]"></div>
                    <div className="absolute left-0 top-4 -ml-1 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-white"></div>
                    
                    <h4 className="font-bold text-sm mb-2 text-[#000080] flex items-center gap-1">
                      <Lightbulb className="w-4 h-4 text-yellow-600" />
                      {TUTORIAL_STEPS[tutorialStep].title}
                    </h4>
                    <p className="text-xs leading-relaxed">{TUTORIAL_STEPS[tutorialStep].message}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-3">
                <button 
                  onClick={previousTutorialStep}
                  disabled={tutorialStep === 0}
                  className="window-95-button px-3 py-1 text-xs disabled:opacity-50"
                >
                  ← Back
                </button>
                <span className="text-xs text-gray-600 font-bold">
                  Step {tutorialStep + 1} of {TUTORIAL_STEPS.length}
                </span>
                <button onClick={nextTutorialStep} className="window-95-button px-3 py-1 text-xs font-bold">
                  {tutorialStep < TUTORIAL_STEPS.length - 1 ? 'Next →' : 'Finish ✓'}
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Avatar with greeting */}
              <div className="flex items-start gap-3 mb-3">
                <div className="text-5xl">👮</div>
                <div className="flex-1">
                  <h3 className="font-bold text-sm mb-1">Officer Chip</h3>
                  <p className="text-xs bg-white border border-[#808080] p-2">
                    Hello Detective! I'm here to help you solve this case. Click below for hints!
                  </p>
                </div>
              </div>

              {/* Hint Display */}
              {hintsGiven > 0 && hintsGiven <= 3 && (
                <div className="bg-yellow-100 border-2 border-yellow-600 p-3 mb-2 shadow-inner">
                  <h4 className="font-bold text-xs mb-2 flex items-center gap-1">
                    <Lightbulb className="w-3 h-3 text-yellow-700" />
                    Hint #{hintsGiven}:
                  </h4>
                  <p className="text-xs leading-relaxed whitespace-pre-line">{currentHints[hintsGiven - 1]}</p>
                </div>
              )}

              {/* Limit Reached Message */}
              {showHintLimit && (
                <div className="bg-red-100 border-2 border-red-600 p-3 mb-2">
                  <div className="flex items-start gap-2">
                    <div className="text-2xl">😴</div>
                    <div>
                      <h4 className="font-bold text-xs mb-1">That's enough!</h4>
                      <p className="text-xs leading-relaxed">
                        I've worked enough for today. I don't get paid enough for this! You've got 3 solid hints, Detective. Time to crack this case yourself!
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-2">
                <button
                  onClick={getHint}
                  disabled={hintsGiven >= 3}
                  className={`window-95-button px-3 py-2 w-full text-xs flex items-center justify-center gap-2 font-bold ${
                    hintsGiven >= 3 ? 'bg-gray-200 opacity-50 cursor-not-allowed' : 'bg-green-100'
                  }`}
                >
                  <HelpCircle className="w-4 h-4" />
                  {hintsGiven >= 3 ? 'No More Hints Available' : `Get Hint (${3 - hintsGiven} left)`}
                </button>

                <button
                  onClick={() => {
                    setShowTutorial(true);
                    setTutorialStep(0);
                  }}
                  className="window-95-button px-3 py-2 w-full text-xs flex items-center justify-center gap-2 font-bold bg-blue-100"
                >
                  <Lightbulb className="w-4 h-4" />
                  Show Tutorial Again
                </button>
              </div>
            </>
          )}

          {/* Status */}
          <div className="mt-3 pt-2 border-t border-[#808080] text-xs text-center">
            <span className="text-green-600 font-bold">● </span>
            <span className="font-bold">Officer Chip is {hintsGiven >= 3 ? 'taking a break' : 'ready to help'}!</span>
          </div>
        </div>
      </div>
    </div>
  );
}