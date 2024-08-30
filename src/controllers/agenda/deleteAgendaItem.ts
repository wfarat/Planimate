import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { deleteAgendaItem } from '@/services/agenda/agenda';
import { MutationVariables } from '@/types/variables';

export default (): UseMutationResult<void, Error, MutationVariables> => {
	return useMutation({
		mutationFn: ({ id, token }: MutationVariables) => {
			return deleteAgendaItem(id, token);
		},
	});
};
