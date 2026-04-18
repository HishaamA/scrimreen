import { 
  FolderOpen, 
  Folder, 
  Search, 
  Globe, 
  Music, 
  FileText,
  Settings,
  Power,
  HelpCircle,
  Terminal,
  BookOpen
} from 'lucide-react';

interface StartMenuProps {
  onOpenWindow: (type: string) => void;
  onExit: () => void;
  onClose: () => void;
}

export function StartMenu({ onOpenWindow, onExit, onClose }: StartMenuProps) {
  const handleItemClick = (action: () => void) => {
    action();
    onClose();
  };

  return (
    <div className="absolute bottom-12 left-1 w-64 bg-[#c0c0c0] border-2 border-[#dfdfdf] border-t-white border-l-white shadow-[4px_4px_0_#000000] z-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#000080] to-[#1084d0] text-white px-3 py-2 flex items-center gap-2">
        <span className="text-2xl">👮</span>
        <div>
          <div className="font-bold text-sm">UAE Detective</div>
          <div className="text-xs opacity-90">Database System</div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="py-1">
        <MenuItem
          icon={<Folder className="w-5 h-5" />}
          label="Evidence Folder"
          description="View evidence"
          onClick={() => handleItemClick(() => onOpenWindow('evidence'))}
        />
        
        <div className="h-px bg-[#808080] my-1 mx-2 shadow-[0_1px_0_white]" />
        
        <MenuItem
          icon={<Terminal className="w-5 h-5" />}
          label="Decryption Software"
          description="Decrypt messages"
          onClick={() => handleItemClick(() => onOpenWindow('pythonEditor'))}
        />
        <MenuItem
          icon={<Globe className="w-5 h-5" />}
          label="Web Browser"
          description="Detective database"
          onClick={() => handleItemClick(() => onOpenWindow('webBrowser'))}
        />
        <MenuItem
          icon={<BookOpen className="w-5 h-5" />}
          label="Python for Dummies"
          description="Learn Python basics"
          onClick={() => handleItemClick(() => onOpenWindow('pythonManual'))}
        />
        <MenuItem
          icon={<Music className="w-5 h-5" />}
          label="Music Player"
          description="Background music"
          onClick={() => handleItemClick(() => onOpenWindow('musicPlayer'))}
        />
        <MenuItem
          icon={<FileText className="w-5 h-5" />}
          label="Notepad"
          description="Take notes"
          onClick={() => handleItemClick(() => onOpenWindow('notepad'))}
        />
        
        <div className="h-px bg-[#808080] my-1 mx-2 shadow-[0_1px_0_white]" />
        
        <MenuItem
          icon={<HelpCircle className="w-5 h-5" />}
          label="Help"
          description="Tutorial"
          onClick={() => handleItemClick(() => onOpenWindow('help'))}
        />
        <MenuItem
          icon={<Settings className="w-5 h-5" />}
          label="Settings"
          description="Preferences"
          onClick={() => handleItemClick(() => onOpenWindow('settings'))}
        />
        
        <div className="h-px bg-[#808080] my-1 mx-2 shadow-[0_1px_0_white]" />
        
        <MenuItem
          icon={<Power className="w-5 h-5" />}
          label="Shut Down"
          description="Exit game"
          onClick={() => handleItemClick(onExit)}
        />
      </div>
    </div>
  );
}

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  description: string;
  onClick: () => void;
}

function MenuItem({ icon, label, description, onClick }: MenuItemProps) {
  return (
    <button
      onClick={onClick}
      className="w-full px-3 py-2 flex items-center gap-3 hover:bg-[#000080] hover:text-white text-left transition-colors group"
    >
      <div className="flex-shrink-0 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-bold text-sm">{label}</div>
        <div className="text-xs opacity-70 truncate">{description}</div>
      </div>
    </button>
  );
}