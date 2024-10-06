import { Goal } from '@/types/schemas';
import firestore from '@react-native-firebase/firestore';
import { goalsRef } from '@/services/firebase/goals/goalsRef';

export const syncGoals = async (goals: Goal[], userId: string) => {
	const ref = goalsRef(userId);
	await ref.set({ goals, lastUpdated: firestore.Timestamp.now() });
};
