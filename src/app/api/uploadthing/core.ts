import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { cookies } from "next/headers";
import { verifySessionToken } from "@/lib/auth";
import { addImageToRegistry } from "@/lib/registry";
import { z } from "zod";
import { randomUUID } from "crypto";

const f = createUploadthing();
const SESSION_COOKIE_NAME = "admin_session";

async function authenticate() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;
  const isValid = await verifySessionToken(token);
  if (!isValid) return null;
  return { admin: true };
}

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "8MB", maxFileCount: 20 } })
    .input(z.object({ category: z.string() }))
    .middleware(async ({ input }) => {
      const user = await authenticate();
      if (!user) throw new UploadThingError("Unauthorized");
      return { category: input.category };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // Store upload metadata to the local JSON file registry
      const image = await addImageToRegistry({
        id: randomUUID(),
        imageUrl: file.url,
        fileKey: file.key,
        category: metadata.category,
        originalFileName: file.name,
      });
      return { imageId: image.id, fileKey: file.key };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
