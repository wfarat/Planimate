import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { getTasks } from '@/services/goals/tasks';
import Task from '@/types/schemas/task';

export default (token: string): UseQueryResult<Task[]> => {
	return useQuery({
		queryKey: ['tasks', token],
		queryFn: () => getTasks(token),
	});
};
