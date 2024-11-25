import { useState } from 'react'
import { FormData } from '../types/auth'

export const useEmailLoginForm = (onSubmit: (email: string, password: string) => void) => {
  const [formData, setFormData] = useState<FormData>({ email: '', password: '' })
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(formData.email, formData.password)
  }

  return {
    formData,
    errors,
    showPassword,
    handleChange,
    setShowPassword,
    handleSubmit,
  }
}