import { useState } from 'react';
import { FileText, Image, Video, Mail, File, Copy, Check, Maximize2, X } from 'lucide-react';
import { Evidence } from '../types/game';

interface EvidenceViewerProps {
  evidence: Evidence[];
}

export function EvidenceViewer({ evidence }: EvidenceViewerProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedImage, setExpandedImage] = useState<{ url: string; alt: string } | null>(null);

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

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
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
                  {item.imageUrl && (
                    <div className="mt-2 relative">
                      <img
                        src={item.imageUrl}
                        alt={item.description}
                        className="w-full border border-[#808080] max-h-48 object-contain bg-black"
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedImage({ url: item.imageUrl!, alt: item.description });
                        }}
                        className="absolute top-1 right-1 window-95-button p-1 bg-[#c0c0c0] hover:bg-[#dfdfdf]"
                        title="Expand image"
                      >
                        <Maximize2 className="w-3 h-3 text-black" />
                      </button>
                    </div>
                  )}
                  {item.content && (
                    <details className="mt-2 text-xs">
                      <summary className="cursor-pointer font-bold">View Details</summary>
                      <div className="mt-1 p-2 bg-[#c0c0c0] group-hover:bg-white group-hover:text-black border border-[#808080] relative">
                        {item.content}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopy(item.content!, item.id);
                          }}
                          className="absolute top-1 right-1 window-95-button px-1.5 py-0.5 bg-[#c0c0c0] hover:bg-[#dfdfdf] flex items-center gap-1 text-black"
                          title="Copy to clipboard"
                        >
                          {copiedId === item.id ? (
                            <><Check className="w-3 h-3" /> <span className="text-[10px]">Copied!</span></>
                          ) : (
                            <><Copy className="w-3 h-3" /> <span className="text-[10px]">Copy</span></>
                          )}
                        </button>
                      </div>
                    </details>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Expanded image overlay */}
      {expandedImage && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80"
          onClick={() => setExpandedImage(null)}
        >
          <div className="relative max-w-[90vw] max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <div className="window-95-panel bg-[#c0c0c0]">
              <div className="flex items-center justify-between px-2 py-1 bg-gradient-to-r from-[#000080] to-[#1084d0]">
                <span className="font-bold text-white text-sm">📷 Evidence Image</span>
                <button
                  onClick={() => setExpandedImage(null)}
                  className="window-95-button w-5 h-5 flex items-center justify-center bg-[#c0c0c0] hover:bg-[#dfdfdf] text-black"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
              <div className="p-1 bg-black">
                <img
                  src={expandedImage.url}
                  alt={expandedImage.alt}
                  className="max-w-[85vw] max-h-[80vh] object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
