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
    const context = initAudioContext();
    if (context.state === 'suspended') {
      context.resume().catch(() => {});
    }

    // Create a simple noir detective ambient background using oscillators
    const createAmbientLoop = () => {
      // Bass note
      const bass = context.createOscillator();
      const bassGain = context.createGain();
      bass.type = 'sine';
      bass.frequency.value = 55; // A1
      bassGain.gain.value = 0.08;
      bass.connect(bassGain);
      bassGain.connect(context.destination);

      // Pad/atmosphere
      const pad = context.createOscillator();
      const padGain = context.createGain();
      pad.type = 'triangle';
      pad.frequency.value = 220; // A3
      padGain.gain.value = 0.03;
      pad.connect(padGain);
      padGain.connect(context.destination);

      // High ambient
      const ambient = context.createOscillator();
      const ambientGain = context.createGain();
      ambient.type = 'sine';
      ambient.frequency.value = 440; // A4
      ambientGain.gain.value = 0.02;
      ambient.connect(ambientGain);
      ambientGain.connect(context.destination);

      // Add subtle modulation for movement
      const lfo = context.createOscillator();
      const lfoGain = context.createGain();
      lfo.frequency.value = 0.5;
      lfoGain.gain.value = 3;
      lfo.connect(lfoGain);
      lfoGain.connect(pad.frequency);

      // Start all oscillators
      try {
        bass.start();
      } catch (e) {
        // Ignore start errors
      }
      try {
        pad.start();
      } catch (e) {
        // Ignore start errors
      }
      try {
        ambient.start();
      } catch (e) {
        // Ignore start errors
      }
      try {
        lfo.start();
      } catch (e) {
        // Ignore start errors
      }

      return { bass, pad, ambient, lfo, bassGain, padGain, ambientGain, lfoGain };
    };

    // Create the ambient loop
    const musicNodes = createAmbientLoop();
    isMusicPlaying = true;

    // Store reference to stop later
    (window as any).__backgroundMusicNodes = musicNodes;
  } catch (error) {
    // Silently fail - music is optional
  }
};

export const stopBackgroundMusic = () => {
  if (!isMusicPlaying) return;

  try {
    const nodes = (window as any).__backgroundMusicNodes;
    if (nodes) {
      try {
        nodes.bass?.stop();
      } catch (e) {
        // Already stopped
      }
      try {
        nodes.pad?.stop();
      } catch (e) {
        // Already stopped
      }
      try {
        nodes.ambient?.stop();
      } catch (e) {
        // Already stopped
      }
      try {
        nodes.lfo?.stop();
      } catch (e) {
        // Already stopped
      }
      (window as any).__backgroundMusicNodes = null;
    }
    isMusicPlaying = false;
  } catch (error) {
    console.warn('Failed to stop background music:', error);
  }
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