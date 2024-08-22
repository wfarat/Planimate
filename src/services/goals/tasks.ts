import { instance } from '@/services/instance';
import Task from '@/types/schemas/task';

const saveTask = async (task: Task, token: string): Promise<Task> => {
	const response = await instance.post('tasks', {
		json: { task },
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
	});
	return response.json();
};

export const saveTasks = async (
	tasks: Task[],
	token: string,
): Promise<Task[]> => {
	const taskPromises = tasks.map(task => saveTask(task, token));
	return Promise.all(taskPromises);
};
