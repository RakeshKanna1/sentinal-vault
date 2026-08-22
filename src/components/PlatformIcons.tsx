import React from 'react';
import { Shield } from 'lucide-react';

interface IconProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

// Valve Steam Authentic Vector Emblem
export const SteamIcon: React.FC<IconProps> = ({ size = 16, className = "", style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}>
    <path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.029 4.524 4.524s-2.03 4.524-4.524 4.524h-.105l-4.076 2.911c0 .052.005.105.005.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.723L.645 14.838C2.01 20.11 6.643 24 12.021 24c6.627 0 12-5.373 12-12S18.605 0 11.979 0zm3.96 11.905c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3zm-7.427 4.757c-.828 0-1.5-.671-1.5-1.5 0-.829.672-1.5 1.5-1.5.829 0 1.5.671 1.5 1.5 0 .829-.671 1.5-1.5 1.5z"/>
  </svg>
);

// Epic Games Store Authentic Logo
export const EpicGamesIcon: React.FC<IconProps> = ({ size = 16, className = "", style = {} }) => (
  <img 
    src="/assets/epic-games-logo.png" 
    alt="Epic Games" 
    width={size} 
    height={size} 
    className={className} 
    style={{ width: `${size}px`, height: `${size}px`, objectFit: 'contain', display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }} 
  />
);

// Ubisoft Official Optical Swirl
export const UbisoftIcon: React.FC<IconProps> = ({ size = 16, className = "", style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}>
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 3.3c4.805 0 8.7 3.895 8.7 8.7 0 4.805-3.895 8.7-8.7 8.7-4.805 0-8.7-3.895-8.7-8.7 0-4.805 3.895-8.7 8.7-8.7zm0 2.7c-3.314 0-6 2.686-6 6 0 1.942.923 3.668 2.355 4.766l1.455-1.94A3.59 3.59 0 0 1 8.4 12c0-1.989 1.611-3.6 3.6-3.6s3.6 1.611 3.6 3.6c0 .884-.319 1.693-.85 2.32l1.64 1.785A5.96 5.96 0 0 0 18 12c0-3.314-2.686-6-6-6z"/>
  </svg>
);

// Microsoft Xbox Authentic Logo
export const XboxIcon: React.FC<IconProps> = ({ size = 16, className = "", style = {} }) => (
  <img 
    src="/assets/xbox-logo.png" 
    alt="Xbox" 
    width={size} 
    height={size} 
    className={className} 
    style={{ width: `${size}px`, height: `${size}px`, objectFit: 'contain', display: 'inline-block', verticalAlign: 'middle', filter: 'brightness(0) invert(1)', flexShrink: 0, ...style }} 
  />
);

// NVIDIA Authentic Logo
export const NvidiaIcon: React.FC<IconProps> = ({ size = 16, className = "", style = {} }) => (
  <img 
    src="/assets/nvidia-logo.png" 
    alt="Nvidia GeForce" 
    width={size} 
    height={size} 
    className={className} 
    style={{ width: `${size}px`, height: `${size}px`, objectFit: 'contain', display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }} 
  />
);

// Sentinel Shield Vector
export const CustomShieldIcon: React.FC<IconProps> = ({ size = 16, className = "", style = {} }) => (
  <Shield size={size} className={className} style={style} />
);

export const getPlatformIcon = (category: string, size = 16, style?: React.CSSProperties) => {
  switch (category?.toLowerCase()) {
    case 'steam':
      return <SteamIcon size={size} style={style} />;
    case 'epic':
    case 'epic games':
      return <EpicGamesIcon size={size} style={style} />;
    case 'ubisoft':
    case 'uplay':
      return <UbisoftIcon size={size} style={style} />;
    case 'xbox':
    case 'microsoft':
      return <XboxIcon size={size} style={style} />;
    case 'nvidia':
    case 'geforce':
      return <NvidiaIcon size={size} style={style} />;
    default:
      return <CustomShieldIcon size={size} style={style} />;
  }
};
