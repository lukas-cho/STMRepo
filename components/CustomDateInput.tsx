import React, { forwardRef } from 'react'
import { FaRegCalendarAlt } from 'react-icons/fa'

type CustomInputProps = {
  value?: string
  onClick?: () => void
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
}

const CustomDateInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ value, onClick, onChange, placeholder }, ref) => {
    return (
      <div className="relative w-full">
        <input
          ref={ref}
          value={value}
          onClick={onClick}
          onChange={onChange}
          placeholder={placeholder}
          readOnly // 필요시 false로 바꾸세요
          className="border w-full p-2 pr-10 rounded cursor-pointer"
        />
        <FaRegCalendarAlt
          onClick={onClick}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600"
          size={20}
        />
      </div>
    )
  }
)

export default CustomDateInput
