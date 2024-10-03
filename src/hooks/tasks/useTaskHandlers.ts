// useTaskHandlers.ts

import { useNavigation } from '@react-navigation/native';
import { Goal, Task } from '@/types/schemas';
import { useTaskActions } from '@/hooks/tasks/useTaskActions';

export const useTaskHandlers = (
	goal: Goal,
	setTasks?: (tasks: Task[]) => void,
	task?: Task,
) => {
	const navigation = useNavigation();

	const {
		deleteTask,
		finishTask,
		editTask,
		updateTasks,
		getTasks,
		getStorageString,
		addOfflineAction,
	} = useTaskActions(goal.goalId, task?.parentId, task?.taskId);

	const storageString = getStorageString(task?.taskId);

	const handleGetTasks = () => {
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
		handleOfflineDeleteTask,
		handleOfflineFinishTask,
		handleOfflineReorder,
	};
};
