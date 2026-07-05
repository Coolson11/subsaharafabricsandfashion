"use server";

import { readRegistry, removeImageFromRegistry } from "@/lib/registry";
import { getSession } from "@/lib/auth";
import { UTApi } from "uploadthing/server";
import { revalidatePath } from "next/cache";

const utapi = new UTApi();

export async function deleteImage(imageId: string) {
  // 1. Authenticate the admin session
  const session = await getSession();
  if (!session) {
    return { error: "Unauthorized access" };
  }

  try {
    // 2. Locate the image in the JSON registry
    const images = await readRegistry();
    const image = images.find((img) => img.id === imageId);

    if (!image) {
      return { error: "Image not found in registry" };
    }

    // 3. Remove the file from UploadThing using UTApi
    if (image.fileKey) {
      const utResponse = await utapi.deleteFiles(image.fileKey);
      if (!utResponse.success) {
        console.warn(`UploadThing deletion reported failure or partial success for fileKey: ${image.fileKey}`);
      }
    }

    // 4. Remove the record from the local JSON registry
    await removeImageFromRegistry(imageId);

    // 5. Revalidate cache for the admin views
    revalidatePath("/cms");


    return { success: true };
  } catch (error: any) {
    console.error("Error executing image deletion:", error);
    return { error: "Failed to delete image. Please try again." };
  }
}
