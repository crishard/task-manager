import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { handleGoogleLogin } from '../utils/authHandlers'

export const useGoogleLogin = () => {
  const navigate = useNavigate()
  const { signInWithGoogle } = useAuth()

  const onGoogleLogin = async () => {
    try {
      await handleGoogleLogin(signInWithGoogle)
      toast.success('Login com Google realizado!')
      navigate('/')
    } catch (error) {
      toast.error('Erro no login com Google')
    }
  }

  return { onGoogleLogin }
}