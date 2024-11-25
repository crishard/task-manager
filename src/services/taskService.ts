import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    query,
    updateDoc,
    where
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Task } from '../types';

export const taskService = {
    async createTask(task: Task) {
        const tasksRef = collection(db, 'tasks')
        await addDoc(tasksRef, task)
    },
    async getTasks(userId: string) {
        const q = query(collection(db, 'tasks'), where('userId', '==', userId));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as Task[];
    },
    async updateTask(taskId: string, updates: Partial<Task>) {
        const taskRef = doc(db, 'tasks', taskId);
        return await updateDoc(taskRef, updates);
    },
    async deleteTask(taskId: string) {
        const taskRef = doc(db, 'tasks', taskId);
        return await deleteDoc(taskRef);
    }
};