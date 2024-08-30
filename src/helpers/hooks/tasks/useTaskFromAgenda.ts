import { AgendaItemData } from '@/types/schemas/agendaItemType';
import { Task } from '@/types/schemas';
import { useStorage } from '@/storage/StorageContext';

export const useTaskFromAgenda = () => {
	const storage = useStorage();
	const getTaskStorageKey = (item: AgendaItemData): string =>
		item.taskId
			? `goals.${item.goalId}.${item.taskId}`
			: `goals.${item.goalId}`;

	const updateStoredTaskDuration = (
		item: AgendaItemData,
		taskStorageKey: string,
	) => {
		const storedTasks = storage.getString(taskStorageKey);
		if (storedTasks) {
			const tasks = JSON.parse(storedTasks) as Task[];
			const targetTask = tasks.find(current => current.taskId === item.taskId);
			if (targetTask) {
				updateTaskDuration(tasks, targetTask, item.duration, taskStorageKey);
			}
		}
	};

	function updateTaskDuration(
		tasks: Task[],
		task: Task,
		duration: number,
		storageKey: string,
	): void {
		if (task.duration?.elapsed !== undefined) {
			const updatedTaskElapsedTime = task.duration.elapsed
				? task.duration.elapsed + duration
				: duration;
			const updatedTask = {
				...task,
				duration: { ...task.duration, elapsed: updatedTaskElapsedTime },
			};
			storage.set(
				storageKey,
				JSON.stringify(
					tasks.map(current =>
						current.taskId === task.taskId ? updatedTask : current,
					),
				),
			);
		}
	}
	return { updateStoredTaskDuration, getTaskStorageKey };
};
