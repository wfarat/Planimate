import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { deleteGoal } from '@/services/goals/goals';
import { MutationVariables } from '@/types/variables';

export default (): UseMutationResult<void, Error, MutationVariables> => {
	return useMutation({
		mutationFn: ({ id, token }: MutationVariables) => {
			return deleteGoal(id, token);
		},
	});
};
