import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { handleEmailLogin } from '../utils/authHandlers'
import { validateForm } from '../utils/validateForm'

export const useEmailLogin = () => {
  const navigate = useNavigate()

  const onEmailLogin = async (email: string, password: string) => {
    if (validateForm({ email, password })) {
      try {
        await handleEmailLogin(email, password)
        toast.success('Login realizado com sucesso!')
        navigate('/')
      } catch (error: any) {
        toast.error(error.message || 'Erro na autenticação')
      }
    }
  }

  return { onEmailLogin }
}