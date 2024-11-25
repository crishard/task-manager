import { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { taskService } from '../services/taskService'
import { Column } from '../types'

export const useColumns = () => {
    const { currentUser } = useAuth()
    const [columns, setColumns] = useState<Column[]>([
        { id: '1', title: 'Pendente', status: 'pending', tasks: [] },
        { id: '2', title: 'Em Progresso', status: 'in-progress', tasks: [] },
        { id: '3', title: 'Concluído', status: 'completed', tasks: [] },
    ])

    const loadTasks = async () => {
        if (currentUser) {
            const userTasks = await taskService.getTasks(currentUser.uid)
            const updatedColumns = columns.map(column => ({
                ...column,
                tasks: userTasks.filter(task => task.status === column.status)
            }))
            setColumns(updatedColumns)
        }
    }

    useEffect(() => {
        if (currentUser) {
            loadTasks()
        }
    }, [currentUser])

    return { columns, setColumns, loadTasks }
}