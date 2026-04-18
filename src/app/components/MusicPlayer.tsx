import { useState } from 'react';
import { Play, Pause, Volume2, SkipBack, SkipForward, Music } from 'lucide-react';

const tracks = [
  {
    id: 1,
    title: 'Detective Agency',
    artist: 'Film Noir OST',
    duration: 180
  },
  {
    id: 2,
    title: 'Mystery Investigation',
    artist: 'Crime Scene',
    duration: 165
  },
  {
    id: 3,
    title: 'Night City Blues',
    artist: 'Detective Noir',
    duration: 145
  },
  {
    id: 4,
    title: 'Case Files',
    artist: 'Investigation Theme',
    duration: 155
  },
  {
    id: 5,
    title: 'Suspenseful Clues',
    artist: 'Mystery Sounds',
    duration: 170
  }
];

export function MusicPlayer() {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState(30);

  const handleNext = () => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length);
  };

  const handlePrevious = () => {
    setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
  };

  const handleTrackSelect = (index: number) => {
    setCurrentTrack(index);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="p-4 bg-[#c0c0c0] h-full overflow-auto">
      
      {/* Now Playing Display */}
      <div className="window-95-panel mb-4 p-4 bg-black text-green-400">
        <div className="font-mono text-xs opacity-60 mb-1">NOW PLAYING:</div>
        <div className="font-mono text-lg mb-1 font-bold">{tracks[currentTrack].title}</div>
        <div className="font-mono text-sm opacity-80">{tracks[currentTrack].artist}</div>
        <div className="font-mono text-xs text-yellow-400 mt-2 flex items-center gap-2">
          <Music className="w-3 h-3 animate-pulse" />
          Ambient background music active
        </div>
      </div>

      {/* Progress Bar - Visual Only */}
      <div className="mb-4">
        <div className="w-full bg-[#dfdfdf] border-2 border-[#808080] h-4 relative overflow-hidden">
          <div className="h-full bg-[#000080] w-1/3 animate-pulse"></div>
        </div>
        <div className="flex justify-between text-xs mt-1 font-mono">
          <span>--:--</span>
          <span>{formatTime(tracks[currentTrack].duration)}</span>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <button 
          onClick={handlePrevious} 
          className="window-95-button p-2"
          title="Previous Track"
        >
          <SkipBack className="w-5 h-5" />
        </button>
        <button 
          className="window-95-button p-3"
          title="Playing ambient music"
        >
          <Play className="w-6 h-6" />
        </button>
        <button 
          onClick={handleNext} 
          className="window-95-button p-2"
          title="Next Track"
        >
          <SkipForward className="w-5 h-5" />
        </button>
      </div>

      {/* Volume Control - Visual Only */}
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

      {/* Playlist */}
      <div className="window-95-panel p-2 max-h-64 overflow-y-auto">
        <div className="text-xs font-bold mb-2 bg-[#000080] text-white px-2 py-1">
          DETECTIVE SOUNDTRACK PLAYLIST
        </div>
        {tracks.map((track, index) => (
          <div
            key={track.id}
            onClick={() => handleTrackSelect(index)}
            className={`p-2 cursor-pointer text-sm border-b border-[#808080] transition-colors ${
              index === currentTrack 
                ? 'bg-[#000080] text-white font-bold' 
                : 'hover:bg-[#dfdfdf]'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-xs opacity-60">#{index + 1}</span>
              <div className="flex-1">
                <div className="font-mono">{track.title}</div>
                <div className="text-xs opacity-70">{track.artist}</div>
              </div>
              <span className="text-xs opacity-60">{formatTime(track.duration)}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Info Footer */}
      <div className="mt-4 text-xs text-center opacity-60">
        <p>Detective Noir Music Collection</p>
        <p className="mt-1">Ambient background music plays automatically</p>
      </div>
    </div>
  );
}