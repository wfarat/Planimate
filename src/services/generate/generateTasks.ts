import { Goal, Task } from '@/types/schemas';
import { instance } from '@/services/instance';
import { objectToCamel, objectToSnake } from 'ts-case-convert/lib/caseConvert';
import { FetchedGeneratedTask } from '@/types/schemas/generatedTask';

export const generateTasks = async (
	goal: Goal,
	token: string,
	language: string,
	task?: Task,
) => {
	const response = await instance.post('generate/tasks', {
		json: {
			goal: objectToSnake(goal),
			language,
			task: task ? objectToSnake(task) : undefined,
		},
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
	});
	const responseData = await response.json();
	return objectToCamel(responseData as FetchedGeneratedTask[]);
};
