import { MailIcon } from 'lucide-react'
import React from 'react'

interface EmailInputProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
}

export const EmailInput: React.FC<EmailInputProps> = ({ value, onChange, error }) => {
  return (
    <div>
      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
        Email
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MailIcon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="email"
          id="email"
          name="email"
          value={value}
          onChange={onChange}
          className={`block w-full pl-10 pr-3 py-2 border ${
            error ? 'border-red-300' : 'border-gray-300'
          } rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500`}
          placeholder="seu@email.com"
        />
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  )
}