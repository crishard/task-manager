'use client'

import { useNavigate } from 'react-router-dom'
import { RegisterForm } from '../components/auth/RegisterForm/RegisterForm'
import { useRegister } from '../hooks/useRegister'

export default function Register() {
  const navigate = useNavigate()
  const { handleRegister } = useRegister()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Criar Conta
        </h2>
        <RegisterForm onSubmit={handleRegister} />
        <div className="mt-6">
          <p className="text-center text-sm text-gray-600">
            Já tem uma conta?{' '}
            <button 
              onClick={() => navigate('/login')}
              className="font-medium text-gray-950 hover:text-gray-700"
            >
              Fazer login
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}