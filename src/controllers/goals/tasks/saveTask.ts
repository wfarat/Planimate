import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { saveTask } from '@/services/goals/tasks';
import Task, { TaskVariables } from '@/types/schemas/task';

export default (): UseMutationResult<Task, Error, TaskVariables> => {
	return useMutation({
		mutationFn: ({ task, token }: TaskVariables) => {
			return saveTask(task, token);
		},
	});
};
