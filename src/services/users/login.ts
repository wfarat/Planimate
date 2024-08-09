import { instance } from '@/services/instance';
import { LoginResponse } from '@/types/schemas/user';

export default async (username: string, password: string) => {
	const response = await instance
		.post('auth/token', { json: { username, password } })
		.json();
	return response as LoginResponse;
};
