import {
  createPartFromUri,
  createUserContent,
  GoogleGenAI,
} from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const POST = async (req: NextRequest) => {
  try {
    let videoLink: string;
    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      // 2️⃣ Parse the form
      const formData = await req.formData();
      const submittedLink = formData.get("url");

      if (typeof submittedLink === "string" && submittedLink.trim() !== "") {
        videoLink = submittedLink.trim();
      } else {
        // 3️⃣ No link in the form, use fallback
        videoLink = "https://www.youtube.com/shorts/Gktl_orbcp8";
      }
    } else {
      // 4️⃣ Not a form-data request at all, use fallback
      videoLink = "https://www.youtube.com/shorts/Gktl_orbcp8";
    }

    const result = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: createUserContent([
        createPartFromUri(
          //"https://www.youtube.com/shorts/Gktl_orbcp8",
          videoLink,
          "video/mp4"
        ),
        "From this video, extract step by step cooking instruction and then professionally rendered recipe in the same language as the audio.  Do not include any introductory sentences. Number the recipe instruction in sequence and add newline.",
      ]),
    });

    return NextResponse.json({ sequence: result.text });
  } catch (err) {
    console.error("Gemini API Error:", err);
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  }
};
