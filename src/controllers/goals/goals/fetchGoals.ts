import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { fetchGoals } from '@/services/goals/goals';
import { Goal } from '@/types/schemas';

export default (token: string, lastUpdate?: string): UseQueryResult<Goal[]> => {
	return useQuery({
		queryKey: ['goals', { token, lastUpdate }],
		queryFn: () => fetchGoals(token, lastUpdate),
		staleTime: 1000 * 60 * 5,
	});
};
