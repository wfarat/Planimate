import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { fetchAgendaItems } from '@/services/agenda/agenda';
import { AgendaItemType } from '@/types/schemas';

export default (
	token?: string,
	lastUpdate?: string,
): UseQueryResult<AgendaItemType[]> => {
	return useQuery({
		queryKey: ['agenda', { token, lastUpdate }],
		queryFn: () =>
			token ? fetchAgendaItems(token, lastUpdate) : Promise.resolve(undefined),
		staleTime: 1000 * 60 * 5,
		enabled: !!token,
		refetchOnWindowFocus: false,
	});
};
