import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { saveTasks } from '@/services/goals/tasks';
import Task, { TasksVariables } from '@/types/schemas/task';

export default (): UseMutationResult<Task[], Error, TasksVariables> => {
	return useMutation({
		mutationFn: ({ tasks, token }: TasksVariables) => {
			return saveTasks(tasks, token);
		},
	});
};
