import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { editAgendaItem } from '@/services/agenda/agenda';
import { AgendaItemVariables } from '@/types/variables';
import { AgendaItemType } from '@/types/schemas';

export default (): UseMutationResult<
	AgendaItemType,
	Error,
	AgendaItemVariables
> => {
	return useMutation({
		mutationFn: ({ agendaItem, token }: AgendaItemVariables) => {
			return editAgendaItem(agendaItem, token);
		},
	});
};
