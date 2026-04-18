import { useState, useEffect } from 'react';
import { Play, Pause, Volume2, Music } from 'lucide-react';

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(30);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = (window as any).__bgMusicAudio as HTMLAudioElement | undefined;
    if (audio) {
      setIsPlaying(!audio.paused);
      setVolume(Math.round(audio.volume * 100));
      setDuration(audio.duration || 0);
    }

    const interval = setInterval(() => {
      const a = (window as any).__bgMusicAudio as HTMLAudioElement | undefined;
      if (a) {
        setIsPlaying(!a.paused);
        setCurrentTime(a.currentTime || 0);
        if (a.duration && !isNaN(a.duration)) setDuration(a.duration);
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const handleTogglePlay = () => {
    const audio = (window as any).__bgMusicAudio as HTMLAudioElement | undefined;
    if (audio) {
      if (audio.paused) {
        audio.play().catch(() => {});
      } else {
        audio.pause();
      }
      setIsPlaying(!audio.paused);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    const audio = (window as any).__bgMusicAudio as HTMLAudioElement | undefined;
    if (audio) {
      audio.volume = newVolume / 100;
    }
  };

  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return '--:--';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="p-4 bg-[#c0c0c0] h-full overflow-auto">
      
      {/* Now Playing Display */}
      <div className="window-95-panel mb-4 p-4 bg-black text-green-400">
        <div className="font-mono text-xs opacity-60 mb-1">NOW PLAYING:</div>
        <div className="font-mono text-lg mb-1 font-bold">Detective Agency</div>
        <div className="font-mono text-sm opacity-80">Simer Media Inc.</div>
        <div className="font-mono text-xs text-yellow-400 mt-2 flex items-center gap-2">
          <Music className={`w-3 h-3 ${isPlaying ? 'animate-pulse' : ''}`} />
          {isPlaying ? 'Background music playing' : 'Background music paused'}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="w-full bg-[#dfdfdf] border-2 border-[#808080] h-4 relative overflow-hidden">
          <div className="h-full bg-[#000080] transition-all" style={{ width: `${progressPercent}%` }}></div>
        </div>
        <div className="flex justify-between text-xs mt-1 font-mono">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <button 
          onClick={handleTogglePlay}
          className="window-95-button p-3"
          title={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
        </button>
      </div>

      {/* Volume Control */}
      <div className="window-95-panel p-3 mb-4">
        <div className="flex items-center gap-2">
          <Volume2 className="w-4 h-4" />
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            value={volume}
            onChange={handleVolumeChange}
            className="flex-1"
          />
          <span className="text-xs font-mono w-10">{volume}%</span>
        </div>
      </div>

      {/* Info Footer */}
      <div className="mt-4 text-xs text-center opacity-60">
        <p>Simer Media Inc.</p>
        <p className="mt-1">Background music for detective investigations</p>
      </div>
    </div>
  );
}