import { BaseAction } from '@/types/offlineActions/baseAction';
import { Goal } from '@/types/schemas';

export type GoalAction = BaseAction & {
	goal?: Goal;
	goalId?: number;
};
