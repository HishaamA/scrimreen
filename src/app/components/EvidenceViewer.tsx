import { FileText, Image, Video, Mail, File } from 'lucide-react';
import { Evidence } from '../types/game';

interface EvidenceViewerProps {
  evidence: Evidence[];
}

export function EvidenceViewer({ evidence }: EvidenceViewerProps) {
  const getIcon = (type: string) => {
    const t = type.toLowerCase();
    if (t.includes('footage') || t.includes('camera') || t.includes('video')) {
      return <Video className="w-6 h-6" />;
    }
    if (t.includes('email') || t.includes('message')) {
      return <Mail className="w-6 h-6" />;
    }
    if (t.includes('photo') || t.includes('image')) {
      return <Image className="w-6 h-6" />;
    }
    if (t.includes('document') || t.includes('report')) {
      return <FileText className="w-6 h-6" />;
    }
    return <File className="w-6 h-6" />;
  };

  return (
    <div className="p-2 bg-[#c0c0c0] h-full">
      <div className="window-95-panel p-2 mb-2">
        <div className="font-bold text-sm">EVIDENCE FILES</div>
        <div className="text-xs">{evidence.length} file(s)</div>
      </div>

      <div className="window-95-panel p-2 h-[calc(100%-80px)] overflow-y-auto">
        <div className="space-y-2">
          {evidence.map((item) => (
            <div
              key={item.id}
              className="bg-white border-2 border-[#808080] p-2 hover:bg-[#000080] hover:text-white cursor-pointer group"
            >
              <div className="flex items-start gap-2">
                <div className="text-black group-hover:text-white">{getIcon(item.type)}</div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-sm mb-1 flex items-center justify-between">
                    <span>{item.id}</span>
                    <span className="text-xs bg-yellow-200 text-black px-1 group-hover:bg-yellow-300">
                      {item.type}
                    </span>
                  </div>
                  <div className="text-xs mb-1">{item.description}</div>
                  <div className="text-xs opacity-70">
                    📍 {item.location} | 🕐 {item.timestamp}
                  </div>
                  {item.relatedTo.length > 0 && (
                    <div className="text-xs mt-1 opacity-80">
                      🔗 Related: {item.relatedTo.join(', ')}
                    </div>
                  )}
                  {item.content && (
                    <details className="mt-2 text-xs">
                      <summary className="cursor-pointer font-bold">View Details</summary>
                      <div className="mt-1 p-2 bg-[#c0c0c0] group-hover:bg-white group-hover:text-black border border-[#808080]">
                        {item.content}
                      </div>
                    </details>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
