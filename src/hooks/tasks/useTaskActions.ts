import { GeneratedTask, Task } from '@/types/schemas';
import { storage } from '@/storage/storage';

export const useTaskActions = (
	goalId: number,
	parentId?: number,
	taskId?: number,
) => {
	const getStorageString = (target?: number) => {
		return target ? `tasks_${goalId}_${target}` : `tasks_${goalId}`;
	};
	const getTasks = (storageString: string) => {
		const storedTasks = storage.getString(storageString);
		if (storedTasks) {
			return JSON.parse(storedTasks) as Task[];
		}
		return [];
	};
	const updateTasks = (updatedTasks: Task[], target?: number) => {
		storage.set(getStorageString(target), JSON.stringify(updatedTasks));
		storage.set('tasksUpdated', true);
		const keys = JSON.parse(storage.getString('tasksKeys') || '[]') as string[];
		keys.push(getStorageString(target));
		storage.set('tasksKeys', JSON.stringify(keys));
	};
	const cleanupTasks = (id?: number) => {
		const subtasks = getTasks(getStorageString(id));
		subtasks.forEach(subtask => {
			cleanupTasks(subtask.taskId);
		});
		storage.delete(getStorageString(id));
		const keysToDelete = JSON.parse(
			storage.getString('keysToDelete') || '[]',
		) as string[];
		keysToDelete.push(getStorageString(id));
		storage.set('keysToDelete', JSON.stringify(keysToDelete));
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

	const editTask = (editedTask: Task) => {
		const tasks = getTasks(getStorageString(parentId));
		const updatedTasks = tasks.map(t =>
			t.taskId === taskId
				? {
						...editedTask,
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
		divisible: boolean,
		durationTime?: number,
		dueDate?: Date,
		repeats?: number,
		repeatDays?: boolean[],
	) => {
		const duration = durationTime
			? { base: durationTime, elapsed: 0 }
			: undefined;
		const storedId = storage.getNumber(`tasks_${goalId}_lastId`);
		const lastId = storedId || 0;
		const newTask = {
			name,
			description,
			goalId,
			taskId: lastId + 1,
			parentId: taskId,
			duration,
			divisible,
			dueDate,
			updatedAt: new Date().toISOString(),
			completed: false,
			order,
			repeats,
			repeatDays,
		};
		storage.set(`tasks_${goalId}_lastId`, lastId + 1);
		return newTask;
	};
	const findImportantTasks = (freeMinutes: number): Task[] => {
		const tasks = getTasks(getStorageString());
		const allocatedTaskIds = new Set<number>();
		const traverseTasks = (list: Task[]): Task | null => {
			return list.reduce<Task | null>((result, task) => {
				if (result) return result;

				if (!task.completed && !allocatedTaskIds.has(task.taskId)) {
					const tasksData = storage.getString(
						`tasks_${task.goalId}_${task.taskId}`,
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
	const saveGeneratedTasks = (generatedTasks: GeneratedTask[]) => {
		storage.set(
			`${getStorageString(taskId)}_generated`,
			JSON.stringify(generatedTasks),
		);
	};
	const getGeneratedTasks = () => {
		const storedTasks = storage.getString(
			`${getStorageString(taskId)}_generated`,
		);
		if (storedTasks) return JSON.parse(storedTasks) as GeneratedTask[];
		return [];
	};
	return {
		getTasks,
		getStorageString,
		deleteTask,
		finishTask,
		editTask,
		createTask,
		cleanupTasks,
		updateTasks,
		findImportantTasks,
		saveGeneratedTasks,
		getGeneratedTasks,
	};
};
