import { useColumns } from './useColumns'
import { useDialogState } from './useDialogState'
import { useTaskForm } from './useTaskForm'
import { useTaskOperations } from './useTaskOperations'

export const useTaskManagement = () => {
    const { columns, loadTasks } = useColumns()
    const { newTask, setNewTask, editingTask, setEditingTask, resetNewTask } = useTaskForm()
    const { isLoading, handleCreateTask, handleEditTask, handleDeleteTask } = useTaskOperations(loadTasks)
    const {
        isDialogOpen,
        setIsDialogOpen,
        isViewDialogOpen,
        setIsViewDialogOpen,
        viewingTask,
        setViewingTask,
        handleDialogOpenChange,
        handleViewDialogOpenChange
    } = useDialogState()

    const createTask = async () => {
        await handleCreateTask(newTask)
        resetNewTask()
        setIsDialogOpen(false)
    }

    const editTask = async () => {
        if (editingTask) {
            await handleEditTask(editingTask)
            setEditingTask(null)
            setIsDialogOpen(false)
        }
    }

    return {
        columns,
        newTask,
        editingTask,
        viewingTask,
        isLoading,
        isDialogOpen,
        isViewDialogOpen,
        setNewTask,
        setEditingTask,
        setViewingTask,
        setIsDialogOpen,
        setIsViewDialogOpen,
        createTask,
        editTask,
        handleDeleteTask,
        handleDialogOpenChange,
        handleViewDialogOpenChange,
    }
}