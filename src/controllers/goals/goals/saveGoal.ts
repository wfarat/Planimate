import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { saveGoal } from '@/services/goals/goals';
import Goal, { GoalVariables } from '@/types/schemas/Goal';

export default (): UseMutationResult<Goal, Error, GoalVariables> => {
	return useMutation({
		mutationFn: ({ goal, token }: GoalVariables) => {
			return saveGoal(goal, token);
		},
	});
};
