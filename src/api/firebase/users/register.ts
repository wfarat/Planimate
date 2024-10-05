import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { RegisterVariables } from '@/types/schemas/user';
import { register } from '../../../services/firebase/users';

export default (): UseMutationResult<void, Error, RegisterVariables> => {
	return useMutation({
		mutationFn: ({ email, username, password }: RegisterVariables) => {
			return register(email, username, password);
		},
	});
};
