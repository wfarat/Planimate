import { Task } from '@/types/schemas';
import { useStorage } from '@/storage/StorageContext';

export const useTaskActions = (
	goalId: number,
	parentId?: number | undefined,
	taskId?: number | undefined,
) => {
	const storage = useStorage();
	const storageString = (target?: number) => {
		return target ? `goals.${goalId}.${target}` : `goals.${goalId}`;
	};
	const storedId = storage.getNumber(`goals.${goalId}.lastId`);
	const lastId = storedId || 0;
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

	const addTask = (
		oldTasks: Task[],
		name: string,
		description: string,
		durationTime?: number,
		dueDate?: Date,
	) => {
		const duration = durationTime
			? { base: durationTime, elapsed: 0 }
			: undefined;
		const newTask = {
			name,
			description,
			goalId,
			id: lastId + 1,
			taskId,
			duration,
			dueDate,
			completed: false,
		};
		storage.set(`goals.${goalId}.lastId`, lastId + 1);
		const updatedTasks = [...oldTasks, newTask];
		updateTasks(updatedTasks, taskId);
		return updatedTasks;
	};
	const findMostImportantTask = (): Task | null => {
		const traverseTasks = (list: Task[]): Task | null => {
			return list.reduce<Task | null>((result, task) => {
				if (result) {
					return result;
				}
				if (!task.completed) {
					const data = storage.getString(`goals.${goalId}.${task.id}`);
					if (data) {
						const subTasks = JSON.parse(data) as Task[];
						if (subTasks.length === 0) {
							return task;
						}
						return traverseTasks(subTasks) || task;
					}
					return task;
				}
				return null;
			}, null);
		};
		return traverseTasks(tasks);
	};

	return {
		deleteTask,
		finishTask,
		editTask,
		addTask,
		updateTasks,
		findMostImportantTask,
	};
};
