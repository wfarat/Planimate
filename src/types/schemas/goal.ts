import type Task from './task';

type Goal = {
	id: number;
	name: string;
	description: string;
	tasks: Task[];
};

export default Goal;
