// useTaskHandlers.ts

import { useNavigation } from '@react-navigation/native';
import { Goal, Task } from '@/types/schemas';
import { useTaskActions } from '@/helpers/hooks/tasks/useTaskActions';

export const useTaskHandlers = (
	goal: Goal,
	setTasks: (tasks: Task[]) => void,
	task?: Task,
) => {
	const navigation = useNavigation();
	const { deleteTask, finishTask, editTask, updateTasks } = useTaskActions(
		goal.id,
		task?.parentId,
		task?.taskId,
		task?.id,
	);

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
	};
};
