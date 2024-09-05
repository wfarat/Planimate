import { instance } from '@/services/instance';
import { ActionsPayload } from '@/types/offlineActions/actionPayload';
import { objectToSnake } from 'ts-case-convert/lib/caseConvert';

export const syncActions = async (token: string, actions: ActionsPayload) => {
	await instance.post('bulk-actions', {
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
		json: objectToSnake(actions),
	});
};
