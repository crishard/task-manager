import { Task } from "@/types"
import { Timestamp } from "firebase/firestore"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { Label } from "../ui/label"

interface ITaskDetailsProps{
    isViewDialogOpen: boolean,
    handleViewDialogOpenChange: (open: boolean) => void,
    viewingTask: Task | null
}

export const TaskDetails = ({viewingTask, isViewDialogOpen, handleViewDialogOpenChange}: ITaskDetailsProps) => {
    return (
        <Dialog open={isViewDialogOpen} onOpenChange={handleViewDialogOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-2xl">Detalhes da Tarefa</DialogTitle>
                </DialogHeader>
                {viewingTask && (
                    <div className="grid gap-4 py-4 text-lg">
                        <div>
                            <Label className="font-bold text-xl">Título</Label>
                            <p className="sm:w-full truncate lea w-[180px]">{viewingTask.title}</p>
                        </div>
                        <div>
                            <Label className="font-bold  text-xl">Descrição</Label>
                            <p>{viewingTask.description}</p>
                        </div>
                        <div>
                            <Label className="font-bold text-xl">Status</Label>
                            <p>{viewingTask.status}</p>
                        </div>
                        <div>
                            <Label className="font-bold text-xl">Prioridade</Label>
                            <p>{viewingTask.priority}</p>
                        </div>
                        <div>
                            <Label className="font-bold text-xl">Data de Criação</Label>
                            <p>{viewingTask.createdAt instanceof Timestamp
                                ? new Date(viewingTask.createdAt.seconds * 1000).toLocaleDateString('pt-BR')
                                : new Date(viewingTask.createdAt).toLocaleDateString('pt-BR')}
                            </p>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}
