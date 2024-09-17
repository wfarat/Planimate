import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { saveAgendaItems } from '@/services/agenda/agenda';
import AgendaItemType from '@/types/schemas/agendaItemType';
import { AgendaItemsVariables } from '@/types/variables/agendaItemVariables';

export default (): UseMutationResult<
	AgendaItemType[],
	Error,
	AgendaItemsVariables
> => {
	return useMutation({
		mutationFn: ({ agendaItems, token }: AgendaItemsVariables) => {
			return saveAgendaItems(agendaItems, token);
		},
	});
};
