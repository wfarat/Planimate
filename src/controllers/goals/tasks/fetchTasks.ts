import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { fetchTasks } from '@/services/goals/tasks';
import Task from '@/types/schemas/task';

export default (
	id: string,
	token: string,
	lastUpdate?: string,
): UseQueryResult<Task[]> => {
	return useQuery({
		queryKey: ['tasks', { id, token }],
		queryFn: () => fetchTasks(id, token, lastUpdate),
		staleTime: 1000 * 60 * 5,
	});
};
