import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { addDoc, collection } from 'firebase/firestore'
import { auth, db } from '../lib/firebase'
import { RegisterFormData } from '../types/auth'

export const registerUser = async (formData: RegisterFormData) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    formData.email,
    formData.password
  )
  const user = userCredential.user

  await updateProfile(user, {
    displayName: formData.name
  })

  const userCollectionRef = collection(db, "user")

  await addDoc(userCollectionRef, {
    name: formData.name,
    email: formData.email,
    createdAt: new Date()
  })
}