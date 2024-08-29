import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { saveAgendaItem } from '@/services/agenda/agenda';
import AgendaItemType, {
	AgendaItemVariables,
} from '@/types/schemas/agendaItemType';

export default (): UseMutationResult<
	AgendaItemType,
	Error,
	AgendaItemVariables
> => {
	return useMutation({
		mutationFn: ({ agendaItem, token }: AgendaItemVariables) => {
			return saveAgendaItem(agendaItem, token);
		},
	});
};
