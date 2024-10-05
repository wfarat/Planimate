import { AgendaItemData } from '@/types/schemas/agendaItemType';
import { Task } from '@/types/schemas';
import { storage } from '@/storage/storage';

export const useTaskFromAgenda = () => {
	const getTaskStorageKey = (item: AgendaItemData): string =>
		item.parentId
			? `tasks_${item.goalId}_${item.parentId}`
			: `tasks_${item.goalId}`;

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
	return { updateStoredTaskDuration, getTaskStorageKey };
};
