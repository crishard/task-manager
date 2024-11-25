import { auth } from "@/lib/firebase"
import { sendPasswordResetEmail } from "firebase/auth"
import toast from "react-hot-toast"
interface IHandlePasswordResetProps{
    setIsResetDialogOpen: React.Dispatch<React.SetStateAction<boolean>>,
    resetEmail: string
}
export const handlePasswordReset = async (e: React.FormEvent<HTMLFormElement>, {setIsResetDialogOpen, resetEmail}: IHandlePasswordResetProps) => {
    e.preventDefault()
    if (!resetEmail) {
        toast.error('Por favor, insira seu email para recuperar a senha.')
        return
    }
    try {
        await sendPasswordResetEmail(auth, resetEmail)
        toast.success('Email de recuperação de senha enviado. Verifique sua caixa de entrada.')
        setIsResetDialogOpen(false)
    } catch (error: any) {
        const errorMessage = error.message || 'Erro ao enviar email de recuperação'
        toast.error(errorMessage)
    }
}