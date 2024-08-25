import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { finishTask } from '@/services/goals/tasks';
import { MutationVariables } from '@/types/schemas/task';

export default (): UseMutationResult<void, Error, MutationVariables> => {
	return useMutation({
		mutationFn: ({ id, token }: MutationVariables) => {
			return finishTask(id, token);
		},
	});
};
