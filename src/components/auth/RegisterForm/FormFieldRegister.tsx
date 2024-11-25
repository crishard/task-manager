import { LockIcon, MailIcon, UserIcon } from 'lucide-react'
import React from 'react'

interface FormFieldProps {
  id: string
  label: string
  type: string
  icon: 'user' | 'mail' | 'lock'
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
  placeholder: string
}

export const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  type,
  icon,
  value,
  onChange,
  error,
  placeholder
}) => {
  const IconComponent = {
    user: UserIcon,
    mail: MailIcon,
    lock: LockIcon
  }[icon]

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <IconComponent className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type={type}
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          className={`block w-full pl-10 pr-3 py-2 border ${
            error ? 'border-red-300' : 'border-gray-300'
          } rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500`}
          placeholder={placeholder}
        />
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  )
}