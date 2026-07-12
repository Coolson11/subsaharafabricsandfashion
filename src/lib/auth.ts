import { cookies } from "next/headers";
import crypto from "crypto";

const subtle = crypto.subtle || (crypto as any).webcrypto?.subtle;

const SESSION_COOKIE_NAME = "admin_session";
const SESSION_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours

const AUTH_SECRET = process.env.AUTH_SECRET || "default_auth_secret_for_subsahara_cms_32_chars";
const encoder = new TextEncoder();

async function getCryptoKey(secret: string): Promise<CryptoKey> {
  const keyData = encoder.encode(secret);
  return await subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: { name: "SHA-256" } },
    false,
    ["sign", "verify"]
  );
}

export async function createSessionToken(username: string): Promise<string> {
  const expiresAt = Date.now() + SESSION_EXPIRY;
  const data = JSON.stringify({ username, expiresAt });
  const key = await getCryptoKey(AUTH_SECRET);
  const signatureBuffer = await subtle.sign(
    "HMAC",
    key,
    encoder.encode(data)
  );
  
  // Convert signature to hex
  const signatureArray = Array.from(new Uint8Array(signatureBuffer));
  const signatureHex = signatureArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
    
  const dataB64 = btoa(data);
  return `${dataB64}.${signatureHex}`;
}

export async function verifySessionToken(token: string): Promise<boolean> {
  try {
    const [dataB64, signatureHex] = token.split(".");
    if (!dataB64 || !signatureHex) return false;
    
    const data = atob(dataB64);
    const key = await getCryptoKey(AUTH_SECRET);
    
    // Convert hex signature back to Uint8Array
    const signatureBytes = new Uint8Array(
      signatureHex.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16))
    );
    
    const isValid = await subtle.verify(
      "HMAC",
      key,
      signatureBytes,
      encoder.encode(data)
    );
    
    if (!isValid) return false;
    
    const parsed = JSON.parse(data);
    const adminUsername = process.env.ADMIN_USERNAME || "admin";
    if (parsed.username !== adminUsername) return false;
    if (parsed.expiresAt < Date.now()) return false;
    
    return true;
  } catch {
    return false;
  }
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;
  const isValid = await verifySessionToken(token);
  if (!isValid) return null;
  return { role: "admin" };
}

export async function setSessionCookie(username: string) {
  const token = await createSessionToken(username);
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 24 * 60 * 60, // 24 hours
  });
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}
