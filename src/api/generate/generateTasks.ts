import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { GeneratedTask } from '@/types/schemas';
import { GenerateTasksVariables } from '@/types/variables';
import { generateTasks } from '@/services/generate/generateTasks';

export default (): UseMutationResult<
	GeneratedTask[],
	Error,
	GenerateTasksVariables
> => {
	return useMutation({
		mutationFn: ({ goal, language, task, token }: GenerateTasksVariables) => {
			return generateTasks(goal, token, language, task);
		},
	});
};
