export function PoliceBadge() {
  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0 opacity-20">
      <div className="relative w-[400px] h-[500px]">
        {/* Badge SVG */}
        <svg width="400" height="500" viewBox="0 0 400 500" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Outer star shape */}
          <path
            d="M200 20 L220 120 L320 120 L240 180 L270 280 L200 220 L130 280 L160 180 L80 120 L180 120 Z"
            fill="#1a3a7a"
            stroke="#d4af37"
            strokeWidth="4"
          />
          
          {/* Inner badge circle */}
          <circle cx="200" cy="180" r="90" fill="#0f2557" stroke="#d4af37" strokeWidth="6" />
          
          {/* Center circle for text */}
          <circle cx="200" cy="180" r="75" fill="#1a3a7a" />
          
          {/* Bottom banner */}
          <path
            d="M100 320 L300 320 L300 380 L200 420 L100 380 Z"
            fill="#d4af37"
            stroke="#8b6914"
            strokeWidth="3"
          />
          
          {/* Decorative elements */}
          <circle cx="200" cy="180" r="65" fill="none" stroke="#d4af37" strokeWidth="2" strokeDasharray="5,5" />
        </svg>

        {/* Text overlays - CENTERED ON BADGE CIRCLE at y=180 */}
        <div 
          className="absolute text-center text-[#d4af37] font-bold"
          style={{
            textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
            fontFamily: 'serif',
            top: '140px', // Position to center on circle (180px - half of text height)
            left: '50%',
            transform: 'translateX(-50%)',
            width: '140px', // Constrain width to fit inside circle
          }}
        >
          <div style={{ fontSize: '24px', letterSpacing: '2px', marginBottom: '2px' }}>UAEPD</div>
          <div style={{ fontSize: '11px', letterSpacing: '1px', marginBottom: '1px' }}>ENVIRO-CRIMES</div>
          <div style={{ fontSize: '10px', letterSpacing: '1px' }}>DIVISION</div>
        </div>

        {/* Motto on bottom banner - CENTERED IN GOLD BANNER */}
        <div 
          className="absolute text-center text-[#0f2557] font-bold tracking-wider"
          style={{
            top: '335px', // Center vertically in banner (between 320 and 380)
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '11px',
            fontFamily: 'serif',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            lineHeight: '1.3',
            width: '180px'
          }}
        >
          <div>Protecting Our</div>
          <div>Environment</div>
        </div>
      </div>
    </div>
  );
}