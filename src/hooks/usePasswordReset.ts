import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { handlePasswordReset } from '../utils/authHandlers'

export const usePasswordReset = () => {
  const [resetEmail, setResetEmail] = useState('')
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false)

  const onPasswordReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!resetEmail) {
      toast.error('Por favor, insira seu email para recuperar a senha.')
      return
    }
    try {
      await handlePasswordReset(resetEmail)
      toast.success('Email de recuperação de senha enviado. Verifique sua caixa de entrada.')
      setIsResetDialogOpen(false)
    } catch (error: any) {
      toast.error(error.message || 'Erro ao enviar email de recuperação')
    }
  }

  return { resetEmail, setResetEmail, isResetDialogOpen, setIsResetDialogOpen, onPasswordReset }
}