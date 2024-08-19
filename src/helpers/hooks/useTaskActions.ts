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
	const findImportantTasks = (freeHours: number): Task[] => {
		const allocatedTaskIds = new Set<number>();
		const traverseTasks = (list: Task[]): Task | null => {
			return list.reduce<Task | null>((result, task) => {
				if (result) return result;

				if (
					!task.completed &&
					task.duration &&
					task.duration.elapsed < task.duration.base &&
					!allocatedTaskIds.has(task.id)
				) {
					const data = storage.getString(`goals.${task.goalId}.${task.id}`);
					if (data) {
						const subTasks = JSON.parse(data) as Task[];
						if (subTasks.length === 0) return task;
						return traverseTasks(subTasks) || task;
					}
					return task;
				}
				return null;
			}, null);
		};

		const importantTasks = [];
		let task = traverseTasks(tasks);
		let remainingHours = freeHours;
		while (task && remainingHours > 0) {
			importantTasks.push(task);
			allocatedTaskIds.add(task.id);
			if (task.duration)
				remainingHours -= task.duration.base - task.duration.elapsed;
			task = traverseTasks(tasks);
		}

		return importantTasks;
	};
	interface TaskCount {
		completed: number;
		total: number;
	}
	const countTasks = (taskArray: Task[]) => {
		const counts: TaskCount = { completed: 0, total: 0 };

		taskArray.forEach(task => {
			counts.total += 1;
			if (task.completed) {
				counts.completed += 1;
			}
			const data = storage.getString(`goals.${goalId}.${task.id}`);
			if (data) {
				const subTasks = JSON.parse(data) as Task[];
				const subtaskCounts = countTasks(subTasks);
				counts.completed += subtaskCounts.completed;
				counts.total += subtaskCounts.total;
			}
		});

		return counts;
	};

	return {
		deleteTask,
		finishTask,
		editTask,
		addTask,
		countTasks,
		updateTasks,
		findMostImportantTask,
		findImportantTasks,
	};
};
