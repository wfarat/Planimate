import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { fetchTasks } from '@/services/goals/tasks';
import Task from '@/types/schemas/task';

export default (
	id: number,
	isGoal: boolean,
	token?: string,
	lastUpdate?: string,
): UseQueryResult<Task[]> => {
	return useQuery({
		queryKey: [`tasks.${id}`, { id, token, isGoal, lastUpdate }],
		queryFn: () =>
			token
				? fetchTasks(id, token, isGoal, lastUpdate)
				: Promise.resolve(undefined),
		staleTime: 1000 * 60 * 5,
		enabled: !!token,
		refetchOnWindowFocus: false,
	});
};
