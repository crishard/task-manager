import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { RegisterFormData } from '../types/auth'
import { registerUser } from '../utils/auth'

export const useRegister = () => {
  const navigate = useNavigate()

  const handleRegister = async (formData: RegisterFormData) => {
    try {
      await registerUser(formData)
      toast.success('Conta criada com sucesso!')
      navigate('/login')
    } catch (error: any) {
      const errorMessage = error.message || 'Erro no registro'
      toast.error(errorMessage)
    }
  }

  return { handleRegister }
}