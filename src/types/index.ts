export interface User {
    id: string;
    email: string;
    displayName?: string;
}
export interface Task {
    id?: string;
    title: string;
    description?: string;
    status: 'pending' | 'in-progress' | 'completed';
    priority: 'low' | 'medium' | 'high';
    createdAt: Date;
    userId: string;
}

export interface Column {
    id: string;
    title: string;
    status: Task['status'];
    tasks: Task[];
}
