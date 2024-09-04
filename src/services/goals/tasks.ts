import { instance } from '@/services/instance';
import Task, { FetchedTask } from '@/types/schemas/task';
import { objectToCamel, objectToSnake } from 'ts-case-convert/lib/caseConvert';

const convertToCamel = (fetchedTask: FetchedTask): Task =>
	// eslint-disable-next-line no-underscore-dangle
	objectToCamel({ ...fetchedTask, id: fetchedTask._id, _id: undefined });
export const saveTask = async (task: Task, token: string): Promise<Task> => {
	const response = await instance.post('tasks', {
		json: objectToSnake(task),
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
	});
	const responseData = await response.json();
	return convertToCamel(responseData as FetchedTask);
};
export const saveTasks = async (
	tasks: Task[],
	token: string,
): Promise<Task[]> => {
	const taskPromises = tasks.map(task => saveTask(task, token));
	return Promise.all(taskPromises);
};

export const fetchTasks = async (
	id: number,
	token: string,
	isGoal: boolean,
	lastUpdate?: string,
): Promise<Task[]> => {
	const response = await instance.get(
		lastUpdate
			? `tasks/${id}?is_goal=${isGoal}&last_update=${lastUpdate}`
			: `tasks/${id}?is_goal=${isGoal}`,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		},
	);
	const responseData: FetchedTask[] = await response.json<FetchedTask[]>();
	return responseData.map((task: FetchedTask) => convertToCamel(task));
};

export const removeTask = async (id: string, token: string) => {
	await instance.delete(`tasks/${id}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

export const finishTask = async (id: string, token: string): Promise<void> => {
	await instance.put(`tasks/finish/${id}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

export const editTask = async (task: Task, token: string): Promise<void> => {
	await instance.put(`tasks/${task.id}`, {
		json: objectToSnake(task),
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
	});
};
export const updateTaskOrder = async (tasks: Task[], token: string) => {
	const response = await instance.put('tasks/update-order', {
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
		json: tasks.map(task => objectToSnake(task)),
	});
	const responseData: FetchedTask[] = await response.json<FetchedTask[]>();
	return responseData.map((task: FetchedTask) => convertToCamel(task));
};
