const ENCRYPTION_ALGORITHM = "AES-GCM";
const KEY_DERIVATION_ALGORITHM = "PBKDF2";
const HASH_ALGORITHM = "SHA-256";
const ITERATIONS = 100000;

function arrayBufferToBase64(buffer: ArrayBuffer | Uint8Array): string {
  const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binary = window.atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

export async function encryptText(plainText: string, masterKey: string): Promise<string> {
  try {
    const salt = window.crypto.getRandomValues(new Uint8Array(16));
    const iv = window.crypto.getRandomValues(new Uint8Array(12));

    const keyMaterial = await window.crypto.subtle.importKey(
      "raw",
      textEncoder.encode(masterKey),
      { name: KEY_DERIVATION_ALGORITHM },
      false,
      ["deriveKey"]
    );

    const key = await window.crypto.subtle.deriveKey(
      {
        name: KEY_DERIVATION_ALGORITHM,
        salt: salt,
        iterations: ITERATIONS,
        hash: HASH_ALGORITHM,
      },
      keyMaterial,
      { name: ENCRYPTION_ALGORITHM, length: 256 },
      false,
      ["encrypt"]
    );

    const encrypted = await window.crypto.subtle.encrypt(
      {
        name: ENCRYPTION_ALGORITHM,
        iv: iv,
      },
      key,
      textEncoder.encode(plainText)
    );

    const saltB64 = arrayBufferToBase64(salt);
    const ivB64 = arrayBufferToBase64(iv);
    const encryptedB64 = arrayBufferToBase64(encrypted);

    return `${saltB64}:${ivB64}:${encryptedB64}`;
  } catch (error) {
    console.error("Encryption failed:", error);
    throw new Error("Encryption failed");
  }
}

export async function decryptText(cipherText: string, masterKey: string): Promise<string> {
  try {
    const parts = cipherText.split(":");
    if (parts.length !== 3) {
      throw new Error("Invalid cipher text format");
    }

    const salt = new Uint8Array(base64ToArrayBuffer(parts[0]));
    const iv = new Uint8Array(base64ToArrayBuffer(parts[1]));
    const encryptedData = base64ToArrayBuffer(parts[2]);

    const keyMaterial = await window.crypto.subtle.importKey(
      "raw",
      textEncoder.encode(masterKey),
      { name: KEY_DERIVATION_ALGORITHM },
      false,
      ["deriveKey"]
    );

    const key = await window.crypto.subtle.deriveKey(
      {
        name: KEY_DERIVATION_ALGORITHM,
        salt: salt,
        iterations: ITERATIONS,
        hash: HASH_ALGORITHM,
      },
      keyMaterial,
      { name: ENCRYPTION_ALGORITHM, length: 256 },
      false,
      ["decrypt"]
    );

    const decrypted = await window.crypto.subtle.decrypt(
      {
        name: ENCRYPTION_ALGORITHM,
        iv: iv,
      },
      key,
      encryptedData
    );

    return textDecoder.decode(decrypted);
  } catch (error) {
    console.error("Decryption failed:", error);
    throw new Error("Decryption failed (incorrect master password or corrupted data)");
  }
}
