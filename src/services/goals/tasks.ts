import { instance } from '@/services/instance';
import Task from '@/types/schemas/task';
import {
	convertKeysToCamelCase,
	convertKeysToSnakeCase,
} from '@/helpers/utils/convert';

export const saveTask = async (task: Task, token: string): Promise<Task> => {
	// Send the POST request with the task data converted to snake_case
	const response = await instance.post('tasks', {
		json: { ...convertKeysToSnakeCase(task) },
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
	});

	// Parse the JSON response
	const responseData = await response.json();

	// Convert the response data keys from snake_case to camelCase
	const camelCaseData = convertKeysToCamelCase(responseData);

	// Return the camelCase data
	return camelCaseData as Task;
};
export const saveTasks = async (
	tasks: Task[],
	token: string,
): Promise<Task[]> => {
	const taskPromises = tasks.map(task => saveTask(task, token));
	return Promise.all(taskPromises);
};
