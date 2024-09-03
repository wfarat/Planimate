import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { fetchLastUpdateTimestamp } from '@/services/users';

export default (token: string): UseQueryResult<Date> => {
	return useQuery({
		queryKey: ['timestamp', token],
		queryFn: () => fetchLastUpdateTimestamp(token),
		staleTime: 60 * 1000 * 10,
	});
};
