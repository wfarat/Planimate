type Task = {
	id: number;
	goalId: number;
	taskId?: number | undefined;
	name: string;
	description: string;
	completed: boolean;
};

export default Task;
