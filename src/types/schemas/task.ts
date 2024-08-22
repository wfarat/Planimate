type Task = {
	id: number;
	goalId: number;
	taskId?: number | undefined;
	name: string;
	description: string;
	duration?: {
		base: number;
		elapsed: number;
	};
	dueDate?: Date;
	completed: boolean;
};
export type TasksVariables = {
	tasks: Task[];
	token: string;
};
export default Task;
