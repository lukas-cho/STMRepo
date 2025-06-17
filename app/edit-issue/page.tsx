import IssueForm from '@/components/Issue-form'
import React from 'react'

const Contact = () => {
  return (
        <div className="min-h-screen w-full text-gray-800 py-12 px-6 max-w-3xl mx-auto w-full">
            <h1 className="text-3xl font-bold mb-6">Issue</h1>
            <p className="mb-8 text-gray-600">
                Please fill out the form below and we will get back to you as soon as possible.
            </p>
            <IssueForm />
        </div>
  )
}

export default Contact