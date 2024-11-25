import React from 'react'
import { Task } from '../../types'
import { ButtonForm } from "./ButtonForm"
import { DescriptionForm } from "./DescriptionForm"
import { PriorityForm } from "./PriorityForm"
import { StatusForm } from "./StatusForm"
import { TitleForm } from "./TitleForm"

interface TaskFormProps {
    editingTask: Task | null
    newTask: Omit<Task, 'id' | 'createdAt'>
    setNewTask: React.Dispatch<React.SetStateAction<Omit<Task, 'id' | 'createdAt'>>>
    setEditingTask: React.Dispatch<React.SetStateAction<Task | null>>
    isLoading: boolean
    handleEditTask: () => Promise<void>
    handleCreateTask: () => Promise<void>
}

export const TaskForm: React.FC<TaskFormProps> = ({
    editingTask,
    newTask,
    setNewTask,
    setEditingTask,
    isLoading,
    handleEditTask,
    handleCreateTask
}) => {
    return (
        <>
            <div className="grid gap-4 py-4">
                <TitleForm editingTask={editingTask} newTask={newTask} setNewTask={setNewTask} setEditingTask={setEditingTask}/>
                <DescriptionForm editingTask={editingTask} newTask={newTask} setNewTask={setNewTask} setEditingTask={setEditingTask}/>
                <StatusForm editingTask={editingTask} newTask={newTask} setNewTask={setNewTask} setEditingTask={setEditingTask}/>
                <PriorityForm editingTask={editingTask} newTask={newTask} setNewTask={setNewTask} setEditingTask={setEditingTask}/>
            </div>
            <ButtonForm editingTask={editingTask} isLoading={isLoading} handleEditTask={handleEditTask} handleCreateTask={handleCreateTask}/>
        </>
    )
}