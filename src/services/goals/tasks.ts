import { instance } from '@/services/instance';
import Task from '@/types/schemas/task';
import {
	convertKeysToCamelCase,
	convertKeysToSnakeCase,
} from '@/helpers/utils/convert';

export const saveTask = async (task: Task, token: string): Promise<Task> => {
	const response = await instance.post('tasks', {
		json: { ...convertKeysToSnakeCase(task) },
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
	});
	const responseData = await response.json();
	const camelCaseData = convertKeysToCamelCase(responseData);
	return camelCaseData as Task;
};
export const saveTasks = async (
	tasks: Task[],
	token: string,
): Promise<Task[]> => {
	const taskPromises = tasks.map(task => saveTask(task, token));
	return Promise.all(taskPromises);
};

export const getTasks = async (token: string): Promise<Task[]> => {
	const response = await instance.get('tasks', {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	const responseData = await response.json();
	const camelCaseData = responseData.map(task => convertKeysToCamelCase(task));
	return camelCaseData as Task[];
};

export const removeTask = async (id: string, token: string) => {
	await instance.delete(`tasks/${id}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};
