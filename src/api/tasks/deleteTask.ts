import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { removeTask } from '@/services/goals/tasks';
import { MutationVariables } from '@/types/variables';

export default (): UseMutationResult<void, Error, MutationVariables> => {
	return useMutation({
		mutationFn: ({ id, token }: MutationVariables) => {
			return removeTask(id, token);
		},
	});
};
