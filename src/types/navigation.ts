import type { StackScreenProps } from '@react-navigation/stack';
import { Goal, Task } from '@/types/schemas';

export type RootStackParamList = {
	Quotes: undefined;
	Goals: undefined;
	Tasks: {
		goal: Goal;
		task?: Task;
		parentId?: number;
	};
	Register: undefined;
	Settings: undefined;
	Calendar: undefined;
	AddToAgendaScreen: { task: Task };
	AddGoalScreen: undefined;
	AddTaskScreen: {
		task?: Task;
		goal: Goal;
		tasks: Task[];
	};
};

export type RootScreenProps<
	S extends keyof RootStackParamList = keyof RootStackParamList,
> = StackScreenProps<RootStackParamList, S>;

export type ListProps<
	S extends keyof RootStackParamList = keyof RootStackParamList,
> = RootScreenProps<S> & {
	tasks: Task[];
	setTasks: (tasks: Task[]) => void;
};
