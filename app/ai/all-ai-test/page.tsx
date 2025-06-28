"use client";

import { useState, useRef } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

export default function AudioTranscriptionPage() {
  const [transcript, setTranscript] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const [ingredients, setIngredients] = useState("");
  const [cookingSequence, setCookingSequence] = useState("");
  const [loading, setLoading] = useState(false);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream, {
      mimeType: "audio/webm;codecs=opus",
    });

    audioChunksRef.current = [];

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunksRef.current.push(event.data);
      }
    };

    mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(audioChunksRef.current, {
        type: "audio/webm",
      });

      const formData = new FormData();
      formData.append("audio", audioBlob);

      try {
        const res = await axios.post("/api/ai/audio", formData);
        setTranscript(res.data.transcript ?? "No transcript");
      } catch (err) {
        console.error("Transcription error:", err);
        setTranscript("Transcription failed");
      }
    };

    mediaRecorderRef.current = mediaRecorder;
    mediaRecorder.start();
    setIsRecording(true);
  };
  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  const submitReceipt = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/ai/image");
      setIngredients(res.data.ingredients ?? "No ingredients found");
    } catch (err) {
      console.error("Receipt submission error:", err);
      setIngredients("Receipt submission failed");
    } finally {
      setLoading(false);
    }
  };

  const submitYoutubeLink = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/ai/video");
      setCookingSequence(res.data.sequence ?? "No sequence found");
    } catch (err) {
      console.error("Link submission error:", err);
      setCookingSequence("Link submission failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        AI 도우미
        <br />
        조리과정을 녹음하고, 영수증 사진에서 재료를 추출하며, 유투브 영상에서
        레시피를 가져오는 기능을 제공합니다.
      </h1>
      <br />
      <br />
      <h2 className="text-xl font-bold">조리과정 녹음</h2>
      <br />
      <p>
        밑에 녹음시작 버튼을 클릭하여 조리과정을 녹음하세요. 예를 들면
        라면만드는 과정을 자세히 하지만 자연스럽게 말해보세요. 늑음된 내용과
        이를 바탕으로 정리된 조리과정을 보여줍니다.
      </p>
      <br />
      <button
        onClick={isRecording ? stopRecording : startRecording}
        className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-900"
      >
        {isRecording ? "녹음 중단" : "조리과정 녹음 시작"}
      </button>
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <b>조리 과정:</b>
        <p>{transcript}</p>
      </div>
      <br />
      <h2 className="text-xl font-bold">영수증 사진에서 재료 추출</h2>
      <p>
        버튼을 클릭하여 영수증 사진에서 재료를 가져옵니다. 재료를 추출하는데
        다소 시간이 걸릴 수 있습니다.
        <br />
        <Link href="https://postfiles.pstatic.net/MjAxNzA2MDdfMTAw/MDAxNDk2Nzk0MjE3MDcy.P0oSxZG08kwmi7zURCe_ZLF233v_9MkNBt93p25Ei_4g.CVG4ucTY-0l9Krzia7xJWXfOqUB2lLnST9t8j6t4wBEg.JPEG.krishnaa/%EC%98%81%EC%88%98%EC%A6%9D2.jpg?type=w773">
          원본사진 링크
        </Link>
        <br />
      </p>
      <br />
      <button
        onClick={submitReceipt}
        className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-900"
      >
        {"영주증 사진속에서 재료 가져오기"}
      </button>
      <br />

      <div className="mt-4 p-4 bg-gray-100 rounded">
        <b>요리 재료:</b>
        {loading ? (
          <p className="animate-bounce">
            영수증에서 재료를 추출해오는 중입니다. 잠시만 기다려주세요...
          </p>
        ) : (
          <p>{ingredients}</p>
        )}
      </div>
      <br />
      <h2 className="text-xl font-bold">유투브 영상에서 레시피 가져오기</h2>
      <p>
        버튼을 클릭하여 유투브 영상에서 레시피를 가져옵니다. 영상의 조리과정이
        길거나 복잡할 경우, 레시피 추출에 시간이 걸릴 수 있습니다. 버튼을 클릭을
        한번만 클릭하고 기다려주세요. 원본영상:
        https://www.youtube.com/shorts/Gktl_orbcp8
      </p>
      <br />
      <button
        onClick={submitYoutubeLink}
        className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-900"
      >
        {"유투브 영상속에서 레시피 가져오기"}
      </button>
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <b>만드는 순서:</b>
        {loading ? (
          <p className="animate-bounce">
            레시피를 가져오는 중입니다. 잠시만 기다려주세요...
          </p>
        ) : (
          <p>{cookingSequence}</p>
        )}
      </div>
    </div>
  );
}
