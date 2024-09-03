import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { fetchGoals } from '@/services/goals/goals';
import { Goal } from '@/types/schemas';

export default (token: string): UseQueryResult<Goal[]> => {
	return useQuery({
		queryKey: ['goals', token],
		queryFn: () => fetchGoals(token),
	});
};
