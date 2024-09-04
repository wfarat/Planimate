type Task = {
	id?: string;
	taskId: number;
	goalId: number;
	parentId?: number;
	userId?: string;
	name: string;
	description: string;
	duration?: {
		base: number;
		elapsed: number;
	};
	dueDate?: Date;
	completed: boolean;
	updatedAt?: string;
	order: number;
};
export type FetchedTask = {
	_id?: string;
	task_id: number;
	goal_id: number;
	parent_id?: number | undefined;
	name: string;
	description: string;
	duration?: {
		base: number;
		elapsed: number;
	};
	due_date?: Date;
	completed: boolean;
	updated_at?: string;
	order: number;
};

export default Task;
