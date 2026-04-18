// Global click sound utility
let audioContext: AudioContext | null = null;
let isMusicPlaying = false;

const initAudioContext = () => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioContext;
};

export const playClickSound = () => {
  try {
    const context = initAudioContext();
    if (context.state === 'suspended') {
      context.resume().catch(() => {});
    }
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(context.destination);

    // Create a short "click" sound
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.08, context.currentTime);
    gainNode.gain.linearRampToValueAtTime(0, context.currentTime + 0.05);

    oscillator.start(context.currentTime);
    try {
      oscillator.stop(context.currentTime + 0.05);
    } catch (stopError) {
      // Ignore stop errors
    }
  } catch (error) {
    // Silently fail if audio not available
  }
};

export const playBootSound = () => {
  try {
    const context = initAudioContext();
    if (context.state === 'suspended') {
      context.resume().catch(() => {});
    }
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(context.destination);

    // Create Windows-like startup sound
    oscillator.type = 'sine';

    // Ascending chord progression
    const now = context.currentTime;
    oscillator.frequency.setValueAtTime(262, now); // C4
    oscillator.frequency.setValueAtTime(330, now + 0.2); // E4
    oscillator.frequency.setValueAtTime(392, now + 0.4); // G4
    oscillator.frequency.setValueAtTime(523, now + 0.6); // C5

    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.15, now + 0.1);
    gainNode.gain.linearRampToValueAtTime(0.12, now + 0.6);
    gainNode.gain.linearRampToValueAtTime(0, now + 1.2);

    oscillator.start(now);
    try {
      oscillator.stop(now + 1.2);
    } catch (stopError) {
      // Ignore stop errors
    }
  } catch (error) {
    // Silently fail if audio not available
  }
};

export const playSuccessSound = () => {
  try {
    const context = initAudioContext();
    if (context.state === 'suspended') {
      context.resume().catch(() => {});
    }
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(context.destination);

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(800, context.currentTime);
    oscillator.frequency.setValueAtTime(1000, context.currentTime + 0.1);

    gainNode.gain.setValueAtTime(0.1, context.currentTime);
    gainNode.gain.linearRampToValueAtTime(0, context.currentTime + 0.2);

    oscillator.start(context.currentTime);
    try {
      oscillator.stop(context.currentTime + 0.2);
    } catch (stopError) {
      // Ignore stop errors
    }
  } catch (error) {
    // Silently fail if audio not available
  }
};

export const startBackgroundMusic = () => {
  if (isMusicPlaying) return;

  try {
    const audio = new Audio('/audio/bg.mp3');
    audio.loop = true;
    audio.volume = 0.3;
    audio.play().catch(() => {});
    isMusicPlaying = true;
    (window as any).__bgMusicAudio = audio;
  } catch (error) {
    // Silently fail - music is optional
  }
};

export const stopBackgroundMusic = () => {
  if (!isMusicPlaying) return;

  try {
    const audio = (window as any).__bgMusicAudio as HTMLAudioElement | null;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      (window as any).__bgMusicAudio = null;
    }
    isMusicPlaying = false;
  } catch (error) {
    console.warn('Failed to stop background music:', error);
  }
};

export const duckBackgroundMusic = () => {
  try {
    const audio = (window as any).__bgMusicAudio as HTMLAudioElement | null;
    if (audio) {
      audio.volume = 0.03;
    }
  } catch (e) {}
};

export const unduckBackgroundMusic = () => {
  try {
    const audio = (window as any).__bgMusicAudio as HTMLAudioElement | null;
    if (audio) {
      audio.volume = 0.3;
    }
  } catch (e) {}
};

// Add click sound to all buttons globally via event listener
export const initGlobalClickSound = () => {
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (
      target.tagName === 'BUTTON' ||
      target.closest('button') ||
      target.classList.contains('window-95-button') ||
      target.classList.contains('desktop-icon')
    ) {
      playClickSound();
    }
  });
};