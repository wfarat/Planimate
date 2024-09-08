// useTaskHandlers.ts

import { useNavigation } from '@react-navigation/native';
import { Goal, Task } from '@/types/schemas';
import { useTaskActions } from '@/helpers/hooks/tasks/useTaskActions';
import { fetchTasks } from '@/controllers/goals';
import { useStorage } from '@/storage/StorageContext';

export const useTaskHandlers = (
	goal: Goal,
	setTasks?: (tasks: Task[]) => void,
	task?: Task,
) => {
	const navigation = useNavigation();
	const storage = useStorage();
	const {
		deleteTask,
		finishTask,
		editTask,
		updateTasks,
		getTasks,
		getStorageString,
		addOfflineAction,
	} = useTaskActions(goal.goalId, task?.parentId, task?.taskId);

	const token = storage.getString('token');
	const storageString = getStorageString(task?.taskId);
	const lastUpdate = getTasks(storageString)
		.reduce(
			(acc, currentTask) => {
				if (currentTask.updatedAt) {
					const currentTaskDate = new Date(currentTask.updatedAt);
					return currentTaskDate > acc ? currentTaskDate : acc;
				}
				return acc;
			},
			new Date('1970-01-01T00:00:00.000Z'), // Initialize with the earliest possible UTC date
		)
		.toISOString(); // Convert the final date back to an ISO string
	const { data } = fetchTasks(
		task ? task.taskId : goal.goalId,
		!task,
		token,
		lastUpdate,
	);
	const replaceTask = (updatedTask: Task): Task[] => {
		const oldTasks = getTasks(storageString);
		return oldTasks.map(item =>
			item.taskId === updatedTask.taskId ? updatedTask : item,
		);
	};
	const updateTask = (updatedTask: Task) => {
		const newTasks = replaceTask(updatedTask);
		// If no matching item was found, append the new item
		if (!newTasks.some(item => item.taskId === updatedTask.taskId)) {
			newTasks.push(updatedTask);
		}
		updateTasks(newTasks);
	};
	const handleGetTasks = () => {
		if (data) {
			data.forEach(updatedTask => updateTask(updatedTask));
		}
		return getTasks(storageString);
	};
	const handleDeleteTask = () => {
		deleteTask();
		navigation.goBack();
	};

	const handleFinishTask = () => {
		finishTask();
		navigation.goBack();
	};
	const handleEditTask = (newName: string, newDescription: string) => {
		if (task) {
			editTask(newName, newDescription);
		}
	};

	const handleReorder = (reorderedTasks: Task[]) => {
		if (setTasks) setTasks(reorderedTasks);
		updateTasks(reorderedTasks);
	};

	const handleOfflineDeleteTask = () => {
		addOfflineAction({
			type: 'delete',
			id: task?.id,
			taskId: task?.taskId,
			goalId: goal.goalId,
		});
	};
	const handleOfflineFinishTask = () => {
		addOfflineAction({
			type: 'complete',
			id: task?.id,
			taskId: task?.taskId,
			goalId: goal.goalId,
		});
	};
	const handleOfflineReorder = (tasks: Task[]) => {
		addOfflineAction({ type: 'reorder', tasks });
	};
	return {
		handleDeleteTask,
		handleFinishTask,
		handleEditTask,
		handleReorder,
		handleGetTasks,
		data,
		handleOfflineDeleteTask,
		handleOfflineFinishTask,
		handleOfflineReorder,
	};
};
