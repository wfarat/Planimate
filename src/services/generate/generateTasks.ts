import { Goal, Task } from '@/types/schemas';
import { instance } from '@/services/instance';
import { objectToCamel, objectToSnake } from 'ts-case-convert/lib/caseConvert';
import { FetchedGeneratedTask } from '@/types/schemas/generatedTask';

export const generateTasks = async (
	goal: Goal,
	language: string,
	task?: Task,
) => {
	const response = await instance.post('generate/tasks', {
		json: {
			goal: objectToSnake(goal),
			language,
			task: task ? objectToSnake(task) : undefined,
		},
	});
	const responseData = await response.json();
	return objectToCamel(responseData as FetchedGeneratedTask[]);
};
