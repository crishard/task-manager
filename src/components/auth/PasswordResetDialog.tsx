import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React from 'react'

interface PasswordResetDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    resetEmail: string;
    setResetEmail: (email: string) => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const PasswordResetDialog: React.FC<PasswordResetDialogProps> = ({
    isOpen,
    onOpenChange,
    resetEmail,
    setResetEmail,
    onSubmit
}) => {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>
                <button className="text-sm text-gray-600 hover:text-gray-900">
                    Esqueceu a senha?
                </button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Redefinir Senha</DialogTitle>
                </DialogHeader>
                <form onSubmit={onSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="reset-email">Email</Label>
                        <Input
                            id="reset-email"
                            type="email"
                            placeholder="seu@email.com"
                            value={resetEmail}
                            onChange={(e) => setResetEmail(e.target.value)}
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full">
                        Redefinir Senha
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}