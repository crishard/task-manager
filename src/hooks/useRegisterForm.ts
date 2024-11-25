import { useState } from 'react'
import { z } from 'zod'
import { RegisterFormData } from '../types/auth'
import { registerSchema } from '../utils/registerSchema'

export const useRegisterForm = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState<Partial<RegisterFormData>>({})
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof RegisterFormData]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = (): boolean => {
    try {
      registerSchema.parse(formData)
      setErrors({})
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationErrors: Partial<RegisterFormData> = {}
        error.errors.forEach(err => {
          if (err.path[0] in formData) {
            validationErrors[err.path[0] as keyof RegisterFormData] = err.message
          }
        })
        setErrors(validationErrors)
      }
      return false
    }
  }

  return {
    formData,
    errors,
    showPassword,
    handleChange,
    setShowPassword,
    validateForm
  }
}