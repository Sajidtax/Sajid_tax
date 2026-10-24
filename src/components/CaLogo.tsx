import React from 'react';

interface CaLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const CaLogo: React.FC<CaLogoProps> = ({ className = '', size = 'md' }) => {
  // Dimension classes based on size prop
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-9 h-9 sm:w-11 sm:h-11',
    lg: 'w-12 h-12',
  }[size];

  return (
    <div
      className={`rounded-lg bg-gradient-to-br from-[#023e60] to-[#012235] text-white flex items-center justify-center shadow-sm shrink-0 relative overflow-hidden border border-[#0c5369]/60 p-1 ${sizeClasses} ${className}`}
      aria-label="Chartered Accountant (CA) Emblem"
      title="Chartered Accountant Practice"
    >
      {/* Official Stylized CA Emblem SVG */}
      <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-xs"
      >
        {/* Soft background radial shine */}
        <circle cx="32" cy="32" r="28" fill="url(#ca-radial-glow)" opacity="0.15" />

        {/* Letter C */}
        <path
          d="M 28 20 C 19 20 15 25 15 32 C 15 39 19 44 28 44 C 30.5 44 32.5 43.2 34 42 L 34 37 C 32.5 38.2 30.5 38.8 28 38.8 C 22.5 38.8 20.8 35.5 20.8 32 C 20.8 28.5 22.5 25.2 28 25.2 C 30.5 25.2 32.5 25.8 34 27 L 34 22 C 32.5 20.8 30.5 20 28 20 Z"
          fill="#FFFFFF"
        />

        {/* Letter A (Left leg and peak) */}
        <path
          d="M 42 19 L 36.5 44 L 42 44 L 43.4 37 L 48.8 37 L 49.3 44 L 54.5 44 L 48.2 19 Z M 44.4 32 L 46 24.2 L 48 32 Z"
          fill="#FFFFFF"
        />

        {/* Official CA Signature Green Tick / Accent Mark */}
        <path
          d="M 33 33 L 38 40 L 51 22"
          stroke="#63ac4c"
          strokeWidth="3.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <defs>
          <radialGradient id="ca-radial-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#023e60" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
};
