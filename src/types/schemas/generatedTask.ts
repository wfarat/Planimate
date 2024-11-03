type GeneratedTask = {
	name: string;
	description: string;
	divisible: boolean;
	dueDate?: Date;
	duration?: number;
	repeats?: number;
};

export type FetchedGeneratedTask = {
	name: string;
	description: string;
	divisible: boolean;
	due_date: Date;
	duration?: number;
	repeats?: number;
};

export default GeneratedTask;
