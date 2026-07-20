import React, { useState, useEffect, useRef } from 'react';
import { 
  Lock, Key, Eye, EyeOff, Copy, Plus, Search, 
  Trash2, Edit3, RefreshCw, 
  Download, Upload, X, Check, ShieldAlert, Gamepad2, Laptop,
  FileText, Fingerprint
} from 'lucide-react';
import { encryptText, decryptText } from './utils/crypto';
import { generatePasswordsFromGame } from './utils/gamePasswordGenerator';
import './App.css';


// Interface for Vault Credentials
interface CredentialItem {
  id: string;
  platform: string;
  username: string;
  passwordEncrypted: string;
  notesEncrypted: string;
  category: 'steam' | 'xbox' | 'nvidia' | 'custom';
  strength: 'weak' | 'medium' | 'strong';
  updatedAt: string;
}

// Scramble Text Component for Cyberpunk Decrypt Effect
const ScrambledText: React.FC<{ text: string; reveal: boolean }> = ({ text, reveal }) => {
  const [displayVal, setDisplayVal] = useState('');
  const chars = '!@#$%^&*()_+~`|}{[]:;?><,./-=0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  
  useEffect(() => {
    if (!reveal) {
      setDisplayVal('•'.repeat(Math.min(text.length, 12)));
      return;
    }
    
    let frame = 0;
    const duration = 600; // ms
    const totalFrames = Math.floor(duration / 30);
    
    const interval = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      
      const scrambled = text
        .split('')
        .map((char, index) => {
          if (char === ' ') return ' ';
          if (index / text.length < progress) {
            return char;
          }
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');
        
      setDisplayVal(scrambled);
      
      if (frame >= totalFrames) {
        setDisplayVal(text);
        clearInterval(interval);
      }
    }, 30);
    
    return () => clearInterval(interval);
  }, [reveal, text]);

  return <span className="text-scramble">{displayVal}</span>;
};

// Interactive Canvas Particles Network Background (wembi.ai Style)
const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
    }> = [];
    
    // Spawn faint network nodes
    const particleCount = Math.min(Math.floor((width * height) / 25000), 60);
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1,
      });
    }
    
    const mouse = { x: -1000, y: -1000 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'rgba(255, 91, 26, 0.15)';
      ctx.strokeStyle = 'rgba(255, 91, 26, 0.03)';
      
      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;
        
        // Bounce off walls
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        
        // Link nodes close to the mouse cursor
        const dxMouse = mouse.x - p.x;
        const dyMouse = mouse.y - p.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < 185) {
          ctx.strokeStyle = `rgba(255, 91, 26, ${0.12 * (1 - distMouse / 185)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
        
        // Link nodes close to each other
        for (let j = idx + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p2.x - p.x;
          const dy = p2.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 130) {
            ctx.strokeStyle = `rgba(255, 91, 26, ${0.045 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }} />;
};

// Text Scramble on Hover Component (wembi.ai Style)
const HoverScrambleText: React.FC<{ text: string }> = ({ text }) => {
  const [displayText, setDisplayText] = useState(text);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&';
  const isScrambling = useRef(false);
  
  const startScramble = () => {
    if (isScrambling.current) return;
    isScrambling.current = true;
    
    let frame = 0;
    const duration = 250;
    const totalFrames = Math.floor(duration / 30);
    
    const interval = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const scrambled = text
        .split('')
        .map((char, index) => {
          if (char === ' ' || char === '/' || char === '-') return char;
          if (index / text.length < progress) return char;
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');
      setDisplayText(scrambled);
      if (frame >= totalFrames) {
        setDisplayText(text);
        isScrambling.current = false;
        clearInterval(interval);
      }
    }, 30);
  };
  
  return (
    <span onMouseEnter={startScramble} style={{ display: 'inline-block' }}>
      {displayText}
    </span>
  );
};

