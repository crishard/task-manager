import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../lib/firebase'

export const handleEmailLogin = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password)
}

export const handleGoogleLogin = async (signInWithGoogle: () => Promise<void>) => {
    await signInWithGoogle()
}

export const handlePasswordReset = async (email: string) => {
    await sendPasswordResetEmail(auth, email)
}