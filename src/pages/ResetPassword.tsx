'use client'

import { sendPasswordResetEmail } from 'firebase/auth'
import { MailIcon } from 'lucide-react'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { auth } from '../lib/firebase'

export default function ResetPassword() {
    const [email, setEmail] = useState('')
    const navigate = useNavigate()

    const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!email) {
            toast.error('Por favor, insira seu email.')
            return
        }
        try {
            await sendPasswordResetEmail(auth, email)
            toast.success('Email de recuperação de senha enviado. Verifique sua caixa de entrada.')
            navigate('/login')
        } catch (error: any) {
            const errorMessage = error.message || 'Erro ao enviar email de recuperação'
            toast.error(errorMessage)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                    Recuperar Senha
                </h2>
                <form onSubmit={handleResetPassword} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <MailIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="seu@email.com"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-950 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Enviar Email de Recuperação
                        </button>
                    </div>
                </form>
                <div className="mt-4 text-center">
                    <button
                        onClick={() => navigate('/login')}
                        className="text-sm text-gray-600 hover:text-gray-900"
                    >
                        Voltar para o Login
                    </button>
                </div>
            </div>
        </div>
    )
}