import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { fetchGoals } from '@/services/goals/goals';
import { Goal } from '@/types/schemas';

export default (
	token?: string,
	lastUpdate?: string,
): UseQueryResult<Goal[]> => {
	return useQuery({
		queryKey: ['goals', { token, lastUpdate }],
		queryFn: () =>
			token ? fetchGoals(token, lastUpdate) : Promise.resolve(undefined),
		staleTime: 1000 * 60 * 5,
		enabled: !!token,
		refetchOnWindowFocus: false,
	});
};
