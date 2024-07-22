import { instance } from '@/services/instance';
import { userSchema } from '@/types/schemas/user';

export default async (email: string, name: string, password: string) => {
	const response = await instance
		.post('users/register', { json: { email, name, password } })
		.json();
	return userSchema.parse(response);
};
