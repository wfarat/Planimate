import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { GoalVariables } from '@/types/variables';
import { editGoal } from '@/services/goals/goals';

export default (): UseMutationResult<void, Error, GoalVariables> => {
	return useMutation({
		mutationFn: ({ goal, token }: GoalVariables) => {
			return editGoal(goal, token);
		},
	});
};
