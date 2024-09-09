import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { saveTask } from '@/services/goals/tasks';
import Task from '@/types/schemas/task';
import { TaskVariables } from '@/types/variables';

export default (): UseMutationResult<Task, Error, TaskVariables> => {
	return useMutation({
		mutationFn: ({ task, token }: TaskVariables) => {
			return saveTask(task, token);
		},
	});
};
