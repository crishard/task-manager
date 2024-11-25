import React from 'react'
import { useRegisterForm } from '../../../hooks/useRegisterForm'
import { RegisterFormData } from '../../../types/auth'
import { FormField } from './FormFieldRegister'
import { PasswordField } from './PasswordFieldRegister'
import { SubmitButton } from './SubmitButtonRegister'

interface RegisterFormProps {
  onSubmit: (formData: RegisterFormData) => Promise<void>
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit }) => {
  const { formData, errors, showPassword, handleChange, setShowPassword, validateForm } = useRegisterForm()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (validateForm()) {
      await onSubmit(formData)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormField
        id="name"
        label="Nome"
        type="text"
        icon="user"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
        placeholder="Seu nome"
      />
      <FormField
        id="email"
        label="Email"
        type="email"
        icon="mail"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        placeholder="seu@email.com"
      />
      <PasswordField
        id="password"
        label="Senha"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
      />
      <PasswordField
        id="confirmPassword"
        label="Confirmar Senha"
        value={formData.confirmPassword}
        onChange={handleChange}
        error={errors.confirmPassword}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
      />
      <SubmitButton>Criar Conta</SubmitButton>
    </form>
  )
}