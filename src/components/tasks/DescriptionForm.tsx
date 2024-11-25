import { Task } from "@/types"
import { Input } from "../ui/input"
import { Label } from "../ui/label"

interface IDescriptionFormProps {
    editingTask: Task | null,
    newTask: Omit<Task, "id" | "createdAt">,
    setNewTask: (value: React.SetStateAction<Omit<Task, "id" | "createdAt">>) => void,
    setEditingTask: (value: React.SetStateAction<Task | null>) => void
}

export const DescriptionForm = ({ editingTask, newTask, setNewTask, setEditingTask }: IDescriptionFormProps) => {
    return (
        <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right text-lg">
                Descrição
            </Label>
            <Input
                id="description"
                value={editingTask ? editingTask.description : newTask.description}
                onChange={(e) => editingTask ? setEditingTask({ ...editingTask, description: e.target.value }) : setNewTask({ ...newTask, description: e.target.value })}
                className="col-span-3"
            />
        </div>
    )
}
