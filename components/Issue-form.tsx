'use client';

import { useFormStatus } from 'react-dom';
import { useActionState } from "react";
import { useState } from "react";
import { submitIssue, type ActionResult } from '@/actions/submit-issue';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? 'Sending...' : 'Submit'}
    </button>
  );
}

export default function IssueForm() {
  const [state, formAction] = useActionState<ActionResult, FormData>(submitIssue, { success: false, errors: {} });

  // 입력값 상태 관리
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    description: ''
  });

  // input 값 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form action={formAction} className="space-y-8 max-w-xl mx-auto bg-gray-50 p-6 rounded-xl text-xl">
      <div>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          value={formData.firstName}
          onChange={handleChange}
          className="block w-full border-2 border-black p-2 rounded-lg mt-1"
        />
        {state.errors?.firstName && (
          <p className="text-red-500 text-sm">{state.errors.firstName[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          value={formData.lastName}
          onChange={handleChange}
          className="block w-full border-2 border-black p-2 rounded-lg mt-1"
        />
        {state.errors?.lastName && (
          <p className="text-red-500 text-sm">{state.errors.lastName[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className="block w-full border-2 border-black p-2 rounded-lg mt-1"
        />
        {state.errors?.email && (
          <p className="text-red-500 text-sm">{state.errors.email[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows={4}
          value={formData.description}
          onChange={handleChange}
          className="block w-full border-2 border-black p-2 rounded-lg mt-1"
        />
        {state.errors?.description && (
          <p className="text-red-500 text-sm">{state.errors.description[0]}</p>
        )}
      </div>

      <SubmitButton />

      {state.success && (
        <p className="text-green-600 text-sm mt-2">문의가 성공적으로 접수되었습니다.</p>
      )}
    </form>
  );
}
