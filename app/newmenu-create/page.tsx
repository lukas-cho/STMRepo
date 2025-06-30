'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { NewMenuSchema } from '@/lib/zod-schema'

import { z } from 'zod'

type NewMenuForm = z.infer<typeof NewMenuSchema>

type TotalCostInputProps = {
  register: ReturnType<typeof useForm<NewMenuForm>>['register']
  errors: ReturnType<typeof useForm<NewMenuForm>>['formState']['errors']
  watchValue: string | undefined
  setValue: ReturnType<typeof useForm<NewMenuForm>>['setValue']

}

export default function NewMenuPage() {
  const [categories, setCategories] = useState<any[]>([])
  const [ingredientsLength, setIngredientsLength] = useState(0)
  const [instructionsLength, setInstructionsLength] = useState(0)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
    setFocus,
    reset,
  } = useForm<NewMenuForm>({
    resolver: zodResolver(NewMenuSchema),
    mode: 'onChange',
    shouldFocusError: false,   // 에러 발생 시 해당 필드로 포커스 이동
    defaultValues: {
      menu_category_id: '',
      menu_name: '',
      menu_contact_email: '',
      menu_url: '',
      menu_ingredient: '',
      menu_instruction: '',
      serving_size: '',
      total_cost: '',
      menu_image: undefined,
    },
  })
  // 제출 시 에러 핸들러
  const onError = (errors: any) => {
    if (errors.menu_category_id) {
      setFocus('menu_category_id')
    } else if (errors.menu_name) {
      setFocus('menu_name')
    }
  }

  const watchedIngredients = watch('menu_ingredient')
  const watchedInstructions = watch('menu_instruction')
  const watchedTotalCost = watch('total_cost')

  useEffect(() => {
    axios
      .get('/api/menu-categories')
      .then((res) => setCategories(res.data))
      .catch(console.error)
  }, [])

  useEffect(() => {
    setIngredientsLength(watchedIngredients?.length ?? 0)
  }, [watchedIngredients])

  useEffect(() => {
    setInstructionsLength(watchedInstructions?.length ?? 0)
  }, [watchedInstructions])

  // 이미지 
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [selectedFileName, setSelectedFileName] = useState('') // 파일명 관리용

  // 파일 선택 핸들러 수정 (파일명도 저장)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setPreviewUrl(URL.createObjectURL(file))
      setSelectedFileName(file.name)
    } else {
      setPreviewUrl(null)
      setSelectedFileName('')
    }
  }

  // 파일 input 리셋용 key 상태
  const [fileInputKey, setFileInputKey] = useState(Date.now())

  // 이미지 삭제 함수
  const handleRemoveImage = () => {
    setPreviewUrl(null)
    setSelectedFileName('')
    // react-hook-form에 빈 값 전달 (초기화)
    setValue('menu_image', undefined)
    // file input 리셋 (key 변경)
    setFileInputKey(Date.now())
  }

  const onSubmit: SubmitHandler<NewMenuForm> = async (data) => {
    try {
      setSuccessMessage(null) // 제출 전에 메시지 초기화

      let url = data.menu_url?.trim() ?? ''
      if (url && !/^https?:\/\//i.test(url)) {
        url = 'http://' + url
      }

      const formData = new FormData()
      for (const [key, value] of Object.entries(data)) {
        if (key === 'menu_image' && value instanceof FileList) {
          if (value.length > 0) {
            formData.append('menu_image', value[0])
          }
        } else if (key === 'menu_url') {
          formData.append(key, url)
        } else if (value !== undefined && value !== null) {
          formData.append(key, String(value))
        }
      }

      await axios.post('/api/newmenu-create', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      setSuccessMessage('메뉴가 성공적으로 저장되었습니다!')
      reset() // 폼 리셋
      setPreviewUrl(null)
      setSelectedFileName('')
      setFileInputKey(Date.now()) // 파일 input 리셋
    } catch (err: any) {
      alert(err.response?.data?.error || '저장 실패')
    }
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-3">새로운 메뉴 등록</h1>

      {/* 성공 메시지 */}
      {successMessage && (
        <p className="mb-4 p-3 bg-green-100 text-green-800 rounded border border-green-300">
          {successMessage}
        </p>
      )}

      <p className="text-sm text-gray-600 mb-4">
        <span className="text-red-500 font-bold">*</span> 표시된 항목은 필수 입력 항목입니다.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" encType="multipart/form-data" noValidate>
        {/* 카테고리 */}
        <div>
          <label className="font-semibold">
            메뉴 종류 <span className="text-red-500">*</span>
          </label>
          <select
            {...register('menu_category_id')}
            className={`border w-full p-2 mt-1 rounded 
    ${errors.menu_category_id
                ? 'border-red-500  focus:border-red-500'
                : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
              }`
            }
          >
            <option value=""> 메뉴 종류를 선택하세요</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.category_name}
              </option>
            ))}
          </select>       {errors.menu_category_id && <p className="text-red-500 text-sm mt-1">{errors.menu_category_id.message}</p>}
        </div>

        {/* 메뉴명 */}
        <div>
          <label className="font-semibold">
            메뉴 이름 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="예: 홍 길동 떡복이"
            {...register('menu_name')}
            className={`border w-full p-2 mt-1 ${errors.menu_name ? 'border-red-500' : ''}`}
          />
          {errors.menu_name && <p className="text-red-500 text-sm mt-1">{errors.menu_name.message}</p>}
        </div>

        {/* 이메일 */}
        <div>
          <label className="font-semibold">
            문의 사항 있을시 연락할 수 있는 이메일
          </label>
          <input
            type="email"
            {...register('menu_contact_email')}
            className={`border w-full p-2 mt-1 ${errors.menu_contact_email ? 'border-red-500' : ''}`}
          />
          {errors.menu_contact_email && <p className="text-red-500 text-sm mt-1">{errors.menu_contact_email.message}</p>}
        </div>

        {/* 서빙 수 */}
        <div>
          <label className="font-semibold">총 몇 인분</label>
          <input
            type="text"
            {...register('serving_size', {
              setValueAs: (v: unknown) => {
                if (typeof v === 'string') {
                  return v.trim() === '' ? undefined : v
                }
                return v
              },
            })}
            onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
              e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '')
            }}
            className={`border w-full p-2 mt-1 ${errors.serving_size ? 'border-red-500' : ''}`}
          />
          {errors.serving_size && <p className="text-red-500 text-sm mt-1">{errors.serving_size.message}</p>}
        </div>

        {/* 총 비용 */}
        <TotalCostInput register={register} errors={errors} watchValue={watchedTotalCost} setValue={setValue} />

        {/* 재료 */}
        <div>
          <label className="font-semibold">재료 및 준비물 (최대 5000자)</label>
          <textarea
            {...register('menu_ingredient')}
            maxLength={5000}
            className={`border w-full p-2 mt-1 h-60 ${errors.menu_ingredient ? 'border-red-500' : ''}`}
          />
          <div className="flex justify-between text-sm text-gray-500 mt-1">
            <p>{ingredientsLength} / 5000</p>
            {errors.menu_ingredient && <p className="text-red-500">{errors.menu_ingredient.message}</p>}
          </div>
        </div>

        {/* 조리 설명 */}
        <div>
          <label className="font-semibold">조리 및 제조 설명 (최대 30000자)</label>
          <textarea
            {...register('menu_instruction')}
            rows={5}
            maxLength={30000}
            className={`border w-full p-2 mt-1 h-80 ${errors.menu_instruction ? 'border-red-500' : ''}`}
          />
          <div className="flex justify-between text-sm text-gray-500 mt-1">
            <p>{instructionsLength} / 30000</p>
            {errors.menu_instruction && <p className="text-red-500">{errors.menu_instruction.message}</p>}
          </div>
        </div>

        {/* 이미지 */}
        <div>
          <label className="font-semibold">메뉴 사진</label>
          <div className="flex items-center space-x-4 mt-1">
            <input
              key={fileInputKey}
              type="file"
              {...register('menu_image')}
              accept="image/*"
              onChange={(e) => {
                register('menu_image').onChange(e)
                handleImageChange(e)
              }}
              className="border p-2"
            />

            {/* 파일명 보여주기 (선택됐을 때) */}
            {selectedFileName && !previewUrl && (
              <span className="truncate max-w-xs">{selectedFileName}</span>
            )}

            {/* 미리보기 이미지 + 오른쪽 위에 삭제 버튼 */}
            {previewUrl && (
              <div className="relative w-30 h-30">
                <img
                  src={previewUrl}
                  alt="미리보기"
                  className="w-30 h-30 object-cover rounded border"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-0 right-0 left-29.5 -translate-x-1/2 -translate-y-1/2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-lg font-bold hover:bg-red-700"
                  aria-label="이미지 삭제"
                  title="이미지 삭제"
                >
                  X
                </button>
              </div>
            )}
          </div>
        </div>

        {/* URL */}
        <div>
          <label className="font-semibold">조리/제조 영상 주소</label>
          <input
            type="text"
            {...register('menu_url')}
            placeholder="www.example.com"
            className={`border w-full p-2 mt-1 ${errors.menu_url ? 'border-red-500' : ''}`}
          />
          {errors.menu_url && <p className="text-red-500 text-sm mt-1">{errors.menu_url.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white py-2 px-4 rounded disabled:opacity-50"
        >
          {isSubmitting ? '저장 중...' : '저장'}
        </button>
      </form>
    </div>
  )
}

