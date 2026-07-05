import { NextResponse } from "next/server";
import { readRegistry } from "@/lib/registry";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    const images = await readRegistry();
    let filteredImages = images;

    if (category) {
      const lowerCategory = category.toLowerCase();
      filteredImages = images.filter(
        (img) => img.category.toLowerCase() === lowerCategory
      );
    }

    const response = NextResponse.json(filteredImages);
    
    // Enable CORS to allow the vanilla HTML site to request images from any origin
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type");
    
    return response;
  } catch (error) {
    console.error("Error fetching images from registry:", error);
    const errResponse = NextResponse.json(
      { error: "Failed to fetch images" },
      { status: 500 }
    );
    errResponse.headers.set("Access-Control-Allow-Origin", "*");
    return errResponse;
  }
}

export async function OPTIONS() {
  const response = new NextResponse(null, { status: 204 });
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  return response;
}
