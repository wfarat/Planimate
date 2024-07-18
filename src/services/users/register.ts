import { instance } from '@/services/instance';
import { userSchema } from '@/types/schemas/user';

export default async (name: string, password: string) => {
	const response = await instance
		.post('users/register', { json: { name, password } })
		.json();
	return userSchema.parse(response);
};
