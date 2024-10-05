import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { LoginVariables } from '@/types/schemas/user';
import { login } from '../../../services/firebase/users';

export default (): UseMutationResult<string, Error, LoginVariables> => {
	return useMutation({
		mutationFn: ({ email, password }: LoginVariables) => {
			return login(email, password);
		},
	});
};
