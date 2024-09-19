import { Goal, Task } from '@/types/schemas';

type GenerateTasksVariables = {
	goal: Goal;
	task?: Task;
	token: string;
};

export default GenerateTasksVariables;
