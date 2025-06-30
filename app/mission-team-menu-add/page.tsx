'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { MissionTeamMenuSchema } from '@/lib/zod-schema'
import { z } from 'zod'

type MissionTeamMenuForm = z.infer<typeof MissionTeamMenuSchema>

export default function NewMissionTeamMenuPage() {
  const [menus, setMenus] = useState<any[]>([])
  const [teams, setTeams] = useState<any[]>([])
  const [salesTipLength, setSalesTipLength] = useState(0)
  const [totalSalesAmount, setTotalSalesAmount] = useState('')
  const [profitMargin, setProfitMargin] = useState('')

  const {
    register,
    handleSubmit,
    setFocus,
    watch,
    setValue,
    trigger,
    setError,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<MissionTeamMenuForm>({
    resolver: zodResolver(MissionTeamMenuSchema),
    shouldFocusError: false,
  })

  const watchedSalesTip = watch('sales_tip')
  const watchedUnitPrice = watch('unit_price')
  const watchedQuantitySold = watch('quantity_sold')
  const watchedIngredientCost = watch('ingredient_cost_amount')
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  useEffect(() => {
    setSalesTipLength(watchedSalesTip?.length ?? 0)
  }, [watchedSalesTip])

  // 총 매출액 계산 및 이익률 계산
  useEffect(() => {
    const price = parseFloat(watchedUnitPrice || '0')
    const qty = parseInt(watchedQuantitySold || '0', 10)
    const cost = parseFloat(watchedIngredientCost || '0')

    if (!isNaN(price) && !isNaN(qty)) {
      const total = price * qty
      setTotalSalesAmount(total.toFixed(2))
      setValue('total_sales_amount', total.toFixed(2))

      if (total > 0) {
        const margin = ((total - cost) / total) * 100
        setProfitMargin(margin.toFixed(2))
        setValue('profit_margin', margin.toFixed(2))
      } else {
        setProfitMargin('')
        setValue('profit_margin', '')
      }
    } else {
      setTotalSalesAmount('')
      setProfitMargin('')
      setValue('total_sales_amount', '')
      setValue('profit_margin', '')
    }
  }, [watchedUnitPrice, watchedQuantitySold, watchedIngredientCost, setValue])

  const onError = (errors: any) => {
    if (errors.mission_team_id) {
      setFocus('mission_team_id')
    } else if (errors.menu_id) {
      setFocus('menu_id')
    }
  }

  useEffect(() => {
    axios.get('/api/menus').then((res) => setMenus(res.data))
    axios.get('/api/mission-teams').then((res) => setTeams(res.data))
  }, [])

  const onSubmit: SubmitHandler<MissionTeamMenuForm> = async (data) => {
    try {
      const res = await axios.post('/api/mission-team-menu-add', data)

      if (res.status === 201) {
        setSuccessMessage('판매 정보가 성공적으로 등록되었습니다! 🎉')
      }

      reset()
      setTotalSalesAmount('')
      setProfitMargin('')
    } catch (err: any) {
      alert(err.response?.data?.error || '판매 정보 등록 실패')
    }
  }


  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">팀별 판매 정보 입력</h1>
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
        {/* 미션팀 선택 */}
        <div>
          <label className="font-semibold">
            판매 선교팀 <span className="text-red-500">*</span>
          </label>
          <select
            {...register('mission_team_id', { required: '미션팀을 선택하세요.' })}
            onChange={(e) => {
              setValue('mission_team_id', e.target.value)
              trigger('mission_team_id')
            }}
            className={`border w-full p-2 mt-1 ${errors.mission_team_id ? 'border-red-500' : ''}`}
          >
            <option value="">선택하세요</option>
            {teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.countries?.name_ko} / {team.countries?.name_en} / {team.year} /{' '}
                {team.description || '미션팀 설명 없음'}
              </option>
            ))}
          </select>
          {errors.mission_team_id && (
            <p className="text-red-500 text-sm">{errors.mission_team_id.message}</p>
          )}
        </div>
        {/* 메뉴 선택 */}
        <div>
          <label className="font-semibold">
            메뉴 <span className="text-red-500">*</span>
          </label>
          <select
            {...register('menu_id')}
            className={`border w-full p-2 mt-1 ${errors.menu_id ? 'border-red-500' : ''}`}
          >
            <option value="">선택하세요</option>
            {menus.map((menu) => (
              <option key={menu.id} value={menu.id}>
                {menu.menu_name}
              </option>
            ))}
          </select>
          {errors.menu_id && (
            <p className="text-red-500 text-sm">{errors.menu_id.message}</p>
          )}
        </div>
        {/* 판매 가능 수량 */}
        <div>
          <label className="font-semibold">
            준비한 수량 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="예: 100"
            {...register('quantity_available')}
            className={`border w-full p-2 mt-1 ${errors.quantity_available ? 'border-red-500' : ''
              }`}
          />
          {errors.quantity_available && (
            <p className="text-red-500 text-sm">{errors.quantity_available.message}</p>
          )}
        </div>
        {/* 재료비 */}
        <div>
          <label className="font-semibold">총 재료비 ($) <span className="text-red-500">*</span></label>
          <input
            type="text"
            placeholder="예: 25.00"
            {...register('ingredient_cost_amount')}
            className={`border w-full p-2 mt-1 ${errors.ingredient_cost_amount ? 'border-red-500' : ''
              }`}
          />
          {errors.ingredient_cost_amount && (
            <p className="text-red-500 text-sm">{errors.ingredient_cost_amount.message}</p>
          )}
        </div>

        {/* 단가 */}
        <div>
          <label className="font-semibold">
            개당 가격 ($) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="예: 10.99"
            {...register('unit_price')}
            className={`border w-full p-2 mt-1 ${errors.unit_price ? 'border-red-500' : ''}`}
          />
          {errors.unit_price && (
            <p className="text-red-500 text-sm">{errors.unit_price.message}</p>
          )}
        </div>

        {/* 판매된 수량 */}
        <div>
          <label className="font-semibold">
            판매된 수량 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="예: 100"
            {...register('quantity_sold')}
            className={`border w-full p-2 mt-1 ${errors.quantity_sold ? 'border-red-500' : ''}`}
          />
          {errors.quantity_sold && (
            <p className="text-red-500 text-sm">{errors.quantity_sold.message}</p>
          )}
        </div>

        {/* 총 매출액 (자동 계산, 읽기전용) */}
        <div>
          <label className="font-semibold">총 매출액</label>
          <input
            type="text"
            {...register('total_sales_amount')}
            value={totalSalesAmount}
            readOnly
            className="border w-full p-2 mt-1 bg-gray-100 cursor-not-allowed"
          />
          {errors.total_sales_amount && (
            <p className="text-red-500 text-sm">{errors.total_sales_amount.message}</p>
          )}
        </div>



        {/* 이익률 (자동 계산, 읽기전용) */}
        <div>
          <label className="font-semibold">이익률 (%)</label>
          <input
            type="text"
            {...register('profit_margin')}
            value={profitMargin}
            readOnly
            className="border w-full p-2 mt-1 bg-gray-100 cursor-not-allowed"
          />
        </div>



        {/* 판매 노하우 */}
        <div>
          <label className="font-semibold">판매 노하우 (최대 5000자)</label>
          <textarea
            {...register('sales_tip')}
            maxLength={5000}
            className={`border w-full p-2 mt-1 h-60 ${errors.sales_tip ? 'border-red-500' : ''
              }`}
          />
          <div className="flex justify-between text-sm text-gray-500 mt-1">
            <p>{salesTipLength} / 5000</p>
            {errors.sales_tip && (
              <p className="text-red-500">{errors.sales_tip.message}</p>
            )}
          </div>
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
