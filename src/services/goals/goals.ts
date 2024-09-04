import { instance } from '@/services/instance';
import Goal, { FetchedGoal } from '@/types/schemas/goal';
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

export const fetchGoals = async (
	token: string,
	lastUpdate?: string,
): Promise<Goal[]> => {
	const response = await instance.get(
		lastUpdate ? `goals?last_update=${lastUpdate}` : 'goals',
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		},
	);
	const responseData: FetchedGoal[] = await response.json();
	return responseData.map((fetchedGoal: FetchedGoal) =>
		convertToCamel(fetchedGoal),
	);
};
export const deleteGoal = async (id: string, token: string): Promise<void> => {
	await instance.delete(`goals/${id}`, {
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
	});
};
export const editGoal = async (goal: Goal, token: string): Promise<void> => {
	await instance.put(`goals/${goal.id}`, {
		json: objectToSnake(goal),
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
	});
};
