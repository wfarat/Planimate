import { instance } from '@/services/instance';
import { userSchema } from '@/types/schemas/user';

export default async (email: string, username: string, password: string) => {
	const response = await instance
		.post('users/register', { json: { username, email, password } })
		.json();
	return userSchema.parse(response);
};
