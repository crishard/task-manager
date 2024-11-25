import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Task } from '../types'

export const useTaskForm = () => {
    const { currentUser } = useAuth()
    const [newTask, setNewTask] = useState<Omit<Task, 'id' | 'createdAt'>>({
        title: '',
        description: '',
        status: 'pending',
        priority: 'medium',
        userId: currentUser?.uid || ''
    })
    const [editingTask, setEditingTask] = useState<Task | null>(null)

    const resetNewTask = () => {
        setNewTask({
            title: '',
            description: '',
            status: 'pending',
            priority: 'medium',
            userId: currentUser?.uid || ''
        })
    }

    return { newTask, setNewTask, editingTask, setEditingTask, resetNewTask }
}