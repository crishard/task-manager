'use client'

import {
    User,
    onAuthStateChanged,
    signInWithPopup,
    signOut,
    updateProfile
} from 'firebase/auth';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, googleProvider } from '../lib/firebase';

interface AuthUser extends User {
    uid: string;
}

interface AuthContextType {
    currentUser: AuthUser | null
    signInWithGoogle: () => Promise<void>
    logout: () => Promise<void>
    updateUserProfile: (profileData: { displayName?: string, photoURL?: string }) => Promise<void>
    uploadProfileImage: (file: File) => Promise<string>
}

const AuthContext = createContext<AuthContextType>({
    currentUser: null,
    signInWithGoogle: async () => {},
    logout: async () => {},
    updateUserProfile: async () => {},
    uploadProfileImage: async () => ''
})

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<AuthUser | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user as AuthUser | null)
            setLoading(false)
        })

        return () => unsubscribe()
    }, [])

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider)
        } catch (error) {
            console.error("Login error", error)
            throw error
        }
    }

    const logout = async () => {
        try {
            await signOut(auth)
        } catch (error) {
            console.error("Logout error", error)
            throw error
        }
    }

    const updateUserProfile = async (profileData: { displayName?: string, photoURL?: string }) => {
        if (!auth.currentUser) throw new Error("No user logged in")

        try {
            await updateProfile(auth.currentUser, profileData)
            setCurrentUser(prevUser => {
                if (prevUser) {
                    return { ...prevUser, ...profileData }
                }
                return prevUser
            })
        } catch (error) {
            console.error("Profile update error", error)
            throw error
        }
    }

    const uploadProfileImage = async (file: File): Promise<string> => {
        if (!auth.currentUser) throw new Error("No user logged in")

        const storage = getStorage();
        const storageRef = ref(storage, `profile_images/${auth.currentUser.uid}`);

        try {
            const snapshot = await uploadBytes(storageRef, file)
            const downloadURL = await getDownloadURL(snapshot.ref)
            await updateUserProfile({ photoURL: downloadURL })
            return downloadURL
        } catch (error) {
            console.error("Image upload error", error)
            throw error
        }
    }

    const value = {
        currentUser,
        signInWithGoogle,
        logout,
        updateUserProfile,
        uploadProfileImage
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)