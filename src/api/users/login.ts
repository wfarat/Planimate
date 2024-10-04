import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { login } from '@/services/users';
import { LoginVariables } from '@/types/schemas/user';

export default (): UseMutationResult<string, Error, LoginVariables> => {
	return useMutation({
		mutationFn: ({ username, password }: LoginVariables) => {
			return login(username, password);
		},
	});
};
