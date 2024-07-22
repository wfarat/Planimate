import { Task } from '@/types/schemas';
import { useStorage } from '@/storage/StorageContext';

export const useTaskActions = (
	goalId: number,
	parentId: number,
	taskId?: number | undefined,
) => {
	const storage = useStorage();
	const storageString = (target?: number) => {
		return target ? `goals.${goalId}.${target}` : `goals.${goalId}`;
	};
	const storedId = storage.getString(`goals.${goalId}.lastId`);
	const lastId = storedId ? (JSON.parse(storedId) as number) : 0;
	const storedTasks = storage.getString(storageString(parentId));
	let tasks: Task[] = [];
	if (storedTasks) {
		tasks = JSON.parse(storedTasks) as Task[];
	}
	const updateTasks = (updatedTasks: Task[], target?: number) => {
		storage.set(storageString(target), JSON.stringify(updatedTasks));
	};

	const deleteTask = () => {
		const updatedTasks = tasks.filter(t => t.id !== taskId);
		updateTasks(updatedTasks, parentId);
	};

	const finishTask = () => {
		const updatedTasks = tasks.map(t =>
			t.id === taskId ? { ...t, completed: true } : t,
		);
		updateTasks(updatedTasks, parentId);
	};

	const editTask = (newName: string, newDescription: string) => {
		const updatedTasks = tasks.map(t =>
			t.id === taskId
				? { ...t, name: newName, description: newDescription }
				: t,
		);
		updateTasks(updatedTasks, parentId);
	};
	const addTask = (oldTasks: Task[], name: string, description: string) => {
		const newTask = {
			name,
			description,
			goalId,
			id: lastId + 1,
			taskId,
			completed: false,
		};
		storage.set(`goals.${goalId}.lastId`, JSON.stringify(lastId + 1));
		const updatedTasks = [...oldTasks, newTask];
		updateTasks(updatedTasks, taskId);
		return updatedTasks;
	};
	return { deleteTask, finishTask, editTask, addTask };
};
