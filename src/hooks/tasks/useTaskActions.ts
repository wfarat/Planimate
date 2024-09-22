import { Task } from '@/types/schemas';
import { useStorage } from '@/storage/StorageContext';
import { TaskAction } from '@/types/offlineActions/taskAction';
import { useOfflineActions } from '@/hooks/useOfflineActions';

export const useTaskActions = (
	goalId: number,
	parentId?: number,
	taskId?: number,
) => {
	const storage = useStorage();
	const { addAction } = useOfflineActions();
	const getStorageString = (target?: number) => {
		return target ? `goals.${goalId}.${target}` : `goals.${goalId}`;
	};
	const storedId = storage.getNumber(`goals.${goalId}.lastId`);
	const lastId = storedId || 0;
	const getTasks = (storageString: string) => {
		const storedTasks = storage.getString(storageString);
		if (storedTasks) {
			return JSON.parse(storedTasks) as Task[];
		}
		return [];
	};
	const updateTasks = (updatedTasks: Task[], target?: number) => {
		storage.set(getStorageString(target), JSON.stringify(updatedTasks));
	};
	const cleanupTasks = (id?: number) => {
		const subtasks = getTasks(getStorageString(id));
		subtasks.forEach(subtask => {
			cleanupTasks(subtask.taskId);
		});
		storage.delete(getStorageString(id));
	};
	const deleteTask = () => {
		const tasks = getTasks(getStorageString(parentId));
		const updatedTasks = tasks.filter(t => t.taskId !== taskId);
		updateTasks(updatedTasks, parentId);
		cleanupTasks(taskId);
	};

	const finishTask = () => {
		const tasks = getTasks(getStorageString(parentId));
		const updatedTasks = tasks.map(t =>
			t.taskId === taskId
				? { ...t, completed: true, updatedAt: new Date().toISOString() }
				: t,
		);
		updateTasks(updatedTasks, parentId);
	};

	const editTask = (newName: string, newDescription: string) => {
		const tasks = getTasks(getStorageString(parentId));
		const updatedTasks = tasks.map(t =>
			t.taskId === taskId
				? {
						...t,
						name: newName,
						description: newDescription,
						updatedAt: new Date().toISOString(),
				  }
				: t,
		);
		updateTasks(updatedTasks, parentId);
	};

	const createTask = (
		order: number,
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
			taskId: lastId + 1,
			parentId: taskId,
			duration,
			dueDate,
			updatedAt: new Date().toISOString(),
			completed: false,
			order,
		};
		storage.set(`goals.${goalId}.lastId`, lastId + 1);
		return newTask;
	};
	const findMostImportantTask = (): Task | null => {
		const tasks = getTasks(getStorageString());
		const traverseTasks = (list: Task[]): Task | null => {
			return list.reduce<Task | null>((result, task) => {
				if (result) {
					return result;
				}
				if (!task.completed) {
					const tasksData = storage.getString(`goals.${goalId}.${task.taskId}`);
					if (tasksData) {
						const subTasks = JSON.parse(tasksData) as Task[];
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
	const findImportantTasks = (freeMinutes: number): Task[] => {
		const tasks = getTasks(getStorageString());
		const allocatedTaskIds = new Set<number>();
		const traverseTasks = (list: Task[]): Task | null => {
			return list.reduce<Task | null>((result, task) => {
				if (result) return result;

				if (!task.completed && !allocatedTaskIds.has(task.taskId)) {
					const tasksData = storage.getString(
						`goals.${task.goalId}.${task.taskId}`,
					);
					if (tasksData) {
						const subTasks = JSON.parse(tasksData) as Task[];
						if (subTasks.length === 0) return task;
						return traverseTasks(subTasks) || task;
					}

					if (!task.duration || task.duration.elapsed < task.duration.base) {
						return task;
					}
				}

				return null;
			}, null);
		};

		const importantTasks = [];
		let task = traverseTasks(tasks);
		let remainingMinutes = freeMinutes;
		while (task && remainingMinutes > 0) {
			importantTasks.push(task);
			allocatedTaskIds.add(task.taskId);
			if (task.duration)
				remainingMinutes -= task.duration.base - task.duration.elapsed;
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
			const tasksData = storage.getString(`goals.${goalId}.${task.taskId}`);
			if (tasksData) {
				const subTasks = JSON.parse(tasksData) as Task[];
				const subtaskCounts = countTasks(subTasks);
				counts.completed += subtaskCounts.completed;
				counts.total += subtaskCounts.total;
			}
		});

		return counts;
	};
	const addOfflineAction = (action: TaskAction) => {
		addAction('task', action);
	};
	return {
		getTasks,
		getStorageString,
		deleteTask,
		finishTask,
		editTask,
		createTask,
		countTasks,
		cleanupTasks,
		updateTasks,
		findMostImportantTask,
		findImportantTasks,
		addOfflineAction,
	};
};
