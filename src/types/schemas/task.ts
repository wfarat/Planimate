import { Updatable } from '@/types/schemas/updatable';

type Task = Updatable & {
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
	updated_at: string;
	order: number;
	divisible: boolean;
};

export default Task;
