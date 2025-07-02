import {
  createPartFromUri,
  createUserContent,
  GoogleGenAI,
} from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData();
    const audioFile = formData.get("audio") as Blob | null;

    if (!audioFile) {
      return NextResponse.json(
        { error: "No audio file provided" },
        { status: 400 }
      );
    }

    const myFile = await genAI.files.upload({
      file: audioFile,
      config: { mimeType: "audio/mpeg" },
    });

    if (!myFile || !myFile.uri || !myFile.mimeType) {
      return NextResponse.json(
        { error: "Audio file upload failed" },
        { status: 500 }
      );
    }

    const result = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: createUserContent([
        createPartFromUri(myFile.uri, myFile.mimeType),
        "Generate a transcript of the speech. Do not include any introductory sentences. Only show me the original text in the same language as the audio followed by professionally rendered recipe in the same language as the audio. Number the recipe instruction in sequence and add newline. In between the original text and the recipe, add a newline with  <br /> to separate them.",
      ]),
    });

    return NextResponse.json({ transcript: result.text });
  } catch (err) {
    console.error("Gemini API Error:", err);
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  }
};
