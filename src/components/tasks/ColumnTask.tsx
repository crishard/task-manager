import { Column, Task } from "@/types"
import { TaskComponent } from "./Task"

const priorityColors = {
    high: 'bg-red-500',
    medium: 'bg-yellow-500',
    low: 'bg-blue-500'
}

interface IColumnTaskProps {
    columns: Column[],
    setViewingTask: (value: React.SetStateAction<Task | null>) => void,
    setEditingTask: (value: React.SetStateAction<Task | null>) => void,
    setIsDialogOpen: (value: React.SetStateAction<boolean>) => void,
    setIsViewDialogOpen: (value: React.SetStateAction<boolean>) => void,
    handleDeleteTask: any,
}
export const ColumnTask = ({ columns, setViewingTask, setEditingTask, setIsDialogOpen, setIsViewDialogOpen, handleDeleteTask }: IColumnTaskProps) => {

    return (
        <div className="sm:grid grid-cols-3 gap-4 justify-center">
            {columns.map((column) => (
                <div key={column.id} className="flex-shrink-0 xl:min-w-[300px] sm:min-w-[200px] 2xl:min-w-[400px]">
                    <h2 className="font-bold mb-2">{column.title}</h2>
                    <div className="bg-gray-100 p-2 rounded min-h-[400px]  sm:min-w-[400px]">
                        {column.tasks.map((task) => (
                            <TaskComponent id={task.id} priorityColor={priorityColors[task.priority]} title={task.title} setViewingTask={() => setViewingTask(task)} task={task} setEditingTask={() => setEditingTask(task)} setIsDialogOpen={() => setIsDialogOpen(true)} setIsViewDialogOpen={() => setIsViewDialogOpen(true)} handleDeleteTask={() => task.id && handleDeleteTask(task.id)} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}
