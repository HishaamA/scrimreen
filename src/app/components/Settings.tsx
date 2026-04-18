import { useState, useEffect } from 'react';
import { User, Eye, Type, Save } from 'lucide-react';

interface SettingsProps {
  onSettingsChange?: (settings: GameSettings) => void;
}

export interface GameSettings {
  officerName: string;
  contrast: number;
  textSize: number;
}

export function Settings({ onSettingsChange }: SettingsProps) {
  const [officerName, setOfficerName] = useState(() => {
    return localStorage.getItem('officerName') || 'Detective';
  });
  const [contrast, setContrast] = useState(() => {
    return parseInt(localStorage.getItem('contrast') || '100');
  });
  const [textSize, setTextSize] = useState(() => {
    return parseInt(localStorage.getItem('textSize') || '100');
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Apply contrast setting
    document.documentElement.style.filter = `contrast(${contrast}%)`;
    
    // Apply text size setting
    document.documentElement.style.fontSize = `${textSize}%`;
  }, [contrast, textSize]);

  const handleSave = () => {
    localStorage.setItem('officerName', officerName);
    localStorage.setItem('contrast', contrast.toString());
    localStorage.setItem('textSize', textSize.toString());
    
    if (onSettingsChange) {
      onSettingsChange({ officerName, contrast, textSize });
    }
    
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    setOfficerName('Detective');
    setContrast(100);
    setTextSize(100);
    localStorage.removeItem('officerName');
    localStorage.removeItem('contrast');
    localStorage.removeItem('textSize');
    document.documentElement.style.filter = 'contrast(100%)';
    document.documentElement.style.fontSize = '100%';
  };

  return (
    <div className="flex flex-col h-full bg-[#c0c0c0] p-4 overflow-auto">
      <div className="max-w-2xl mx-auto w-full space-y-4">
        {/* Header */}
        <div className="window-95-panel p-4 bg-[#000080] text-white">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <span>⚙️</span> CATCHtech System Settings
          </h2>
          <p className="text-xs mt-1 opacity-90">Configure your detective workspace</p>
        </div>

        {/* Officer Name */}
        <div className="window-95-panel p-4">
          <div className="flex items-center gap-2 mb-3">
            <User className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold">Officer Name</h3>
          </div>
          <p className="text-xs text-gray-600 mb-2">
            Set your detective name for the case files
          </p>
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold">Officer</span>
            <input
              type="text"
              value={officerName}
              onChange={(e) => setOfficerName(e.target.value)}
              className="flex-1 border-2 border-[#808080] px-3 py-2 bg-white focus:outline-none"
              placeholder="Enter your name"
              maxLength={30}
            />
          </div>
          <div className="mt-2 p-2 bg-gray-100 border border-gray-300 text-xs">
            <strong>Preview:</strong> Officer {officerName || 'Detective'}
          </div>
        </div>

        {/* Contrast */}
        <div className="window-95-panel p-4">
          <div className="flex items-center gap-2 mb-3">
            <Eye className="w-5 h-5 text-purple-600" />
            <h3 className="font-bold">Display Contrast</h3>
          </div>
          <p className="text-xs text-gray-600 mb-2">
            Adjust screen contrast for better visibility (50% - 150%)
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="50"
                max="150"
                value={contrast}
                onChange={(e) => setContrast(parseInt(e.target.value))}
                className="flex-1"
              />
              <span className="text-sm font-bold w-16 text-right">{contrast}%</span>
            </div>
            <div className="flex justify-between text-xs text-gray-600">
              <span>Low</span>
              <span>Normal (100%)</span>
              <span>High</span>
            </div>
          </div>
        </div>

        {/* Text Size */}
        <div className="window-95-panel p-4">
          <div className="flex items-center gap-2 mb-3">
            <Type className="w-5 h-5 text-green-600" />
            <h3 className="font-bold">Text Size</h3>
          </div>
          <p className="text-xs text-gray-600 mb-2">
            Adjust text size for easier reading (75% - 150%)
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="75"
                max="150"
                value={textSize}
                onChange={(e) => setTextSize(parseInt(e.target.value))}
                className="flex-1"
              />
              <span className="text-sm font-bold w-16 text-right">{textSize}%</span>
            </div>
            <div className="flex justify-between text-xs text-gray-600">
              <span>Small</span>
              <span>Normal (100%)</span>
              <span>Large</span>
            </div>
          </div>
          <div className="mt-2 p-2 bg-gray-100 border border-gray-300">
            <p style={{ fontSize: `${textSize}%` }} className="text-xs">
              Sample text at current size: The quick brown fox jumps over the lazy dog.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between gap-4 pt-4 border-t-2 border-[#808080]">
          <button
            onClick={handleReset}
            className="window-95-button px-4 py-2 text-sm bg-red-100 hover:bg-red-200"
          >
            Reset to Defaults
          </button>
          
          <button
            onClick={handleSave}
            className="window-95-button px-6 py-2 text-sm bg-green-100 hover:bg-green-200 flex items-center gap-2 font-bold"
          >
            <Save className="w-4 h-4" />
            {saved ? 'Saved!' : 'Save Settings'}
          </button>
        </div>

        {/* Info Panel */}
        <div className="window-95-panel p-3 bg-blue-50 border-2 border-blue-400">
          <p className="text-xs leading-relaxed">
            <strong>💡 Note:</strong> Settings are automatically saved to your browser and will persist between sessions. 
            These settings affect the entire CATCHtech system interface.
          </p>
        </div>
      </div>
    </div>
  );
}
