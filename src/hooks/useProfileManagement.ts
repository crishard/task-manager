import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useAuth } from '../contexts/AuthContext'

export const useProfileManagement = () => {
  const { currentUser, updateUserProfile } = useAuth()
  const [displayName, setDisplayName] = useState(currentUser?.displayName || '')
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  useEffect(() => {
    if (currentUser) {
      setDisplayName(currentUser.displayName || '')
      const storedImage = localStorage.getItem(`profileImage_${currentUser.uid}`)
      setProfileImage(storedImage)
    }
  }, [currentUser])

  const handleUpdateProfile = async () => {
    if (!currentUser) return
    
    try {
      await updateUserProfile({ displayName })
      toast.success('Profile updated successfully')
      return true
    } catch (error) {
      console.error('Profile update failed', error)
      toast.error('Profile update failed')
      return false
    }
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file || !currentUser) return null

    setIsUploading(true)

    try {
      const base64String = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result as string)
        reader.onerror = reject
        reader.readAsDataURL(file)
      })

      localStorage.setItem(`profileImage_${currentUser.uid}`, base64String)
      setProfileImage(base64String)
      setIsUploading(false)
      toast.success('Profile image updated successfully')
      return base64String
    } catch (error) {
      console.error('Image upload failed:', error)
      toast.error('Failed to upload image. Please try again.')
      setIsUploading(false)
      return null
    }
  }

  return {
    displayName,
    setDisplayName,
    profileImage,
    setProfileImage,
    isUploading,
    handleUpdateProfile,
    handleImageUpload
  }
}