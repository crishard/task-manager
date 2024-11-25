import { z } from 'zod'
import { FormData } from '../types/auth'

export const formSchema = z.object({
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
})

export const validateForm = (formData: FormData): boolean => {
    try {
        formSchema.parse(formData)
        return true
    } catch (error) {
        if (error instanceof z.ZodError) {
            const validationErrors: Partial<FormData> = {}
            error.errors.forEach((err) => {
                if (err.path[0] === 'email' || err.path[0] === 'password') {
                    validationErrors[err.path[0]] = err.message
                }
            })
        }
        return false
    }
}