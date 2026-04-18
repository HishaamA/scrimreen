import { useState } from 'react';
import { Play, FileText } from 'lucide-react';
import { Case } from '../types/game';

interface CaseBriefingProps {
  case: Case;
  onStart: () => void;
  onMinimize?: () => void;
}

export function CaseBriefing({ case: caseData, onStart, onMinimize }: CaseBriefingProps) {
  const [audioPlayed, setAudioPlayed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);

  const handlePlayAudio = () => {
    setIsPlaying(true);
    // In a real app, we'd play the audio file here
    // For now, just mark as played after 3 seconds
    setTimeout(() => {
      setAudioPlayed(true);
      setIsPlaying(false);
    }, 3000);
  };

  // Case-specific transcripts
  const getTranscript = (caseId: string) => {
    switch (caseId) {
      case 'case-001':
        return `Hello, detectives. And congratulations on being promoted to the UAEPD Envirocrimes Division. We're here to solve the most gruesome, the absolute biggest crimes that will lead to catastrophic global meltdowns if we don't intervene. Because let's face it: if it's not us to protect the environment... then who will? We need to catch these crooks now, before they escalate! Today they're tossing garbage; tomorrow they're targeting the women and children of our society! It's a textbook psychological pipeline! So... that's why you're here. For your first case...

For your first case... some absolute maniac just deployed a tactical strike of Polyethylene Terephthalate out of an SUV on the E11. A plastic bottle! This is a weapon of mass ecological destruction. It won't biodegrade. The UAE sun will trigger a cataclysmic event known as photodegradation, baking it into millions of invisible assassins called microplastics. They'll wash into the Gulf, act like toxic sponges, and eventually end up on my Friday lunch plate masquerading as a local Hammour fillet!

We have a lead, but the traffic cam's data feed was choked by dust. The raw license plate string is corrupted with garbage data. I just pinged it to your terminal. Clean up that string, isolate the plate number, and query the registry to track down the owner. Ask Officer Chip if you need any help with the syntax. The clock is ticking on a four-century disaster. Good luck, detectives... I have to scram before Sergeant Cheese steals my sandwich again.`;

      case 'case-002':
        return `Alright team, gather 'round. We have a CODE RED situation at Jubail Mangrove Park. Some eco-terrorist backed up a tanker truck in the dead of night and dumped industrial solvent directly into the mangrove root system. Those mangroves are the lungs of Abu Dhabi! They filter the water, protect the coastline, sequester carbon... and now they're choking on chemical waste!

Park Rangers discovered a burner phone dropped in the mud near the dumping site. The phone has an encrypted text message - forensics confirmed it's a Caesar cipher. This message likely contains critical information about the operation, possibly even the company involved. You need to decrypt that message using your Python skills. The Decryption Software has a caesar_cipher() function built in.

But here's the kicker - the phone also has an encrypted company name in the contacts. Decrypt it, then query our Chemical Companies database to find out who the CEO is. That CEO is your culprit! And listen... we're running out of time. The flamingos are already evacuating, the fish are floating belly-up, and if this solvent reaches the main water table, we're looking at an environmental catastrophe that'll take decades to recover from.

Get that message decrypted, identify the company, find the CEO, and bring them to justice. The mangroves are counting on you, detectives. Move out!`;

      default:
        return caseData.briefing;
    }
  };

  const transcript = getTranscript(caseData.id);

  return (
    <div className="p-6 bg-[#c0c0c0] h-full flex flex-col">
      {/* Transcript Modal */}
      {showTranscript && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowTranscript(false)}>
          <div className="bg-[#c0c0c0] border-4 border-[#dfdfdf] border-t-white border-l-white shadow-[8px_8px_0_#000000] w-[700px] max-h-[80vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
            {/* Title Bar */}
            <div className="bg-gradient-to-r from-[#000080] to-[#1084d0] text-white px-3 py-2 flex items-center justify-between">
              <span className="font-bold">📄 Case Briefing Transcript</span>
              <button
                onClick={() => setShowTranscript(false)}
                className="w-6 h-6 bg-[#c0c0c0] border-2 border-white text-black flex items-center justify-center font-bold hover:bg-[#dfdfdf]"
              >
                ✕
              </button>
            </div>
            
            {/* Content */}
            <div className="window-95-panel p-6 m-3 overflow-auto flex-1">
              <div className="bg-white border-2 border-[#808080] p-6 leading-relaxed text-base">
                {transcript.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 text-justify">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
            
            {/* Close Button */}
            <div className="p-3 flex justify-center">
              <button
                onClick={() => setShowTranscript(false)}
                className="window-95-button px-6 py-2 font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="window-95-panel flex-1 p-4 mb-4 overflow-auto">
        <h2 className="text-2xl font-bold mb-4 text-[#000080]">{caseData.title}</h2>
        
        <div className="mb-4">
          <div className="bg-black text-green-400 p-4 font-mono text-sm mb-4">
            <div className="mb-2">{'>'} CASE_ID: {caseData.id}</div>
            <div className="mb-2">{'>'} DIFFICULTY_LEVEL: {caseData.difficulty}/3</div>
            <div>{'>'} STATUS: ACTIVE</div>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="font-bold mb-2">CASE DESCRIPTION:</h3>
          <p className="text-sm leading-relaxed">{caseData.description}</p>
        </div>

        {/* Audio Briefing and Transcript Buttons */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {/* Audio Briefing */}
          <div className="window-95-panel bg-yellow-50 p-3">
            <h3 className="font-bold mb-2 text-red-600">🎧 AUDIO BRIEFING</h3>
            <p className="text-xs mb-2">Listen to the full case briefing before proceeding.</p>
            <button
              onClick={handlePlayAudio}
              disabled={isPlaying}
              className="window-95-button flex items-center gap-2"
            >
              <Play className="w-4 h-4" />
              {isPlaying ? 'Playing...' : audioPlayed ? 'Replay Audio' : 'Play Briefing'}
            </button>
          </div>

          {/* Transcript Button */}
          <div className="window-95-panel bg-blue-50 p-3">
            <h3 className="font-bold mb-2 text-blue-600">📄 TRANSCRIPT</h3>
            <p className="text-xs mb-2">Read the full briefing transcript in detail.</p>
            <button
              onClick={() => setShowTranscript(true)}
              className="window-95-button flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              View Transcript
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={() => {
          onStart();
          if (onMinimize) {
            onMinimize();
          }
        }}
        className="window-95-button py-3 text-lg"
      >
        START INVESTIGATION
      </button>
    </div>
  );
}