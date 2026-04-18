import { useState, useEffect } from 'react';
import { FileCheck, AlertCircle } from 'lucide-react';

interface ArrestWarrantProps {
  suspectName: string;
  caseTitle: string;
  detectiveName: string;
  onClose: () => void;
  onConfirmArrest: () => void;
  isValid: boolean;
}

export function ArrestWarrant({ suspectName, caseTitle, detectiveName, onClose, onConfirmArrest, isValid }: ArrestWarrantProps) {
  const [confirmed, setConfirmed] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const warrantNumber = `UAEPD-${Date.now().toString().slice(-8)}`;
  const fine = Math.floor(Math.random() * 50000) + 10000; // Random fine between 10k-60k AED

  const handleConfirmArrest = () => {
    if (confirmed) {
      onConfirmArrest();
    } else {
      setShowWarning(true);
    }
  };

  if (!isValid) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70" onClick={onClose}>
        <div 
          className="bg-[#c0c0c0] border-4 border-[#dfdfdf] border-t-white border-l-white shadow-[8px_8px_0_#000000] w-[500px]" 
          onClick={(e) => e.stopPropagation()}
        >
          {/* Title Bar */}
          <div className="bg-gradient-to-r from-red-800 to-red-600 text-white px-3 py-2 flex items-center justify-between">
            <span className="font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              ⚠️ INVALID ARREST ATTEMPT
            </span>
            <button
              onClick={onClose}
              className="w-6 h-6 bg-[#c0c0c0] border-2 border-white text-black flex items-center justify-center font-bold hover:bg-[#dfdfdf]"
            >
              ✕
            </button>
          </div>

          {/* Error Content */}
          <div className="p-6 bg-white border-4 border-red-500 m-4">
            <div className="text-center">
              <AlertCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-red-800 mb-4">ARREST DENIED</h2>
              <div className="text-lg mb-4">
                <p className="mb-2">Subject: <strong>"{suspectName}"</strong></p>
                <p className="text-red-700 font-bold">NOT FOUND IN DATABASE</p>
              </div>
              <div className="bg-yellow-100 border-2 border-yellow-600 p-4 text-left text-sm mb-4">
                <p className="font-bold mb-2">⚠️ DETECTIVE REMINDER:</p>
                <p>All arrest warrants must reference a valid suspect from the <strong>suspects</strong> database table.</p>
                <p className="mt-2">Please verify the suspect's name matches exactly with database records before issuing an arrest warrant.</p>
              </div>
            </div>
          </div>

          {/* Close Button */}
          <div className="p-4 flex justify-center">
            <button
              onClick={onClose}
              className="window-95-button px-8 py-2 font-bold bg-red-100"
            >
              Acknowledge Error
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Warning Modal */}
      {showWarning && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50">
          <div className="bg-[#c0c0c0] border-2 border-[#dfdfdf] border-t-white border-l-white shadow-[4px_4px_0_#000000] w-96">
            <div className="bg-[#000080] text-white px-2 py-1 flex items-center justify-between">
              <span className="font-bold">⚠️ Warning</span>
            </div>
            <div className="p-4">
              <div className="flex gap-3 items-start mb-4">
                <AlertCircle className="w-8 h-8 text-yellow-600 flex-shrink-0" />
                <p className="text-sm">You must confirm your decision before proceeding with the arrest.</p>
              </div>
              <div className="flex justify-center">
                <button
                  onClick={() => setShowWarning(false)}
                  className="window-95-button px-6 py-1"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70" onClick={onClose}>
      <div 
        className="bg-[#f5f5dc] border-8 border-[#8b7355] shadow-[12px_12px_0_#000000] w-[650px] max-h-[90vh] overflow-auto" 
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'linear-gradient(135deg, #f5f5dc 0%, #e8dcc0 100%)',
        }}
      >
        {/* Official Header with Stamps */}
        <div className="relative border-b-4 border-[#8b7355] pb-4 mb-4">
          {/* Red "APPROVED" Stamp */}
          <div 
            className="absolute top-2 right-4 w-24 h-24 border-4 border-red-600 rounded-full flex items-center justify-center rotate-12 opacity-80"
            style={{ background: 'rgba(255, 0, 0, 0.1)' }}
          >
            <span className="text-red-600 font-bold text-lg transform -rotate-12">APPROVED</span>
          </div>

          {/* UAE Badge */}
          <div className="flex items-center justify-center gap-4 pt-4">
            <div className="text-6xl">🇦🇪</div>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-[#1a3a7a]" style={{ fontFamily: 'serif' }}>
                UNITED ARAB EMIRATES
              </h1>
              <h2 className="text-xl font-bold text-[#8b6914]" style={{ fontFamily: 'serif' }}>
                POLICE DEPARTMENT
              </h2>
              <p className="text-sm italic text-gray-700">Enviro-Crimes Division</p>
            </div>
            <div className="text-6xl">🛡️</div>
          </div>
        </div>

        {/* Document Title */}
        <div className="text-center mb-6 px-8">
          <div className="text-3xl font-bold underline mb-2" style={{ fontFamily: 'serif', textDecoration: 'underline double' }}>
            ARREST WARRANT
          </div>
          <div className="text-sm text-gray-600 italic">
            Issued pursuant to UAE Federal Law No. (38) of 2022
          </div>
        </div>

        {/* Warrant Content */}
        <div className="px-8 pb-6 space-y-4" style={{ fontFamily: 'Georgia, serif' }}>
          <div className="flex justify-between text-sm mb-4">
            <div>
              <strong>Warrant No.:</strong> <span className="font-mono">{warrantNumber}</span>
            </div>
            <div>
              <strong>Date Issued:</strong> {currentDate}
            </div>
          </div>

          <div className="border-2 border-gray-400 p-4 bg-white/50">
            <p className="text-base leading-relaxed">
              <strong>TO ALL LAW ENFORCEMENT OFFICERS:</strong>
            </p>
            <p className="mt-2 text-base leading-relaxed">
              You are hereby commanded to arrest and bring before this Court:
            </p>
            
            <div className="my-4 text-center">
              <div className="text-2xl font-bold text-[#1a3a7a] underline">
                {suspectName.toUpperCase()}
              </div>
            </div>

            <p className="text-base leading-relaxed mb-2">
              <strong>CHARGES:</strong>
            </p>
            <p className="italic pl-4 text-base">
              Violation of Environmental Protection Laws in connection with the case titled:
            </p>
            <p className="pl-8 font-bold text-base">
              "{caseTitle}"
            </p>
          </div>

          <div className="border-2 border-gray-400 p-4 bg-white/50">
            <p className="text-base mb-2">
              <strong>PENALTY ASSESSMENT:</strong>
            </p>
            <p className="pl-4 text-base">
              The accused is subject to a fine of <strong className="text-red-700">AED {fine.toLocaleString()}</strong>
              {' '}(United Arab Emirates Dirhams) plus court costs and potential imprisonment as determined by the Environmental Court.
            </p>
          </div>

          <div className="text-sm italic text-gray-700 pl-4 border-l-4 border-[#8b7355] my-4">
            <p className="mb-1">
              This warrant is issued based on probable cause and evidence gathered by UAEPD investigators.
            </p>
            <p>
              The suspect shall be informed of their rights upon arrest as prescribed by UAE law.
            </p>
          </div>

          {/* Signature Section */}
          <div className="mt-6 flex justify-between items-end">
            <div className="text-center w-1/2">
              <div className="border-b-2 border-black w-48 mx-auto mb-1"></div>
              <p className="text-sm font-bold">Detective Signature</p>
              <p className="text-xs italic">{detectiveName}</p>
            </div>
            <div className="text-center w-1/2">
              <div className="border-b-2 border-black w-48 mx-auto mb-1">
                <span style={{ fontFamily: 'Brush Script MT, cursive' }} className="text-xl">
                  Chief Al-Mansouri
                </span>
              </div>
              <p className="text-sm font-bold">Authorized by</p>
              <p className="text-xs italic">Chief of Enviro-Crimes Division</p>
            </div>
          </div>

          {/* Official Seal */}
          <div className="flex justify-center mt-6">
            <div 
              className="w-20 h-20 rounded-full border-4 border-[#8b6914] flex items-center justify-center bg-gradient-to-br from-yellow-600 to-yellow-800 text-white shadow-lg"
              style={{ background: 'radial-gradient(circle, #d4af37 0%, #8b6914 100%)' }}
            >
              <div className="text-center text-xs font-bold">
                <div>UAEPD</div>
                <div className="text-[8px]">OFFICIAL</div>
                <div>SEAL</div>
              </div>
            </div>
          </div>
        </div>

        {/* Confirmation Checkbox */}
        <div className="px-8 pb-4">
          <label className="flex items-center gap-2 cursor-pointer bg-yellow-100 border-2 border-yellow-600 p-3">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
              className="w-5 h-5"
            />
            <span className="text-sm font-bold">
              I confirm that all evidence has been reviewed and this arrest is justified under UAE law.
            </span>
          </label>
        </div>

        {/* Action Buttons */}
        <div className="px-8 pb-6 flex justify-between gap-4">
          <button
            onClick={onClose}
            className="window-95-button px-6 py-2 flex-1"
          >
            ← Cancel Warrant
          </button>
          <button
            onClick={handleConfirmArrest}
            disabled={!confirmed}
            className={`window-95-button px-6 py-2 flex-1 font-bold flex items-center justify-center gap-2 ${
              confirmed ? 'bg-green-100' : 'opacity-50 cursor-not-allowed'
            }`}
          >
            <FileCheck className="w-4 h-4" />
            Execute Arrest Warrant
          </button>
        </div>
      </div>
    </div>
    </>
  );
}