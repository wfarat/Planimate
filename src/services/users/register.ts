import { instance } from '@/services/instance';
import { UserResponse } from '@/types/schemas/user';

export default async (email: string, username: string, password: string) => {
	const response = await instance
		.post('auth/register', { json: { username, email, password } })
		.json();
	return response as UserResponse;
};
