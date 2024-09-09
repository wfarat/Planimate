import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { saveTasks } from '@/services/goals/tasks';
import Task from '@/types/schemas/task';
import { TaskArrayVariables } from '@/types/variables';

export default (): UseMutationResult<Task[], Error, TaskArrayVariables> => {
	return useMutation({
		mutationFn: ({ tasks, token }: TaskArrayVariables) => {
			return saveTasks(tasks, token);
		},
	});
};
