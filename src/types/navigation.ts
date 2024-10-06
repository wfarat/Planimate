import type { StackScreenProps } from '@react-navigation/stack';
import { Goal, Task } from '@/types/schemas';
import { ReactElement } from 'react';

export type RootStackParamList = {
	Quotes: undefined;
	Goals: undefined;
	Tasks: {
		goal: Goal;
		task?: Task;
		parentId?: number;
	};
	Register: undefined;
	Login: undefined;
	Settings: undefined;
	Calendar: undefined;
	AddToAgenda: { task: Task };
	AddGoal: undefined;
	AddTask: {
		task?: Task;
		goal: Goal;
		tasks: Task[];
	};
	GenerateTasks: {
		goal: Goal;
		task?: Task;
		tasks: Task[];
	};
	GoalDetails: {
		goal: Goal;
	};
	FillAgendaWeek: undefined;
};

export type RootScreenProps<
	S extends keyof RootStackParamList = keyof RootStackParamList,
> = StackScreenProps<RootStackParamList, S>;

export type TaskListProps<
	S extends keyof RootStackParamList = keyof RootStackParamList,
> = RootScreenProps<S> & {
	tasks: Task[];
	handleReorder: (tasks: Task[]) => void;
	ListHeaderComponent: ReactElement;
};
