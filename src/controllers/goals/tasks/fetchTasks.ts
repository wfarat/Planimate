import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { fetchTasks } from '@/services/goals/tasks';
import Task from '@/types/schemas/task';

export default (
	goalId: number,
	taskId?: number,
	token?: string,
	lastUpdate?: string,
): UseQueryResult<Task[]> => {
	return useQuery({
		queryKey: [`tasks.${taskId}`, { taskId, token, goalId, lastUpdate }],
		queryFn: () =>
			token
				? fetchTasks(goalId, token, taskId, lastUpdate)
				: Promise.resolve(undefined),
		staleTime: 1000 * 60 * 5,
		enabled: !!token,
		refetchOnWindowFocus: false,
	});
};
