'use client';

import { useRouter } from 'next/navigation';

export default function EditIssueButton() {
  const router = useRouter();

  return (
    <div
      className="fixed bottom-6 right-6 z-50 cursor-pointer"
      onClick={() => router.push("/edit-issue")}
      title="Edit Issue 열기"
    >
      <div className="bg-red-500 text-white p-3 rounded-full shadow-lg hover:bg-red-600 transition-colors duration-300 flex items-center justify-center w-12 h-12 text-xl">
        !
      </div>
    </div>
  );
}
