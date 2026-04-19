import { useState, useEffect, useCallback } from 'react';
import { Window95 } from './components/Window95';
import { Taskbar } from './components/Taskbar';
import { Desktop } from './components/Desktop';
import { MusicPlayer } from './components/MusicPlayer';
import { PythonEditor } from './components/PythonEditor';
import { EvidenceViewer } from './components/EvidenceViewer';
import { MapView } from './components/MapView';
import { DataTable } from './components/DataTable';
import { CaseFiles } from './components/CaseFiles';
import { CaseBriefing } from './components/CaseBriefing';
import { SolutionScreen } from './components/SolutionScreen';
import { StartMenu } from './components/StartMenu';
import { PoliceMascot } from './components/PoliceMascot';
import { HomeScreen } from './components/HomeScreen';
import { BootSequence } from './components/BootSequence';
import { WebBrowser } from './components/WebBrowser';
import { ManualViewer } from './components/ManualViewer';
import { Notepad } from './components/Notepad';
import { Settings } from './components/Settings';
import { VehicleRegistryDB } from './components/VehicleRegistryDB';
import { SuspectsDB } from './components/SuspectsDB';
import { SQLQueryTerminal } from './components/SQLQueryTerminal';
import { ArrestWarrant } from './components/ArrestWarrant';
import { AudioTranscriptModal } from './components/AudioTranscriptModal';
import { ChemicalCompaniesDB } from './components/ChemicalCompaniesDB';
import { ChemicalImportsDB } from './components/ChemicalImportsDB';
import { FleetLogsDB } from './components/FleetLogsDB';
import { MaritimeDB } from './components/MaritimeDB';
import { ProcessingWindow } from './components/ProcessingWindow';
import { CongratsWindow } from './components/CongratsWindow';
import { WindowState, Case } from './types/game';
import { cases } from './data/cases';
import { initGlobalClickSound, playBootSound, stopBackgroundMusic, startBackgroundMusic } from './utils/clickSound';
import '../styles/retro.css';

