import { useState, useEffect } from 'react';
import { Database, Shield, CheckCircle, Loader2 } from 'lucide-react';
import { playBootSound } from '../utils/clickSound';

interface BootSequenceProps {
  onBootComplete: () => void;
}

const BOOT_STEPS = [
  { id: 1, text: 'Initializing CATCHtech System...', duration: 1200 },
  { id: 2, text: 'Loading UAEPD Database...', duration: 1000 },
  { id: 3, text: 'Connecting to Crime Networks...', duration: 1500 },
  { id: 4, text: 'Verifying Detective Credentials...', duration: 1000 },
  { id: 5, text: 'Loading Evidence Management System...', duration: 1200 },
  { id: 6, text: 'Initializing Query Engine...', duration: 800 },
  { id: 7, text: 'System Ready!', duration: 800 },
];

export function BootSequence({ onBootComplete }: BootSequenceProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showLogo, setShowLogo] = useState(true);

  useEffect(() => {
    // Play boot sound when component mounts
    playBootSound();
    
    // Logo screen
    const logoTimer = setTimeout(() => {
      setShowLogo(false);
    }, 2000);

    return () => clearTimeout(logoTimer);
  }, []);

  useEffect(() => {
    if (showLogo) return;

    if (currentStep >= BOOT_STEPS.length) {
      const completeTimer = setTimeout(() => {
        onBootComplete();
      }, 500);
      return () => clearTimeout(completeTimer);
    }

    const step = BOOT_STEPS[currentStep];
    const timer = setTimeout(() => {
      setCurrentStep(prev => prev + 1);
    }, step.duration);

    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const increment = 100 / (step.duration / 50);
        return Math.min(prev + increment, 100);
      });
    }, 50);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [currentStep, showLogo]);

  useEffect(() => {
    // Reset progress for each step
    setProgress(0);
  }, [currentStep]);

  if (showLogo) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-[10000]">
        <div className="text-center animate-pulse">
          {/* CATCHtech Logo */}
          <div className="mb-8">
            <div className="inline-block relative">
              <Shield className="w-32 h-32 text-blue-500" strokeWidth={1.5} />
              <Database className="w-16 h-16 text-green-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-white mb-2 tracking-wider font-mono">
            CATCH<span className="text-blue-400">tech</span>
          </h1>
          <p className="text-blue-300 text-sm tracking-widest font-mono">
            CRIME ANALYSIS TECHNOLOGY CONTROL HUB
          </p>
          <div className="mt-6 flex items-center justify-center gap-2">
            <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
            <span className="text-gray-400 text-xs font-mono">Initializing...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black text-green-400 font-mono z-[10000] flex items-center justify-center">
      <div className="w-full max-w-3xl px-8">
        {/* Header */}
        <div className="border-2 border-green-400 p-4 mb-8">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-blue-400" />
              <div>
                <h2 className="text-xl font-bold">CATCHtech Police OS v4.2</h2>
                <p className="text-xs text-gray-500">UAEPD Enviro-crimes Division</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-500">System Time</div>
              <div className="text-sm">{new Date().toLocaleTimeString()}</div>
            </div>
          </div>
        </div>

        {/* Boot Messages */}
        <div className="space-y-2 mb-8 min-h-[300px]">
          {BOOT_STEPS.slice(0, currentStep + 1).map((step, index) => (
            <div
              key={step.id}
              className={`flex items-center gap-2 transition-opacity duration-300 ${
                index === currentStep ? 'opacity-100' : 'opacity-60'
              }`}
            >
              {index < currentStep ? (
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
              ) : (
                <Loader2 className="w-4 h-4 text-yellow-400 animate-spin flex-shrink-0" />
              )}
              <span className={index === currentStep ? 'text-white' : 'text-green-400'}>
                {step.text}
              </span>
              {index === currentStep && (
                <span className="ml-auto text-yellow-400 animate-pulse">
                  {Math.round(progress)}%
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="border-2 border-green-400 p-4">
          <div className="mb-2 flex justify-between items-center">
            <span className="text-xs">Overall Progress</span>
            <span className="text-xs">{Math.round((currentStep / BOOT_STEPS.length) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-800 h-6 border-2 border-gray-600 relative overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-600 via-green-400 to-green-600 transition-all duration-300 relative"
              style={{ width: `${(currentStep / BOOT_STEPS.length) * 100}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-gray-600">
          <p>© 2026 CATCHtech Systems | Licensed to UAEPD</p>
          <p className="mt-1">Authorized Access Only | Case Management System</p>
        </div>
      </div>
    </div>
  );
}