import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { fetchTasks } from '@/services/goals/tasks';
import Task from '@/types/schemas/task';

export default (
	token?: string,
	lastUpdate?: string,
): UseQueryResult<Task[]> => {
	return useQuery({
		queryKey: ['tasks', token],
		queryFn: () =>
			token ? fetchTasks(token, lastUpdate) : Promise.resolve(undefined),
		staleTime: 1000 * 60 * 5,
		enabled: !!token,
		refetchOnWindowFocus: false,
	});
};
