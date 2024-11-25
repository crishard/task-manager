import { Task } from "@/types"
import { Label } from "../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"


interface IStatusFormProps{
    editingTask: Task | null,
    newTask: Omit<Task, "id" | "createdAt">,
    setNewTask: (value: React.SetStateAction<Omit<Task, "id" | "createdAt">>) => void,
    setEditingTask: (value: React.SetStateAction<Task | null>) => void
}
export const StatusForm = ({editingTask, newTask, setNewTask, setEditingTask}: IStatusFormProps) => {
    return (
        <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right text-lg">
                Status
            </Label>
            <Select
                onValueChange={(value) => editingTask ? setEditingTask({ ...editingTask, status: value as Task['status'] }) : setNewTask({ ...newTask, status: value as Task['status'] })}
                defaultValue={editingTask ? editingTask.status : newTask.status}
            >
                <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="pending">Pendente</SelectItem>
                    <SelectItem value="in-progress">Em Progresso</SelectItem>
                    <SelectItem value="completed">Concluído</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}