export default function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [showBootSequence, setShowBootSequence] = useState(false);
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [nextZIndex, setNextZIndex] = useState(100);
  const [draggedWindow, setDraggedWindow] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [caseStarted, setCaseStarted] = useState(false);
  const [queryResults, setQueryResults] = useState<any>(null);
  const [completedCases, setCompletedCases] = useState<string[]>([]);
  const [showSolution, setShowSolution] = useState(false);
  const [accusedSuspect, setAccusedSuspect] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [showMascot, setShowMascot] = useState(false);

  const [showAccuseModal, setShowAccuseModal] = useState(false);
  const [accuseInput, setAccuseInput] = useState('');
  const [showArrestWarrant, setShowArrestWarrant] = useState(false);
  const [isValidSuspect, setIsValidSuspect] = useState(false);
  const [detectiveName, setDetectiveName] = useState('');
  const [showAudioTranscript, setShowAudioTranscript] = useState(false);
  const [showProcessing, setShowProcessing] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);

  // Get valid suspects/culprits based on current case
  const getValidCulprits = () => {
    if (!selectedCase) {
      return ['Ahmed Khalfan', 'Simreen Siraj']; // Default for case 1 and 2
    }
    
    // For case-011 (The Midnight Brine), the culprit is a company ID
    if (selectedCase.id === 'case-011') {
      return ['C-42', 'C-09', 'C-18', 'C-77']; // Company IDs from the database
    }
    
    // For other cases, use suspect names
    return selectedCase.suspects.map(s => s.name);
  };

  const VALID_SUSPECTS = getValidCulprits();

  // Initialize global click sound on mount and get detective name
  useEffect(() => {
    initGlobalClickSound();
    // Stop any existing background music that might be playing
    stopBackgroundMusic();
    // Get detective name from localStorage
    const savedName = localStorage.getItem('officerName') || 'Detective';
    setDetectiveName(savedName);
  }, []);

  const createWindow = (type: string, title: string, width: number, height: number) => {
    const newWindow: WindowState = {
      id: `window-${Date.now()}`,
      title,
      type,
      isMinimized: false,
      isMaximized: false,
      position: {
        x: Math.random() * 200 + 100,
        y: Math.random() * 100 + 50,
      },
      size: { width, height },
      zIndex: nextZIndex,
    };
    setWindows([...windows, newWindow]);
    setNextZIndex(nextZIndex + 1);
  };

  const handleOpenWindow = (type: string) => {
    // Check if window already exists (including minimized ones)
    const existing = windows.find(w => w.type === type);
    if (existing) {
      if (existing.isMinimized) {
        restoreWindow(existing.id);
      } else {
        focusWindow(existing.id);
      }
      return;
    }

    switch (type) {
      case 'musicPlayer':
        createWindow(type, 'Music Player', 400, 500);
        break;
      case 'pythonEditor':
        createWindow(type, 'Decryption Software', 700, 600);
        break;
      case 'evidence':
        createWindow(type, 'Evidence Files', 600, 500);
        break;
      case 'map':
        createWindow(type, 'UAE Case Map', 900, 700);
        break;
      case 'dataTable':
        createWindow(type, 'Query Results', 800, 500);
        break;
      case 'caseSelector':
        createWindow(type, 'Select Case', 700, 600);
        break;
      case 'caseFiles':
        createWindow(type, 'Case Files', 700, 600);
        break;
      case 'caseBriefing':
        if (selectedCase) {
          createWindow(type, `Case Briefing: ${selectedCase.title}`, 700, 600);
        }
        break;
      case 'webBrowser':
        createWindow(type, 'Internet Explorer - Detective Database', 800, 600);
        break;
      case 'pythonManual':
        createWindow(type, 'Decryption for Dummies - Detective Edition', 900, 650);
        break;
      case 'sqlManual':
        createWindow(type, 'SQL for Dummies - Detective Edition', 900, 650);
        break;
      case 'notepad':
        createWindow(type, 'Notepad', 500, 400);
        break;
      case 'settings':
        createWindow(type, 'Settings', 500, 400);
        break;
      case 'vehicleRegistryDB':
        createWindow(type, 'vehicle_registry', 800, 600);
        break;
      case 'suspectsDB':
        createWindow(type, 'suspects', 800, 600);
        break;
      case 'sqlTerminal':
        createWindow(type, 'SQL Query Terminal', 800, 600);
        break;
      case 'chemicalCompaniesDB':
        createWindow(type, 'Chemical Companies Database', 800, 600);
        break;
      case 'chemicalImportsDB':
        createWindow(type, 'chemical_imports', 900, 600);
        break;
      case 'fleetLogsDB':
        createWindow(type, 'fleet_logs', 900, 600);
        break;
      case 'maritimeDB':
        createWindow(type, 'Maritime & Environmental Database', 900, 650);
        break;
      default:
        createWindow(type, type, 500, 400);
    }
  };

  const closeWindow = (id: string) => {
    setWindows(windows.filter(w => w.id !== id));
  };

  const minimizeWindow = (id: string) => {
    // First trigger the animation
    setWindows(windows.map(w => (w.id === id ? { ...w, isMinimizing: true } : w)));

    // After animation completes, actually minimize
    setTimeout(() => {
      setWindows(windows => windows.map(w => (w.id === id ? { ...w, isMinimized: true, isMinimizing: false } : w)));
    }, 400); // Match animation duration
  };

  const restoreWindow = (id: string) => {
    setWindows(windows.map(w => (w.id === id ? { ...w, isMinimized: false, zIndex: nextZIndex } : w)));
    setNextZIndex(nextZIndex + 1);
  };

  const maximizeWindow = (id: string) => {
    setWindows(windows.map(w => (w.id === id ? { ...w, isMaximized: !w.isMaximized } : w)));
  };

  const focusWindow = (id: string) => {
    setWindows(windows.map(w => (w.id === id ? { ...w, zIndex: nextZIndex } : w)));
    setNextZIndex(nextZIndex + 1);
  };

  const handleDragStart = (id: string, e: React.MouseEvent) => {
    const window = windows.find(w => w.id === id);
    if (!window || window.isMaximized) return;

    setDraggedWindow(id);
    setDragOffset({
      x: e.clientX - window.position.x,
      y: e.clientY - window.position.y,
    });
  };

  const handleDrag = useCallback(
    (e: MouseEvent) => {
      if (!draggedWindow) return;

      setWindows(windows =>
        windows.map(w =>
          w.id === draggedWindow
            ? {
                ...w,
                position: {
                  x: e.clientX - dragOffset.x,
                  y: e.clientY - dragOffset.y,
                },
              }
            : w
        )
      );
    },
    [draggedWindow, dragOffset]
  );

  const handleDragEnd = useCallback(() => {
    setDraggedWindow(null);
  }, []);

  // Add drag listeners
  useEffect(() => {
    if (draggedWindow) {
      document.addEventListener('mousemove', handleDrag);
      document.addEventListener('mouseup', handleDragEnd);
      return () => {
        document.removeEventListener('mousemove', handleDrag);
        document.removeEventListener('mouseup', handleDragEnd);
      };
    }
  }, [draggedWindow, handleDrag, handleDragEnd]);

  const handleSelectCase = (caseId: string) => {
    const caseData = cases.find(c => c.id === caseId);
    if (caseData) {
      setSelectedCase(caseData);
      setCaseStarted(false);
      setQueryResults(null);
      // Close case selector and open briefing
      setWindows(windows.filter(w => w.type !== 'caseSelector'));
      handleOpenWindow('caseBriefing');
    }
  };

  const handleStartCase = () => {
    setCaseStarted(true);
    // Open essential windows
    handleOpenWindow('pythonEditor');
    handleOpenWindow('evidence');
  };

  const handleQueryExecuted = (result: any) => {
    setQueryResults(result);
    handleOpenWindow('dataTable');
  };

  const handleAccuse = (suspectName: string) => {
    if (!selectedCase) return;
    setAccusedSuspect(suspectName);
    const correct = suspectName.toLowerCase() === selectedCase.culprit.toLowerCase();
    setIsCorrect(correct);
    
    // Only unlock next case if accusation is correct
    if (correct && !completedCases.includes(selectedCase.id)) {
      setCompletedCases([...completedCases, selectedCase.id]);
    }
    
    // Show audio transcript modal instead of solution screen
    setShowAudioTranscript(true);
  };

  const handleAudioTranscriptClose = () => {
    setShowAudioTranscript(false);
    
    if (isCorrect) {
      // If correct, prepare to navigate to next case
      const currentCaseIndex = cases.findIndex(c => c.id === selectedCase?.id);
      const nextCase = cases[currentCaseIndex + 1];
      
      if (nextCase) {
        // Reset all game state and show boot sequence before loading next case
        setWindows([]);
        setCaseStarted(false);
        setQueryResults(null);
        setAccusedSuspect('');
        setIsCorrect(false);
        setSelectedCase(nextCase);
        setGameStarted(false);
        
        // Show boot sequence after a brief delay
        setTimeout(() => {
          stopBackgroundMusic();
          playBootSound();
          setShowBootSequence(true);
        }, 500);
      } else {
        // No more cases, return to home screen
        handlePlayAgain();
      }
    }
    // If incorrect, just close the modal and let player try again
  };

  const handlePlayAgain = () => {
    setShowSolution(false);
    setSelectedCase(null);
    setCaseStarted(false);
    setQueryResults(null);
    setAccusedSuspect('');
    setWindows([]);
    setGameStarted(false);
  };

  const handleExit = () => {
    setWindows([]);
    setSelectedCase(null);
    setCaseStarted(false);
    setGameStarted(false);
  };

  const handleHomeScreenStart = (caseId: string) => {
    // Stop background music during boot sequence
    stopBackgroundMusic();

    // Play boot sound and start boot sequence
    playBootSound();
    setShowBootSequence(true);
    
    // User selected a specific case
    const caseData = cases.find(c => c.id === caseId);
    if (caseData) {
      setSelectedCase(caseData);
    }
  };

  const handleBootComplete = useCallback(() => {
    setShowBootSequence(false);
    setGameStarted(true);
    setShowMascot(true); // Show mascot after boot
    startBackgroundMusic();

    // If case is selected, open briefing after boot
    if (selectedCase) {
      setTimeout(() => {
        handleOpenWindow('caseBriefing');
      }, 500);
    }
  }, [selectedCase]);

  const handleOpenManual = (type: string = 'python') => {
    setGameStarted(true);
    setTimeout(() => {
      handleOpenWindow(type === 'sql' ? 'sqlManual' : 'pythonManual');
    }, 500);
  };

  const renderWindowContent = (window: WindowState) => {
    switch (window.type) {
      case 'musicPlayer':
        return <MusicPlayer />;
      case 'pythonEditor':
        return selectedCase ? (
          <PythonEditor currentCase={selectedCase} onQueryExecuted={handleQueryExecuted} />
        ) : (
          <div className="p-4">No case selected</div>
        );
      case 'evidence':
        return selectedCase ? (
          <EvidenceViewer evidence={selectedCase.evidence} />
        ) : (
          <div className="p-4">No case selected</div>
        );
      case 'map':
        return (
          <MapView
            cases={cases}
            completedCases={completedCases}
            onSelectCase={handleSelectCase}
          />
        );
      case 'dataTable':
        return queryResults ? (
          <DataTable data={queryResults.data} type={queryResults.table} />
        ) : (
          <div className="p-4">No query results yet</div>
        );
      case 'caseSelector':
        return (
          <CaseFiles 
            cases={cases} 
            onSelectCase={handleSelectCase}
            selectedCaseId={selectedCase?.id}
            caseStarted={caseStarted}
          />
        );
      case 'caseFiles':
        return (
          <CaseFiles 
            cases={cases} 
            onSelectCase={handleSelectCase}
            selectedCaseId={selectedCase?.id}
            caseStarted={caseStarted}
          />
        );
      case 'caseBriefing':
        return selectedCase ? (
          <CaseBriefing
            case={selectedCase}
            onStart={handleStartCase}
            onMinimize={() => {
              const briefingWindow = windows.find(w => w.type === 'caseBriefing');
              if (briefingWindow) {
                minimizeWindow(briefingWindow.id);
              }
            }}
          />
        ) : (
          <div className="p-4">No case selected</div>
        );
      case 'webBrowser':
        return <WebBrowser />;
      case 'pythonManual':
        return <ManualViewer type="python" currentCase={selectedCase} />;
      case 'sqlManual':
        return <ManualViewer type="sql" currentCase={selectedCase} />;
      case 'notepad':
        return <Notepad />;
      case 'settings':
        return <Settings onSettingsChange={(settings) => setDetectiveName(settings.officerName)} />;
      case 'vehicleRegistryDB':
        return <VehicleRegistryDB />;
      case 'suspectsDB':
        return <SuspectsDB />;
      case 'sqlTerminal':
        return <SQLQueryTerminal currentCase={selectedCase} />;
      case 'chemicalCompaniesDB':
        return <ChemicalCompaniesDB />;
      case 'chemicalImportsDB':
        return <ChemicalImportsDB />;
      case 'fleetLogsDB':
        return <FleetLogsDB />;
      case 'maritimeDB':
        return <MaritimeDB />;
      default:
        return (
          <div className="p-4">
            <h2 className="text-lg font-bold mb-2">{window.title}</h2>
            <p>This window is under construction.</p>
          </div>
        );
    }
  };

  if (showSolution && selectedCase) {
    return (
      <SolutionScreen
        isCorrect={isCorrect}
        selectedSuspect={accusedSuspect}
        actualCulprit={selectedCase.culprit}
        solution={selectedCase.solution}
        queriesUsed={0}
        maxQueries={999}
        onPlayAgain={handlePlayAgain}
      />
    );
  }

  // Show home screen if game hasn't started
  if (!gameStarted) {
    return (
      <>
        {showBootSequence && <BootSequence onBootComplete={handleBootComplete} />}
        {!showBootSequence && (
          <HomeScreen
            cases={cases}
            completedCases={completedCases}
            onStart={handleHomeScreenStart}
            onOpenManual={handleOpenManual}
          />
        )}
      </>
    );
  }

  return (
    <div className="size-full relative bg-[#008080] retro-pattern overflow-hidden select-none">
      {/* Desktop with icons */}
      <Desktop 
        onOpenWindow={handleOpenWindow} 
        onExit={handleExit} 
        caseStarted={caseStarted}
        selectedCase={selectedCase}
      />

      {/* Windows */}
      {windows.map(window => (
        <Window95
          key={window.id}
          window={window}
          onClose={() => closeWindow(window.id)}
          onMinimize={() => minimizeWindow(window.id)}
          onRestore={() => restoreWindow(window.id)}
          onMaximize={() => maximizeWindow(window.id)}
          onFocus={() => focusWindow(window.id)}
          onDragStart={(e) => handleDragStart(window.id, e)}
          showCloseButton={window.type !== 'caseBriefing'}
          isMinimizing={window.isMinimizing}
        >
          {renderWindowContent(window)}
        </Window95>
      ))}

      {/* Taskbar */}
      <Taskbar
        windows={windows}
        onFocusWindow={focusWindow}
        onRestoreWindow={restoreWindow}
        onOpenWindow={handleOpenWindow}
        onShowStartMenu={() => setShowStartMenu(!showStartMenu)}
        onShowMascot={() => setShowMascot(true)}
        onExit={handleExit}
        onReturnToLevelSelect={handlePlayAgain}
        caseStarted={caseStarted}
        onAccuse={() => setShowAccuseModal(true)}
        onOpenCaseBriefing={() => handleOpenWindow('caseBriefing')}
      />

      {/* Start Menu */}
      {showStartMenu && (
        <StartMenu
          onClose={() => setShowStartMenu(false)}
          onOpenWindow={handleOpenWindow}
          onExit={handleExit}
        />
      )}

      {/* Police Mascot - Only show for first case */}
      {showMascot && selectedCase && selectedCase.id === 'case-001' && (
        <PoliceMascot onClose={() => setShowMascot(false)} currentCase={selectedCase} />
      )}

      {/* Accuse Modal */}
      {showAccuseModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">
          <div className="bg-[#c0c0c0] border-2 border-[#dfdfdf] border-t-white border-l-white shadow-[2px_2px_0_#000000] p-4 w-96 flex flex-col">
            <div className="bg-[#000080] text-white font-bold px-2 py-1 mb-4 flex justify-between items-center">
              <span>🚨 ACCUSE SUSPECT</span>
              <button onClick={() => setShowAccuseModal(false)} className="bg-[#c0c0c0] text-black px-1 border border-white border-b-black border-r-black font-bold">X</button>
            </div>
            <div className="mb-4">
              <label className="block mb-2">
                {selectedCase?.id === 'case-011' 
                  ? 'Enter the company ID of the culprit (e.g., C-42):'
                  : 'Enter the exact name of the suspect you want to accuse:'}
              </label>
              <input
                type="text"
                value={accuseInput}
                onChange={(e) => setAccuseInput(e.target.value)}
                className="w-full px-2 py-1 border-2 border-[#808080] border-t-[#000000] border-l-[#000000] shadow-[1px_1px_0_white]"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const isValid = VALID_SUSPECTS.some(s => s.toLowerCase() === accuseInput.trim().toLowerCase());
                    setIsValidSuspect(isValid);
                    setShowAccuseModal(false);
                    setShowArrestWarrant(true);
                  }
                }}
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowAccuseModal(false)}
                className="px-4 py-1 bg-[#c0c0c0] border-2 border-[#dfdfdf] border-t-white border-l-white shadow-[1px_1px_0_#000000]"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const isValid = VALID_SUSPECTS.some(s => s.toLowerCase() === accuseInput.trim().toLowerCase());
                  setIsValidSuspect(isValid);
                  setShowAccuseModal(false);
                  setShowArrestWarrant(true);
                }}
                className="px-4 py-1 bg-[#c0c0c0] border-2 border-[#dfdfdf] border-t-white border-l-white shadow-[1px_1px_0_#000000] font-bold"
              >
                Accuse
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Arrest Warrant */}
      {showArrestWarrant && selectedCase && (
        <ArrestWarrant
          suspectName={accuseInput.trim()}
          caseTitle={selectedCase.title}
          detectiveName={detectiveName}
          onClose={() => {
            setShowArrestWarrant(false);
            setAccuseInput('');
          }}
          onConfirmArrest={() => {
            // Close arrest warrant and show processing
            setShowArrestWarrant(false);
            setShowProcessing(true);
            // Store the accused suspect but don't call handleAccuse yet
            setAccusedSuspect(accuseInput.trim());
            const correct = accuseInput.trim().toLowerCase() === selectedCase.culprit.toLowerCase();
            setIsCorrect(correct);

            // Only unlock next case if accusation is correct
            if (correct && !completedCases.includes(selectedCase.id)) {
              setCompletedCases([...completedCases, selectedCase.id]);
            }
          }}
          isValid={isValidSuspect}
        />
      )}

      {/* Processing Window */}
      {showProcessing && selectedCase && (
        <ProcessingWindow
          suspectName={accuseInput.trim()}
          onComplete={() => {
            setShowProcessing(false);
            setAccuseInput('');
            if (isCorrect) {
              // Play success sound effect
              try { new Audio('/audio/success.mp3').play(); } catch {}
              setShowCongrats(true);
            } else {
              setShowAudioTranscript(true);
            }
          }}
        />
      )}

      {/* Congratulations Window */}
      {showCongrats && selectedCase && (
        <CongratsWindow
          suspectName={accusedSuspect}
          caseTitle={selectedCase.title}
          onContinue={() => {
            setShowCongrats(false);
            setShowAudioTranscript(true);
          }}
        />
      )}

      {/* Audio Transcript Modal */}
      {showAudioTranscript && selectedCase && (
        <AudioTranscriptModal
          isSuccess={isCorrect}
          onClose={handleAudioTranscriptClose}
          caseId={selectedCase.id}
        />
      )}
    </div>
  );
}