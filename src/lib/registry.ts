import fs from "fs/promises";
import path from "path";
import { getStore } from "@netlify/blobs";

export interface RegistryImage {
  id: string;
  imageUrl: string;
  fileKey: string;
  category: string;
  originalFileName: string;
  uploadedAt: string;
}

const REGISTRY_FILE = path.join(process.cwd(), "images-registry.json");

// Helper to get Netlify Blob store
function getBlobStore() {
  const isNetlify = !!process.env.NETLIFY || typeof (globalThis as any).Netlify !== 'undefined';
  if (!isNetlify) return null;
  try {
    return getStore("images-registry");
  } catch (err) {
    console.warn("Failed to initialize Netlify Blobs:", err);
    return null;
  }
}

export async function readRegistry(): Promise<RegistryImage[]> {
  const store = getBlobStore();
  if (store) {
    try {
      const data = await store.get("data", { type: "json" }) as RegistryImage[];
      if (data) return data;
    } catch (err) {
      console.warn("Failed to read from Netlify Blobs, falling back to local file:", err);
    }
  }

  // Fallback to local file registry
  try {
    const data = await fs.readFile(REGISTRY_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export async function writeRegistry(images: RegistryImage[]): Promise<void> {
  const store = getBlobStore();
  if (store) {
    try {
      await store.setJSON("data", images);
      return;
    } catch (err) {
      console.warn("Failed to write to Netlify Blobs:", err);
    }
  }

  // Fallback to local file registry
  try {
    const dir = path.dirname(REGISTRY_FILE);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(REGISTRY_FILE, JSON.stringify(images, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to write to local registry file:", err);
  }
}

export async function addImageToRegistry(image: Omit<RegistryImage, "uploadedAt">): Promise<RegistryImage> {
  const images = await readRegistry();
  const newImage: RegistryImage = {
    ...image,
    uploadedAt: new Date().toISOString(),
  };
  
  // Prevent duplicates by checking fileKey
  const existingIdx = images.findIndex((img) => img.fileKey === image.fileKey);
  if (existingIdx !== -1) {
    images[existingIdx] = newImage;
  } else {
    images.unshift(newImage);
  }
  
  await writeRegistry(images);
  return newImage;
}

export async function removeImageFromRegistry(id: string): Promise<void> {
  const images = await readRegistry();
  const filtered = images.filter((img) => img.id !== id);
  await writeRegistry(filtered);
}

export async function removeImageByFileKey(fileKey: string): Promise<void> {
  const images = await readRegistry();
  const filtered = images.filter((img) => img.fileKey !== fileKey);
  await writeRegistry(filtered);
}
