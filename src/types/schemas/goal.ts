type Goal = {
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
};

export type GoalVariables = {
	goal: Goal;
	token: string;
};
