import { Task } from '@/types/schemas';
import { useStorage } from '@/storage/StorageContext';

export const useTaskActions = (
	goalId: number,
	parentId: number,
	taskId?: number | undefined,
) => {
	const storage = useStorage();
	const storageString =
		parentId !== goalId ? `goals.${goalId}.${parentId}` : `goals.${goalId}`;
	const storedId = storage.getString(`goals.${goalId}.lastId`);
	const lastId = storedId ? (JSON.parse(storedId) as number) : 0;
	const storedTasks = storage.getString(storageString);
	let tasks: Task[] = [];
	if (storedTasks) {
		tasks = JSON.parse(storedTasks) as Task[];
	}
	const updateTasks = (updatedTasks: Task[]) => {
		storage.set(storageString, JSON.stringify(updatedTasks));
	};

	const deleteTask = () => {
		const updatedTasks = tasks.filter(t => t.id !== taskId);
		updateTasks(updatedTasks);
	};

	const finishTask = () => {
		const updatedTasks = tasks.map(t =>
			t.id === taskId ? { ...t, completed: true } : t,
		);
		updateTasks(updatedTasks);
	};

	const editTask = (newName: string, newDescription: string) => {
		console.log(
			`edit task id ${taskId} from goal ${goalId} from parent ${parentId}`,
		);
		const updatedTasks = tasks.map(t =>
			t.id === taskId
				? { ...t, name: newName, description: newDescription }
				: t,
		);
		console.log(updatedTasks);
		updateTasks(updatedTasks);
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
		updateTasks(updatedTasks);
		return updatedTasks;
	};
	return { deleteTask, finishTask, editTask, addTask };
};
