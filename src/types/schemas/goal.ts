type Goal = {
	id?: string;
	goalId: number;
	name: string;
	description: string;
	dueDate?: Date;
	updatedAt: string;
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
