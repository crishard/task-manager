import { Task } from "@/types"
import { Loader2 } from "lucide-react"
import { Button } from "../ui/button"

interface IButtonFormProps {
    editingTask: Task | null,
    isLoading: boolean,
    handleEditTask: () => Promise<void>,
    handleCreateTask: () => Promise<void>
}

export const ButtonForm = ({ editingTask, isLoading, handleEditTask, handleCreateTask }: IButtonFormProps) => {
    return (
        <Button onClick={editingTask ? handleEditTask : handleCreateTask} disabled={isLoading} className="text-lg py-5">
            {isLoading ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {editingTask ? 'Atualizando...' : 'Criando...'}
                </>
            ) : (
                editingTask ? 'Atualizar Tarefa' : 'Criar Tarefa'
            )}
        </Button>
    )
}
