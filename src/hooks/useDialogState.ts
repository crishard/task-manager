import { useCallback, useState } from 'react'
import { Task } from '../types'

export const useDialogState = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
    const [viewingTask, setViewingTask] = useState<Task | null>(null)

    const handleDialogOpenChange = useCallback((open: boolean) => {
        setIsDialogOpen(open)
    }, [])

    const handleViewDialogOpenChange = useCallback((open: boolean) => {
        setIsViewDialogOpen(open)
        if (!open) {
            setViewingTask(null)
        }
    }, [])

    return {
        isDialogOpen,
        setIsDialogOpen,
        isViewDialogOpen,
        setIsViewDialogOpen,
        viewingTask,
        setViewingTask,
        handleDialogOpenChange,
        handleViewDialogOpenChange
    }
}