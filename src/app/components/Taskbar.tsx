import { WindowState } from '../types/game';
import { Menu, Clock, Calendar, Cloud, Volume2, Power } from 'lucide-react';
import { useState, useEffect } from 'react';

interface TaskbarProps {
  windows: WindowState[];
  onFocusWindow: (id: string) => void;
  onRestoreWindow: (id: string) => void;
  onOpenWindow: (type: string) => void;
  onShowStartMenu: () => void;
  onShowMascot: () => void;
  onExit: () => void;
  onReturnToLevelSelect?: () => void;
  caseStarted?: boolean;
  onAccuse?: () => void;
  onOpenCaseBriefing?: () => void;
}

export function Taskbar({ windows, onFocusWindow, onRestoreWindow, onOpenWindow, onShowStartMenu, onShowMascot, onExit, onReturnToLevelSelect, caseStarted, onAccuse, onOpenCaseBriefing }: TaskbarProps) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute bottom-0 left-0 right-0 h-12 bg-[#c0c0c0] border-t-2 border-white flex items-center px-1 gap-1 shadow-[inset_1px_1px_0_white,inset_-1px_-1px_0_#808080]">
      {/* Start Button */}
      <button
        onClick={onShowStartMenu}
        className="h-9 px-3 bg-[#c0c0c0] border-2 border-[#dfdfdf] border-t-white border-l-white shadow-[inset_-1px_-1px_0_#000000,inset_1px_1px_0_#dfdfdf] hover:shadow-[inset_-1px_-1px_0_#dfdfdf,inset_1px_1px_0_#000000] active:shadow-[inset_-1px_-1px_0_#ffffff,inset_1px_1px_0_#808080] flex items-center gap-2 font-bold text-sm"
      >
        <Menu className="w-4 h-4" />
        Start
      </button>
      <div className="w-px h-8 bg-[#808080] shadow-[1px_0_0_white]" />

      {/* Choose Different Level Button */}
      {onReturnToLevelSelect && (
        <>
          <button
            onClick={onReturnToLevelSelect}
            className="h-9 px-3 bg-[#c0c0c0] border-2 border-[#dfdfdf] border-t-white border-l-white shadow-[inset_-1px_-1px_0_#000000,inset_1px_1px_0_#dfdfdf] hover:shadow-[inset_-1px_-1px_0_#dfdfdf,inset_1px_1px_0_#000000] active:shadow-[inset_-1px_-1px_0_#ffffff,inset_1px_1px_0_#808080] flex items-center gap-2 font-bold text-xs"
          >
            ← Choose Different Level
          </button>
          <div className="w-px h-8 bg-[#808080] shadow-[1px_0_0_white]" />
        </>
      )}

      {/* Case Briefing Button */}
      {caseStarted && onOpenCaseBriefing && (
        <>
          
          <div className="w-px h-8 bg-[#808080] shadow-[1px_0_0_white]" />
        </>
      )}

      {/* Window Buttons */}
      <div className="flex-1 flex items-center gap-1 overflow-x-auto">
        {windows.map(window => (
          <button
            key={window.id}
            onClick={() => {
              if (window.isMinimized) {
                onRestoreWindow(window.id);
              } else {
                onFocusWindow(window.id);
              }
            }}
            className={`h-8 px-3 min-w-[120px] max-w-[180px] truncate text-sm border-2 ${
              window.isMinimized
                ? 'bg-[#c0c0c0] border-[#dfdfdf] border-t-white border-l-white shadow-[inset_-1px_-1px_0_#000000,inset_1px_1px_0_#dfdfdf]'
                : 'bg-[#dfdfdf] border-[#808080] shadow-[inset_1px_1px_0_#000000,inset_-1px_-1px_0_white]'
            }`}
          >
            {window.title}
          </button>
        ))}
      </div>

      {/* Accuse Button (when case started) */}
      {caseStarted && onAccuse && (
        <>
          <div className="w-px h-8 bg-[#808080] shadow-[1px_0_0_white]" />
          <button
            onClick={onAccuse}
            className="h-9 px-4 text-white font-bold text-sm"
            style={{
              backgroundColor: '#ef4444',
              border: '2px solid',
              borderColor: '#fca5a5 #b91c1c #b91c1c #fca5a5',
              boxShadow: 'inset -1px -1px 0 #000000, inset 1px 1px 0 #ff8888'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#dc2626';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#ef4444';
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.boxShadow = 'inset 1px 1px 0 #000000, inset -1px -1px 0 #ff8888';
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.boxShadow = 'inset -1px -1px 0 #000000, inset 1px 1px 0 #ff8888';
            }}
          >
            ACCUSE SUSPECT
          </button>
        </>
      )}

      {/* System Tray */}
      <div className="flex items-center gap-3 px-3 h-8 border-2 border-[#808080] border-t-[#dfdfdf] border-l-[#dfdfdf] shadow-[inset_-1px_-1px_0_white,inset_1px_1px_0_#808080] bg-[#c0c0c0]">
        <div className="flex items-center gap-1 text-xs cursor-pointer hover:bg-[#dfdfdf] px-1" title="Volume">
          <Volume2 className="w-3 h-3" />
        </div>
        <div className="flex items-center gap-1 text-xs cursor-pointer hover:bg-[#dfdfdf] px-1" title="Weather in Dubai: Sunny, 32°C">
          <Cloud className="w-3 h-3" />
          <span>32°C</span>
        </div>
        <div className="flex items-center gap-1 text-xs font-mono cursor-pointer hover:bg-[#dfdfdf] px-1" title="Calendar">
          <Calendar className="w-3 h-3" />
          <span>{time.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
        </div>
        <div className="flex items-center gap-1 text-xs font-mono cursor-pointer hover:bg-[#dfdfdf] px-1" title="Time">
          <Clock className="w-3 h-3" />
          <span>{time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
        <div className="w-px h-6 bg-[#808080] shadow-[1px_0_0_white]" />
        <button
          onClick={onExit}
          className="flex items-center gap-1 text-xs cursor-pointer hover:bg-red-500 hover:text-white px-2 py-1 rounded transition-colors"
          title="Shut Down"
        >
          <Power className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}