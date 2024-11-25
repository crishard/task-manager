import { Task } from "@/types"
import { Label } from "../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"


interface IPriorityFormProps {
    editingTask: Task | null,
    newTask: Omit<Task, "id" | "createdAt">,
    setNewTask: (value: React.SetStateAction<Omit<Task, "id" | "createdAt">>) => void,
    setEditingTask: (value: React.SetStateAction<Task | null>) => void
}

export const PriorityForm = ({ editingTask, newTask, setNewTask, setEditingTask }: IPriorityFormProps) => {
    return (
        <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="priority" className="text-right text-lg">
                Prioridade
            </Label>
            <Select
                onValueChange={(value) => editingTask ? setEditingTask({ ...editingTask, priority: value as Task['priority'] }) : setNewTask({ ...newTask, priority: value as Task['priority'] })}
                defaultValue={editingTask ? editingTask.priority : newTask.priority}
            >
                <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecione a prioridade" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="low">Baixa</SelectItem>
                    <SelectItem value="medium">Média</SelectItem>
                    <SelectItem value="high">Alta</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}
