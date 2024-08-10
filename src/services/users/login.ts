import { instance } from '@/services/instance';
import { LoginResponse } from '@/types/schemas/user';

export default async (formData: FormData) => {
	const response = await instance.post('auth/token', { body: formData }).json();
	return response as LoginResponse;
};
