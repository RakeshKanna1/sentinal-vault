import React from 'react';
import logoImg from '../assets/sentinel_vault_logo.jpg';
import logoSvg from '../assets/sentinel_vault_logo.svg';

interface SentinelLogoProps {
  size?: number;
  className?: string;
  glow?: boolean;
  variant?: 'icon' | 'wordmark';
}

export const SentinelLogo: React.FC<SentinelLogoProps> = ({ 
  size = 36, 
  className = '', 
  glow = true,
  variant = 'icon'
}) => {
  if (variant === 'icon') {
    return (
      <div 
        className={`inline-flex items-center justify-center relative select-none shrink-0 ${className}`}
        style={{
          filter: glow ? 'drop-shadow(0 0 10px rgba(0, 240, 255, 0.45)) drop-shadow(0 0 20px rgba(139, 92, 246, 0.3))' : 'none'
        }}
      >
        <svg 
          width={size} 
          height={size} 
          viewBox="0 0 512 512" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="sv_coreAura" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#7c3aed" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
            </radialGradient>

            <linearGradient id="sv_cyberCyan" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a5f3fc" />
              <stop offset="40%" stopColor="#00f0ff" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>

            <linearGradient id="sv_shieldViolet" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c084fc" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#4c1d95" />
            </linearGradient>

            <linearGradient id="sv_armorMetal" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#14192b" />
              <stop offset="50%" stopColor="#0d111e" />
              <stop offset="100%" stopColor="#060911" />
            </linearGradient>

            <linearGradient id="sv_pupilGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="50%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#00f0ff" />
            </linearGradient>

            <linearGradient id="sv_rimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#00f0ff" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          {/* Ambient Core Aura */}
          <circle cx="256" cy="256" r="210" fill="url(#sv_coreAura)" />

          {/* Outer Hexagonal Cyber Armor Shield */}
          <polygon 
            points="256,22 462,139 462,373 256,490 50,373 50,139" 
            fill="url(#sv_armorMetal)" 
            stroke="url(#sv_rimGrad)" 
            strokeWidth="4" 
            strokeLinejoin="round"
          />

          {/* High-Tech Tactical Corner Brackets */}
          <path d="M 230 40 L 256 25 L 282 40" fill="none" stroke="#00f0ff" strokeWidth="3" strokeLinecap="round" />
          <path d="M 230 472 L 256 487 L 282 472" fill="none" stroke="#00f0ff" strokeWidth="3" strokeLinecap="round" />
          <path d="M 436 127 L 459 140 L 459 170" fill="none" stroke="#8b5cf6" strokeWidth="3" strokeLinecap="round" />
          <path d="M 459 342 L 459 372 L 436 385" fill="none" stroke="#8b5cf6" strokeWidth="3" strokeLinecap="round" />
          <path d="M 76 385 L 53 372 L 53 342" fill="none" stroke="#8b5cf6" strokeWidth="3" strokeLinecap="round" />
          <path d="M 53 170 L 53 140 L 76 127" fill="none" stroke="#8b5cf6" strokeWidth="3" strokeLinecap="round" />

          {/* Inner Inset Circuit Dash Line */}
          <polygon 
            points="256,48 438,151 438,361 256,464 74,361 74,151" 
            fill="none" 
            stroke="rgba(139, 92, 246, 0.35)" 
            strokeWidth="1.5" 
            strokeDasharray="8 6" 
            strokeLinejoin="round"
          />

          {/* Rotary Vault Gear Rings */}
          <circle cx="256" cy="256" r="168" fill="#090d18" stroke="url(#sv_shieldViolet)" strokeWidth="3" />
          <circle cx="256" cy="256" r="162" fill="none" stroke="rgba(0, 240, 255, 0.4)" strokeWidth="1" strokeDasharray="3 5" />
          <circle cx="256" cy="256" r="148" fill="none" stroke="#1e2640" strokeWidth="8" />

          {/* Vault Locking Lugs & Index Teeth */}
          <g fill="url(#sv_cyberCyan)" opacity="0.85">
            <rect x="253" y="96" width="6" height="12" rx="1.5" />
            <rect x="253" y="404" width="6" height="12" rx="1.5" />
            <rect x="96" y="253" width="12" height="6" rx="1.5" />
            <rect x="404" y="253" width="12" height="6" rx="1.5" />
            <rect x="330" y="127" width="6" height="12" rx="1.5" transform="rotate(30 333 133)" />
            <rect x="176" y="393" width="6" height="12" rx="1.5" transform="rotate(30 179 399)" />
            <rect x="393" y="176" width="6" height="12" rx="1.5" transform="rotate(60 396 182)" />
            <rect x="127" y="330" width="6" height="12" rx="1.5" transform="rotate(60 130 336)" />
            <rect x="393" y="330" width="6" height="12" rx="1.5" transform="rotate(120 396 336)" />
            <rect x="127" y="176" width="6" height="12" rx="1.5" transform="rotate(120 130 182)" />
            <rect x="330" y="393" width="6" height="12" rx="1.5" transform="rotate(150 333 399)" />
            <rect x="176" y="127" width="6" height="12" rx="1.5" transform="rotate(150 179 133)" />
          </g>

          {/* 6 Vault Heavy Hydraulic Latches */}
          <g stroke="url(#sv_cyberCyan)" strokeWidth="2.5" strokeLinecap="round" opacity="0.9">
            <path d="M 256 108 L 256 148" />
            <path d="M 256 364 L 256 404" />
            <path d="M 358 197 L 324 217" />
            <path d="M 358 315 L 324 295" />
            <path d="M 154 315 L 188 295" />
            <path d="M 154 197 L 188 217" />
          </g>

          {/* Inner Vault Bevel Chamber */}
          <polygon 
            points="256,134 362,195 362,317 256,378 150,317 150,195" 
            fill="#060913" 
            stroke="url(#sv_shieldViolet)" 
            strokeWidth="3.5" 
            strokeLinejoin="round"
          />

          {/* Inner Telemetry Ring */}
          <circle cx="256" cy="256" r="102" fill="none" stroke="rgba(0, 240, 255, 0.25)" strokeWidth="1.5" strokeDasharray="6 4" />

          {/* Outer Sentinel Visor */}
          <polygon 
            points="256,182 334,256 256,330 178,256" 
            fill="rgba(12, 18, 36, 0.9)" 
            stroke="url(#sv_cyberCyan)" 
            strokeWidth="3" 
            strokeLinejoin="round"
          />

          {/* Scanline Needle & Calibrations */}
          <g stroke="url(#sv_cyberCyan)" strokeWidth="1.5" opacity="0.8">
            <path d="M 112 256 L 178 256" />
            <path d="M 334 256 L 400 256" />
            <path d="M 130 250 L 130 262" />
            <path d="M 146 252 L 146 260" />
            <path d="M 382 250 L 382 262" />
            <path d="M 366 252 L 366 260" />
          </g>

          {/* Faceted Diamond Prism */}
          <polygon 
            points="256,204 308,256 256,308 204,256" 
            fill="url(#sv_shieldViolet)" 
            fillOpacity="0.35" 
            stroke="#c084fc" 
            strokeWidth="2" 
            strokeLinejoin="round"
          />

          {/* Inner Core Shutter */}
          <polygon 
            points="256,224 288,256 256,288 224,256" 
            fill="#080e1e" 
            stroke="#00f0ff" 
            strokeWidth="2.5" 
            strokeLinejoin="round"
          />

          {/* Glowing Sentinel Core / Singularity */}
          <polygon 
            points="256,236 272,256 256,276 240,256" 
            fill="url(#sv_pupilGlow)" 
          />

          {/* Ocular Core Spark */}
          <circle cx="256" cy="256" r="4.5" fill="#ffffff" />
          <circle cx="256" cy="256" r="2" fill="#a5f3fc" />

          {/* HUD Optics Pips */}
          <circle cx="256" cy="194" r="2" fill="#00f0ff" />
          <circle cx="256" cy="318" r="2" fill="#00f0ff" />
          <circle cx="192" cy="256" r="2" fill="#00f0ff" />
          <circle cx="320" cy="256" r="2" fill="#00f0ff" />
        </svg>
      </div>
    );
  }

  return (
    <div 
      className={`inline-flex items-center justify-center relative select-none ${className}`}
      style={{
        filter: glow ? 'drop-shadow(0 0 12px rgba(0, 240, 255, 0.5)) drop-shadow(0 0 18px rgba(139, 92, 246, 0.35))' : 'none'
      }}
    >
      {/* High-Tech Inverted Minimalist V A U L T Vector Wordmark */}
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
            <stop offset="100%" stopColor="#8b5cf6" />
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
        {/* Letter 'T' (Custom Sharp Corner T) */}
        <path d="M 290 15 L 350 15 L 350 75 L 335 75 L 335 28 L 290 28 Z" fill="url(#vaultNeonGrad)" />
      </svg>
    </div>
  );
};

export { logoImg, logoSvg };
