import { Task } from "@/types";
import { Edit, Info, Trash2 } from "lucide-react";
import { Button } from "../ui/button";



interface ITaskProps {
    id: string | undefined,
    priorityColor: string,
    title: string,
    setViewingTask: (value: React.SetStateAction<Task | null>) => void,
    task: Task,
    setEditingTask: (value: React.SetStateAction<Task | null>) => void,
    setIsDialogOpen: (value: React.SetStateAction<boolean>) => void,
    setIsViewDialogOpen: (value: React.SetStateAction<boolean>) => void,
    handleDeleteTask: any

}
export const TaskComponent = ({ id, priorityColor, title, setViewingTask, task, setEditingTask, setIsDialogOpen, setIsViewDialogOpen, handleDeleteTask }: ITaskProps) => {
    return (
        <div
            key={id}
            className="bg-white p-2 rounded shadow mb-2 flex items-center"
        >
            <div className={`w-1 h-6 mr-2 rounded ${priorityColor}`}></div>
            <span
                className="flex-grow sm:w-full max-w-[180px] truncate sm:overflow-hidden sm:whitespace-nowrap"
            >
                {title}
            </span>

            <Button variant="ghost" size="sm" onClick={() => { setViewingTask(task); setIsViewDialogOpen(true); }}>
                <Info className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => { setEditingTask(task); setIsDialogOpen(true); }}>
                <Edit className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => task.id && handleDeleteTask(task.id)}>
                <Trash2 className="h-4 w-4" />
            </Button>
        </div>
    )
}
