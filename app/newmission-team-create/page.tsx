'use client'

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import CustomDateInput from '@/components/CustomDateInput'
import { MissionTeamSchema } from '@/lib/zod-schema'
import { z } from 'zod'

type MissionTeamForm = z.infer<typeof MissionTeamSchema>

type Country = {
  id: number
  name_en: string
  name_ko: string
}

export default function NewMissionTeamForm() {
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [countries, setCountries] = useState<Country[]>([])

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<MissionTeamForm>({
    resolver: zodResolver(MissionTeamSchema),
    defaultValues: {
      country: '',
      year: new Date().getFullYear(),
      member_count: 1,
      description: '',
      contact_email: '',
      period_start: '',
      period_end: '',
    },
  })

  const watchedYear = watch('year')
  const watchedPeriodStart = watch('period_start')
  const watchedPeriodEnd = watch('period_end')

  // description 감시
  const description = watch('description') || ''
  const maxDescriptionLength = 3000

  useEffect(() => {
    async function fetchCountries() {
      try {
        const res = await fetch('/api/countries')
        if (!res.ok) throw new Error('Failed to fetch countries')
        const data: Country[] = await res.json()
        setCountries(data)
      } catch (error) {
        console.error('Error fetching countries:', error)
      }
    }

    fetchCountries()
  }, [])

  // 연도 변경 시 시작일, 종료일 자동 세팅
  useEffect(() => {
    if (!watchedYear) return

    const now = new Date()
    const month = now.getMonth()
    const date = now.getDate()

    const newDate = new Date(watchedYear, month, date)
    const isoDate = newDate.toISOString()

    if (!watchedPeriodStart || new Date(watchedPeriodStart).getFullYear() !== watchedYear) {
      setValue('period_start', isoDate)
    }
    if (!watchedPeriodEnd || new Date(watchedPeriodEnd).getFullYear() !== watchedYear) {
      setValue('period_end', isoDate)
    }
  }, [watchedYear, watchedPeriodStart, watchedPeriodEnd, setValue])

  // description 글자수 제한 핸들러 (선택사항)
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= maxDescriptionLength) {
      setValue('description', e.target.value)
    }
  }

  const onSubmit: SubmitHandler<MissionTeamForm> = async (data) => {
    try {
      const payload = {
        ...data,
        period_start: data.period_start ? new Date(data.period_start).toISOString().slice(0, 10) : '',
        period_end: data.period_end ? new Date(data.period_end).toISOString().slice(0, 10) : '',
      }
      await axios.post('/api/mission-teams', payload)
      setSuccessMessage('미션 팀이 성공적으로 등록되었습니다! 🎉')

      reset({
        country: '',
        year: new Date().getFullYear(),
        member_count: 1,
        description: '',
        contact_email: '',
        period_start: '',
        period_end: '',
      })
    } catch (error: any) {
      alert(error.response?.data?.error || '미션 팀 등록에 실패했습니다.')
    }
  }

  return (
    <div className="min-h-screen flex items-start justify-center p-4 bg-gray-50">
      <div className="w-full max-w-6xl bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">새로운 선교팀 등록</h1>

        {successMessage && (
          <p className="mb-4 p-3 bg-green-100 text-green-800 rounded border border-green-300 text-center">
            {successMessage}
          </p>
        )}

        <p className="text-sm text-gray-600 mb-4 text-center">
          <span className="text-red-500 font-bold">*</span> 표시된 항목은 필수 입력 항목입니다.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 min-w-[600px] max-w-full" noValidate>
          {/* 국가 */}
          <div>
            <label className="font-semibold">국가 <span className="text-red-500">*</span></label>
            <select
              {...register('country')}
              className={`border w-full p-2 mt-1 ${errors.country ? 'border-red-500' : ''}`}
              defaultValue=""
            >
              <option value="" className="bg-[#3b82f6] text-white">국가 선택</option>
              {countries.map((c) => (
                <option key={c.id} value={c.id.toString()}>
                  {c.name_ko} ({c.name_en})
                </option>
              ))}
            </select>
            {errors.country && <p className="text-red-500 text-sm">{errors.country.message}</p>}
          </div>

          {/* 연도 */}
          <div>
            <label className="font-semibold block mb-1">연도 <span className="text-red-500">*</span></label>
            <Controller
              control={control}
              name="year"
              render={({ field }) => {
                const selectedDate = new Date()
                selectedDate.setFullYear(field.value)
                return (
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date: Date | null) => {
                      if (date) field.onChange(date.getFullYear())
                    }}
                    showYearPicker
                    dateFormat="yyyy"
                    placeholderText="연도 선택"
                    minDate={new Date(1900, 0, 1)}
                    maxDate={new Date(2100, 11, 31)}
                    customInput={<CustomDateInput placeholder="연도 선택" />}
                    className={`border w-full p-2 mt-1 ${errors.year ? 'border-red-500' : ''}`}
                  />
                )
              }}
            />
            {errors.year && <p className="text-red-500 text-sm">{errors.year.message}</p>}
          </div>

          {/* 시작 날짜 */}
          <div>
            <label className="font-semibold block mb-1">시작 날짜</label>
            <Controller
              control={control}
              name="period_start"
              render={({ field }) => (
                <DatePicker
                  selected={field.value ? new Date(field.value) : null}
                  onChange={(date) => field.onChange(date ? date.toISOString() : '')}
                  dateFormat="yyyy-MM-dd"
                  placeholderText="날짜 선택"
                  customInput={<CustomDateInput placeholder="날짜 선택" />}
                  className="border w-full p-2 rounded"
                />
              )}
            />
          </div>

          {/* 종료 날짜 */}
          <div>
            <label className="font-semibold block mb-1">종료 날짜</label>
            <Controller
              control={control}
              name="period_end"
              render={({ field }) => (
                <DatePicker
                  selected={field.value ? new Date(field.value) : null}
                  onChange={(date) => field.onChange(date ? date.toISOString() : '')}
                  dateFormat="yyyy-MM-dd"
                  placeholderText="날짜 선택"
                  customInput={<CustomDateInput placeholder="날짜 선택" />}
                  className="border w-full p-2 rounded"
                />
              )}
            />
            {errors.period_end && (
              <p className="text-red-500 text-sm">{errors.period_end.message}</p>
            )}
          </div>

          {/* 팀 인원 수 */}
          <div>
            <label className="font-semibold">팀 인원 수 <span className="text-red-500">*</span></label>
            <input
              type="number"
              {...register('member_count', { valueAsNumber: true })}
              className={`border w-full p-2 mt-1 ${errors.member_count ? 'border-red-500' : ''}`}
              min={1}
              placeholder="예: 10"
            />
            {errors.member_count && (
              <p className="text-red-500 text-sm">{errors.member_count.message}</p>
            )}
          </div>

          {/* 설명 */}
          <div>
            <label className="font-semibold flex justify-between">
              팀 설명
           
            </label>
            <textarea
              {...register('description')}
              onChange={handleDescriptionChange}
              className="border w-full p-2 mt-1 h-24 resize-y"
              placeholder="팀에 대한 설명"
              maxLength={maxDescriptionLength}
            />
               <span className={`text-sm ${description.length > maxDescriptionLength ? 'text-red-500' : 'text-gray-500'}`}>
                {description.length} / {maxDescriptionLength}
              </span>
          </div>

          {/* 담당자 이메일 */}
          <div>
            <label className="font-semibold">담당자 이메일</label>
            <input
              type="email"
              {...register('contact_email')}
              className={`border w-full p-2 mt-1 ${errors.contact_email ? 'border-red-500' : ''}`}
              placeholder="example@example.com"
            />
            {errors.contact_email && (
              <p className="text-red-500 text-sm">{errors.contact_email.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 text-white py-2 px-4 rounded disabled:opacity-50 w-full"
          >
            {isSubmitting ? '저장 중...' : '저장'}
          </button>
        </form>
      </div>
    </div>
  )
}
