import { instance } from '@/services/instance';
import Goal, { FetchedGoal } from '@/types/schemas/Goal';
import { objectToCamel, objectToSnake } from 'ts-case-convert/lib/caseConvert';

const convertToCamel = (fetchedTask: FetchedGoal): Goal =>
	// eslint-disable-next-line no-underscore-dangle
	objectToCamel({ ...fetchedTask, id: fetchedTask._id, _id: undefined });
export const saveGoal = async (goal: Goal, token: string): Promise<Goal> => {
	const response = await instance.post('goals', {
		json: objectToSnake(goal),
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
	});
	const responseData = await response.json();
	return convertToCamel(responseData as FetchedGoal);
};
