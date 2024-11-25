// const storedImage = localStorage.getItem(`profileImage_${currentUser.uid}`)
// setProfileImage(storedImage)
// const [profileImage, setProfileImage] = useState<string | null>(null)
import { Button } from "@/components/ui/button"
import { CircleUserRound, LogOut } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useAuth } from '../../contexts/AuthContext'
import { ProfileDialog } from './ProfileDialog'

const Header: React.FC = () => {
    const { currentUser, logout } = useAuth()
    const [isProfileOpen, setIsProfileOpen] = useState(false)

    const [profileImage, setProfileImage] = useState<string | null>(null)


    useEffect(() => {
        const storedImage = localStorage.getItem(`profileImage_${currentUser?.uid}`)
        setProfileImage(storedImage);
    }, [currentUser])

    const handleLogout = async () => {
        try {
            await logout()
            toast.success('Logout successful')
        } catch (error) {
            console.error('Logout failed', error)
            toast.error('Logout failed')
        }
    }

    return (
        <div className="flex justify-between w-full items-center mb-12">
            <h1 className="lg:text-4xl sm:text-2xl text-xl font-bold">Task Manager</h1>
            <div className="flex items-center gap-6">
                <ProfileDialog
                    isOpen={isProfileOpen}
                    onOpenChange={setIsProfileOpen}
                    currentUser={currentUser}
                />
                <div onClick={() => setIsProfileOpen(true)}>
                    {profileImage ? (
                        <img
                            src={profileImage}
                            alt="Profile"
                            className="sm:w-16 sm:h-16 h-10 w-10 rounded-full cursor-pointer object-cover"
                        />
                    ) : (
                        <CircleUserRound className="lg:size-12 cursor-pointer size-6" />
                    )}
                </div>
                <Button variant="destructive" onClick={handleLogout} className="lg:text-xl text-base sm:py-6">
                    <LogOut className="sm:mr-2" /> Logout
                </Button>
            </div>
        </div>
    )
}

export default Header