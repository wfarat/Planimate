import type { StackScreenProps } from '@react-navigation/stack';
import { Goal } from '@/types/schemas';

export type RootStackParamList = {
	Startup: undefined;
	Main: undefined;
	Goals: undefined;
	GoalDetails: { goal: Goal };
	Register: undefined;
};

export type RootScreenProps<
	S extends keyof RootStackParamList = keyof RootStackParamList,
> = StackScreenProps<RootStackParamList, S>;

export type ListProps<
	S extends keyof RootStackParamList = keyof RootStackParamList,
> = RootScreenProps<S> & {
	clean: () => void;
};
