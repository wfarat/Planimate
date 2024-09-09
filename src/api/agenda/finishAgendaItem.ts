import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { finishAgendaItem } from '@/services/agenda/agenda';
import { MutationVariables } from '@/types/variables';

export default (): UseMutationResult<void, Error, MutationVariables> => {
	return useMutation({
		mutationFn: ({ id, agendaDataId, token }: MutationVariables) => {
			return finishAgendaItem(id, token, agendaDataId);
		},
	});
};
