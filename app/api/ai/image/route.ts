import {
  createPartFromBase64,
  createPartFromUri,
  createUserContent,
  GoogleGenAI,
} from "@google/genai";
import { register } from "module";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function fetchImageAsBase64(url: string): Promise<string> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch image: ${res.statusText}`);
  const buffer = await res.arrayBuffer();
  return Buffer.from(buffer).toString("base64");
}

async function blobToBase64(blob: Blob): Promise<string> {
  const arrayBuffer = await blob.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  return buffer.toString("base64");
}

export const POST = async (req: NextRequest) => {
  try {
    let base64Image: string;

    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      // Handle form data with image upload
      const formData = await req.formData();
      const imageFile = formData.get("image") as Blob | null;

      if (imageFile) {
        base64Image = await blobToBase64(imageFile);
      } else {
        const imageUrl =
          "https://postfiles.pstatic.net/MjAxNzA2MDdfMTAw/MDAxNDk2Nzk0MjE3MDcy.P0oSxZG08kwmi7zURCe_ZLF233v_9MkNBt93p25Ei_4g.CVG4ucTY-0l9Krzia7xJWXfOqUB2lLnST9t8j6t4wBEg.JPEG.krishnaa/%EC%98%81%EC%88%98%EC%A6%9D2.jpg?type=w773";
        base64Image = await fetchImageAsBase64(imageUrl);
      }
    } else {
      const imageUrl =
        "https://postfiles.pstatic.net/MjAxNzA2MDdfMTAw/MDAxNDk2Nzk0MjE3MDcy.P0oSxZG08kwmi7zURCe_ZLF233v_9MkNBt93p25Ei_4g.CVG4ucTY-0l9Krzia7xJWXfOqUB2lLnST9t8j6t4wBEg.JPEG.krishnaa/%EC%98%81%EC%88%98%EC%A6%9D2.jpg?type=w773";
      base64Image = await fetchImageAsBase64(imageUrl);
    }

    const result = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: createUserContent([
        createPartFromBase64(base64Image, "image/jpeg"),
        "From this image, extract ingredients and each amount in the same language as the image. Number the ingredients in sequence and add newline. Do not include any introductory sentences. Do not include the unit of measurement in the ingredient list. For example, if the ingredient is '2 cups of flour', just return 'flour'.",
      ]),
    });

    return NextResponse.json({ ingredients: result.text });
  } catch (err) {
    console.error("Gemini API Error:", err);
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  }
};
