import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { fetchLastUpdateTimestamp } from '@/services/users';

export default (token: string | undefined): UseQueryResult<string> => {
	return useQuery({
		queryKey: ['timestamp', token],
		enabled: !!token,
		queryFn: () =>
			token ? fetchLastUpdateTimestamp(token) : Promise.resolve(null),
		staleTime: 60 * 1000 * 10,
	});
};
