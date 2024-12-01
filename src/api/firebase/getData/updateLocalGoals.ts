import { getGoals } from '@/services/firebase/goals/getGoals';
import { storage } from '@/storage/storage';
import { Goal } from '@/types/schemas';
import { Timestamp } from '@react-native-firebase/firestore';

type GoalsData = {
	goals: Goal[];
	lastUpdated: Timestamp;
};

export const updateLocalGoals = async (userId: string) => {
	const goalData = await getGoals(userId);
	const goalArray = (goalData.data() as GoalsData).goals;
	const lastId = storage.getNumber('goals_lastId') || 0;
	const newId = goalArray.reduce((acc, currentValue) => {
		return Math.max(acc, currentValue.goalId);
	}, 0);
	if (newId > lastId) storage.set('goals_lastId', newId);
	storage.set('goals', JSON.stringify(goalArray));
};
