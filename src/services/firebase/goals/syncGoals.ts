import { Goal } from '@/types/schemas';
import firestore from '@react-native-firebase/firestore';

export const syncGoals = async (goals: Goal[], userId: string) => {
	const goalsRef = firestore()
		.collection('users')
		.doc(userId)
		.collection('goals')
		.doc('goalsDoc'); // Single document for all goals

	await goalsRef.set({ goals, lastUpdated: firestore.Timestamp.now() });
};
