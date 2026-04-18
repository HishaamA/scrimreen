import {
  Power,
  Settings,
  Mail,
  Music,
  FileText,
  Book,
  Globe,
  Shield,
  Search,
  Folder,
  FolderOpen,
  HardDrive,
  Database,
  Table,
  Code,
  User,
  Car,
  Briefcase,
  Waves
} from 'lucide-react';
import { PoliceBadge } from './PoliceBadge';

interface DesktopIconProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

function DesktopIcon({ icon, label, onClick }: DesktopIconProps) {
  return (
    <div className="desktop-icon group" onClick={onClick} onDoubleClick={onClick}>
      <div className="text-white filter drop-shadow-[0_2px_3px_rgba(0,0,0,0.9)] group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <span className="text-white text-[10px] font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] text-center leading-tight px-1 bg-[#008080] bg-opacity-70 rounded max-w-[90px] break-words">
        {label}
      </span>
    </div>
  );
}

interface DesktopProps {
  onOpenWindow: (type: string) => void;
  onExit: () => void;
  caseStarted?: boolean;
  selectedCase?: { id: string; title: string } | null;
}

export function Desktop({ onOpenWindow, onExit, caseStarted, selectedCase }: DesktopProps) {
  // Determine which database icons to show based on the current case
  const showCase1Icons = selectedCase?.id === 'case-001';
  const showCase2Icons = selectedCase?.id === 'case-002';
  const showCase11Icons = selectedCase?.id === 'case-011';
  // Cases without specific DB icons still get the general tools (SQL terminal, Python, etc.)

  return (
    <div className="absolute inset-0">
      {/* Police Badge Background */}
      <PoliceBadge />
      
      {/* Desktop Icons */}
      <div className="absolute inset-0 flex justify-start pl-2 pt-2">
        {/* Icons Grid - Left aligned, col 1: 8 icons, col 2: 3 icons */}
        <div className="grid grid-rows-8 grid-flow-col gap-1 content-start h-[calc(100vh-60px)]">
          <DesktopIcon
            icon={<Folder className="w-12 h-12 text-white" />}
            label="Evidence"
            onClick={() => onOpenWindow('evidence')}
          />
          
          {/* Case-001 specific icons */}
          {showCase1Icons && (
            <>
              <DesktopIcon
                icon={<User className="w-12 h-12 text-white" />}
                label="suspects"
                onClick={() => onOpenWindow('suspectsDB')}
              />
              <DesktopIcon
                icon={<Car className="w-12 h-12 text-white" />}
                label="vehicle_registry"
                onClick={() => onOpenWindow('vehicleRegistryDB')}
              />
            </>
          )}
          
          {/* Case-002 specific icons */}
          {showCase2Icons && (
            <>
              <DesktopIcon
                icon={<Table className="w-12 h-12 text-white" />}
                label="chemical_imports"
                onClick={() => onOpenWindow('chemicalImportsDB')}
              />
              <DesktopIcon
                icon={<Table className="w-12 h-12 text-white" />}
                label="fleet_logs"
                onClick={() => onOpenWindow('fleetLogsDB')}
              />
              <DesktopIcon
                icon={<Table className="w-12 h-12 text-white" />}
                label="corporate_registry"
                onClick={() => onOpenWindow('chemicalCompaniesDB')}
              />
            </>
          )}
          
          {/* Case-011 specific icons */}
          {showCase11Icons && (
            <DesktopIcon
              icon={<Waves className="w-12 h-12 text-white" />}
              label="maritime_database"
              onClick={() => onOpenWindow('maritimeDB')}
            />
          )}
          
          <DesktopIcon
            icon={<Database className="w-12 h-12 text-white" />}
            label="SQL Terminal"
            onClick={() => onOpenWindow('sqlTerminal')}
          />
          <DesktopIcon
            icon={<Code className="w-12 h-12 text-white" />}
            label="Decryption Software"
            onClick={() => onOpenWindow('pythonEditor')}
          />
          <DesktopIcon
            icon={<Book className="w-12 h-12 text-white" />}
            label="Python for Dummies"
            onClick={() => onOpenWindow('pythonManual')}
          />
          <DesktopIcon
            icon={<Book className="w-12 h-12 text-white" />}
            label="SQL for Dummies"
            onClick={() => onOpenWindow('sqlManual')}
          />
          <DesktopIcon
            icon={<Globe className="w-12 h-12 text-white" />}
            label="Web Browser"
            onClick={() => onOpenWindow('webBrowser')}
          />
          <DesktopIcon
            icon={<Music className="w-12 h-12 text-white" />}
            label="Music Player"
            onClick={() => onOpenWindow('musicPlayer')}
          />
          <DesktopIcon
            icon={<FileText className="w-12 h-12 text-white" />}
            label="Notepad"
            onClick={() => onOpenWindow('notepad')}
          />
          <DesktopIcon
            icon={<Settings className="w-12 h-12 text-white" />}
            label="Settings"
            onClick={() => onOpenWindow('settings')}
          />
          {/* Only show Case Briefing icon if case is started */}
          {caseStarted && (
            <DesktopIcon
              icon={<Briefcase className="w-12 h-12 text-white" />}
              label="Case Briefing"
              onClick={() => onOpenWindow('caseBriefing')}
            />
          )}
        </div>
      </div>
    </div>
  );
}