import { Task } from "@/types"
import { Input } from "../ui/input"
import { Label } from "../ui/label"

interface ITitleFormProps {
    editingTask: Task | null,
    newTask: Omit<Task, "id" | "createdAt">,
    setNewTask: (value: React.SetStateAction<Omit<Task, "id" | "createdAt">>) => void,
    setEditingTask: (value: React.SetStateAction<Task | null>) => void
}

export const TitleForm = ({ editingTask, newTask, setNewTask, setEditingTask }: ITitleFormProps) => {
    return (
        <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right text-lg">
                Título
            </Label>
            <Input
                id="title"
                value={editingTask ? editingTask.title : newTask.title}
                onChange={(e) => editingTask ? setEditingTask({ ...editingTask, title: e.target.value }) : setNewTask({ ...newTask, title: e.target.value })}
                className="col-span-3"
            />
        </div>
    )
}
