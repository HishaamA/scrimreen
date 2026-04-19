import { X, Play, Pause } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { duckBackgroundMusic, unduckBackgroundMusic } from '../utils/clickSound';

interface AudioTranscriptModalProps {
  isSuccess: boolean;
  onClose: () => void;
  caseId?: string;
}

export function AudioTranscriptModal({ isSuccess, onClose, caseId }: AudioTranscriptModalProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Get the audio file for the current case
  const getAudioSrc = () => {
    if (caseId === 'case-001' && isSuccess) return '/audio/01end.mp3';
    if (caseId === 'case-002' && isSuccess) return '/audio/02end.mp3';
    return isSuccess ? '/audio/success-boss.mp3' : '/audio/failcase.mp3';
  };

  useEffect(() => {
    return () => {
      // Restore bg music volume on unmount
      unduckBackgroundMusic();
    };
  }, []);

  const handlePlay = () => {
    if (audioRef.current) {
      duckBackgroundMusic();
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      unduckBackgroundMusic();
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
    unduckBackgroundMusic();
  };

  const handleClose = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    unduckBackgroundMusic();
    onClose();
  };

  // Case-specific success messages
  const getCaseSuccessMessage = (caseId?: string) => {
    switch (caseId) {
      case 'case-001':
        return `*radio crackles*

CHIEF: BRILLIANT WORK, Detective! You cleaned up that corrupted plate data AND tracked down the litterbug!

*hearty laughter*

CHIEF: Ahmed Khalfan thought he could toss construction waste out his window during a sandstorm and nobody would notice? ON THE E11?! We have cameras EVERYWHERE!

*more laughter*

CHIEF: A 50 dirham disposal fee... that's ALL it would have cost him! Now he's looking at a MASSIVE fine and community service picking up trash on the very same highway! Poetic justice!

*chuckles*

CHIEF: Great detective work. The E11 is cleaner because of you. Now, ready for your next case?

*static ends*`;

      case 'case-002':
        return `*radio crackles*

CHIEF: OUTSTANDING WORK, Detective! You cracked the Caesar cipher AND tracked down that eco-terrorist!

*hearty laughter*

CHIEF: Simreen Siraj thought she could dump industrial solvent in OUR mangroves and get away with it? NOT ON OUR WATCH! Those flamingos can rest easy tonight!

*more laughter*

CHIEF: You know what the best part is? She saved 5000 AED but now faces 500,000 AED in fines PLUS jail time! Math genius, that one!

*chuckles*

CHIEF: Excellent detective work. The mangroves thank you, the flamingos thank you, and I thank you. Now, ready for your next case?

*static ends*`;
      
      case 'case-011':
        return `*radio crackles*

CHIEF: EXCEPTIONAL WORK, Detective! You just took down a MAJOR corporate polluter!

*impressed whistle*

CHIEF: Cross-referencing FIVE different databases? Water sensors, AIS tracking, vessel registries, company profiles, AND disposal manifests? That's some SERIOUS detective work!

*slams desk*

CHIEF: Oasis Pure Desalination thought they could save 4.2 MILLION dirhams by dumping toxic brine into our protected mangroves? They killed 340 juvenile hammour and 67 saplings! Those Eastern Mangroves are a NATIONAL TREASURE!

*heavy breathing*

CHIEF: And that clever trick of turning off the AIS transponder? You caught them red-handed with that 60-minute blackout! The CEO will be doing hard time, and the company is facing MASSIVE fines!

*calming down*

CHIEF: This is why we have the Enviro-Crimes Division. Corporations think they're above the law? Not on OUR watch! Outstanding work, Detective. Abu Dhabi is safer because of you.

*static ends*`;
      
      default:
        return `*radio crackles*

CHIEF: Detective! Outstanding work out there! YOU SOLVED THE CRIME AND PUT A BAD MAN BEHIND BARS, GOOD JOB!

*hearty laughter*

CHIEF: You know what the best part is? We'll never see that criminal again! Well... maybe in 25 to life! 

*more laughter*

CHIEF: Alright, alright, settle down. But seriously, excellent detective work. The streets are safer because of you. Now, ready for your next case?

*static ends*`;
    }
  };

  const successMessage = getCaseSuccessMessage(caseId);

  const failureMessage = `*radio crackles*

CHIEF: Detective... we need to talk.

*heavy sigh*

CHIEF: That guy was NOT the perp. Not even close! What an incompetent officer you are!

*pause*

CHIEF: But... *sighs* ...it's okay. With time and training, you'll do better. Everyone makes mistakes. Even I arrested a potted plant once in my rookie days. Don't ask.

*clears throat*

CHIEF: Review the evidence again. The real culprit is still out there. Get back to work!

*static ends*`;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70">
      {/* Audio element */}
      <audio ref={audioRef} src={getAudioSrc()} onEnded={handleAudioEnded} />
      
      {/* Modal Window */}
      <div 
        className="window-95-panel bg-[#c0c0c0] w-[600px] max-w-[90vw] max-h-[80vh] flex flex-col"
        style={{ boxShadow: '4px 4px 10px rgba(0,0,0,0.5)' }}
      >
        {/* Title Bar */}
        <div className="window-95-title-bar flex items-center justify-between px-2 py-1 bg-gradient-to-r from-[#000080] to-[#1084d0]">
          <div className="flex items-center gap-2">
            <span className="text-xl">📻</span>
            <span className="font-bold text-white">
              {isSuccess ? 'Chief\'s Congratulations' : 'Chief\'s Feedback'}
            </span>
          </div>
          <button
            onClick={handleClose}
            className="window-95-button w-6 h-6 flex items-center justify-center bg-[#c0c0c0] hover:bg-[#dfdfdf] text-black font-bold"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6 bg-[#c0c0c0]">
          {/* Radio Display */}
          <div className="window-95-panel bg-black p-4 mb-4">
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-4 h-4 rounded-full animate-pulse ${isSuccess ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className="text-green-400 font-mono text-sm">
                {isSuccess ? '[TRANSMISSION: SUCCESS]' : '[TRANSMISSION: FEEDBACK]'}
              </span>
            </div>
            <div className="text-green-400 font-mono text-xs">
              CHANNEL: UAEPD-SECURE-01 | ENCRYPTION: AES-256
            </div>
            <button
              onClick={isPlaying ? handlePause : handlePlay}
              className="mt-3 window-95-button px-3 py-1 flex items-center gap-2 bg-[#c0c0c0] hover:bg-[#dfdfdf] text-black text-xs font-bold"
            >
              {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              {isPlaying ? 'Pause Audio' : 'Play Audio'}
            </button>
          </div>

          {/* Transcript */}
          <div className="window-95-panel bg-white p-4">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b-2 border-gray-300">
              <span className="text-2xl">📝</span>
              <h3 className="font-bold text-lg">Audio Transcript</h3>
            </div>
            <div className="font-mono text-sm whitespace-pre-line leading-relaxed">
              {isSuccess ? successMessage : failureMessage}
            </div>
          </div>

          {/* Status Banner */}
          <div className={`mt-4 p-3 border-2 ${isSuccess ? 'bg-green-100 border-green-600' : 'bg-red-100 border-red-600'}`}>
            <div className="flex items-center gap-2">
              <span className="text-2xl">{isSuccess ? '✅' : '❌'}</span>
              <div>
                <div className="font-bold">
                  {isSuccess ? 'CASE SOLVED - NEXT CASE UNLOCKED' : 'INCORRECT ACCUSATION - TRY AGAIN'}
                </div>
                <div className="text-xs mt-1">
                  {isSuccess 
                    ? 'Excellent work, Detective! Proceeding to next case...'
                    : 'Review the evidence and try again, Detective.'
                  }
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t-2 border-[#808080] flex justify-end">
          <button
            onClick={handleClose}
            className="window-95-button px-6 py-2 bg-blue-600 text-white font-bold hover:bg-blue-700"
          >
            {isSuccess ? 'PROCEED TO NEXT CASE' : 'BACK TO INVESTIGATION'}
          </button>
        </div>
      </div>
    </div>
  );
}