function TotalCostInput({ register, errors, watchValue, setValue }: TotalCostInputProps) {
  const [localValue, setLocalValue] = useState('')

  // watchValue가 바뀌면 localValue 업데이트 (초기값 등)
  useEffect(() => {
    if (watchValue === undefined || watchValue === '') {
      setLocalValue('')
    } else {
      setLocalValue(String(watchValue))
    }
  }, [watchValue])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value

    // 숫자와 소수점만 허용
    input = input.replace(/[^0-9.]/g, '')

    // 소수점이 여러개 있으면 첫번째만 남기기
    const parts = input.split('.')
    const sanitized = parts.shift() + (parts.length > 0 ? '.' + parts.join('') : '')

    setLocalValue(sanitized)

    // 폼값도 세팅
    if (sanitized === '') {
      setValue('total_cost', '')
    } else {
      const num = Number(sanitized)
      if (!isNaN(num)) {
        setValue('total_cost', sanitized)
      } else {
        setValue('total_cost', '')
      }
    }
  }

  const handleBlur = () => {
    if (localValue === '') return

    const num = Number(localValue)
    if (!isNaN(num)) {
      // 소수점 2자리 고정으로 변환
      const fixed = num.toFixed(2)
      setLocalValue(fixed)
      setValue('total_cost', fixed)
    }
  }

  return (
    <div>
      <label className="font-semibold">조리 비용</label>
      <input
        type="text"
        {...register('total_cost', {
          setValueAs: (v: unknown) => {
            if (typeof v === 'string') {
              return v.trim() === '' ? undefined : v
            }
            return v
          },
        })}
        value={localValue}
        onChange={handleChange}
        onBlur={handleBlur}
        className={`border w-full p-2 mt-1 ${errors.total_cost ? 'border-red-500' : ''}`}
        placeholder="예: 100.00"
      />
      {errors.total_cost && <p className="text-red-500 text-sm mt-1">{errors.total_cost.message}</p>}
    </div>
  )
}
