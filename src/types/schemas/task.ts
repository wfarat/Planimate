type Task = {
	_id?: string;
	taskId: number;
	goalId: number;
	parentId?: number | undefined;
	name: string;
	description: string;
	duration?: {
		base: number;
		elapsed: number;
	};
	dueDate?: Date;
	completed: boolean;
	createdAt?: Date;
	updatedAt?: Date;
	order: number;
};
export type TasksVariables = {
	tasks: Task[];
	token: string;
};
export type TaskVariables = {
	task: Task;
	token: string;
};
export type RemoveVariables = {
	id: string;
	token: string;
};
export default Task;
