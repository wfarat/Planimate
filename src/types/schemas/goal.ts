import { Updatable } from '@/types/schemas/updatable';

type Goal = Updatable & {
	id?: string;
	goalId: number;
	name: string;
	description: string;
	dueDate?: Date;
};

export default Goal;

export type FetchedGoal = {
	_id: string;
	goal_id: number;
	name: string;
	description: string;
	due_date: Date;
	updated_at: string;
};
