type Task = {
	id: number;
	goalId: number;
	taskId?: number | undefined;
	name: string;
	description: string;
	tasks: Task[];
	completed: boolean;
};

export default Task;
