import { BaseAction } from '@/types/offlineActions/baseAction';
import { Task } from '@/types/schemas';

export type TaskAction = BaseAction & {
	task?: Task;
	taskId?: number;
	tasks?: Task[];
	goalId?: number;
};
