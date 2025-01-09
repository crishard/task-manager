'use client'

import Header from "@/components/layout/Header"
import { ColumnTask } from "@/components/tasks/ColumnTask"
import { TaskDetails } from "@/components/tasks/TaskDetails"
import { TaskForm } from "@/components/tasks/TaskForm"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { PlusCircle } from 'lucide-react'
import React from 'react'
import { useTaskManagement } from '../hooks/useTaskManagement'

const Dashboard: React.FC = () => {
    const {
        columns, newTask, editingTask, viewingTask, isLoading,
        isDialogOpen, isViewDialogOpen, setNewTask,
        setEditingTask, setViewingTask, setIsDialogOpen,
        setIsViewDialogOpen, createTask, editTask,
        handleDeleteTask, handleDialogOpenChange, handleViewDialogOpenChange
    } = useTaskManagement()

    return (
        <div className="container px-5 sm:px-10 py-12">
            <Header />
            <div className="flex space-x-2 mb-4">
                <Dialog open={isDialogOpen} onOpenChange={handleDialogOpenChange}>
                    <DialogTrigger asChild className="mb-6">
                        <Button onClick={() => setIsDialogOpen(true)} className="text-lg py-5">
                            <PlusCircle className="mr-2" /> Nova Tarefa
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className="text-2xl">{editingTask ? 'Editar Tarefa' : 'Criar Nova Tarefa'}</DialogTitle>
                        </DialogHeader>
                        <TaskForm
                            editingTask={editingTask} newTask={newTask} setNewTask={setNewTask}
                            setEditingTask={setEditingTask} isLoading={isLoading}
                            handleEditTask={editTask} handleCreateTask={createTask}
                        />
                    </DialogContent>
                </Dialog>
            </div>
            <ColumnTask
                columns={columns} setViewingTask={setViewingTask}
                setEditingTask={setEditingTask} setIsDialogOpen={setIsDialogOpen}
                setIsViewDialogOpen={setIsViewDialogOpen} handleDeleteTask={handleDeleteTask} />
            <TaskDetails
                isViewDialogOpen={isViewDialogOpen} viewingTask={viewingTask}
                handleViewDialogOpenChange={handleViewDialogOpenChange} />
        </div>
    )
}

export default Dashboard