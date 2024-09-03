import { instance } from '@/services/instance';

export default async (token: string): Promise<Date> => {
	const response = await instance.get('users/timestamp', {
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
	});
	return response.json();
};
