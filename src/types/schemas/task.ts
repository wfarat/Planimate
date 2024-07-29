type Task = {
	id: number;
	goalId: number;
	taskId?: number | undefined;
	name: string;
	description: string;
	minutesToComplete: number;
	completed: boolean;
};

export default Task;
