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
};

export type RootScreenProps<
	S extends keyof RootStackParamList = keyof RootStackParamList,
> = StackScreenProps<RootStackParamList, S>;

export type ListProps<
	S extends keyof RootStackParamList = keyof RootStackParamList,
> = RootScreenProps<S> & {
	tasks?: Task[];
};
