import { useEffect } from 'react';

interface ProcessingWindowProps {
  suspectName: string;
  onComplete: () => void;
}

export function ProcessingWindow({ suspectName, onComplete }: ProcessingWindowProps) {
  useEffect(() => {
    // Auto-close after 2.5 seconds
    const timer = setTimeout(() => {
      onComplete();
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/80">
      <div className="bg-[#c0c0c0] border-4 border-[#dfdfdf] border-t-white border-l-white shadow-[8px_8px_0_#000000] w-[500px]">
        {/* Title Bar */}
        <div className="bg-gradient-to-r from-[#000080] to-[#1084d0] text-white px-3 py-2">
          <span className="font-bold">⚙️ Processing Arrest Warrant...</span>
        </div>

        {/* Content */}
        <div className="p-8 bg-white border-4 border-[#c0c0c0] m-4">
          <div className="text-center space-y-6">
            {/* Animated Spinner */}
            <div className="flex justify-center">
              <div className="w-16 h-16 border-8 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
            </div>

            {/* Processing Text */}
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-[#000080]">Processing Arrest...</h2>
              <p className="text-sm text-gray-700">
                Dispatching units to apprehend
              </p>
              <p className="text-lg font-bold text-black">
                {suspectName}
              </p>
            </div>

            {/* Progress Indicators */}
            <div className="space-y-3 text-left text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
                <span>Validating warrant with database...</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <span>Dispatching patrol units...</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                <span>Broadcasting APB to all stations...</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
                <span>Awaiting confirmation...</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-300 h-6 border-2 border-gray-400">
              <div className="h-full bg-gradient-to-r from-blue-500 to-blue-700 animate-progress-bar"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
