import fs from "fs/promises";
import path from "path";

export interface RegistryImage {
  id: string;
  imageUrl: string;
  fileKey: string;
  category: string;
  originalFileName: string;
  uploadedAt: string;
}

const REGISTRY_FILE = path.join(process.cwd(), "images-registry.json");

export async function readRegistry(): Promise<RegistryImage[]> {
  try {
    const data = await fs.readFile(REGISTRY_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export async function writeRegistry(images: RegistryImage[]): Promise<void> {
  // Ensure the directory exists (in case it is deleted)
  const dir = path.dirname(REGISTRY_FILE);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(REGISTRY_FILE, JSON.stringify(images, null, 2), "utf-8");
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
