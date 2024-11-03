// useTaskHandlers.ts

import { useNavigation } from '@react-navigation/native';
import { Goal, Task } from '@/types/schemas';
import { useTaskActions } from '@/hooks/tasks/useTaskActions';

export const useTaskHandlers = (goal: Goal, task?: Task) => {
	const navigation = useNavigation();

	const { deleteTask, finishTask, editTask, updateTasks, getStorageString } =
		useTaskActions(goal.goalId, task?.parentId, task?.taskId);

	const storageString = getStorageString(task?.taskId);
	const handleDeleteTask = () => {
		deleteTask();
		navigation.goBack();
	};

	const handleFinishTask = () => {
		finishTask();
		navigation.goBack();
	};
	const handleEdit = (newName: string, newDescription: string) => {
		if (task) {
			editTask({ ...task, name: newName, description: newDescription });
		}
	};

	const handleReorder = (reorderedTasks: Task[]) => {
		updateTasks(reorderedTasks);
	};

	return {
		handleDeleteTask,
		handleFinishTask,
		handleEdit,
		handleReorder,
		storageString,
	};
};
