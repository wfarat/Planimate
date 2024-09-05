import { instance } from '@/services/instance';
import { ActionsPayload } from '@/types/offlineActions/actionPayload';
import { objectToSnake } from 'ts-case-convert/lib/caseConvert';

export const syncActions = async (actions: ActionsPayload) => {
	await instance.post('/bulk-actions', {
		headers: {
			'Content-Type': 'application/json',
		},
		json: objectToSnake(actions),
	});
};