export default function App() {
  // Vault state
  const [isInitialized, setIsInitialized] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [masterPassword, setMasterPassword] = useState('');
  const [masterConfirm, setMasterConfirm] = useState('');
  const [vaultItems, setVaultItems] = useState<CredentialItem[]>([]);
  const [errorMsg, setErrorMsg] = useState('');
  
  // Decrypted cache (in-memory only, never persisted)
  const [decryptedPasswords, setDecryptedPasswords] = useState<Record<string, string>>({});
  const [decryptedNotes, setDecryptedNotes] = useState<Record<string, string>>({});
  const [revealedItems, setRevealedItems] = useState<Record<string, boolean>>({});
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  // Active filters and inputs
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'steam' | 'xbox' | 'nvidia' | 'custom'>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingItem, setEditingItem] = useState<CredentialItem | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  // Form Fields
  const [formPlatform, setFormPlatform] = useState('');
  const [formUsername, setFormUsername] = useState('');
  const [formPassword, setFormPassword] = useState('');
  const [formNotes, setFormNotes] = useState('');
  const [formCategory, setFormCategory] = useState<'steam' | 'xbox' | 'nvidia' | 'custom'>('custom');

  // Password Generator States
  const [genLength, setGenLength] = useState(16);
  const [genUpper, setGenUpper] = useState(true);
  const [genLower, setGenLower] = useState(true);
  const [genNumbers, setGenNumbers] = useState(true);
  const [genSymbols, setGenSymbols] = useState(true);
  const [generatedPassword, setGeneratedPassword] = useState('');

  // Game-themed Password Generator States
  const [generatorMode, setGeneratorMode] = useState<'standard' | 'game'>('standard');
  const [gameNameInput, setGameNameInput] = useState('');
  const [gamePasswordSuggestions, setGamePasswordSuggestions] = useState<{
    loreBased: string;
    leetStyle: string;
    stealthShort: string;
  } | null>(null);


  // Notification Banner State
  const [notification, setNotification] = useState<string | null>(null);
  
  // Guide Modal States
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [selectedGuideText, setSelectedGuideText] = useState('');
  const [selectedGuidePlatform, setSelectedGuidePlatform] = useState('');
  
  // Custom Cursor Coordinate States
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [followerPos, setFollowerPos] = useState({ x: -100, y: -100 });

  // Refs for tracking mouse
  const requestRef = useRef<number | null>(null);
  const mousePos = useRef({ x: -100, y: -100 });

  // Initialize and check local storage & pointer capability
  useEffect(() => {
    const authCheck = localStorage.getItem('sentinel_vault_auth_token');
    if (authCheck) {
      setIsInitialized(true);
    }
    
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setIsDesktop(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Custom Cursor Mouse Listener
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  // Smooth lerp for cursor follower (Awwwards design detail)
  useEffect(() => {
    const updateFollower = () => {
      setFollowerPos((prev) => {
        const dx = mousePos.current.x - prev.x;
        const dy = mousePos.current.y - prev.y;
        return {
          x: prev.x + dx * 0.15,
          y: prev.y + dy * 0.15
        };
      });
      requestRef.current = requestAnimationFrame(updateFollower);
    };
    
    requestRef.current = requestAnimationFrame(updateFollower);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  // Trigger brief floating notifications
  const triggerNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  // Copy helper
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    triggerNotification(`${label} Copied to Clipboard!`);
  };

  // Generate guide text in appropriate format
  const generateGuide = (item: CredentialItem, decryptedPass: string): string => {
    const platformLower = item.platform.toLowerCase();
    
    let isSteam = item.category === 'steam';
    let isXbox = item.category === 'xbox';
    let isNvidia = item.category === 'nvidia';
    let isEpic = false;

    // Check keywords only for custom platform types
    if (item.category === 'custom') {
      if (platformLower.includes('xbox') || platformLower.includes('microsoft') || platformLower.includes('fh6') || platformLower.includes('live')) {
        isXbox = true;
      } else if (platformLower.includes('nvidia') || platformLower.includes('geforce')) {
        isNvidia = true;
      } else if (platformLower.includes('epic') || platformLower.includes('egs')) {
        isEpic = true;
      } else {
        isSteam = platformLower.includes('steam') || platformLower.includes('valve') || platformLower.includes('rockstar');
      }
    }

    let launcherName = "Steam";
    let downloadLink = "https://store.steampowered.com";
    let step3Text = "Library → All Games";
    let extraImportant = "• Do not enable Steam Guard or family settings";

    if (isXbox) {
      launcherName = "Xbox App";
      downloadLink = "https://www.xbox.com/apps/xbox-app-for-pc";
      step3Text = "My Library";
      extraImportant = "";
    } else if (isNvidia) {
      launcherName = "GeForce Now / Nvidia Client";
      downloadLink = "https://www.nvidia.com/en-us/geforce-now/download/";
      step3Text = "Games Library";
      extraImportant = "";
    } else if (isEpic) {
      launcherName = "Epic Games Launcher";
      downloadLink = "https://store.epicgames.com";
      step3Text = "Library";
      extraImportant = "";
    } else if (item.category === 'custom' && !isSteam) {
      launcherName = item.platform;
      downloadLink = "the appropriate launcher/client";
      step3Text = "Library / Games Section";
      extraImportant = "";
    }

    return `🎮 RAKEXURA STORE – GAME ACCESS GUIDE

Step 1️⃣
Download and install ${launcherName} from:
${downloadLink}

Step 2️⃣
Open ${launcherName} and login using the account details below 👇

👤 Account: ${item.username}
🔑 Password: ${decryptedPass}

Step 3️⃣
After logging in, go to:
📚 ${step3Text}

Step 4️⃣
Select your purchased game and click Install ⬇️

Step 5️⃣
Once the download is complete, launch the game and enjoy 🎮✨

⚠️ Important:
• Do not change account details
${extraImportant ? extraImportant + '\n' : ''}• Keep the account safe
• Contact us if you face any issues 👍`;
  };

  const handleGenerateAccessGuide = async (item: CredentialItem) => {
    try {
      let pwd = decryptedPasswords[item.id];
      if (!pwd) {
        pwd = await decryptText(item.passwordEncrypted, masterPassword);
        setDecryptedPasswords(prev => ({ ...prev, [item.id]: pwd }));
      }
      const guideText = generateGuide(item, pwd);
      setSelectedGuideText(guideText);
      setSelectedGuidePlatform(item.platform);
      
      // Auto copy to clipboard
      await navigator.clipboard.writeText(guideText);
      triggerNotification('Access Guide Copied to Clipboard!');
      setShowGuideModal(true);
    } catch (err) {
      triggerNotification('Failed to generate access guide.');
      console.error(err);
    }
  };

  // Helper to determine password strength
  const checkPasswordStrength = (pwd: string): 'weak' | 'medium' | 'strong' => {
    if (pwd.length < 8) return 'weak';
    let score = 0;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[a-z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    
    if (score >= 4 && pwd.length >= 12) return 'strong';
    if (score >= 3) return 'medium';
    return 'weak';
  };

  // Generate a random password
  const handleGeneratePassword = () => {
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    let pool = '';
    if (genUpper) pool += upper;
    if (genLower) pool += lower;
    if (genNumbers) pool += numbers;
    if (genSymbols) pool += symbols;

    if (!pool) {
      setGeneratedPassword('Select at least one character set!');
      return;
    }

    let result = '';
    for (let i = 0; i < genLength; i++) {
      result += pool.charAt(Math.floor(Math.random() * pool.length));
    }
    setGeneratedPassword(result);
  };

  // Generate game-themed passwords
  const handleGenerateGamePasswords = () => {
    if (!gameNameInput.trim()) {
      triggerNotification('Please enter a game name!');
      return;
    }
    const suggestions = generatePasswordsFromGame(gameNameInput);
    setGamePasswordSuggestions(suggestions);
    triggerNotification(`Suggested passwords generated for ${gameNameInput}!`);
  };

  // Apply suggested password to Add modal
  const handleApplyGamePassword = (pwd: string) => {
    setFormPlatform(gameNameInput.trim().toUpperCase());
    setFormPassword(pwd);
    setFormNotes(`Suggested password generated from game lore: "${gameNameInput.trim()}"`);
    
    // Guess category from game name
    const lowerName = gameNameInput.toLowerCase();
    if (lowerName.includes('steam') || lowerName.includes('valve') || lowerName.includes('counter strike') || lowerName.includes('cs') || lowerName.includes('dota') || lowerName.includes('portal') || lowerName.includes('terraria') || lowerName.includes('witcher')) {
      setFormCategory('steam');
    } else if (lowerName.includes('xbox') || lowerName.includes('halo') || lowerName.includes('forza') || lowerName.includes('gears') || lowerName.includes('minecraft')) {
      setFormCategory('xbox');
    } else if (lowerName.includes('nvidia') || lowerName.includes('geforce')) {
      setFormCategory('nvidia');
    } else {
      setFormCategory('custom');
    }
    
    setShowAddModal(true);
    triggerNotification('Applied password to vault registry form.');
  };

  // Biometrics WebAuthn States & Methods
  const [biometricsAvailable, setBiometricsAvailable] = useState(false);
  const [biometricsEnabled, setBiometricsEnabled] = useState(false);

  useEffect(() => {
    if (window.PublicKeyCredential && PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable) {
      PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable()
        .then((available) => {
          setBiometricsAvailable(available);
          const bioCred = localStorage.getItem('sentinel_biometric_credential');
          if (bioCred) setBiometricsEnabled(true);
        })
        .catch(() => setBiometricsAvailable(false));
    }
  }, []);

  // Auto-prompt Fingerprint / Face ID scanner immediately on login screen load
  const hasAutoPromptedBio = useRef(false);

  useEffect(() => {
    if (!isUnlocked && isInitialized && biometricsEnabled && !hasAutoPromptedBio.current) {
      hasAutoPromptedBio.current = true;
      const timer = setTimeout(() => {
        handleBiometricUnlock();
      }, 400);
      return () => clearTimeout(timer);
    }
    if (isUnlocked) {
      hasAutoPromptedBio.current = false;
    }
  }, [isUnlocked, isInitialized, biometricsEnabled]);

  const bufferToBase64 = (buffer: ArrayBuffer): string => {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  const base64ToBuffer = (base64: string): ArrayBuffer => {
    const binary = window.atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes.buffer;
  };

  const handleEnableBiometrics = async () => {
    if (!masterPassword) {
      triggerNotification('Unlock vault first with Master Password to bind Fingerprint.');
      return;
    }

    try {
      const challenge = window.crypto.getRandomValues(new Uint8Array(32));
      const userId = window.crypto.getRandomValues(new Uint8Array(16));

      const credential = (await navigator.credentials.create({
        publicKey: {
          challenge,
          rp: { name: 'Sentinel Vault' },
          user: {
            id: userId,
            name: 'Sentinel User',
            displayName: 'Sentinel Vault User'
          },
          pubKeyCredParams: [
            { alg: -7, type: 'public-key' },
            { alg: -257, type: 'public-key' }
          ],
          authenticatorSelection: {
            authenticatorAttachment: 'platform',
            userVerification: 'preferred'
          },
          timeout: 60000
        }
      })) as PublicKeyCredential;

      if (credential && credential.rawId) {
        const rawIdB64 = bufferToBase64(credential.rawId);
        const bioEncryptedMaster = await encryptText(masterPassword, rawIdB64);
        localStorage.setItem('sentinel_biometric_credential', rawIdB64);
        localStorage.setItem('sentinel_biometric_payload', bioEncryptedMaster);
        setBiometricsEnabled(true);
        triggerNotification('Fingerprint / Face ID Access Configured Successfully!');
      }
    } catch (err: any) {
      console.error('Biometric registration error:', err);
      if (err.name === 'NotAllowedError') {
        triggerNotification('Biometric registration cancelled.');
      } else {
        triggerNotification('Biometric registration unsupported or failed.');
      }
    }
  };

  const handleDisableBiometrics = () => {
    localStorage.removeItem('sentinel_biometric_credential');
    localStorage.removeItem('sentinel_biometric_payload');
    setBiometricsEnabled(false);
    triggerNotification('Biometric login disabled.');
  };

  const handleBiometricUnlock = async () => {
    try {
      const rawIdB64 = localStorage.getItem('sentinel_biometric_credential');
      const bioPayload = localStorage.getItem('sentinel_biometric_payload');
      if (!rawIdB64 || !bioPayload) {
        setBiometricsEnabled(false);
        return;
      }

      const challenge = window.crypto.getRandomValues(new Uint8Array(32));
      const rawIdBuffer = base64ToBuffer(rawIdB64);

      const assertion = await navigator.credentials.get({
        publicKey: {
          challenge,
          allowCredentials: [
            {
              id: rawIdBuffer,
              type: 'public-key'
            }
          ],
          userVerification: 'preferred',
          timeout: 60000
        }
      });

      if (assertion) {
        const recoveredMaster = await decryptText(bioPayload, rawIdB64);
        setMasterPassword(recoveredMaster);

        // Perform unlock
        const authVerifyToken = localStorage.getItem('sentinel_vault_auth_token');
        if (!authVerifyToken) throw new Error('Missing auth token');

        const verified = await decryptText(authVerifyToken, recoveredMaster);
        if (verified !== 'sentinel_vault_auth_verified') throw new Error('Verification failed');

        const savedItems = localStorage.getItem('sentinel_vault_items');
        let currentList: CredentialItem[] = savedItems ? JSON.parse(savedItems) : [];

        setVaultItems(currentList);
        setIsUnlocked(true);
        setErrorMsg('');
        triggerNotification('Biometric Identity Verified. Vault Unlocked!');
      }
    } catch (err: any) {
      console.error('Biometric unlock error:', err);
      // Clean up stale or domain-mismatched credential so user can log in cleanly
      localStorage.removeItem('sentinel_biometric_credential');
      localStorage.removeItem('sentinel_biometric_payload');
      setBiometricsEnabled(false);

      if (err.name === 'NotAllowedError') {
        setErrorMsg('Biometric verification cancelled.');
      } else {
        setErrorMsg('Biometric key expired or changed. Unlock with Master Password to re-bind.');
      }
    }
  };

  // Initialize vault with defaults on master password setup
  const handleInitializeVault = async () => {
    if (!masterPassword || masterPassword.length < 8) {
      setErrorMsg('Master Password must be at least 8 characters long.');
      return;
    }
    if (masterPassword !== masterConfirm) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    try {
      // Encrypt verification token
      const authVerifyToken = await encryptText('sentinel_vault_auth_verified', masterPassword);
      localStorage.setItem('sentinel_vault_auth_token', authVerifyToken);

      // Create defaults from user text file (All 10 gamer-vault items)
      const defaultItemsRaw = [
        { id: '1', platform: 'RAKEJINWO', username: 'jinwosung2', password: 'Rakesh@111', notes: 'Imported launcher credential.', category: 'custom' },
        { id: '2', platform: 'RAKEGENERAL', username: 'rake_general', password: 'Rakesh@111', notes: 'General gaming account credential.', category: 'custom' },
        { id: '3', platform: 'ROCKSTAR - STEAM', username: 'Rake_Rockstar', password: 'Rakesh@111', notes: 'Rockstar Games Social Club / Steam integration.', category: 'steam' },
        { id: '4', platform: 'EPIC GAMES', username: 'cheappcgamesrake@gmail.com', password: 'Rakesh@114', notes: 'Epic Games Store official email login.', category: 'custom' },
        { id: '5', platform: 'RAKEXURA CRIC', username: 'Rakexura_cric', password: 'rakexura@112', notes: 'Cricket / sports gaming portal.', category: 'custom' },
        { id: '6', platform: 'RAKEXURA MAFIA AND HITMAN', username: 'rake_hitman', password: 'Rakesh@111', notes: 'Steam launcher keys for Mafia and Hitman collections.', category: 'steam' },
        { id: '7', platform: 'RAKEXURA FH6', username: 'rakexura_fh6', password: 'rakexura@111', notes: 'Xbox Live / Forza Horizon account.', category: 'xbox' },
        { id: '8', platform: 'Nvidia Geforce Now', username: '12k21rakeshkannam@gmail.com', password: 'Rakesh@111', notes: 'Nvidia GeForce NOW Cloud Gaming account.', category: 'nvidia' },
        { id: '9', platform: 'Steam - Rake_Meccha', username: 'Rake_Meccha', password: 'Rakesh@111', notes: 'Steam library and launcher credentials.', category: 'steam' },
        { id: '10', platform: 'Xbox Live', username: '12k21rakeshkannam@gmail.com', password: 'Rakesh@111', notes: 'Xbox Pass and Microsoft Store gaming account.', category: 'xbox' }
      ];

      const encryptedItems: CredentialItem[] = [];
      for (const item of defaultItemsRaw) {
        const passEnc = await encryptText(item.password, masterPassword);
        const notesEnc = await encryptText(item.notes, masterPassword);
        encryptedItems.push({
          id: item.id,
          platform: item.platform,
          username: item.username,
          passwordEncrypted: passEnc,
          notesEncrypted: notesEnc,
          category: item.category as any,
          strength: checkPasswordStrength(item.password),
          updatedAt: new Date().toLocaleDateString()
        });
      }

      localStorage.setItem('sentinel_vault_items', JSON.stringify(encryptedItems));
      
      setVaultItems(encryptedItems);
      setIsInitialized(true);
      setIsUnlocked(true);
      setErrorMsg('');
      triggerNotification('Vault Configured Successfully!');
    } catch (err) {
      setErrorMsg('Failed to initialize database.');
      console.error(err);
    }
  };

  // Unlock existing vault
  const handleUnlockVault = async () => {
    if (!masterPassword) {
      setErrorMsg('Enter master password.');
      return;
    }

    try {
      const authVerifyToken = localStorage.getItem('sentinel_vault_auth_token');
      if (!authVerifyToken) {
        setErrorMsg('Vault configuration is missing. Clear browser cache and reset.');
        return;
      }

      // Test key decryption
      const verified = await decryptText(authVerifyToken, masterPassword);
      if (verified !== 'sentinel_vault_auth_verified') {
        throw new Error('Verification failed');
      }

      // Load items
      const savedItems = localStorage.getItem('sentinel_vault_items');
      let currentList: CredentialItem[] = savedItems ? JSON.parse(savedItems) : [];

      // Auto-sync missing default items (items 8, 9, 10)
      const missingDefaults = [
        { id: '8', platform: 'Nvidia Geforce Now', username: '12k21rakeshkannam@gmail.com', password: 'Rakesh@111', notes: 'Nvidia GeForce NOW Cloud Gaming account.', category: 'nvidia' },
        { id: '9', platform: 'Steam - Rake_Meccha', username: 'Rake_Meccha', password: 'Rakesh@111', notes: 'Steam library and launcher credentials.', category: 'steam' },
        { id: '10', platform: 'Xbox Live', username: '12k21rakeshkannam@gmail.com', password: 'Rakesh@111', notes: 'Xbox Pass and Microsoft Store gaming account.', category: 'xbox' }
      ];

      let updateNeeded = false;
      for (const mItem of missingDefaults) {
        if (!currentList.some(item => item.id === mItem.id || item.platform === mItem.platform)) {
          const passEnc = await encryptText(mItem.password, masterPassword);
          const notesEnc = await encryptText(mItem.notes, masterPassword);
          currentList.push({
            id: mItem.id,
            platform: mItem.platform,
            username: mItem.username,
            passwordEncrypted: passEnc,
            notesEncrypted: notesEnc,
            category: mItem.category as any,
            strength: checkPasswordStrength(mItem.password),
            updatedAt: new Date().toLocaleDateString()
          });
          updateNeeded = true;
        }
      }

      if (updateNeeded) {
        localStorage.setItem('sentinel_vault_items', JSON.stringify(currentList));
      }

      setVaultItems(currentList);

      setIsUnlocked(true);
      setErrorMsg('');
      triggerNotification(updateNeeded ? 'Decryption Key Accepted. Vault items synced to 10 keys!' : 'Decryption Key Accepted. Access Granted.');
    } catch (err) {
      setErrorMsg('Invalid Decryption Key. Try again.');
      console.error(err);
    }
  };

  // Lock vault back up
  const handleLockVault = () => {
    setIsUnlocked(false);
    setMasterPassword('');
    setDecryptedPasswords({});
    setDecryptedNotes({});
    setRevealedItems({});
    setFlippedCards({});
    triggerNotification('Sentinel Vault Locked.');
  };

  // Decrypt individual item details (in memory)
  const decryptItem = async (itemId: string, cipherText: string, type: 'password' | 'notes') => {
    try {
      const decrypted = await decryptText(cipherText, masterPassword);
      if (type === 'password') {
        setDecryptedPasswords(prev => ({ ...prev, [itemId]: decrypted }));
      } else {
        setDecryptedNotes(prev => ({ ...prev, [itemId]: decrypted }));
      }
    } catch (err) {
      triggerNotification('Failed to decrypt data.');
      console.error(err);
    }
  };

  // Toggle reveal password
  const toggleReveal = async (item: CredentialItem) => {
    const isRevealed = !!revealedItems[item.id];
    
    if (!isRevealed && !decryptedPasswords[item.id]) {
      // Decrypt first
      await decryptItem(item.id, item.passwordEncrypted, 'password');
    }

    setRevealedItems(prev => ({ ...prev, [item.id]: !isRevealed }));
  };

  // Toggle 3D flip details card
  const toggleFlip = async (item: CredentialItem) => {
    const isFlipped = !!flippedCards[item.id];
    
    if (!isFlipped && !decryptedNotes[item.id]) {
      // Decrypt notes first
      await decryptItem(item.id, item.notesEncrypted, 'notes');
    }

    setFlippedCards(prev => ({ ...prev, [item.id]: !isFlipped }));
  };

  // Add new item
  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formPlatform || !formUsername || !formPassword) {
      triggerNotification('Please fill in required fields!');
      return;
    }

    try {
      const passEnc = await encryptText(formPassword, masterPassword);
      const notesEnc = await encryptText(formNotes || 'No notes saved.', masterPassword);
      
      const newItem: CredentialItem = {
        id: Date.now().toString(),
        platform: formPlatform,
        username: formUsername,
        passwordEncrypted: passEnc,
        notesEncrypted: notesEnc,
        category: formCategory,
        strength: checkPasswordStrength(formPassword),
        updatedAt: new Date().toLocaleDateString()
      };

      const updatedList = [...vaultItems, newItem];
      setVaultItems(updatedList);
      localStorage.setItem('sentinel_vault_items', JSON.stringify(updatedList));

      // Reset Form
      setFormPlatform('');
      setFormUsername('');
      setFormPassword('');
      setFormNotes('');
      setFormCategory('custom');
      setShowAddModal(false);
      triggerNotification('Gamer Key Saved.');
    } catch (err) {
      triggerNotification('Failed to encrypt/save.');
    }
  };

  // Open Edit modal
  const openEditModal = async (item: CredentialItem) => {
    setEditingItem(item);
    setFormPlatform(item.platform);
    setFormUsername(item.username);
    setFormCategory(item.category);
    
    // Decrypt fields first
    try {
      const pass = await decryptText(item.passwordEncrypted, masterPassword);
      const notes = await decryptText(item.notesEncrypted, masterPassword);
      setFormPassword(pass);
      setFormNotes(notes);
      setShowEditModal(true);
    } catch (err) {
      triggerNotification('Failed to decrypt data for editing.');
    }
  };

  // Save edited item
  const handleEditItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    try {
      const passEnc = await encryptText(formPassword, masterPassword);
      const notesEnc = await encryptText(formNotes, masterPassword);

      const updatedList = vaultItems.map((item) => {
        if (item.id === editingItem.id) {
          return {
            ...item,
            platform: formPlatform,
            username: formUsername,
            passwordEncrypted: passEnc,
            notesEncrypted: notesEnc,
            category: formCategory,
            strength: checkPasswordStrength(formPassword),
            updatedAt: new Date().toLocaleDateString()
          };
        }
        return item;
      });

      setVaultItems(updatedList);
      localStorage.setItem('sentinel_vault_items', JSON.stringify(updatedList));

      // Update in-memory decryptions in case they are currently being viewed
      setDecryptedPasswords(prev => ({ ...prev, [editingItem.id]: formPassword }));
      setDecryptedNotes(prev => ({ ...prev, [editingItem.id]: formNotes }));

      // Reset
      setEditingItem(null);
      setFormPlatform('');
      setFormUsername('');
      setFormPassword('');
      setFormNotes('');
      setShowEditModal(false);
      triggerNotification('Gamer Key Updated.');
    } catch (err) {
      triggerNotification('Failed to save changes.');
    }
  };

  // Delete item
  const handleDeleteItem = (id: string) => {
    if (confirm('Are you sure you want to delete this launcher key?')) {
      const updatedList = vaultItems.filter(item => item.id !== id);
      setVaultItems(updatedList);
      localStorage.setItem('sentinel_vault_items', JSON.stringify(updatedList));
      triggerNotification('Key Deleted.');
    }
  };

  // Export Encrypted JSON Backup (Fully Secure)
  const handleExportBackup = () => {
    const authVerifyToken = localStorage.getItem('sentinel_vault_auth_token');
    const savedItems = localStorage.getItem('sentinel_vault_items');
    
    if (!authVerifyToken || !savedItems) {
      triggerNotification('Nothing to export!');
      return;
    }

    const backupData = {
      version: 'SENTINEL-1.0',
      verifyToken: authVerifyToken,
      items: JSON.parse(savedItems),
      exportedAt: new Date().toISOString()
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `sentinel_vault_backup_${new Date().toISOString().slice(0,10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    triggerNotification('Encrypted backup file exported.');
  };

  // Import JSON Backup
  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileReader = new FileReader();
    fileReader.onload = async (event) => {
      try {
        const fileContent = event.target?.result as string;
        const backupData = JSON.parse(fileContent);
        
        if (backupData.version !== 'SENTINEL-1.0' || !backupData.verifyToken || !backupData.items) {
          alert('Invalid Sentinel Backup file format.');
          return;
        }

        // Prompt the user to verify if this backup uses the current password
        // Try decrypting the backup's verification token with current master key
        try {
          const testVerify = await decryptText(backupData.verifyToken, masterPassword);
          if (testVerify !== 'sentinel_vault_auth_verified') {
            alert('Decryption failed: This backup was encrypted with a different master password. Set the master password of this vault to match the backup files password first.');
            return;
          }
        } catch (err) {
          alert('Decryption failed: This backup was encrypted with a different master password.');
          return;
        }

        // Save imported
        setVaultItems(backupData.items);
        localStorage.setItem('sentinel_vault_items', JSON.stringify(backupData.items));
        triggerNotification('Vault backup imported successfully!');
      } catch (err) {
        alert('Failed to parse file. Ensure it is a valid JSON backup.');
      }
    };
    fileReader.readAsText(file);
  };

  // Filter items based on activeTab & searchQuery
  const filteredItems = vaultItems.filter((item) => {
    const matchesTab = activeTab === 'all' || item.category === activeTab;
    const matchesSearch = 
      item.platform.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.username.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  // Calculate quick stats
  const totalKeys = vaultItems.length;
  const steamCount = vaultItems.filter(item => item.category === 'steam').length;
  const xboxCount = vaultItems.filter(item => item.category === 'xbox').length;
  const nvidiaCount = vaultItems.filter(item => item.category === 'nvidia').length;

  return (
    <div className="vault-container">
      <ParticleBackground />
      {/* Visual Cursor Followers for Awwwards Aesthetic */}
      {isDesktop && (
        <>
          <div className="custom-cursor" style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }}></div>
          <div className="custom-cursor-follower" style={{ left: `${followerPos.x}px`, top: `${followerPos.y}px` }}></div>
        </>
      )}

      {/* Floating Notification */}
      {notification && (
        <div className="notification-banner">
          <Check size={16} color="#00e676" />
          <span>{notification}</span>
        </div>
      )}

      {/* LOCK SCREEN OVERLAY */}
      {!isUnlocked && (
        <div className="lock-screen">
          <div className="lock-box">
            <div className="lock-icon-container">
              {isInitialized ? <Lock size={36} /> : <Key size={36} />}
            </div>
            
            <h1 className="lock-title">
              {isInitialized ? 'SENTINEL VAULT' : 'CONFIGURE SENTINEL'}
            </h1>
            <p className="lock-subtitle">
              {isInitialized ? 'DEC_KEY_REQUIRED' : 'INITIAL_SETUP_REQUIRED'}
            </p>

            <div className="lock-input-group">
              <input 
                type="password" 
                placeholder="ENTER MASTER PASSWORD"
                className="lock-input"
                value={masterPassword}
                onChange={(e) => setMasterPassword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    isInitialized ? handleUnlockVault() : handleInitializeVault();
                  }
                }}
              />
            </div>

            {!isInitialized && (
              <div className="lock-input-group">
                <input 
                  type="password" 
                  placeholder="CONFIRM MASTER PASSWORD"
                  className="lock-input"
                  value={masterConfirm}
                  onChange={(e) => setMasterConfirm(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleInitializeVault();
                    }
                  }}
                />
              </div>
            )}

            <button 
              className="btn-decrypt interactive"
              onClick={isInitialized ? handleUnlockVault : handleInitializeVault}
            >
              <HoverScrambleText text={isInitialized ? 'DECRYPT VAULT' : 'CREATE VAULT'} />
            </button>

            {isInitialized && biometricsAvailable && (
              <button 
                className="btn-biometric interactive"
                onClick={biometricsEnabled ? handleBiometricUnlock : handleEnableBiometrics}
                title={biometricsEnabled ? 'Scan Fingerprint or Face ID to unlock' : 'Click to enable Fingerprint / Face ID for this device'}
              >
                <Fingerprint size={20} />
                <span>{biometricsEnabled ? 'UNLOCK WITH FINGERPRINT / FACE ID' : 'ENABLE FINGERPRINT ACCESS'}</span>
              </button>
            )}

            {errorMsg && <div className="lock-error">{errorMsg}</div>}
          </div>
        </div>
      )}

      {/* VAULT DASHBOARD (Only visible if unlocked) */}
      {isUnlocked && (
        <>
          {/* HEADER */}
          <header className="vault-header">
            <div className="brand-section">
              <div className="brand-logo">
                <Gamepad2 size={24} />
              </div>
              <h1 className="brand-title">
                SENTINEL<span>// VAULT</span>
              </h1>
            </div>

            <div className="status-indicator-bar">
              <button 
                className="status-capsule interactive"
                onClick={biometricsEnabled ? handleDisableBiometrics : handleEnableBiometrics}
                style={{ 
                  cursor: 'pointer', 
                  background: biometricsEnabled ? 'rgba(0, 240, 255, 0.15)' : 'rgba(255, 255, 255, 0.04)', 
                  borderColor: biometricsEnabled ? '#00f0ff' : 'var(--border-dim)' 
                }}
                title={biometricsEnabled ? 'Click to disable biometric login' : 'Click to enable Fingerprint / Face ID for this device'}
              >
                <Fingerprint size={14} style={{ color: biometricsEnabled ? '#00f0ff' : '#aaa', marginRight: '6px' }} />
                <span style={{ color: biometricsEnabled ? '#00f0ff' : 'inherit' }}>
                  {biometricsEnabled ? 'FINGERPRINT_ACTIVE' : 'ENABLE_FINGERPRINT'}
                </span>
              </button>

              <div className="status-capsule">
                <div className="pulse-dot"></div>
                <span>DECRYPTED_SESSION</span>
              </div>
              <button className="btn-lock interactive" onClick={handleLockVault}>
                <Lock size={14} style={{ marginRight: '6px' }} />
                <HoverScrambleText text="RELOCK" />
              </button>
            </div>
          </header>

          <main className="vault-main">
            {/* STATS RACKS */}
            <section className="stats-grid">
              <div className="stat-card total">
                <div className="stat-label">TOTAL KEYS SECURED</div>
                <div className="stat-value">{totalKeys}</div>
                <div className="stat-glow"></div>
              </div>
              <div className="stat-card steam">
                <div className="stat-label">STEAM KEYS</div>
                <div className="stat-value">{steamCount}</div>
                <div className="stat-glow"></div>
              </div>
              <div className="stat-card xbox">
                <div className="stat-label">XBOX LIVE KEYS</div>
                <div className="stat-value">{xboxCount}</div>
                <div className="stat-glow"></div>
              </div>
              <div className="stat-card nvidia">
                <div className="stat-label">NVIDIA PORTALS</div>
                <div className="stat-value">{nvidiaCount}</div>
                <div className="stat-glow"></div>
              </div>
            </section>

            {/* CONTROL HUB */}
            <section className="control-hub">
              <div className="hub-top">
                <div className="search-wrapper">
                  <Search size={18} className="search-icon" />
                  <input 
                    type="text" 
                    placeholder="SEARCH SECURED LAUNCHERS..."
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="hub-actions">
                  <button className="btn-primary interactive" onClick={() => setShowAddModal(true)}>
                    <Plus size={18} />
                    <HoverScrambleText text="ADD NEW KEY" />
                  </button>

                  <button className="btn-secondary interactive" onClick={handleExportBackup}>
                    <Download size={16} />
                    <HoverScrambleText text="BACKUP" />
                  </button>

                  <label className="btn-secondary interactive" style={{ cursor: 'pointer' }}>
                    <Upload size={16} style={{ marginRight: '8px' }} />
                    <HoverScrambleText text="IMPORT" />
                    <input 
                      type="file" 
                      accept=".json" 
                      style={{ display: 'none' }} 
                      onChange={handleImportBackup}
                    />
                  </label>
                </div>
              </div>

              {/* Category Filter rail */}
              <div className="category-rail">
                <button 
                  className={`category-tab interactive ${activeTab === 'all' ? 'active' : ''}`}
                  onClick={() => setActiveTab('all')}
                >
                  <Laptop size={14} />
                  <HoverScrambleText text="ALL CREDENTIALS" />
                </button>
                <button 
                  className={`category-tab interactive ${activeTab === 'steam' ? 'active' : ''}`}
                  onClick={() => setActiveTab('steam')}
                >
                  <HoverScrambleText text="STEAM" />
                </button>
                <button 
                  className={`category-tab interactive ${activeTab === 'xbox' ? 'active' : ''}`}
                  onClick={() => setActiveTab('xbox')}
                >
                  <HoverScrambleText text="XBOX" />
                </button>
                <button 
                  className={`category-tab interactive ${activeTab === 'nvidia' ? 'active' : ''}`}
                  onClick={() => setActiveTab('nvidia')}
                >
                  <HoverScrambleText text="NVIDIA" />
                </button>
                <button 
                  className={`category-tab interactive ${activeTab === 'custom' ? 'active' : ''}`}
                  onClick={() => setActiveTab('custom')}
                >
                  <HoverScrambleText text="CUSTOM" />
                </button>
              </div>
            </section>

            {/* PASSWORD GENERATOR WIDGET */}
            <section className="generator-widget">
              <div className="generator-header" style={{ marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
                <h3 className="generator-title" style={{ margin: 0 }}>SENTINEL PASSWORD GENERATOR</h3>
                
                <div className="generator-mode-selector" style={{ margin: 0 }}>
                  <button 
                    className={`gen-mode-btn ${generatorMode === 'standard' ? 'active' : ''}`}
                    onClick={() => setGeneratorMode('standard')}
                  >
                    STANDARD
                  </button>
                  <button 
                    className={`gen-mode-btn ${generatorMode === 'game' ? 'active' : ''}`}
                    onClick={() => setGeneratorMode('game')}
                  >
                    GAME-THEMED
                  </button>
                </div>
              </div>

              {generatorMode === 'standard' ? (
                <>
                  <div className="generator-header">
                    <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)', fontFamily: 'var(--font-mono)' }}>
                      STRENGTH:
                    </span>
                    <div className="strength-indicator">
                      <div className="strength-bar">
                        <div className={`strength-fill ${
                          checkPasswordStrength(generatedPassword) === 'strong' ? 'strong' : 
                          checkPasswordStrength(generatedPassword) === 'medium' ? 'medium' : 'weak'
                        }`}></div>
                      </div>
                    </div>
                  </div>

                  <div className="generator-output-box">
                    <span className="generated-val">{generatedPassword || 'GENERATE_A_PASS_KEY'}</span>
                    <div className="card-button-row">
                      {generatedPassword && (
                        <button 
                          className="btn-card-icon interactive" 
                          onClick={() => copyToClipboard(generatedPassword, 'Generated Password')}
                        >
                          <Copy size={16} />
                        </button>
                      )}
                      <button className="btn-card-icon interactive" onClick={handleGeneratePassword}>
                        <RefreshCw size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="generator-controls">
                    <div className="form-group">
                      <label className="form-label">LENGTH: {genLength}</label>
                      <input 
                        type="range" 
                        min="8" 
                        max="32" 
                        value={genLength} 
                        onChange={(e) => setGenLength(parseInt(e.target.value))} 
                        style={{ accentColor: 'var(--accent-primary)' }}
                      />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center' }}>
                      <label className="generator-checkbox-label">
                        <input type="checkbox" checked={genUpper} onChange={(e) => setGenUpper(e.target.checked)} />
                        UPPERCASE (A-Z)
                      </label>
                      <label className="generator-checkbox-label">
                        <input type="checkbox" checked={genLower} onChange={(e) => setGenLower(e.target.checked)} />
                        LOWERCASE (a-z)
                      </label>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center' }}>
                      <label className="generator-checkbox-label">
                        <input type="checkbox" checked={genNumbers} onChange={(e) => setGenNumbers(e.target.checked)} />
                        NUMBERS (0-9)
                      </label>
                      <label className="generator-checkbox-label">
                        <input type="checkbox" checked={genSymbols} onChange={(e) => setGenSymbols(e.target.checked)} />
                        SPECIAL CHARS (!@#$)
                      </label>
                    </div>
                  </div>
                </>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div className="game-input-container">
                    <div className="game-input-wrapper">
                      <Gamepad2 size={16} className="game-input-icon" />
                      <input 
                        type="text" 
                        placeholder="ENTER GAME NAME (e.g. Witcher 3, Cyberpunk, GTA 5...)" 
                        className="game-input-field"
                        value={gameNameInput}
                        onChange={(e) => setGameNameInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleGenerateGamePasswords();
                        }}
                      />
                    </div>
                    <button className="btn-primary interactive" onClick={handleGenerateGamePasswords}>
                      <RefreshCw size={16} style={{ marginRight: '4px' }} />
                      <HoverScrambleText text="SUGGEST PASSWORD" />
                    </button>
                  </div>

                  {gamePasswordSuggestions && (
                    <div className="suggestions-grid">
                      {/* Lore Based */}
                      <div className="suggestion-card">
                        <div className="suggestion-card-header">
                          <span className="suggestion-type">Lore-Based</span>
                          <div className="strength-indicator">
                            <span style={{ fontSize: '10px', color: 'var(--color-text-dim)' }}>STRENGTH:</span>
                            <div className="strength-bar" style={{ width: '30px' }}>
                              <div className={`strength-fill ${checkPasswordStrength(gamePasswordSuggestions.loreBased)}`}></div>
                            </div>
                          </div>
                        </div>
                        <div className="suggestion-value-box">
                          <span className="suggestion-val">{gamePasswordSuggestions.loreBased}</span>
                          <button 
                            className="btn-card-icon interactive" 
                            style={{ padding: '4px' }}
                            onClick={() => copyToClipboard(gamePasswordSuggestions.loreBased, 'Lore Password')}
                          >
                            <Copy size={13} />
                          </button>
                        </div>
                        <div className="suggestion-actions">
                          <button 
                            className="btn-apply-key interactive"
                            onClick={() => handleApplyGamePassword(gamePasswordSuggestions.loreBased)}
                          >
                            APPLY TO NEW KEY
                          </button>
                        </div>
                      </div>

                      {/* Leet Style */}
                      <div className="suggestion-card">
                        <div className="suggestion-card-header">
                          <span className="suggestion-type">Leet-Style</span>
                          <div className="strength-indicator">
                            <span style={{ fontSize: '10px', color: 'var(--color-text-dim)' }}>STRENGTH:</span>
                            <div className="strength-bar" style={{ width: '30px' }}>
                              <div className={`strength-fill ${checkPasswordStrength(gamePasswordSuggestions.leetStyle)}`}></div>
                            </div>
                          </div>
                        </div>
                        <div className="suggestion-value-box">
                          <span className="suggestion-val">{gamePasswordSuggestions.leetStyle}</span>
                          <button 
                            className="btn-card-icon interactive" 
                            style={{ padding: '4px' }}
                            onClick={() => copyToClipboard(gamePasswordSuggestions.leetStyle, 'Leet Password')}
                          >
                            <Copy size={13} />
                          </button>
                        </div>
                        <div className="suggestion-actions">
                          <button 
                            className="btn-apply-key interactive"
                            onClick={() => handleApplyGamePassword(gamePasswordSuggestions.leetStyle)}
                          >
                            APPLY TO NEW KEY
                          </button>
                        </div>
                      </div>

                      {/* Stealth Short */}
                      <div className="suggestion-card">
                        <div className="suggestion-card-header">
                          <span className="suggestion-type">Stealth-Short</span>
                          <div className="strength-indicator">
                            <span style={{ fontSize: '10px', color: 'var(--color-text-dim)' }}>STRENGTH:</span>
                            <div className="strength-bar" style={{ width: '30px' }}>
                              <div className={`strength-fill ${checkPasswordStrength(gamePasswordSuggestions.stealthShort)}`}></div>
                            </div>
                          </div>
                        </div>
                        <div className="suggestion-value-box">
                          <span className="suggestion-val">{gamePasswordSuggestions.stealthShort}</span>
                          <button 
                            className="btn-card-icon interactive" 
                            style={{ padding: '4px' }}
                            onClick={() => copyToClipboard(gamePasswordSuggestions.stealthShort, 'Stealth Password')}
                          >
                            <Copy size={13} />
                          </button>
                        </div>
                        <div className="suggestion-actions">
                          <button 
                            className="btn-apply-key interactive"
                            onClick={() => handleApplyGamePassword(gamePasswordSuggestions.stealthShort)}
                          >
                            APPLY TO NEW KEY
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </section>


            {/* SECURED CARDS GRID */}
            <section className="cards-grid">
              {filteredItems.length === 0 ? (
                <div className="empty-state">
                  <ShieldAlert size={48} style={{ color: 'var(--color-text-dim)', marginBottom: '16px' }} />
                  <h3 className="empty-title">NO VAULT SECURED KEYS FOUND</h3>
                  <p className="empty-subtitle">Create a new secure game launcher key or import your backup JSON to begin.</p>
                </div>
              ) : (
                filteredItems.map((item) => {
                  const isRevealed = !!revealedItems[item.id];
                  const isFlipped = !!flippedCards[item.id];
                  const decryptedPass = decryptedPasswords[item.id] || '';
                  const decryptedNote = decryptedNotes[item.id] || 'Loading...';

                  return (
                    <div 
                      key={item.id} 
                      className={`vault-card card-perspective ${item.category}`}
                    >
                      <div className={`card-inner ${isFlipped ? 'flipped' : ''}`}>
                        
                        {/* FRONT FACE (Main Info & Decryption Action) */}
                        <div className="card-front">
                          <div className="card-brand-glow"></div>
                          
                          <div className="card-top">
                            <div className="card-header-info">
                              <div className="card-icon-container">
                                <Gamepad2 size={20} />
                              </div>
                              <div>
                                <h3 className="card-platform-title">{item.platform}</h3>
                                <p className="card-username">{item.username}</p>
                              </div>
                            </div>
                            
                            <div style={{ display: 'flex', gap: '6px' }}>
                              <button 
                                className="btn-card-icon interactive" 
                                title="Generate Access Guide"
                                onClick={() => handleGenerateAccessGuide(item)}
                              >
                                <FileText size={14} />
                              </button>
                              <button 
                                className="btn-card-icon interactive" 
                                title="Edit Launcher Key"
                                onClick={() => openEditModal(item)}
                              >
                                <Edit3 size={14} />
                              </button>
                              <button 
                                className="btn-card-icon interactive" 
                                title="Delete Launcher Key"
                                onClick={() => handleDeleteItem(item.id)}
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>

                          <div className="card-center">
                            <div className="credential-field">
                              <span className={`credential-value ${!isRevealed ? 'hidden-pass' : ''}`}>
                                <ScrambledText text={decryptedPass} reveal={isRevealed} />
                              </span>
                              
                              <div className="card-button-row">
                                <button 
                                  className="btn-card-icon interactive"
                                  onClick={() => toggleReveal(item)}
                                >
                                  {isRevealed ? <EyeOff size={14} /> : <Eye size={14} />}
                                </button>
                                {isRevealed && (
                                  <button 
                                    className="btn-card-icon interactive"
                                    onClick={() => copyToClipboard(decryptedPass, 'Password')}
                                  >
                                    <Copy size={14} />
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="card-bottom">
                            <div className="strength-indicator">
                              <span>STRENGTH:</span>
                              <div className="strength-bar">
                                <div className={`strength-fill ${item.strength}`}></div>
                              </div>
                            </div>

                            <button className="btn-secondary interactive" style={{ padding: '4px 10px', fontSize: '10px' }} onClick={() => toggleFlip(item)}>
                              VIEW NOTES
                            </button>
                          </div>
                        </div>

                        {/* BACK FACE (Notes & Description) */}
                        <div className="card-back">
                          <div className="card-back-header">
                            <h4 className="card-back-title">{item.platform} // Notes</h4>
                            <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)' }}>SECURE_DATA</span>
                          </div>

                          <div className="notes-area">
                            {decryptedNote}
                          </div>

                          <div className="card-back-actions">
                            {decryptedNote && decryptedNote !== 'Loading...' && decryptedNote !== 'No notes saved.' && (
                              <button 
                                className="btn-card-icon interactive" 
                                title="Copy Notes"
                                onClick={() => copyToClipboard(decryptedNote, 'Notes')}
                              >
                                <Copy size={12} />
                              </button>
                            )}
                            <button className="btn-primary interactive" style={{ padding: '6px 14px', fontSize: '11px' }} onClick={() => toggleFlip(item)}>
                              BACK TO KEY
                            </button>
                          </div>
                        </div>

                      </div>
                    </div>
                  );
                })
              )}
            </section>
          </main>
        </>
      )}

      {/* ADD NEW CREDENTIAL MODAL */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">SECURE NEW KEY</h3>
              <button className="btn-close interactive" onClick={() => setShowAddModal(false)}>
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleAddItem}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Launcher / Platform Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Steam, Xbox Live, Nvidia" 
                    className="form-input"
                    value={formPlatform}
                    onChange={(e) => setFormPlatform(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select 
                    className="form-select"
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as any)}
                  >
                    <option value="custom">Custom</option>
                    <option value="steam">Steam</option>
                    <option value="xbox">Xbox</option>
                    <option value="nvidia">Nvidia</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Username / Account Email</label>
                  <input 
                    type="text" 
                    placeholder="Enter username or email" 
                    className="form-input"
                    value={formUsername}
                    onChange={(e) => setFormUsername(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Security Password</label>
                  <div className="input-with-button">
                    <input 
                      type="text" 
                      placeholder="Enter account password" 
                      className="form-input"
                      value={formPassword}
                      onChange={(e) => setFormPassword(e.target.value)}
                      required
                    />
                    <button 
                      type="button" 
                      className="btn-input-action interactive"
                      onClick={() => {
                        const len = 16;
                        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
                        let r = '';
                        for(let i=0; i<len; i++) r += chars.charAt(Math.floor(Math.random()*chars.length));
                        setFormPassword(r);
                      }}
                      title="Quick Auto Generate Password"
                    >
                      <RefreshCw size={14} />
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Security Notes / Answers / Recovery Codes</label>
                  <textarea 
                    placeholder="Enter backup security answers or notes" 
                    className="form-textarea"
                    rows={3}
                    value={formNotes}
                    onChange={(e) => setFormNotes(e.target.value)}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-secondary interactive" onClick={() => setShowAddModal(false)}>
                  CANCEL
                </button>
                <button type="submit" className="btn-primary interactive">
                  SAVE KEY
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT CREDENTIAL MODAL */}
      {showEditModal && editingItem && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">UPDATE SECURE KEY</h3>
              <button className="btn-close interactive" onClick={() => setShowEditModal(false)}>
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleEditItem}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Launcher / Platform Name</label>
                  <input 
                    type="text" 
                    className="form-input"
                    value={formPlatform}
                    onChange={(e) => setFormPlatform(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select 
                    className="form-select"
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as any)}
                  >
                    <option value="custom">Custom</option>
                    <option value="steam">Steam</option>
                    <option value="xbox">Xbox</option>
                    <option value="nvidia">Nvidia</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Username / Account Email</label>
                  <input 
                    type="text" 
                    className="form-input"
                    value={formUsername}
                    onChange={(e) => setFormUsername(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Security Password</label>
                  <div className="input-with-button">
                    <input 
                      type="text" 
                      className="form-input"
                      value={formPassword}
                      onChange={(e) => setFormPassword(e.target.value)}
                      required
                    />
                    <button 
                      type="button" 
                      className="btn-input-action interactive"
                      onClick={() => {
                        const len = 16;
                        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
                        let r = '';
                        for(let i=0; i<len; i++) r += chars.charAt(Math.floor(Math.random()*chars.length));
                        setFormPassword(r);
                      }}
                      title="Quick Auto Generate Password"
                    >
                      <RefreshCw size={14} />
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Security Notes / Answers / Recovery Codes</label>
                  <textarea 
                    className="form-textarea"
                    rows={3}
                    value={formNotes}
                    onChange={(e) => setFormNotes(e.target.value)}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-secondary interactive" onClick={() => setShowEditModal(false)}>
                  CANCEL
                </button>
                <button type="submit" className="btn-primary interactive">
                  SAVE CHANGES
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ACCESS GUIDE MODAL */}
      {showGuideModal && (
        <div className="modal-overlay" style={{ zIndex: 1100 }}>
          <div className="modal-content" style={{ maxWidth: '600px' }}>
            <div className="modal-header">
              <h3 className="modal-title">GAME ACCESS GUIDE</h3>
              <button className="btn-close interactive" onClick={() => setShowGuideModal(false)}>
                <X size={20} />
              </button>
            </div>
            
            <div className="modal-body">
              <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>
                Generated access guide for <strong>{selectedGuidePlatform}</strong>. The text has been copied to your clipboard!
              </p>
              
              <div style={{ position: 'relative' }}>
                <textarea 
                  className="form-textarea"
                  value={selectedGuideText}
                  readOnly
                  rows={15}
                  style={{ 
                    fontFamily: 'var(--font-mono)', 
                    fontSize: '13px', 
                    lineHeight: '1.5',
                    background: 'rgba(0, 0, 0, 0.4)',
                    padding: '16px',
                    borderColor: 'var(--accent-primary)',
                    resize: 'none'
                  }}
                />
              </div>
            </div>

            <div className="modal-footer">
              <button 
                type="button" 
                className="btn-secondary interactive" 
                onClick={() => setShowGuideModal(false)}
              >
                CLOSE
              </button>
              <button 
                type="button" 
                className="btn-primary interactive"
                onClick={() => {
                  navigator.clipboard.writeText(selectedGuideText);
                  triggerNotification('Guide Copied to Clipboard!');
                }}
              >
                <Copy size={16} style={{ marginRight: '6px' }} />
                COPY AGAIN
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
