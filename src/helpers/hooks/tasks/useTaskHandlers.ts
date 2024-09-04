// useTaskHandlers.ts

import { useNavigation } from '@react-navigation/native';
import { Goal, Task } from '@/types/schemas';
import { useTaskActions } from '@/helpers/hooks/tasks/useTaskActions';
import { fetchTasks } from '@/controllers/goals';
import { useStorage } from '@/storage/StorageContext';

export const useTaskHandlers = (
	goal: Goal,
	setTasks: (tasks: Task[]) => void,
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
	const handleGetTasks = () => {
		if (data) {
			updateTasks(data, task?.taskId);
			return data;
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

	const handleReorder = (tasks: Task[]) => {
		setTasks(tasks);
		updateTasks(tasks);
	};
	return {
		handleDeleteTask,
		handleFinishTask,
		handleEditTask,
		handleReorder,
		handleGetTasks,
	};
};
