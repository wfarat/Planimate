import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { register } from '@/services/users';
import { RegisterVariables, UserResponse } from '@/types/schemas/user';

export default (): UseMutationResult<
	UserResponse,
	Error,
	RegisterVariables
> => {
	return useMutation({
		mutationFn: ({ email, name, password }: RegisterVariables) => {
			return register(email, name, password);
		},
	});
};
