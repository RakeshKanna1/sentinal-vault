import React from 'react';
import logoImg from '../assets/sentinel_vault_logo.jpg';

interface SentinelLogoProps {
  size?: number;
  className?: string;
  glow?: boolean;
  variant?: 'icon' | 'wordmark';
}

export const SentinelLogo: React.FC<SentinelLogoProps> = ({ 
  size = 32, 
  className = '', 
  glow = true,
  variant = 'icon'
}) => {
  if (variant === 'icon') {
    return (
      <div 
        className={`inline-flex items-center justify-center relative select-none shrink-0 ${className}`}
        style={{
          filter: glow ? 'drop-shadow(0 0 8px rgba(0, 240, 255, 0.45)) drop-shadow(0 0 14px rgba(250, 204, 21, 0.25))' : 'none'
        }}
      >
        <svg 
          width={size} 
          height={size} 
          viewBox="0 0 100 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="iconGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00f2fe" />
              <stop offset="45%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#facc15" />
            </linearGradient>
            <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00f0ff" />
              <stop offset="50%" stopColor="#7000ff" />
              <stop offset="100%" stopColor="#ff007f" />
            </linearGradient>
          </defs>

          {/* Cyber Outer Shield */}
          <polygon points="50,6 92,30 92,70 50,94 8,70 8,30" fill="rgba(9, 13, 22, 0.95)" stroke="url(#shieldGrad)" strokeWidth="4" strokeLinejoin="round" />
          <polygon points="50,16 82,34 82,66 50,84 18,66 18,34" fill="none" stroke="rgba(0, 240, 255, 0.3)" strokeWidth="1.5" strokeDasharray="3 3" />

          {/* Letter 'V' & Inverted 'A' (V Λ Emblem) */}
          <path d="M 30 35 L 50 72 L 70 35 L 60 35 L 50 54 L 40 35 Z" fill="url(#iconGrad)" />
          <circle cx="50" cy="30" r="3.5" fill="#00f2fe" />
        </svg>
      </div>
    );
  }

  return (
    <div 
      className={`inline-flex items-center justify-center relative select-none ${className}`}
      style={{
        filter: glow ? 'drop-shadow(0 0 12px rgba(0, 240, 255, 0.5)) drop-shadow(0 0 18px rgba(250, 204, 21, 0.35))' : 'none'
      }}
    >
      {/* High-Tech Inverted Minimalist V A U L T Vector Emblem */}
      <svg 
        height={size} 
        viewBox="0 0 380 90" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="h-auto w-auto max-w-full"
        style={{ height: `${size}px` }}
      >
        <defs>
          <linearGradient id="vaultNeonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00f2fe" />
            <stop offset="45%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#facc15" />
          </linearGradient>
        </defs>

        {/* Letter 'V' */}
        <path d="M 15 15 L 42 75 L 69 15 L 53 15 L 42 45 L 31 15 Z" fill="url(#vaultNeonGrad)" />
        {/* Letter 'A' (Inverted Lambda Λ) */}
        <path d="M 85 75 L 112 15 L 139 75 L 123 75 L 112 45 L 101 75 Z" fill="url(#vaultNeonGrad)" />
        {/* Letter 'U' */}
        <path d="M 155 15 L 155 52 C 155 67 165 75 182 75 C 199 75 209 67 209 52 L 209 15 L 194 15 L 194 52 C 194 60 189 63 182 63 C 175 63 170 60 170 52 L 170 15 Z" fill="url(#vaultNeonGrad)" />
        {/* Letter 'L' */}
        <path d="M 225 15 L 225 75 L 275 75 L 275 62 L 240 62 L 240 15 Z" fill="url(#vaultNeonGrad)" />
        {/* Letter 'T' (Custom Sharp Corner T / 7) */}
        <path d="M 290 15 L 350 15 L 350 75 L 335 75 L 335 28 L 290 28 Z" fill="url(#vaultNeonGrad)" />
      </svg>
    </div>
  );
};

export { logoImg };
