'use client'

import { useEmailLogin } from '@/hooks/useEmailLogin'
import { useGoogleLogin } from '@/hooks/useGoogleLogin'
import { usePasswordReset } from '@/hooks/usePasswordReset'
import { useNavigate } from 'react-router-dom'
import { EmailLoginForm } from '../components/auth/EmailLoginForm/EmailLoginForm'
import { GoogleLoginButton } from '../components/auth/GoogleLoginButton'
import { PasswordResetDialog } from '../components/auth/PasswordResetDialog'
export default function LoginScreen() {
    const navigate = useNavigate()
    const { onEmailLogin } = useEmailLogin()
    const { onGoogleLogin } = useGoogleLogin()
    const { 
        resetEmail, 
        setResetEmail, 
        isResetDialogOpen, 
        setIsResetDialogOpen, 
        onPasswordReset 
    } = usePasswordReset()

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                    Login
                </h2>
                <EmailLoginForm onSubmit={onEmailLogin} />

                <div className="mt-4 flex justify-between">
                    <PasswordResetDialog
                        isOpen={isResetDialogOpen}
                        onOpenChange={setIsResetDialogOpen}
                        resetEmail={resetEmail}
                        setResetEmail={setResetEmail}
                        onSubmit={onPasswordReset}
                    />
                    <button
                        onClick={() => navigate("/register")}
                        className="text-sm text-gray-600 hover:text-gray-900"
                    >
                        Criar conta
                    </button>
                </div>

                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">
                                Ou continuar com
                            </span>
                        </div>
                    </div>

                    <div className="mt-6">
                        <GoogleLoginButton onClick={onGoogleLogin} />
                    </div>
                </div>
            </div>
        </div>
    )
}