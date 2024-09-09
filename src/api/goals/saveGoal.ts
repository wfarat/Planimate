import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { saveGoal } from '@/services/goals/goals';
import Goal from '@/types/schemas/goal';
import { GoalVariables } from '@/types/variables';

export default (): UseMutationResult<Goal, Error, GoalVariables> => {
	return useMutation({
		mutationFn: ({ goal, token }: GoalVariables) => {
			return saveGoal(goal, token);
		},
	});
};
