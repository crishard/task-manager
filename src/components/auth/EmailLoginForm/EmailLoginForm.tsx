import React from 'react'
import { useEmailLoginForm } from '../../../hooks/useEmailLoginForm'
import { EmailInput } from './EmailInput'
import { PasswordInput } from './PasswordInput'
import { SubmitButton } from './SubmitButton'

interface EmailLoginFormProps {
    onSubmit: (email: string, password: string) => void
}

export const EmailLoginForm: React.FC<EmailLoginFormProps> = ({ onSubmit }) => {
    const { formData, errors, showPassword, handleChange, setShowPassword, handleSubmit } = useEmailLoginForm(onSubmit)

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <EmailInput
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
            />
            <PasswordInput
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
            />
            <SubmitButton>Entrar</SubmitButton>
        </form>
    )
}