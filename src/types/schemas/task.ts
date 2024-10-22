type Task = {
	taskId: number;
	goalId: number;
	parentId?: number;
	name: string;
	description: string;
	duration?: {
		base: number;
		elapsed: number;
	};
	dueDate?: Date;
	completed: boolean;
	order: number;
	divisible: boolean;
	repeats?: number;
	repeatDays?: boolean[];
};

export default Task;
