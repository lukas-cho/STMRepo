import {
  createPartFromUri,
  createUserContent,
  GoogleGenAI,
} from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const POST = async (req: NextRequest) => {
  try {
    // let videoLink: string;
    // // 1️⃣ Check if the request is form-data
    // if (req.headers.get("content-type")?.startsWith("multipart/form-data")) {
    //   // 2️⃣ Extract the video link from the form data
    //   const formData = await req.formData();
    //   const submittedLink = formData.get("url");
    //   console.log(submittedLink?.toString());

    //   if (typeof submittedLink === "string" && submittedLink.trim() !== "") {
    //     videoLink = submittedLink.trim();
    //   } else {
    //     // 3️⃣ No link in the form, use fallback
    //     videoLink = "https://www.youtube.com/shorts/T9kwD5bXq2M";
    //   }
    // } else {
    //   // 4️⃣ Not a form-data request at all, use fallback
    //   videoLink = "https://www.youtube.com/shorts/T9kwD5bXq2M";
    // }
    const { url } = await req.json();
    const videoLink =
      url?.trim() || "https://www.youtube.com/shorts/T9kwD5bXq2M";

    console.log("Video Link received:", videoLink);
    const result = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: createUserContent([
        createPartFromUri(videoLink, "video/mp4"),
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
