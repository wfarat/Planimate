import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { removeTask } from '@/services/goals/tasks';
import { RemoveVariables } from '@/types/schemas/task';

export default (): UseMutationResult<void, Error, RemoveVariables> => {
	return useMutation({
		mutationFn: ({ id, token }: RemoveVariables) => {
			return removeTask(id, token);
		},
	});
};
