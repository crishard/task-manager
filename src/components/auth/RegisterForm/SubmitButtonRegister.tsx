import React from 'react'

interface SubmitButtonProps {
  children: React.ReactNode
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({ children }) => {
  return (
    <div>
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-950 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      >
        {children}
      </button>
    </div>
  )
}