import { Goal, Task } from '@/types/schemas';

type GenerateTasksVariables = {
	goal: Goal;
	language: string;
	task?: Task;
	token: string;
};

export default GenerateTasksVariables;
