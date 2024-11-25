import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload } from 'lucide-react'
import React from 'react'
import { useProfileManagement } from '../../hooks/useProfileManagement'

interface ProfileDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  currentUser: any
}

export const ProfileDialog: React.FC<ProfileDialogProps> = ({ 
  isOpen, 
  onOpenChange, 
  currentUser 
}) => {
  const {
    displayName,
    setDisplayName,
    profileImage,
    isUploading,
    handleUpdateProfile,
    handleImageUpload
  } = useProfileManagement()

  const onUpdateProfile = async () => {
    const success = await handleUpdateProfile()
    if (success) {
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>User Profile</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="displayName" className="text-right">
              Name
            </Label>
            <Input
              id="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              value={currentUser?.email || ''}
              disabled
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="profileImage" className="text-right">
              Profile Image
            </Label>
            <div className="col-span-3 space-y-4">
              {profileImage && (
                <img 
                  src={profileImage} 
                  alt="Current profile" 
                  className="w-20 h-20 rounded-full object-cover mx-auto"
                />
              )}
              <div>
                <Input
                  id="profileImage"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={isUploading}
                />
                <Button 
                  asChild 
                  disabled={isUploading}
                  variant="outline"
                  className="w-full"
                >
                  <label htmlFor="profileImage" className="cursor-pointer">
                    <Upload className="mr-2 h-4 w-4" />
                    {isUploading ? 'Uploading...' : 'Upload Image'}
                  </label>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <Button onClick={onUpdateProfile}>Update Profile</Button>
      </DialogContent>
    </Dialog>
  )
}