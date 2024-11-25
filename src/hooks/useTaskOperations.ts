import { useCallback, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useAuth } from '../contexts/AuthContext'
import { taskService } from '../services/taskService'
import { Task } from '../types'

export const useTaskOperations = (loadTasks: () => Promise<void>) => {
    const { currentUser } = useAuth()
    const [isLoading, setIsLoading] = useState(false)

    const handleCreateTask = useCallback(async (newTask: Omit<Task, 'id' | 'createdAt'>) => {
        if (!currentUser || !newTask.title.trim()) return

        setIsLoading(true)
        try {
            const taskToCreate: Task = {
                ...newTask,
                createdAt: new Date(),
                userId: currentUser.uid
            }
            await taskService.createTask(taskToCreate)
            await loadTasks()
            toast.success('Tarefa criada com sucesso!')
        } catch (error) {
            console.error('Error creating task:', error)
            toast.error('Erro ao criar tarefa')
        } finally {
            setIsLoading(false)
        }
    }, [currentUser, loadTasks])

    const handleEditTask = useCallback(async (editingTask: Task) => {
        if (!currentUser || !editingTask || !editingTask.id) return

        setIsLoading(true)
        try {
            const updates: Partial<Task> = {
                title: editingTask.title,
                description: editingTask.description,
                status: editingTask.status,
                priority: editingTask.priority
            }
            await taskService.updateTask(editingTask.id, updates)
            await loadTasks()
            toast.success('Tarefa atualizada com sucesso!')
        } catch (error) {
            console.error('Error updating task:', error)
            toast.error('Erro ao atualizar tarefa')
        } finally {
            setIsLoading(false)
        }
    }, [currentUser, loadTasks])

    const handleDeleteTask = useCallback(async (taskId: string) => {
        if (!currentUser) return

        try {
            await taskService.deleteTask(taskId)
            await loadTasks()
            toast.success('Tarefa excluída com sucesso!')
        } catch (error) {
            console.error('Error deleting task:', error)
            toast.error('Erro ao excluir tarefa')
        }
    }, [currentUser, loadTasks])

    return { isLoading, handleCreateTask, handleEditTask, handleDeleteTask }
}