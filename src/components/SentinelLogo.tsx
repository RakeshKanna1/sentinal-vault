import React from 'react';

interface SentinelLogoProps {
  size?: number;
  className?: string;
  glow?: boolean;
}

export const SentinelLogo: React.FC<SentinelLogoProps> = ({ size = 32, className = '', glow = true }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ filter: glow ? 'drop-shadow(0 0 10px rgba(0, 240, 255, 0.5))' : 'none' }}
    >
      <defs>
        <linearGradient id="sentinelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00f0ff" />
          <stop offset="50%" stopColor="#7000ff" />
          <stop offset="100%" stopColor="#ff007f" />
        </linearGradient>

        <linearGradient id="sentinelCore" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#00f0ff" />
        </linearGradient>
      </defs>

      {/* Outer Diamond Shield Framework */}
      <polygon points="50,6 92,30 92,70 50,94 8,70 8,30" fill="rgba(8, 9, 16, 0.85)" stroke="url(#sentinelGrad)" strokeWidth="5" strokeLinejoin="round" />
      <polygon points="50,16 82,34 82,66 50,84 18,66 18,34" fill="none" stroke="rgba(0, 240, 255, 0.25)" strokeWidth="2" strokeDasharray="4 4" />

      {/* Inner Cyber Key Emblem */}
      <path d="M50 28 C41 28 34 35 34 44 C34 50 38 56 44 58 V70 L39 75 V79 H45 V83 H55 V76 L56 58 C62 56 66 50 66 44 C66 35 59 28 50 28 Z" fill="url(#sentinelCore)" />
      
      {/* Key Center Core */}
      <circle cx="50" cy="42" r="5" fill="#080910" />
    </svg>
  );
};
