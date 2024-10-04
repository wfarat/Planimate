import { Task } from '@/types/schemas';
import { fetchTasks } from '@/api';

import { useTaskActions } from '@/hooks/tasks/useTaskActions';
import { storage } from '@/storage/storage';
import { useGoalActions } from '@/hooks/goals/useGoalActions';

export const useTaskUpdate = () => {
	const token = storage.getString('token');
	const { getGoals } = useGoalActions();
	const { getTasks } = useTaskActions(0);

	const findMostRecentUpdate = (): string => {
		const goals = getGoals(); // Assuming this function retrieves all goals
		const traverseTasks = (tasks: Task[]): Date => {
			return tasks.reduce<Date>((latestDate, task) => {
				// Check the updatedAt field of the current task
				const taskDate = task.updatedAt
					? new Date(task.updatedAt)
					: new Date('1970-01-01T00:00:00.000Z');

				// Check if the task has subtasks stored in local storage (simulate recursive fetch)
				const tasksData = storage.getString(
					`goals.${task.goalId}.${task.taskId}`,
				);
				if (tasksData) {
					const subTasks = JSON.parse(tasksData) as Task[];
					// Recursively check the subtasks for the most recent update
					const subTaskLatestDate = traverseTasks(subTasks);
					return subTaskLatestDate > taskDate ? subTaskLatestDate : taskDate;
				}

				// Compare the task's date to the accumulated latest date
				return taskDate > latestDate ? taskDate : latestDate;
			}, new Date('1970-01-01T00:00:00.000Z')); // Initialize with the earliest possible UTC date
		};

		// Start traversing all goals to find the most recent update
		const mostRecentDate = goals.reduce<Date>((latestDate, goal) => {
			const tasks = getTasks(`tasks.${goal.id}`); // Retrieve tasks for the current goal
			const goalLatestDate = traverseTasks(tasks); // Recursively search within tasks and subtasks
			return goalLatestDate > latestDate ? goalLatestDate : latestDate;
		}, new Date('1970-01-01T00:00:00.000Z'));

		// Convert the result to ISO string format for further use
		return mostRecentDate.toISOString();
	};
	const lastUpdate = findMostRecentUpdate();
	const { data, dataUpdatedAt } = fetchTasks(token, lastUpdate);
	const getStorageString = (goalId: number, parentId?: number) => {
		return parentId ? `goals.${goalId}.${parentId}` : `goals.${goalId}`;
	};
	const replaceTask = (fetchedTask: Task): Task[] => {
		const storageString = getStorageString(
			fetchedTask.goalId,
			fetchedTask.parentId,
		);
		const oldTasks = getTasks(storageString);
		return oldTasks.map(item =>
			item.taskId === fetchedTask.taskId ? fetchedTask : item,
		);
	};
	const updateTask = (fetchedTask: Task) => {
		const newTasks = replaceTask(fetchedTask);
		// If no matching item was found, append the new item
		if (!newTasks.some(item => item.taskId === fetchedTask.taskId)) {
			newTasks.push(fetchedTask);
			const lastId =
				storage.getNumber(`goals.${fetchedTask.goalId}.lastId`) || 0;
			if (lastId < fetchedTask.taskId)
				storage.set(`goals.${fetchedTask.goalId}.lastId`, fetchedTask.taskId);
		}
		const storageString = getStorageString(
			fetchedTask.goalId,
			fetchedTask.parentId,
		);
		storage.set(storageString, JSON.stringify(newTasks));
	};
	const updateTasks = () => {
		const storageUpdatedAt = storage.getNumber('tasks.updatedAt');
		if (data && dataUpdatedAt !== storageUpdatedAt) {
			data.forEach(updatedTask => updateTask(updatedTask));
			storage.set('tasks.updatedAt', dataUpdatedAt);
		}
	};

	return { updateTasks, data };
};
