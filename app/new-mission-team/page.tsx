'use client'

import { useState } from 'react'

export default function MissionTeamForm() {
  const [formData, setFormData] = useState({
    country: '',
    year: new Date().getFullYear(),
    member_count: 0,
    period: '',
    description: '',
    contact_email: ''
  })

  const countries = ['Haiti', 'Dominican Republic', 'Guatemala', 'Honduras', 'Cambodia', 'Philippines']

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/mission-teams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        alert('Mission team successfully added!')
        setFormData({
          country: '',
          year: new Date().getFullYear(),
          member_count: 0,
          period: '',
          description: '',
          contact_email: ''
        })
      } else {
        const err = await res.json()
        alert(`Error: ${err.error}`)
      }
    } catch (error) {
      console.error(error)
      alert('Something went wrong.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow space-y-4">
      <h2 className="text-2xl font-bold mb-4">Add New Mission Team</h2>

      {/* Country Dropdown */}
      <div>
        <label className="block font-semibold mb-1">Country</label>
        <select
          name="country"
          value={formData.country}
          onChange={handleChange}
          className="border rounded w-full px-3 py-2"
          required
        >
          <option value="">Select Country</option>
          {countries.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* 나머지 필드 동일 */}
      <div>
        <label className="block font-semibold mb-1">Year</label>
        <input
          type="number"
          name="year"
          value={formData.year}
          onChange={handleChange}
          className="border rounded w-full px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Member Count</label>
        <input
          type="number"
          name="member_count"
          value={formData.member_count}
          onChange={handleChange}
          className="border rounded w-full px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Period</label>
        <input
          type="text"
          name="period"
          value={formData.period}
          onChange={handleChange}
          className="border rounded w-full px-3 py-2"
          placeholder="ex. 7/20~7/30"
          required
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="border rounded w-full px-3 py-2"
          rows={3}
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Contact Email</label>
        <input
          type="email"
          name="contact_email"
          value={formData.contact_email}
          onChange={handleChange}
          className="border rounded w-full px-3 py-2"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
      >
        Save Mission Team
      </button>
    </form>
  )
}
