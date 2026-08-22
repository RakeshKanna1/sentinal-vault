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

// Epic Games Store Authentic Vector Emblem (Beveled Shield + Stylized 'E')
export const EpicGamesIcon: React.FC<IconProps> = ({ size = 16, className = "", style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}>
    <path d="M4.6 1.5h14.8c.6 0 1.1.5 1.1 1.1v12.6c0 4.1-3.6 7.4-8.5 8.7-.2.1-.5.1-.7 0-4.9-1.3-8.5-4.6-8.5-8.7V2.6c0-.6.5-1.1 1.1-1.1zm7.4 3.1-5.7 1.8v8c0 3 2.7 5.6 5.7 6.6 3-1 5.7-3.6 5.7-6.6v-8l-5.7-1.8zm-2.4 3.7h4.8v1.8h-2.9v1.4h2.5v1.7h-2.5v1.4h3v1.8H9.6V8.3z"/>
  </svg>
);

// Ubisoft Official Optical Swirl
export const UbisoftIcon: React.FC<IconProps> = ({ size = 16, className = "", style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}>
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 3.3c4.805 0 8.7 3.895 8.7 8.7 0 4.805-3.895 8.7-8.7 8.7-4.805 0-8.7-3.895-8.7-8.7 0-4.805 3.895-8.7 8.7-8.7zm0 2.7c-3.314 0-6 2.686-6 6 0 1.942.923 3.668 2.355 4.766l1.455-1.94A3.59 3.59 0 0 1 8.4 12c0-1.989 1.611-3.6 3.6-3.6s3.6 1.611 3.6 3.6c0 .884-.319 1.693-.85 2.32l1.64 1.785A5.96 5.96 0 0 0 18 12c0-3.314-2.686-6-6-6z"/>
  </svg>
);

// Microsoft Xbox Authentic Sphere
export const XboxIcon: React.FC<IconProps> = ({ size = 16, className = "", style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}>
    <path d="M4.154 3.125C6.182 1.48 8.878.5 11.996.5c3.12 0 5.816.98 7.844 2.625 1.573 1.275-5.26 8.528-7.844 11.96-2.584-3.432-9.42-10.685-7.842-11.96zM1.05 6.012c-.55 1.786-.85 3.684-.85 5.656 0 4.965 2.012 9.462 5.27 12.72-3.155-3.424-4.823-11.02-4.42-18.376zm21.9 0c.403 7.356-1.265 14.952-4.42 18.376 3.258-3.258 5.27-7.755 5.27-12.72 0-1.972-.3-3.87-.85-5.656zm-17.78 14.4c2.025 1.95 4.8 3.088 7.83 3.088s5.805-1.138 7.83-3.088c-2.457-3.21-6.195-7.733-7.83-10.155-1.635 2.422-5.373 6.945-7.83 10.155z"/>
  </svg>
);

// NVIDIA Authentic Claw Loop
export const NvidiaIcon: React.FC<IconProps> = ({ size = 16, className = "", style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}>
    <path d="M8.974 7.64c0-.288.163-.55.42-.676 1.838-.9 3.655-.98 4.793-.728.29.064.503.316.503.612v9.293a.62.62 0 0 1-.62.62h-4.476a.62.62 0 0 1-.62-.62V7.64zm-3.882 1.488c0-.285.16-.546.414-.674 3.04-1.536 5.86-1.583 7.57-1.127.302.08.514.354.514.667v8.948a.62.62 0 0 1-.62.62H5.712a.62.62 0 0 1-.62-.62V9.128zm-3.87 2.052c0-.28.156-.537.403-.668 4.316-2.296 8.358-2.24 10.74-1.52.316.096.537.388.537.718v7.41a.62.62 0 0 1-.62.62H1.842a.62.62 0 0 1-.62-.62V11.18z"/>
  </svg>
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
